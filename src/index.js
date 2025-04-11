const express = require('express');
const next = require('next');
const client = require('prom-client'); // Import Prometheus client

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Create a registry for Prometheus metrics
  const register = new client.Registry();

  // Define a counter metric for HTTP requests
  const httpRequestCount = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'status'],
  });

  // Register the counter metric
  register.registerMetric(httpRequestCount);

  // Define a histogram metric for HTTP request durations
  const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Histogram of HTTP request durations',
    labelNames: ['method', 'status'],
    buckets: [0.1, 0.2, 0.5, 1, 2, 5, 10], // Define latency buckets
  });

  // Register the histogram metric
  register.registerMetric(httpRequestDuration);

  // Middleware to track request count and duration
  server.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      // Increment the HTTP request counter
      httpRequestCount.inc({ method: req.method, status: res.statusCode });

      // Record the request duration
      const duration = (Date.now() - start) / 1000; // Duration in seconds
      httpRequestDuration.observe({ method: req.method, status: res.statusCode }, duration);
    });
    next();
  });

  // Expose the /metrics endpoint for Prometheus scraping
  server.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  // Default Next.js request handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

