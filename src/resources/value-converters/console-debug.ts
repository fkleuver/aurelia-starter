import { customElement } from "aurelia-framework";

@customElement("console-debug")
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