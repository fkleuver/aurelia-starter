import "aurelia-logging";
import { Aurelia, PLATFORM, DOM } from "aurelia-framework"
import env from "./environment";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .eventAggregator()
    .router()
    .history()
    .developmentLogging()
    .feature("plugins", env)
    .feature("core", env)
    .feature("resources", env)
    .feature("shell", env);

  aurelia.start()
    .then(au => {
      const host = au.host;
      const root = host.attributes["root"].value;

      au.setRoot(root, host);
      PLATFORM.global.au = au;
    });
}
