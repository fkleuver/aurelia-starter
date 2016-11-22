import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import * as uuid from "node-uuid";

export function configure(config: FrameworkConfiguration) {
    PLATFORM.global.uuid = uuid;
}