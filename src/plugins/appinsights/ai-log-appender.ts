import { Logger, Appender } from "aurelia-logging";
import { singleton } from "aurelia-dependency-injection";

@singleton(false)
export class AiLogAppender implements Appender {
	debug(logger: Logger, message: string) {
		appInsights.trackTrace(`DEBUG [${logger.id}] ${message}`);
	}

	info(logger: Logger, message: string) {
		appInsights.trackTrace(`INFO [${logger.id}] ${message}`);
	}

	warn(logger: Logger, message: string) {
		appInsights.trackTrace(`WARN [${logger.id}] ${message}`);
	}

	error(logger: Logger, message: string) {
		appInsights.trackException(new Error(`ERROR [${logger.id}] ${message}`), undefined);
	}
}
