import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import * as uuid from "uuid";

export function configure(config: FrameworkConfiguration) {
    PLATFORM.global.uuid = uuid;
}