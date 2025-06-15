import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

type ChatSession = {
  id: string;
  created_at: string;
  guest_identifier: string;
  status: string;
};

const fetchChatSessions = async () => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .or('status.eq.open,status.eq.active')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as ChatSession[];
};

const LiveChat = () => {
  const { data: initialSessions, isLoading, error, refetch } = useQuery({
    queryKey: ['chat_sessions'],
    queryFn: fetchChatSessions,
  });

  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    if (initialSessions) {
      setSessions(initialSessions);
    }
  }, [initialSessions]);

  useEffect(() => {
    const channel = supabase
      .channel('chat-sessions-admin')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_sessions',
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return (
    <div className="py-8 pb-16 md:pb-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MessageSquare />
              Live Chat Sessions
            </CardTitle>
            <CardDescription>
              View and respond to incoming chats from website visitors. New chats will appear here automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}
            {error && <p className="text-red-500">Error loading sessions: {error.message}</p>}
            {!isLoading && sessions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">No active chat sessions.</p>
                <p className="text-sm">When a visitor starts a chat, it will appear here.</p>
              </div>
            )}
            <div className="space-y-4">
              {sessions.map(session => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Chat with Guest <span className="text-muted-foreground font-mono text-xs">{session.guest_identifier.substring(0, 8)}</span></p>
                      <p className="text-sm text-muted-foreground">
                        Started {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link to={`/live-chat/${session.id}`}> 
                        Open Chat <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveChat;
