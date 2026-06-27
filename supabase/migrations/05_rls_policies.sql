-- Enable RLS for transactions and budgets (if not already enabled)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

-- Allow all operations for transactions
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'transactions' AND policyname = 'Allow full access on transactions'
  ) THEN
    CREATE POLICY "Allow full access on transactions" ON public.transactions
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Allow all operations for budgets
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'budgets' AND policyname = 'Allow full access on budgets'
  ) THEN
    CREATE POLICY "Allow full access on budgets" ON public.budgets
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
