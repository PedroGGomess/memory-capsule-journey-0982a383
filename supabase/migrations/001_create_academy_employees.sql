-- Academy Employees Table
CREATE TABLE IF NOT EXISTS academy_employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'store-employee',
  access_code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  progress JSONB DEFAULT '{}',
  quiz_scores JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE academy_employees ENABLE ROW LEVEL SECURITY;

-- Allow read/write for authenticated and anonymous users (since we use access codes, not Supabase Auth)
CREATE POLICY "Allow all operations for academy" ON academy_employees
  FOR ALL USING (true) WITH CHECK (true);

-- Index on access_code for fast lookups
CREATE INDEX idx_academy_employees_code ON academy_employees(access_code);
