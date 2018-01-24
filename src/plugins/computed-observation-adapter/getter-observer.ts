import {
  connectable,
  createOverrideContext,
  Expression,
  InternalPropertyObserver,
  ObserverLocator,
  subscriberCollection
} from "aurelia-binding";
import { getLogger, Logger } from "aurelia-logging";

const valueConverterLookupFunction = (): any => {
  return null;
};

/**
 * InternalPropertyObserver implementation that observes a property getter
 */
//tslint:disable:no-unsafe-any
@(connectable as any)()
@subscriberCollection()
//tslint:enable:no-unsafe-any
export class GetterObserver implements InternalPropertyObserver {
  public obj: { [name: string]: any };
  public scope: { bindingContext: any; overrideContext: any };
  public propertyName: string;
  public descriptor: PropertyDescriptor;
  public expression: Expression;
  public observerLocator: ObserverLocator;

  private addSubscriber: (context?: any, callable?: any) => void;
  private removeSubscriber: (context?: any, callable?: any) => boolean;
  private callSubscribers: (newValue: any, oldValue: any) => void;
  private hasSubscribers: () => boolean;
  private oldValue: any;
  private unobserve: (something: boolean) => void;
  private version: number;

  constructor(
    obj: { [name: string]: any },
    propertyName: string,
    descriptor: PropertyDescriptor,
    expression: Expression,
    observerLocator: ObserverLocator
  ) {
    this.obj = obj;
    const bindingContext = { this: obj };
    const overrideContext = createOverrideContext(bindingContext);
    this.scope = { bindingContext, overrideContext };
    this.propertyName = propertyName;
    this.descriptor = descriptor;
    this.expression = expression;
    this.observerLocator = observerLocator;
  }

  public getValue(): any {
    return this.obj[this.propertyName];
  }

  public setValue(newValue: any): void {
    if (this.descriptor.set !== undefined && this.descriptor.set !== null) {
      this.obj[this.propertyName] = newValue;
    } else {
      const msg = `${this.propertyName} does not have a setter function.`;
      this.logger.error(msg, this);
      throw new Error(msg);
    }
  }

  public subscribe(contextOrCallback: any, callable?: any): void {
    if (!this.hasSubscribers()) {
      this.oldValue = this.obj[this.propertyName];
      this.expression.connect(this as any, this.scope);
    }
    this.addSubscriber(contextOrCallback, callable);
  }

  public unsubscribe(contextOrCallback: any, callable?: any): void {
    if (this.removeSubscriber(contextOrCallback, callable) && !this.hasSubscribers()) {
      this.unobserve(true);
    }
  }

  public call(): void {
    const newValue = this.obj[this.propertyName];
    const oldValue = this.oldValue;
    if (newValue !== oldValue) {
      this.oldValue = newValue;
      this.callSubscribers(newValue, oldValue);
    }
    this.version++;
    this.expression.connect(this as any, this.scope);
    this.unobserve(false);
  }

  private get logger(): Logger {
    return getLogger("getter-observer");
  }
}
