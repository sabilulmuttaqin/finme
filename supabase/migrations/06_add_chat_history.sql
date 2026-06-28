-- Add history column to ai_chat_sessions for multi-turn conversations
ALTER TABLE public.ai_chat_sessions 
ADD COLUMN IF NOT EXISTS history JSONB DEFAULT '[]'::jsonb;
