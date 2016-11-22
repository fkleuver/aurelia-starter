import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    config.aurelia.use
        .feature("plugins/computed-observation-adapter", {
            enableLogging: true
        })
        .feature("plugins/lokijs")
        .feature("plugins/node-uuid");
}