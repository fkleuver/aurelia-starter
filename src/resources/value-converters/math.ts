import { customElement } from "aurelia-framework";

@customElement("math")
export class Math {
    public toView(value: number, method: string) {
        return Math[method](value);
    }
}