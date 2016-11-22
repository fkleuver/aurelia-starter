import { customElement } from "aurelia-framework";

@customElement("take")
export class Take {
    public toView(array: Array<any>, count: number): Array<any> {
        return array.slice(0, count);
    }
}