import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ¡Esta palabra 'export' es la más importante!
export const supabase = createClient(supabaseUrl, supabaseKey);