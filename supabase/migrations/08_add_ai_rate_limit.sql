-- Add daily rate limit columns to ai_chat_sessions
ALTER TABLE public.ai_chat_sessions 
ADD COLUMN IF NOT EXISTS daily_message_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_message_date DATE DEFAULT CURRENT_DATE;
