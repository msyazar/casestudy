const express = require('express');
const helmet = require('helmet');
const pino = require('pino')();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
   res.send('BestCloudForMe!');
});

app.get('/live', (req, res) => res.status(200).json({ status: 'ok' }));

// Prometheus client setup
const Prometheus = require('prom-client');
Prometheus.collectDefaultMetrics();

app.get('/metrics', async (req, res, next) => {
   try {
      res.set('Content-Type', Prometheus.register.contentType);
      const metrics = await Prometheus.register.metrics();
      res.end(metrics);
   } catch {
      res.end('');
   }
});

app.listen(PORT, () => {
   pino.info(`Server listening on port ${PORT}`);
});
