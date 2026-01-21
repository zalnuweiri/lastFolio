import * as kv from './kv_store.tsx';

export interface PageView {
  timestamp: string;
  path: string;
  visitorId: string;
  sessionId: string;
  referrer?: string;
}

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  recentPageViews: PageView[];
  pageViewsByPath: Record<string, number>;
  sessionsToday: number;
}

// Track a page view
export async function trackPageView(pageView: PageView): Promise<void> {
  try {
    // Store the page view with timestamp as part of the key
    const pageViewKey = `analytics:pageview:${pageView.timestamp}:${pageView.sessionId}`;
    await kv.set(pageViewKey, pageView);

    // Increment total visits counter
    const totalVisitsKey = 'analytics:total-visits';
    const currentTotal = await kv.get<number>(totalVisitsKey);
    await kv.set(totalVisitsKey, (currentTotal || 0) + 1);

    // Track unique visitor
    const visitorKey = `analytics:visitor:${pageView.visitorId}`;
    const existingVisitor = await kv.get(visitorKey);
    if (!existingVisitor) {
      await kv.set(visitorKey, {
        firstSeen: pageView.timestamp,
        lastSeen: pageView.timestamp,
      });
    } else {
      await kv.set(visitorKey, {
        ...existingVisitor,
        lastSeen: pageView.timestamp,
      });
    }

    // Track session
    const sessionKey = `analytics:session:${pageView.sessionId}`;
    const existingSession = await kv.get<{ startTime: string; pageViews: number }>(sessionKey);
    if (!existingSession) {
      await kv.set(sessionKey, {
        startTime: pageView.timestamp,
        pageViews: 1,
        visitorId: pageView.visitorId,
      });
    } else {
      await kv.set(sessionKey, {
        ...existingSession,
        pageViews: (existingSession.pageViews || 0) + 1,
      });
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
    throw error;
  }
}

// Get analytics statistics
export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  try {
    // Get total visits
    const totalVisits = (await kv.get<number>('analytics:total-visits')) || 0;

    // Get unique visitors
    const visitors = await kv.getByPrefix<{ firstSeen: string; lastSeen: string }>('analytics:visitor:');
    const uniqueVisitors = visitors.length;

    // Get recent page views (last 100)
    const pageViews = await kv.getByPrefix<PageView>('analytics:pageview:');
    const sortedPageViews = pageViews
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 100);

    // Calculate page views by path
    const pageViewsByPath: Record<string, number> = {};
    pageViews.forEach((pv) => {
      const path = pv.path || '/';
      pageViewsByPath[path] = (pageViewsByPath[path] || 0) + 1;
    });

    // Get sessions from today
    const today = new Date().toISOString().split('T')[0];
    const allSessions = await kv.getByPrefix<{ startTime: string; pageViews: number }>('analytics:session:');
    const sessionsToday = allSessions.filter((session) => {
      return session.startTime.startsWith(today);
    }).length;

    return {
      totalVisits,
      uniqueVisitors,
      recentPageViews: sortedPageViews,
      pageViewsByPath,
      sessionsToday,
    };
  } catch (error) {
    console.error('Error getting analytics stats:', error);
    throw error;
  }
}
