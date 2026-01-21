import { projectId, publicAnonKey } from './supabase/info';

// Generate a unique visitor ID (stored in localStorage)
function getOrCreateVisitorId(): string {
  try {
    const key = 'portfolio_visitor_id';
    let visitorId = localStorage.getItem(key);
    
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(key, visitorId);
    }
    
    return visitorId;
  } catch (error) {
    // Fallback if localStorage is not available
    return `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Generate a session ID (stored in sessionStorage)
function getOrCreateSessionId(): string {
  try {
    const key = 'portfolio_session_id';
    let sessionId = sessionStorage.getItem(key);
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem(key, sessionId);
    }
    
    return sessionId;
  } catch (error) {
    // Fallback if sessionStorage is not available
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Track a page view
export async function trackPageView(path: string): Promise<void> {
  // Don't track if we're on the analytics page itself
  if (path.includes('analytics')) {
    return;
  }

  try {
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    
    const pageView = {
      timestamp: new Date().toISOString(),
      path,
      visitorId,
      sessionId,
      referrer: document.referrer || undefined,
    };

    // Use setTimeout to make this truly non-blocking
    setTimeout(async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-e15e8aea/analytics/track`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(pageView),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          // Silently fail - don't log to avoid console noise
        }
      } catch (error) {
        // Silently fail - analytics should never break the user experience
      }
    }, 100); // Small delay to not block initial render
  } catch (error) {
    // Silently fail - don't disrupt user experience
  }
}

// Fetch analytics stats (requires password)
export async function getAnalyticsStats(password: string): Promise<any> {
  console.log('Fetching analytics stats...');
  console.log('Using projectId:', projectId);
  console.log('Using publicAnonKey:', publicAnonKey ? 'Present' : 'Missing');
  console.log('Using password:', password);
  
  const url = `https://${projectId}.supabase.co/functions/v1/make-server-e15e8aea/analytics/stats`;
  console.log('Fetching from URL:', url);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'X-Analytics-Password': password,
    },
  });

  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Analytics error response:', errorText);
    throw new Error(`Failed to fetch analytics: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Analytics data successfully fetched');
  return data;
}