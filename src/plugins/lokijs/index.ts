import { FrameworkConfiguration } from "aurelia-framework";
import { LokiDb } from "./loki-db";

export function configure(config: FrameworkConfiguration, configure: Function) {
    let db = new LokiDb();
    config.container.registerInstance(LokiDb, db);
    config.container.registerAlias(LokiDb, "loki-db")
}
