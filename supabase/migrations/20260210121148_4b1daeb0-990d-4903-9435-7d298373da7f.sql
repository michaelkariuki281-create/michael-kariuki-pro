
-- Explicitly deny UPDATE and DELETE on contact_messages
CREATE POLICY "No updates allowed" ON public.contact_messages FOR UPDATE USING (false);
CREATE POLICY "No deletes allowed" ON public.contact_messages FOR DELETE USING (false);
