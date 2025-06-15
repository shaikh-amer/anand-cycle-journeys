
-- Create chat_sessions table to store individual chat conversations
create table if not exists public.chat_sessions (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    guest_identifier text not null, -- A unique ID for the visiting user
    status text not null default 'open' -- e.g., open, active, closed
);
comment on table public.chat_sessions is 'Stores individual chat conversations.';

-- Create chat_messages table to store messages for each session
create table if not exists public.chat_messages (
    id uuid primary key default gen_random_uuid(),
    session_id uuid not null references public.chat_sessions(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    sender_type text not null, -- 'user' or 'admin'
    content text not null
);
comment on table public.chat_messages is 'Stores messages for each chat session.';

-- Enable RLS for the new tables
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- Allow public access for now. This makes it easy for any visitor to start a chat.
create policy "Allow public access to chat_sessions" on public.chat_sessions for all using (true) with check (true);
create policy "Allow public access to chat_messages" on public.chat_messages for all using (true) with check (true);

-- Ensure realtime is enabled for the new tables
begin;
  -- remove the supabase_realtime publication if it exists
  drop publication if exists supabase_realtime;

  -- re-create the supabase_realtime publication for all tables
  create publication supabase_realtime for all tables;
commit;
