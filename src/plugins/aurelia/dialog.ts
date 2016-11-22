import { FrameworkConfiguration } from "aurelia-framework";

export function configure(frameworkConfig: FrameworkConfiguration, configure: Function) {
    frameworkConfig.aurelia.use
        .plugin("aurelia-dialog", config => {
            config.useDefaults();
            config.settings.lock = true;
            config.settings.centerHorizontalOnly = false;
        });
}