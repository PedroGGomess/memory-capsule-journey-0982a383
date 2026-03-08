
CREATE POLICY "Allow anonymous delete on admin_users"
ON public.admin_users
FOR DELETE
TO anon, authenticated
USING (true);
