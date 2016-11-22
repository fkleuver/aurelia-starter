import * as Types from "../../core/types";
import { customElement } from "aurelia-framework";

@customElement("filter")
export class Filter {
    public toView(arr: any[], config: { propertyName: string, value: any }): any {
        if (!Types.isArray(arr)) {
            return arr;
        }

        if (!Types.isObject(config) || Types.isUndefinedOrNull(config.propertyName) || Types.isUndefinedOrNull(config.value)) {
            return arr;
        }

        return arr.filter(i => i[config.propertyName] === config.value);
    }
}
