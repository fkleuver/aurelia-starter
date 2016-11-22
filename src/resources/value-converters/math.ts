import { valueConverter } from "aurelia-framework";

@valueConverter("math")
export class Math {
    public toView(value: number, method: string) {
        return Math[method](value);
    }
}