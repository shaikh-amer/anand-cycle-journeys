
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Message = {
  id: string;
  content: string;
  sender_type: string;
  created_at: string;
};

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [guestId, setGuestId] = useLocalStorage('livechat_guest_id', '');
  const [sessionId, setSessionId] = useLocalStorage<string | null>('livechat_session_id', null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!guestId) {
      setGuestId(crypto.randomUUID());
    }
  }, [guestId, setGuestId]);

  const scrollToBottom = () => {
    setTimeout(() => {
        const scrollViewport = document.querySelector('.chat-scroll-viewport');
        if (scrollViewport) {
            scrollViewport.scrollTop = scrollViewport.scrollHeight;
        }
    }, 100);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!sessionId) return;
      setIsLoading(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
        scrollToBottom();
      }
      setIsLoading(false);
    };

    if (isOpen) {
      fetchMessages();
    }
  }, [sessionId, isOpen]);

  useEffect(() => {
    if (!sessionId || !isOpen) return;

    const channel = supabase
      .channel(`chat-session-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !guestId) return;

    let currentSessionId = sessionId;

    if (!currentSessionId) {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({ guest_identifier: guestId })
        .select('id')
        .single();

      if (error) {
        console.error('Error creating session:', error);
        return;
      }
      currentSessionId = data.id;
      setSessionId(currentSessionId);
    }

    const { error: messageError } = await supabase.from('chat_messages').insert({
      session_id: currentSessionId,
      content: newMessage,
      sender_type: 'user',
    });

    if (messageError) {
      console.error('Error sending message:', messageError);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="fixed bottom-24 md:bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 h-[28rem] flex flex-col shadow-2xl animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
            <CardTitle className="text-lg">Live Chat</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-primary/80">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4" viewportClassName="chat-scroll-viewport">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-full"><Bot size={20}/></div>
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg rounded-tl-none max-w-[80%]">
                        <p className="text-sm">Hello! How can I help you today?</p>
                    </div>
                </div>
                {isLoading && <Skeleton className="h-10 w-3/4" />}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex items-start gap-3',
                      msg.sender_type === 'user' ? 'justify-end' : ''
                    )}
                  >
                    {msg.sender_type === 'admin' && <div className="p-2 bg-muted rounded-full"><Bot size={20}/></div>}
                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-[80%]',
                        msg.sender_type === 'user'
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
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="relative">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="pr-12"
                />
                <Button type="submit" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-10">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsOpen(true)} className="rounded-full h-16 w-16 shadow-2xl">
          <MessageSquare className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
};

export default LiveChatWidget;
