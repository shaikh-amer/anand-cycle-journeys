
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

type Message = {
  id: string;
  content: string;
  sender_type: 'user' | 'admin';
  created_at: string;
};

type Session = {
    id: string;
    created_at: string;
    guest_identifier: string;
    status: string;
};

const fetchSessionDetails = async (sessionId: string) => {
    const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Session not found");
    return data as Session;
};


const fetchMessages = async (sessionId: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data as Message[];
};

const LiveChatSession = () => {
  const { id: sessionId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { data: session, isLoading: isLoadingSession } = useQuery({
      queryKey: ['chat_session', sessionId],
      queryFn: () => fetchSessionDetails(sessionId!),
      enabled: !!sessionId,
  });

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ['chat_messages', sessionId],
    queryFn: () => fetchMessages(sessionId!),
    enabled: !!sessionId,
  });

  const updateSessionStatusMutation = useMutation({
    mutationFn: async (status: 'active' | 'closed') => {
        if (!sessionId) return;
        const { error } = await supabase
            .from('chat_sessions')
            .update({ status })
            .eq('id', sessionId);
        if (error) throw new Error(error.message);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['chat_sessions'] });
        queryClient.invalidateQueries({ queryKey: ['chat_session', sessionId] });
    }
  });

  useEffect(() => {
    if (session?.status === 'open') {
        updateSessionStatusMutation.mutate('active');
    }
  }, [session, updateSessionStatusMutation]);


  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!sessionId) return;
      const { error } = await supabase.from('chat_messages').insert({
        session_id: sessionId,
        content,
        sender_type: 'admin',
      });
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      setNewMessage('');
    },
  });

  const scrollToBottom = () => {
    setTimeout(() => {
        const viewport = scrollAreaRef.current?.querySelector('.chat-scroll-viewport');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`chat-session-admin-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          queryClient.setQueryData(['chat_messages', sessionId], (oldData: Message[] | undefined) => {
            if (!oldData) return [payload.new as Message];
            return [...oldData, payload.new as Message];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, queryClient]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessageMutation.mutate(newMessage);
  };
  
  const isLoading = isLoadingSession || isLoadingMessages;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 pb-16 md:pb-8">
        <div className="container mx-auto px-4">
          <Card className="h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="border-b">
              {isLoadingSession ? <Skeleton className="h-6 w-1/2" /> :
                <>
                    <CardTitle>Chat with Guest <span className="text-muted-foreground font-mono text-sm">{session?.guest_identifier.substring(0, 8)}</span></CardTitle>
                    <CardDescription>
                        Started {session && formatDistanceToNow(new Date(session.created_at), { addSuffix: true })} • Status: <span className={cn('font-semibold', session?.status === 'active' ? 'text-green-500' : session?.status === 'open' ? 'text-yellow-500' : 'text-muted-foreground')}>{session?.status}</span>
                    </CardDescription>
                </>
              }
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef} viewportClassName="chat-scroll-viewport">
                <div className="space-y-4">
                  {isLoading && Array.from({length: 5}).map((_, i) => <Skeleton key={i} className={cn("h-10 w-3/4", i % 2 === 0 ? "" : "ml-auto" )}/>)}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex items-start gap-3',
                        msg.sender_type === 'admin' ? 'justify-end' : ''
                      )}
                    >
                      {msg.sender_type === 'user' && <div className="p-2 bg-muted rounded-full"><User size={20}/></div>}
                      <div
                        className={cn(
                          'p-3 rounded-lg max-w-[80%]',
                          msg.sender_type === 'admin'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted text-muted-foreground rounded-tl-none'
                        )}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
                <div className="relative">
                  <Input
                    placeholder="Type your response..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="pr-12"
                    disabled={sendMessageMutation.isPending}
                  />
                  <Button type="submit" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-10" disabled={sendMessageMutation.isPending}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default LiveChatSession;
