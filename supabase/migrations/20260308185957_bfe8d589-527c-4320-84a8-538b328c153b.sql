
CREATE TABLE public.employee_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_name TEXT NOT NULL,
  question TEXT NOT NULL,
  module TEXT,
  category TEXT DEFAULT 'other',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved BOOLEAN NOT NULL DEFAULT false,
  reply TEXT
);

ALTER TABLE public.employee_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON public.employee_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON public.employee_questions FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update" ON public.employee_questions FOR UPDATE USING (true);
