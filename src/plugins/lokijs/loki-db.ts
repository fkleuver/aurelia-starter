import * as loki from "lokijs";
import * as LokiIndexedAdapter from "loki-indexed-adapter";
import { singleton } from "aurelia-dependency-injection";

@singleton(false)
export class LokiDb {
    public adapter: LokiIndexedAdapter;
    public db: Loki;

    constructor() {
        this.adapter = new LokiIndexedAdapter("localidx");
        this.db = new loki("aurelia", {
            autoload: true,
            autosave: true,
            autosaveInterval: 2500,
            adapter: this.adapter
        });
    }
}