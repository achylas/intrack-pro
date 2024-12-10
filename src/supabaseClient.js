
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pcwvcvvxqjiuacqwwroq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjd3ZjdnZ4cWppdWFjcXd3cm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MzQ5MzcsImV4cCI6MjA0OTMxMDkzN30.r50uhfRfE0SDMCGwZ_OI7RCfx6j8BnNZ16w9yjPdUPo'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)