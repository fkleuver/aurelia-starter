import { FrameworkConfiguration } from "aurelia-framework";
import environment from "../../environment";

export function configure(fxconfig: FrameworkConfiguration): void {
  if (environment.testing) {
    fxconfig.plugin("aurelia-testing");
  }
}
