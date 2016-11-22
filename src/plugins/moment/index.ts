import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import * as moment from "moment";

export function configure(frameworkConfig: FrameworkConfiguration, configure: Function) {
    PLATFORM.global.moment = moment;
}