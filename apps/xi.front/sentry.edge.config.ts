// This file configures the initialization of Sentry
// for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel
// Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { ErrorEvent, EventHint } from '@sentry/types';

Sentry.init({
  dsn: 'https://edb42ea7b7ae92c6eff30556091b5e67@o4506927748153344.ingest.us.sentry.io/4507799365222400',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information
  // to the console while you're setting up Sentry.
  debug: false,
  beforeSend(event: ErrorEvent, hint: EventHint) {
    const ignoreHosts = ['localhost', 'vercel.app'];

    if (
      ignoreHosts.some(
        (host) => event && event.request && event.request.url && event.request?.url.includes(host),
      )
    ) {
      return null;
    }

    const error = hint.originalException;

    // Игнорируем ошибки, которые возникают при redirect в NextJS
    if (error instanceof Error && error.message && error.message.includes('NEXT_REDIRECT')) {
      return null;
    }

    return event;
  },
});
