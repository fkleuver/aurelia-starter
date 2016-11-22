import * as Types from "../../core/types";
import { customElement } from "aurelia-framework";

@customElement("parse-number")
export class ParseNumber {
    public toView(text: string, base: number = 10): number {
        if (Types.isString(text)) {
            return parseInt(text, base);
        } else if (Types.isNumber(text)) {
            return text;
        } else {
            throw new Error(`A type of ${typeof text} was passed into the ParseNumberValueConverter's toView method`);
        }
    }
}
