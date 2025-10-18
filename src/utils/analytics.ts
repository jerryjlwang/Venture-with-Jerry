
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  page_path: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  device_type?: string;
  browser?: string;
  duration_seconds?: number;
}

class Analytics {
  private sessionId: string;
  private visitorId: string | null;
  private startTime: number;
  private consentGiven: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.visitorId = this.getOrCreateVisitorId();
    this.startTime = Date.now();
    this.consentGiven = this.checkConsent();
    
    // Listen for consent changes
    window.addEventListener('analytics-consent-granted', () => {
      this.consentGiven = true;
      this.trackPageView(); // Track current page once consent is given
    });

    // Track page duration on beforeunload
    window.addEventListener('beforeunload', () => {
      if (this.consentGiven) {
        this.trackPageDuration();
      }
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getOrCreateVisitorId(): string | null {
    let visitorId = localStorage.getItem('visitor-id');
    if (!visitorId && this.checkConsent()) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor-id', visitorId);
    }
    return visitorId;
  }

  private checkConsent(): boolean {
    return localStorage.getItem('cookie-consent') === 'accepted';
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getBrowser(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  private async generateSignature(data: string): Promise<string> {
    const secret = 'default-analytics-secret-change-in-production';
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(data)
    );
    
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async trackPageView(customPath?: string) {
    if (!this.consentGiven) return;

    // Update visitor ID if consent was just granted
    if (!this.visitorId && this.consentGiven) {
      this.visitorId = this.getOrCreateVisitorId();
    }

    const data: AnalyticsData = {
      page_path: customPath || window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      device_type: this.getDeviceType(),
      browser: this.getBrowser(),
    };

    try {
      const payload = {
        session_id: this.sessionId,
        visitor_id: this.visitorId,
        consent_given: this.consentGiven,
        ...data
      };
      
      const bodyString = JSON.stringify(payload);
      const signature = await this.generateSignature(bodyString);
      
      const response = await fetch(`https://cgvgkucrmtugckcefryn.supabase.co/functions/v1/analytics-track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-analytics-signature': signature,
        },
        body: bodyString,
      });
      
      if (!response.ok) {
        console.error('Analytics tracking error:', await response.text());
      }
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }

    // Reset start time for duration tracking
    this.startTime = Date.now();
  }

  private async trackPageDuration() {
    if (!this.consentGiven) return;

    const duration = Math.round((Date.now() - this.startTime) / 1000);
    
    try {
      const payload = {
        session_id: this.sessionId,
        visitor_id: this.visitorId,
        consent_given: this.consentGiven,
        page_path: window.location.pathname,
        page_title: document.title,
        user_agent: navigator.userAgent,
        device_type: this.getDeviceType(),
        browser: this.getBrowser(),
        duration_seconds: duration
      };
      
      const bodyString = JSON.stringify(payload);
      const signature = await this.generateSignature(bodyString);
      
      await fetch(`https://cgvgkucrmtugckcefryn.supabase.co/functions/v1/analytics-track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-analytics-signature': signature,
        },
        body: bodyString,
      });
    } catch (error) {
      console.error('Duration tracking failed:', error);
    }
  }
}

// Create a singleton instance
const analytics = new Analytics();

export default analytics;
