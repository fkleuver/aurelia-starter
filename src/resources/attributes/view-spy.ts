// Source: https://github.com/aurelia/testing/blob/master/src/view-spy.js

import { customAttribute, View , PLATFORM } from "aurelia-framework";

const logger = PLATFORM.global.getLogger("view-spy");

@customAttribute("view-spy")
export class ViewSpy {
    public value: any;
    public view: View;

    private _log(lifecycleName: string, context?: any): void {
        if (!this.value && lifecycleName === "created") {
            logger.info(lifecycleName, this.view);
        } else if (this.value && this.value.indexOf(lifecycleName) !== -1) {
            logger.info(lifecycleName, this.view, context);
        }
    }

    public created(view: View): void {
        this.view = view;
        this._log("created");
    }

    public bind(bindingContext: any): void {
        this._log("bind", bindingContext);
    }

    public attached(): void {
        this._log("attached");
    }

    public detached(): void {
        this._log("detached");
    }

    public unbind(): void {
        this._log("unbind");
    }
}