import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

function init() {
	Sentry.init({
		dsn              : 'https://80d836676907418d9afd5d507d5dd728@o1054113.ingest.sentry.io/6039258',
		integrations     : [ new Integrations.BrowserTracing() ],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate : 1.0
	});
}

function log(error) {
	Sentry.captureException(error);
}

export default {
	init,
	log
};
