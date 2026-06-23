import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? `https://${projectId}.supabase.co`
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? publicAnonKey

export const supabase = createClient(supabaseUrl, supabaseKey)
