interface AnalyticsData {
  page_path: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  device_type?: string;
  browser?: string;
  duration_seconds?: number;
}

// Lazy-load the supabase client only when we actually need to send analytics.
// The vast majority of sessions have no consent and never trigger this import,
// which keeps ~100KB of supabase out of the critical bundle.
let clientPromise: Promise<typeof import('@/integrations/supabase/client')['supabase']> | null = null;

const getClient = () => {
  if (!clientPromise) {
    clientPromise = import('@/integrations/supabase/client').then((m) => m.supabase);
  }
  return clientPromise;
};

const hasConsent = () => {
  try {
    return localStorage.getItem('cookie-consent') === 'accepted';
  } catch {
    return false;
  }
};

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
};

class Analytics {
  private sessionId: string;
  private visitorId: string | null = null;
  private startTime: number;
  private consentGiven: boolean;

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    this.startTime = Date.now();
    this.consentGiven = hasConsent();
    this.visitorId = this.getOrCreateVisitorId();

    window.addEventListener('analytics-consent-granted', () => {
      this.consentGiven = true;
      if (!this.visitorId) this.visitorId = this.getOrCreateVisitorId();
      this.trackPageView();
    });

    window.addEventListener('beforeunload', () => {
      if (this.consentGiven) this.trackPageDuration();
    });
  }

  private getOrCreateVisitorId(): string | null {
    try {
      let id = localStorage.getItem('visitor-id');
      if (!id && this.consentGiven) {
        id = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        localStorage.setItem('visitor-id', id);
      }
      return id;
    } catch {
      return null;
    }
  }

  async trackPageView(customPath?: string) {
    if (!this.consentGiven) return;

    const data: AnalyticsData = {
      page_path: customPath || window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
      device_type: getDeviceType(),
      browser: getBrowser(),
    };

    try {
      const supabase = await getClient();
      const { error } = await supabase.functions.invoke('analytics-track', {
        body: {
          session_id: this.sessionId,
          visitor_id: this.visitorId,
          consent_given: this.consentGiven,
          ...data,
        },
      });
      if (error) console.error('Analytics tracking error:', error.message);
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }

    this.startTime = Date.now();
  }

  private async trackPageDuration() {
    if (!this.consentGiven) return;
    const duration = Math.round((Date.now() - this.startTime) / 1000);

    try {
      const supabase = await getClient();
      await supabase.functions.invoke('analytics-track', {
        body: {
          session_id: this.sessionId,
          visitor_id: this.visitorId,
          consent_given: this.consentGiven,
          page_path: window.location.pathname,
          page_title: document.title,
          user_agent: navigator.userAgent,
          device_type: getDeviceType(),
          browser: getBrowser(),
          duration_seconds: duration,
        },
      });
    } catch (error) {
      console.error('Duration tracking failed:', error);
    }
  }
}

const analytics = new Analytics();
export default analytics;
