import { FrameworkConfiguration } from "aurelia-framework";
import * as functionExtensions from "./function-extensions";

export function configure(config: FrameworkConfiguration) {
    functionExtensions.configure();
}