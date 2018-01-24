// Source: https://github.com/jdanyow/aurelia-computed

import { Expression, ObjectObservationAdapter, ObserverLocator, Parser } from "aurelia-binding";
import { FrameworkConfiguration } from "aurelia-framework";
import * as Log from "aurelia-logging";
import { Analyzer } from "./analyzer";
import { GetterObserver } from "./getter-observer";

const logger = Log.getLogger("aurelia-computed");
const enableLogging = true;
const writeLog = (propertyName: string, reason: string): void => {
  logger.debug(`Unable to observe "${propertyName}".  ${reason}`);
};
const parsed: {
  [src: string]: { canObserve: boolean; nativeCode?: boolean; reason: string; expression?: Expression };
} = {};

function getFunctionBody(src: string): string {
  function removeCommentsFromSource(str: string): string {
    return str.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, "$1");
  }
  const s = removeCommentsFromSource(src);

  return s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
}

/**
 * ObjectObservationAdapter implementation that provides a GetterObserver for property getters
 */
export class ComputedObservationAdapter implements ObjectObservationAdapter {
  // tslint:disable-next-line:typedef
  public static inject = [ObserverLocator, Parser];

  public observerLocator: ObserverLocator;
  public parser: Parser;

  constructor(observerLocator: ObserverLocator, parser: Parser) {
    this.observerLocator = observerLocator;
    this.parser = parser;
  }

  public getObserver(
    object: { [name: string]: any },
    propertyName: string,
    descriptor: PropertyDescriptor
  ): GetterObserver {
    const src = descriptor.get.toString();
    let info = parsed[src];

    if (info === undefined) {
      let expression: Expression;
      if (/\[native code\]/.test(src)) {
        info = {
          canObserve: false,
          nativeCode: true,
          reason: `Getter function contains native code.\n${src}`
        };
      } else {
        try {
          let body = getFunctionBody(src).trim();
          body = body.replace(/^[""]use strict[""];/, "").trim();
          body = body.substr("return".length).trim();
          body = body.replace(/;$/, "");
          expression = this.parser.parse(body);
        } catch (ex) {
          info = {
            canObserve: false,
            reason: `Unable to parse "${propertyName}" property's getter function.\n${src}`
          };
        }
      }
      info = parsed[src] = info === undefined ? Analyzer.ANALYZE(expression) : info;
    }

    if (enableLogging && !info.canObserve && !info.nativeCode) {
      writeLog(propertyName, info.reason);
    }

    if (info.canObserve) {
      return new GetterObserver(object, propertyName, descriptor, info.expression, this.observerLocator);
    }

    return null;
  }
}

export function configure(fxconfig: FrameworkConfiguration): void {
  const container = fxconfig.container;
  const observerLocator = container.get(ObserverLocator) as ObserverLocator;
  const adapter = container.get(ComputedObservationAdapter) as ComputedObservationAdapter;
  observerLocator.addAdapter(adapter);
}
