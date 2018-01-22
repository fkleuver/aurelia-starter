import { FrameworkConfiguration } from "aurelia-framework";
import * as logging from "./logging";
import * as testing from "./testing";

export function configure(config: FrameworkConfiguration, configure: Function) {
    logging.configure(config, configure);
    testing.configure(config, configure);
}
