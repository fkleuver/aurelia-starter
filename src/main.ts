import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import environment from "./environment";

export async function configure(au: Aurelia): Promise<void> {
  if (environment.debug || environment.testing) {
    ((PLATFORM.global as Window) as any).au = au;
  }

  au.use.defaultBindingLanguage();
  au.use.defaultResources();
  au.use.eventAggregator();
  au.use.router();
  au.use.history();

  au.use.feature(PLATFORM.moduleName("plugins/index"));
  au.use.feature(PLATFORM.moduleName("resources/index"));

  await au.start();

  await au.setRoot("routes/main/app", au.host);
}
