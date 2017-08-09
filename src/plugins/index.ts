import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

export function configure(config: FrameworkConfiguration, env) {
    config.aurelia.use
        .feature("plugins/appinsights", env)
        .feature("plugins/aurelia", env)
        .feature("plugins/computed-observation-adapter", {
            enableLogging: env.debug
        })
        .feature("plugins/lokijs", env)
        .feature("plugins/moment", env)
        .feature("plugins/uuid", env);
}