import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    config.aurelia.use
        .feature("plugins/computed-observation-adapter", {
            enableLogging: true
        });
}