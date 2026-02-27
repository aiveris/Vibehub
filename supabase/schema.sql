-- Run this in the Supabase Dashboard -> SQL editor

create table if not exists public.prompts (
  id bigint generated always as identity primary key,
  vardas text not null,
  prompto_tekstas text not null,
  created_at timestamptz not null default now()
);

create index if not exists prompts_created_at_idx on public.prompts (created_at desc);

alter table public.prompts enable row level security;

-- Very simple policies for development / demo:
-- allow anyone (anon) to read and insert.
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'prompts' and policyname = 'anon_read_prompts'
  ) then
    create policy anon_read_prompts
      on public.prompts
      for select
      to anon
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'prompts' and policyname = 'anon_insert_prompts'
  ) then
    create policy anon_insert_prompts
      on public.prompts
      for insert
      to anon
      with check (true);
  end if;
end $$;
