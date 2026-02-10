
-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.contact_messages;
