-- Update or create admin user for Pedro Gomes
-- The system uses plain text password comparison (not bcrypt)
-- First delete any existing admin users with this email
DELETE FROM admin_users WHERE email = 'pgomes@the-100s.com';

-- Insert admin user with plain text password (as per AuthContext.tsx line 58)
-- The system stores and compares passwords as plain text
INSERT INTO admin_users (email, name, password_hash, is_active, must_change_password)
VALUES (
  'pgomes@the-100s.com',
  'Pedro Gomes',
  'The100s2025@',
  true,
  false
);
