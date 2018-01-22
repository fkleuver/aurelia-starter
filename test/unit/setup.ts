import "aurelia-polyfills";
import { PLATFORM } from "aurelia-pal";
import { Logger, addAppender, logLevel, getLogger } from "aurelia-logging";
import { ConsoleAppender } from "aurelia-logging-console";
import { initialize } from "aurelia-pal-browser";

initialize();

console.log(PLATFORM.global.Promise.version);

addAppender({
  debug(logger: Logger, ...rest: any[]): void {
    console.log(`--------------- DEBUG [${logger.id}] ---------------\n----------------------------`, ...rest);
  },
  info(logger: Logger, ...rest: any[]): void {
    console.log(`--------------- INFO [${logger.id}] ---------------\n----------------------------`, ...rest);
  },
  warn(logger: Logger, ...rest: any[]): void {
    console.log(`--------------- WARN [${logger.id}] ---------------\n----------------------------`, ...rest);
  },
  error(logger: Logger, ...rest: any[]): void {
    console.log(`--------------- ERROR [${logger.id}] ---------------\n----------------------------`, ...rest);
  }
});

PLATFORM.global.getLogger = (id: string) => {
  const logger = getLogger(id);
  logger.level = logLevel.debug;
  return logger;
};

//https://gist.github.com/paulirish/1579671
(function() {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !PLATFORM.global.requestAnimationFrame; ++x) {
    PLATFORM.global.requestAnimationFrame = PLATFORM.global[vendors[x] + "RequestAnimationFrame"];
    PLATFORM.global.cancelAnimationFrame =
      PLATFORM.global[vendors[x] + "CancelAnimationFrame"] ||
      PLATFORM.global[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!PLATFORM.global.requestAnimationFrame)
    PLATFORM.global.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = PLATFORM.global.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!PLATFORM.global.cancelAnimationFrame)
    PLATFORM.global.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();
