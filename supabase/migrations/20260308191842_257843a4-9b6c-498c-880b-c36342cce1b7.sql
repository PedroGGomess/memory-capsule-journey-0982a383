
-- Admin users table for invite system
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  password_hash text NOT NULL,
  must_change_password boolean NOT NULL DEFAULT true,
  is_active boolean NOT NULL DEFAULT true,
  invited_by uuid REFERENCES public.admin_users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  last_login timestamp with time zone
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow reading admin_users for authenticated checks (anonymous access needed for login)
CREATE POLICY "Allow anonymous select on admin_users"
ON public.admin_users
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow insert (for inviting new admins)
CREATE POLICY "Allow anonymous insert on admin_users"
ON public.admin_users
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow update (for password changes, last_login)
CREATE POLICY "Allow anonymous update on admin_users"
ON public.admin_users
FOR UPDATE
TO anon, authenticated
USING (true);

-- Insert default admin
INSERT INTO public.admin_users (email, name, password_hash, must_change_password)
VALUES ('admin@the100s.com', 'Admin', 'admin123', false);
