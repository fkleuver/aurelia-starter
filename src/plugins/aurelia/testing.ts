import { FrameworkConfiguration } from "aurelia-framework";
import env from "../../environment";

export function configure(fxconfig: FrameworkConfiguration): void {
  if (env.testing) {
    fxconfig.plugin("aurelia-testing");
  }
}
