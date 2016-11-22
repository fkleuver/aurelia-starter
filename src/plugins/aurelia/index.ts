import { FrameworkConfiguration } from "aurelia-framework";
import * as logging from "./logging";
import * as dialog from "./dialog";
import * as testing from "./testing";
import * as ux from "./ux";

export function configure(config: FrameworkConfiguration, configure: Function) {
    logging.configure(config, configure);
    dialog.configure(config, configure);
    testing.configure(config, configure);
    //ux.configure(config, configure);
}
