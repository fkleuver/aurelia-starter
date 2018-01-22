import { FrameworkConfiguration } from "aurelia-framework";
import * as logging from "./logging";
import * as testing from "./testing";

export function configure(fxconfig: FrameworkConfiguration): void {
    logging.configure(fxconfig);
    testing.configure(fxconfig);
}
