import { Binding, Scope, bindingBehavior } from "aurelia-framework";

const interceptMethods = ["updateTarget", "updateSource", "callSource"];

@bindingBehavior("intercept")
export class Intercept {
    public bind(binding: Binding, scope: Scope, interceptor): void {
        let i = interceptMethods.length;
        while (i--) {
            let method = interceptMethods[i];
            if (!binding[method]) {
                continue;
            }
            binding[`intercepted-${method}`] = binding[method];
            let update = binding[method].bind(binding);
            binding[method] = interceptor.bind(binding, method, update);
        }
    }

    public unbind(binding: Binding, scope: Scope): void {
        let i = interceptMethods.length;
        while (i--) {
            let method = interceptMethods[i];
            if (!binding[method]) {
                continue;
            }
            binding[method] = binding[`intercepted-${method}`];
            binding[`intercepted-${method}`] = null;
        }
    }
}