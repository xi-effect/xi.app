// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
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
  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

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
