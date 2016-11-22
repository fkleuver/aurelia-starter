import * as Types from "../../core/types";
import { valueConverter } from "aurelia-framework";

@valueConverter("parse-json")
export class ParseJson {
    public toView(text: string): Object {
        if (Types.isString(text)) {
            return JSON.parse(text);
        }
        else {
            return text;
        }
    }

    public fromView(obj: Object): string {
        if (!Types.isString(obj)) {
            return JSON.stringify(obj);
        }
        else {
            return obj;
        }
    }
}
