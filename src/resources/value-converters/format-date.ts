import * as Types from "../../core/types";

const int32MaxValue = 2147483647; // max UNIX date (seconds)
const momentMaxValue = int32MaxValue * 1000; // max moment date (milliseconds)

import { customElement } from "aurelia-framework";

@customElement("format-date")
export class FormatDate {
    public toView(value, format) {
        let f = format || "YYYY-MM-DD HH:mm:ss";
        if (!Types.isUndefinedOrNull(value)) {
            if (Types.isNumber(value)) {
                while (value > momentMaxValue) {
                    value = Math.floor(value/10);
                }
                return moment(value).format(f);
            } else {

                return "-";
            }
        } else {
        }
    }
    public fromView(str, format) {
        let f = format || "YYYY-MM-DD HH:mm:ss";
        return moment(str, format).unix();
    }
}