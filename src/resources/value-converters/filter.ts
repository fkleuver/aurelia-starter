import { valueConverter } from "aurelia-framework";

@valueConverter("filter")
export class Filter {
    public toView(arr: any[], prop: string, value: string, disable: boolean): any[] {
        if (arr && arr.length && prop && value && disable === false) {
            return arr.filter(a => (<string>a[prop]).toLowerCase().indexOf(value.toLowerCase()) > -1);
        } else {
            return arr;
        }
    }
}
