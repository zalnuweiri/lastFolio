import React, { useState, useEffect } from 'react';
import { getAnalyticsStats } from '../utils/analytics';
import { BarChart3, Users, Eye, Activity, Lock } from 'lucide-react';

interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  recentPageViews: Array<{
    timestamp: string;
    path: string;
    visitorId: string;
    sessionId: string;
    referrer?: string;
  }>;
  pageViewsByPath: Record<string, number>;
  sessionsToday: number;
}

export function AnalyticsDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Attempting to fetch analytics with password...');
      const data = await getAnalyticsStats(password);
      console.log('Analytics data received:', data);
      setStats(data);
      setIsAuthenticated(true);
      // Store password in sessionStorage for this session
      sessionStorage.setItem('analytics_password', password);
    } catch (err) {
      console.error('Analytics login error:', err);
      setError('Invalid password or failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  // Check if already authenticated in this session
  useEffect(() => {
    const storedPassword = sessionStorage.getItem('analytics_password');
    if (storedPassword) {
      setPassword(storedPassword);
      getAnalyticsStats(storedPassword)
        .then((data) => {
          setStats(data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          // Silently fail - password might be invalid or server might be down
          sessionStorage.removeItem('analytics_password');
        });
    }
  }, []);

  // Refresh stats every 30 seconds when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      const storedPassword = sessionStorage.getItem('analytics_password');
      if (storedPassword) {
        try {
          const data = await getAnalyticsStats(storedPassword);
          setStats(data);
        } catch (err) {
          console.error('Failed to refresh stats:', err);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-[#111111] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-center mb-6 text-sm">
            Enter your password to view analytics
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>
          <p className="text-gray-500 text-xs text-center mt-4">
            Default password: admin123
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  // Sort pages by view count
  const sortedPages = Object.entries(stats.pageViewsByPath).sort(
    ([, a], [, b]) => b - a
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400">Portfolio visitor insights</p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setStats(null);
              sessionStorage.removeItem('analytics_password');
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Visits */}
          <div className="bg-[#111111] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Total Visits</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalVisits}</p>
          </div>

          {/* Unique Visitors */}
          <div className="bg-[#111111] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Unique Visitors</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.uniqueVisitors}</p>
          </div>

          {/* Sessions Today */}
          <div className="bg-[#111111] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Sessions Today</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.sessionsToday}</p>
          </div>

          {/* Avg Pages/Visit */}
          <div className="bg-[#111111] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">Avg Pages/Visit</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {stats.uniqueVisitors > 0
                ? (stats.totalVisits / stats.uniqueVisitors).toFixed(1)
                : '0'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-[#111111] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Top Pages</h2>
            <div className="space-y-3">
              {sortedPages.length > 0 ? (
                sortedPages.map(([path, count]) => {
                  const percentage =
                    stats.totalVisits > 0
                      ? ((count / stats.totalVisits) * 100).toFixed(1)
                      : '0';
                  return (
                    <div key={path} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">
                          {path === '/' ? 'Home' : path}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm">No page views yet</p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#111111] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {stats.recentPageViews.length > 0 ? (
                stats.recentPageViews.slice(0, 20).map((pv, idx) => {
                  const date = new Date(pv.timestamp);
                  const timeStr = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  const dateStr = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <div
                      key={`${pv.timestamp}-${idx}`}
                      className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {pv.path === '/' ? 'Home' : pv.path}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {dateStr} at {timeStr}
                        </p>
                      </div>
                      {pv.referrer && (
                        <span className="text-xs text-gray-500 ml-2 truncate max-w-32">
                          from: {new URL(pv.referrer).hostname}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}