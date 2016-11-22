import * as Types from "../../core/types";
import { customElement } from "aurelia-framework";

@customElement("parse-boolean")
export class ParseBoolean {
    public toView(input: any, falseyValuesAsFalse: boolean = true): any {
        if (falseyValuesAsFalse === true && Types.isUndefinedOrNull(input)) {
            return false;
        }

        if (Types.isString(input)) {
            if (input === "true") {
                return true;
            } else if (input === "false") {
                return false;
            }
        }
        if (Types.isNumber(input)) {
            if (input === 1) {
                return true;
            } else if (input === 0){
                return false;
            }
        }
        if (Types.isBoolean(input)) {
            return input;
        }

        const type = Object.prototype.toString.call(input);
        throw new Error(`An invalid input was passed to parseBoolean (type=${type}, value=${input})`);
    }
}
