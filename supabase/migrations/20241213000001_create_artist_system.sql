
-- Create artist_profiles table for extended artist information
CREATE TABLE public.artist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  specializations TEXT[],
  hourly_rate DECIMAL(10,2),
  is_verified BOOLEAN DEFAULT false,
  portfolio_images TEXT[],
  social_links JSONB DEFAULT '{}',
  availability_settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create artist_portfolios table for portfolio items
CREATE TABLE public.artist_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  before_image_url VARCHAR(500),
  style VARCHAR(100),
  body_part VARCHAR(100),
  collaboration_type VARCHAR(50), -- 'ai', 'traditional', 'hybrid'
  process_steps JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create artist_skills table for skills and certifications
CREATE TABLE public.artist_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  proficiency_level INTEGER CHECK (proficiency_level >= 0 AND proficiency_level <= 100),
  certification_url VARCHAR(500),
  years_experience INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create artist_reviews table for client reviews
CREATE TABLE public.artist_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_images TEXT[],
  design_id UUID, -- Reference to the design if applicable
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create booking_slots table for available time slots
CREATE TABLE public.booking_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_available BOOLEAN DEFAULT true,
  session_type VARCHAR(50) CHECK (session_type IN ('consultation', 'design', 'tattoo')),
  price DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create booking_requests table for client booking requests
CREATE TABLE public.booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  booking_slot_id UUID REFERENCES public.booking_slots(id) ON DELETE SET NULL,
  preferred_dates TIMESTAMPTZ[],
  session_type VARCHAR(50) NOT NULL,
  design_id UUID, -- Reference to design if applicable
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create artist_chat_rooms table for real-time chat
CREATE TABLE public.artist_chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_request_id UUID REFERENCES public.booking_requests(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create artist_chat_messages table for chat messages
CREATE TABLE public.artist_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id UUID REFERENCES public.artist_chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message_text TEXT,
  message_type VARCHAR(50) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  file_url VARCHAR(500),
  thread_id UUID REFERENCES public.artist_chat_messages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for artist_profiles
CREATE POLICY "select_artist_profiles" ON public.artist_profiles FOR SELECT USING (true);
CREATE POLICY "insert_own_artist_profile" ON public.artist_profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "update_own_artist_profile" ON public.artist_profiles FOR UPDATE USING (user_id = auth.uid());

-- Create RLS policies for artist_portfolios
CREATE POLICY "select_artist_portfolios" ON public.artist_portfolios FOR SELECT USING (true);
CREATE POLICY "insert_own_portfolio" ON public.artist_portfolios FOR INSERT WITH CHECK (
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "update_own_portfolio" ON public.artist_portfolios FOR UPDATE USING (
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);

-- Create RLS policies for artist_skills
CREATE POLICY "select_artist_skills" ON public.artist_skills FOR SELECT USING (true);
CREATE POLICY "manage_own_skills" ON public.artist_skills FOR ALL USING (
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);

-- Create RLS policies for artist_reviews
CREATE POLICY "select_artist_reviews" ON public.artist_reviews FOR SELECT USING (true);
CREATE POLICY "insert_own_review" ON public.artist_reviews FOR INSERT WITH CHECK (client_id = auth.uid());

-- Create RLS policies for booking_slots
CREATE POLICY "select_booking_slots" ON public.booking_slots FOR SELECT USING (true);
CREATE POLICY "manage_own_booking_slots" ON public.booking_slots FOR ALL USING (
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);

-- Create RLS policies for booking_requests
CREATE POLICY "select_relevant_booking_requests" ON public.booking_requests FOR SELECT USING (
  client_id = auth.uid() OR 
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "insert_own_booking_request" ON public.booking_requests FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "update_relevant_booking_requests" ON public.booking_requests FOR UPDATE USING (
  client_id = auth.uid() OR 
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);

-- Create RLS policies for chat rooms and messages
CREATE POLICY "select_own_chat_rooms" ON public.artist_chat_rooms FOR SELECT USING (
  client_id = auth.uid() OR 
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "insert_chat_room" ON public.artist_chat_rooms FOR INSERT WITH CHECK (
  client_id = auth.uid() OR 
  artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "select_chat_messages" ON public.artist_chat_messages FOR SELECT USING (
  chat_room_id IN (
    SELECT id FROM public.artist_chat_rooms WHERE 
    client_id = auth.uid() OR 
    artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
  )
);
CREATE POLICY "insert_chat_message" ON public.artist_chat_messages FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND
  chat_room_id IN (
    SELECT id FROM public.artist_chat_rooms WHERE 
    client_id = auth.uid() OR 
    artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid())
  )
);

-- Create indexes for better performance
CREATE INDEX idx_artist_profiles_user_id ON public.artist_profiles(user_id);
CREATE INDEX idx_artist_portfolios_artist_id ON public.artist_portfolios(artist_id);
CREATE INDEX idx_artist_skills_artist_id ON public.artist_skills(artist_id);
CREATE INDEX idx_artist_reviews_artist_id ON public.artist_reviews(artist_id);
CREATE INDEX idx_booking_slots_artist_id ON public.booking_slots(artist_id);
CREATE INDEX idx_booking_requests_artist_id ON public.booking_requests(artist_id);
CREATE INDEX idx_booking_requests_client_id ON public.booking_requests(client_id);
CREATE INDEX idx_chat_rooms_artist_client ON public.artist_chat_rooms(artist_id, client_id);
CREATE INDEX idx_chat_messages_room_id ON public.artist_chat_messages(chat_room_id);
