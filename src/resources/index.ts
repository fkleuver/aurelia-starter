import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";

export function configure(fxconfig: FrameworkConfiguration): void {
  fxconfig.feature(PLATFORM.moduleName("resources/attributes/index"));
  fxconfig.feature(PLATFORM.moduleName("resources/value-converters/index"));
  fxconfig.feature(PLATFORM.moduleName("resources/binding-behaviors/index"));
  fxconfig.feature(PLATFORM.moduleName("resources/elements/index"));
}
