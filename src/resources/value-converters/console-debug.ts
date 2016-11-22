import { valueConverter } from "aurelia-framework";

@valueConverter("console-debug")
export class ConsoleDebug {
    public toView(value, prefix?) {
        prefix = (prefix ? `:${prefix}` : "");
        console.debug(`[debug${prefix}] {value=${value}, type=${typeof value}}`);
        return value;
    }

    public fromView(value, prefix?) {
        prefix = (prefix ? `:${prefix}` : "");
        console.debug(`[debug${prefix}] {value=${value}, type=${typeof value}}`);
        return value;
    }
}