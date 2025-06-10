
-- Create analytics table to track website visits and user interactions
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT, -- For returning visitors (stored in localStorage)
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT, -- mobile, tablet, desktop
  browser TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  duration_seconds INTEGER, -- time spent on page
  consent_given BOOLEAN DEFAULT false
);

-- Create index for better performance on common queries
CREATE INDEX idx_analytics_visited_at ON public.analytics(visited_at);
CREATE INDEX idx_analytics_page_path ON public.analytics(page_path);
CREATE INDEX idx_analytics_session_id ON public.analytics(session_id);

-- Create analytics summary table for dashboard stats
CREATE TABLE public.analytics_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  top_pages JSONB DEFAULT '[]'::jsonb,
  top_referrers JSONB DEFAULT '[]'::jsonb,
  device_breakdown JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date)
);

-- Enable Row Level Security
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_summary ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics (public read access for aggregated data)
CREATE POLICY "Allow public analytics insert" 
  ON public.analytics 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public analytics read" 
  ON public.analytics 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public analytics summary read" 
  ON public.analytics_summary 
  FOR SELECT 
  USING (true);

-- Function to update analytics summary daily
CREATE OR REPLACE FUNCTION update_analytics_summary()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.analytics_summary (
    date,
    total_visits,
    unique_visitors,
    page_views,
    top_pages,
    top_referrers,
    device_breakdown
  )
  SELECT 
    CURRENT_DATE,
    COUNT(*) as total_visits,
    COUNT(DISTINCT visitor_id) as unique_visitors,
    COUNT(*) as page_views,
    jsonb_agg(
      jsonb_build_object('page', page_path, 'views', page_count)
      ORDER BY page_count DESC
    ) FILTER (WHERE rn <= 10) as top_pages,
    jsonb_agg(
      jsonb_build_object('referrer', referrer, 'visits', ref_count)
      ORDER BY ref_count DESC
    ) FILTER (WHERE ref_rn <= 10) as top_referrers,
    jsonb_build_object(
      'mobile', COUNT(*) FILTER (WHERE device_type = 'mobile'),
      'tablet', COUNT(*) FILTER (WHERE device_type = 'tablet'),
      'desktop', COUNT(*) FILTER (WHERE device_type = 'desktop')
    ) as device_breakdown
  FROM (
    SELECT 
      *,
      ROW_NUMBER() OVER (PARTITION BY page_path ORDER BY COUNT(*) DESC) as rn,
      COUNT(*) OVER (PARTITION BY page_path) as page_count,
      ROW_NUMBER() OVER (PARTITION BY referrer ORDER BY COUNT(*) DESC) as ref_rn,
      COUNT(*) OVER (PARTITION BY referrer) as ref_count
    FROM public.analytics 
    WHERE DATE(visited_at) = CURRENT_DATE
      AND consent_given = true
    GROUP BY session_id, page_path, referrer, device_type, visitor_id
  ) daily_stats
  ON CONFLICT (date) 
  DO UPDATE SET
    total_visits = EXCLUDED.total_visits,
    unique_visitors = EXCLUDED.unique_visitors,
    page_views = EXCLUDED.page_views,
    top_pages = EXCLUDED.top_pages,
    top_referrers = EXCLUDED.top_referrers,
    device_breakdown = EXCLUDED.device_breakdown,
    updated_at = now();
END;
$$;
