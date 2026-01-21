import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as analytics from "./analytics.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Analytics-Password"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e15e8aea/health", (c) => {
  return c.json({ status: "ok" });
});

// Analytics tracking endpoint
app.post("/make-server-e15e8aea/analytics/track", async (c) => {
  try {
    const pageView = await c.req.json<analytics.PageView>();
    await analytics.trackPageView(pageView);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error in analytics track endpoint:', error);
    return c.json({ error: 'Failed to track page view' }, 500);
  }
});

// Analytics stats endpoint (password protected)
app.get("/make-server-e15e8aea/analytics/stats", async (c) => {
  try {
    const password = c.req.header('X-Analytics-Password');
    const expectedPassword = Deno.env.get('ANALYTICS_PASSWORD') || 'admin123';
    
    console.log('Analytics auth check:');
    console.log('- Received password:', password);
    console.log('- Expected password:', expectedPassword);
    console.log('- Match:', password === expectedPassword);
    
    if (password !== expectedPassword) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const stats = await analytics.getAnalyticsStats();
    return c.json(stats);
  } catch (error) {
    console.error('Error in analytics stats endpoint:', error);
    return c.json({ error: 'Failed to get analytics stats' }, 500);
  }
});

Deno.serve(app.fetch);