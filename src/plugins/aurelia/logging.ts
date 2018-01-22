import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import env from "../../environment";
import { Logger } from "aurelia-logging";

export function configure(fxconfig: FrameworkConfiguration): void {
  if (env.debug || env.testing) {
    fxconfig.developmentLogging();
  }
  const logError = err => {
    const globalLogger = PLATFORM.global.getLogger("global") as Logger;
    globalLogger.error("An unhandled global exception has occurred.", err);
  };

  PLATFORM.global.onerror = (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
    const err = error || message;
    logError(err);
  };

  PLATFORM.global.addEventListener("unhandledrejection", (reason: any) => {
    logError(reason);
  });
}
