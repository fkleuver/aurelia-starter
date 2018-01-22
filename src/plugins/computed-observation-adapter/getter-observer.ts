
import { getLogger, Logger } from "aurelia-logging";
import { connectable, subscriberCollection, createOverrideContext } from "aurelia-binding";

const valueConverterLookupFunction = () => null;

@(connectable as any)()
@subscriberCollection()
export class GetterObserver {
  public obj: any;
  public scope: { bindingContext: any; overrideContext: any };
  public propertyName: string;
  public descriptor: any;
  public expression: any;
  public observerLocator: any;

  constructor(obj, propertyName, descriptor, expression, observerLocator) {
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
    if (this.descriptor.set) {
      this.obj[this.propertyName] = newValue;
    } else {
      const msg = `${this.propertyName} does not have a setter function.`;
      this.logger.error(msg, this);
      throw new Error(msg);
    }
  }

  private hasSubscribers: (context?: any, callable?: any) => boolean;
  private oldValue: any;
  private addSubscriber: (context?: any, callable?: any) => void;
  public subscribe(context, callable): void {
    if (!this.hasSubscribers()) {
      this.oldValue = this.obj[this.propertyName];
      this.expression.connect(this, this.scope);
    }
    this.addSubscriber(context, callable);
  }

  private removeSubscriber: (context?: any, callable?: any) => boolean;
  private unobserve: (something: boolean) => void;
  public unsubscribe(context, callable): void {
    if (this.removeSubscriber(context, callable) && !this.hasSubscribers(context, callable)) {
      this.unobserve(true);
    }
  }

  private callSubscribers: (newValue: any, oldValue: any) => void;
  private version: number;
  public call(): void {
    const newValue = this.obj[this.propertyName];
    const oldValue = this.oldValue;
    if (newValue !== oldValue) {
      this.oldValue = newValue;
      this.callSubscribers(newValue, oldValue);
    }
    this.version++;
    this.expression.connect(this, this.scope);
    this.unobserve(false);
  }

  private get logger(): Logger {
    return getLogger("getter-observer");
  }
}
