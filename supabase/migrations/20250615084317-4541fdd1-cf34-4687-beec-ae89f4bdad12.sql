
-- Create a public bucket for bills if it doesn't exist
insert into storage.buckets
  (id, name, public)
values
  ('bills', 'bills', true)
on conflict (id) do nothing;

-- Set up RLS policies for the 'bills' bucket
-- Allow public read access to all files in the 'bills' bucket
drop policy if exists "bills_public_read" on storage.objects;
create policy "bills_public_read"
on storage.objects for select
using ( bucket_id = 'bills' );

-- Allow ANYONE (not just authenticated users) to upload files to the 'bills' bucket
drop policy if exists "bills_public_upload" on storage.objects;
create policy "bills_public_upload"
on storage.objects for insert
with check ( bucket_id = 'bills' );
