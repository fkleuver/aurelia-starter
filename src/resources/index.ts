import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration, env) {
    config.globalResources([
        "./binding-behaviors/intercept",

        "./elements/dynamic-html",

        "./value-converters/console-debug",
        "./value-converters/except",
        "./value-converters/filter",
        "./value-converters/format-date",
        "./value-converters/math",
        "./value-converters/parse-boolean",
        "./value-converters/parse-json",
        "./value-converters/parse-number",
        "./value-converters/sort",
        "./value-converters/take"
    ]);
}
