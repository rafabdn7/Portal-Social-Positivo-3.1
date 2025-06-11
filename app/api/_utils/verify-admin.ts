import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function verifyAdmin(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return false
    const { data, error: err2 } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
    if (err2 || !data) return false
    return data.role === "admin"
  } catch {
    return false
  }
}
