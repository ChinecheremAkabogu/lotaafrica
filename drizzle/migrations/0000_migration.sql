CREATE TABLE public.project_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  country text CHECK (country IS NULL OR char_length(country) <= 80),
  category text NOT NULL CHECK (char_length(category) <= 80),
  location text NOT NULL CHECK (char_length(location) BETWEEN 1 AND 200),
  description text CHECK (description IS NULL OR char_length(description) <= 3000),
  budget text CHECK (budget IS NULL OR char_length(budget) <= 80),
  timeline text CHECK (timeline IS NULL OR char_length(timeline) <= 80),
  consent boolean NOT NULL DEFAULT false,
  email_notified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.project_submissions TO anon, authenticated;
GRANT ALL ON public.project_submissions TO service_role;

ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a project"
  ON public.project_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true AND email_notified = false);