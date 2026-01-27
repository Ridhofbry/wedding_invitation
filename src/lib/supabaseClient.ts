import { createClient } from '@supabase/supabase-js';

// Pastikan kamu sudah bikin file .env.local yang isinya:
// NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxh...

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
