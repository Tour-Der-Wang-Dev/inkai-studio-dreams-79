
export interface ArtistProfile {
  id: string
  user_id: string
  bio?: string
  specializations: string[]
  hourly_rate?: number
  is_verified: boolean
  portfolio_images: string[]
  social_links: {
    instagram?: string
    twitter?: string
    website?: string
    facebook?: string
  }
  availability_settings: {
    timezone?: string
    working_hours?: {
      start: string
      end: string
    }
    working_days?: number[]
  }
  created_at: string
  updated_at: string
}

export interface ArtistPortfolioItem {
  id: string
  artist_id: string
  title: string
  description?: string
  image_url: string
  before_image_url?: string
  style: string
  body_part: string
  collaboration_type: 'ai' | 'traditional' | 'hybrid'
  process_steps: ProcessStep[]
  metadata: {
    tags?: string[]
    difficulty?: number
    time_taken?: string
    tools_used?: string[]
  }
  is_featured: boolean
  display_order: number
  created_at: string
}

export interface ProcessStep {
  id: string
  title: string
  description: string
  image_url?: string
  step_order: number
}

export interface ArtistSkill {
  id: string
  artist_id: string
  skill_name: string
  proficiency_level: number // 0-100
  certification_url?: string
  years_experience?: number
  created_at: string
}

export interface ArtistReview {
  id: string
  artist_id: string
  client_id: string
  rating: number // 1-5
  review_text?: string
  review_images: string[]
  design_id?: string
  is_verified: boolean
  created_at: string
  client?: {
    full_name?: string
    avatar_url?: string
  }
}

export interface BookingSlot {
  id: string
  artist_id: string
  start_time: string
  end_time: string
  is_available: boolean
  session_type: 'consultation' | 'design' | 'tattoo'
  price?: number
  notes?: string
  created_at: string
}

export interface BookingRequest {
  id: string
  client_id: string
  artist_id: string
  booking_slot_id?: string
  preferred_dates: string[]
  session_type: string
  design_id?: string
  special_requests?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  total_price?: number
  created_at: string
  updated_at: string
  client?: {
    full_name?: string
    avatar_url?: string
  }
  artist?: ArtistProfile
}

export interface ChatRoom {
  id: string
  artist_id: string
  client_id: string
  booking_request_id?: string
  is_active: boolean
  created_at: string
  artist?: ArtistProfile
  client?: {
    full_name?: string
    avatar_url?: string
  }
}

export interface ChatMessage {
  id: string
  chat_room_id: string
  sender_id: string
  message_text?: string
  message_type: 'text' | 'image' | 'file'
  file_url?: string
  thread_id?: string
  created_at: string
  sender?: {
    full_name?: string
    avatar_url?: string
  }
}
