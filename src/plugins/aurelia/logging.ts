import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import * as Log from "aurelia-logging"
import * as Types from "../../core/types";

export function configure(frameworkConfig: FrameworkConfiguration, configure: Function) {

    PLATFORM.global.getLogger = (id: string) => {
        const logger = Log.getLogger(id);
        logger.level = Log.logLevel.debug;
        return logger;
    }
    const globalLogger = PLATFORM.global.getLogger("global exception");
    const logError = err => {
        if (Types.isString(err)) {
            globalLogger.error(err);
        } else if (Types.isString(err.message)) {
            globalLogger.error(err.message, err);
        }
    };

    PLATFORM.global.onerror = (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
        const err = error || message;
        logError(err);
    };

    PLATFORM.global.addEventListener("unhandledrejection", (reason: any) => {
        if (reason instanceof CustomEvent || (Types.isObject(reason) && Types.isObject(reason.detail))) {
            if (Types.isObject(reason.detail)) {
                if (!Types.isUndefinedOrNull(reason.detail.reason)) {
                    logError(reason.detail.reason);
                } else if (!Types.isUndefinedOrNull(reason.detail.message)) {
                    logError(reason.detail);
                } else {
                    logError("An unknown unhandled exception has occurred, please make note of the last attempted action for further troubleshooting");
                }
            } else {
                logError("An unknown unhandled exception has occurred, please make note of the last attempted action for further troubleshooting");
            }
        } else {
            logError(reason);
        }
    });
}