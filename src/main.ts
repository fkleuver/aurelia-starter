import "aurelia-logging";
import { Aurelia, PLATFORM, DOM } from "aurelia-framework"
import environment from "./environment";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .eventAggregator()
    .router()
    .history()
    .developmentLogging()
    .feature("plugins")
    .feature("base")
    .feature("resources")
    .feature("shell");

  aurelia.start()
    .then(au => {
      const host = au.host;
      const root = host.attributes["root"].value;

      au.setRoot(root, host);
      PLATFORM.global.au = au;
    });
}
