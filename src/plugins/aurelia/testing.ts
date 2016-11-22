import { FrameworkConfiguration } from "aurelia-framework";

export function configure(frameworkConfig: FrameworkConfiguration, configure: Function) {
    frameworkConfig.aurelia.use
        .plugin("aurelia-testing");
}