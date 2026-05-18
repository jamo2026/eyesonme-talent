import { createBrowserClient } from '@supabase/ssr'

// createBrowserClient stores the session in cookies so the server-side
// middleware (proxy.ts) can read it via createServerClient.
// Do NOT switch back to createClient — that uses localStorage which the
// middleware cannot access, causing an infinite login redirect loop.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Profile = {
  id: string
  email: string
  full_name: string | null
  role: 'seeker' | 'company'
  sector: 'it' | 'hw'
  city: string | null
  categories: string[]
  video_pitch_url: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export type Job = {
  id: string
  company_id: string
  title: string
  sector: 'it' | 'hw'
  category: string
  city: string
  salary_min: number | null
  salary_max: number | null
  remote: boolean
  description: string | null
  tags: string[]
  is_active: boolean
  created_at: string
}

export type Match = {
  id: string
  job_id: string
  seeker_id: string
  score: number
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
}

export type Message = {
  id: string
  match_id: string
  sender_id: string
  content: string
  read: boolean
  created_at: string
}
