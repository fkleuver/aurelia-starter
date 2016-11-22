import { valueConverter } from "aurelia-framework";

@valueConverter("except")
export class Except {
    public toView(arr: any[], excludes: any[] = []): any {
        return arr.filter(a => excludes.every(b => a !== b));
    }
}
