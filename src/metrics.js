// src/metrics.js
const client = require('prom-client');

// Create a registry to store the metrics
const register = new client.Registry();

// Define a metric, e.g., HTTP request count
const httpRequestCount = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status'],
});

// Register the metric
register.registerMetric(httpRequestCount);

// Define a metric for HTTP request duration (e.g., in seconds)
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request durations',
  labelNames: ['method', 'status'],
  buckets: [0.1, 0.2, 0.5, 1, 2, 5, 10], // Define the buckets for latency
});

// Register the histogram metric
register.registerMetric(httpRequestDuration);

// Expose the metrics endpoint
const express = require('express');
const app = express();

// Expose the metrics on the /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Increment the HTTP request counter
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCount.inc({ method: req.method, status: res.statusCode });
    httpRequestDuration.observe({ method: req.method, status: res.statusCode }, res.getHeader('X-Response-Time') / 1000);
  });
  next();
});

// Start the server
app.listen(3001, () => {
  console.log('Metrics server running on http://localhost:3001/metrics');
});

