import { FrameworkConfiguration } from "aurelia-framework";

export function configure(frameworkConfig: FrameworkConfiguration, env) {
    if (env.testing) {
        frameworkConfig.aurelia.use
            .plugin("aurelia-testing");
    }
}