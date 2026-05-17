import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      jobs: {
        Row: Job
        Insert: Omit<Job, 'id' | 'created_at'>
        Update: Partial<Omit<Job, 'id' | 'created_at'>>
      }
      matches: {
        Row: Match
        Insert: Omit<Match, 'id' | 'created_at'>
        Update: Partial<Omit<Match, 'id' | 'created_at'>>
      }
      messages: {
        Row: Message
        Insert: Omit<Message, 'id' | 'created_at'>
        Update: Partial<Omit<Message, 'id' | 'created_at'>>
      }
    }
  }
}

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
