CREATE POLICY "Allow anonymous delete on employee_questions"
ON public.employee_questions
FOR DELETE
TO anon, authenticated
USING (true);