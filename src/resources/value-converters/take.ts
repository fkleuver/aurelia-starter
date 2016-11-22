import { valueConverter } from "aurelia-framework";

@valueConverter("take")
export class Take {
    public toView(array: Array<any>, count: number): Array<any> {
        return array.slice(0, count);
    }
}