const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces', // Replace with your SigNoz server IP
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start()
    .then(() => console.log('OpenTelemetry SDK started'))
    .catch((err) => console.error('Error starting OpenTelemetry SDK', err));

