import {
    subscriberCollection,
    connectable,
    createOverrideContext
} from "aurelia-framework";
import {
    getLogger, Logger
} from "aurelia-logging";

let valueConverterLookupFunction = () => null;

@connectable()
@subscriberCollection()
export class GetterObserver {
    public obj: any;
    public scope: { bindingContext: any, overrideContext: any };
    public propertyName: string;
    public descriptor: any;
    public expression: any;
    public observerLocator: any;

    constructor(obj, propertyName, descriptor, expression, observerLocator) {
        this.obj = obj;
        let bindingContext = { this: obj };
        let overrideContext = createOverrideContext(bindingContext);
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
            let msg = `${this.propertyName} does not have a setter function.`;
            this.logger.error(msg, this);
            throw new Error(msg);
        }
    }

    hasSubscribers: Function;
    oldValue: any;
    addSubscriber: Function;
    public subscribe(context, callable): void {
        if (!this.hasSubscribers()) {
            this.oldValue = this.obj[this.propertyName];
            this.expression.connect(this, this.scope);
        }
        this.addSubscriber(context, callable);
    }

    removeSubscriber: Function;
    unobserve: Function;
    public unsubscribe(context, callable): void {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers(context, callable)) {
            this.unobserve(true);
        }
    }

    callSubscribers: Function;
    private _version: number;
    public call(): void {
        let newValue = this.obj[this.propertyName];
        let oldValue = this.oldValue;
        if (newValue !== oldValue) {
            this.oldValue = newValue;
            this.callSubscribers(newValue, oldValue);
        }
        this._version++;
        this.expression.connect(this, this.scope);
        this.unobserve(false);
    }

    private get logger(): Logger {
        return getLogger("dnk:getter-observer");
    }
}