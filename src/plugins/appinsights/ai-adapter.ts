import { FrameworkConfiguration, LogManager, singleton } from "aurelia-framework";
import { NavigationInstruction } from "aurelia-router";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { AiLogAppender } from "./ai-log-appender";

@singleton(false)
export class AiAdapter {
    private _key: string = null;
    private _properties = {};

    public set key(aiKey: string) {
        this._key = aiKey;
        appInsights.config.instrumentationKey = aiKey;
    }

    public set debug(value: boolean) {
        appInsights.config.enableDebug = value;
    }

    public set properties(value: {}) {
        this._properties = value;
    }

    constructor(public ea: EventAggregator) {
        this._key = appInsights.config.instrumentationKey;
        this.subscribeToNavEvents();
        this.addLogAppender();
    }

    public subscribeToNavEvents(): void {
        this.ea.subscribe("router:navigation:complete", (instruction: NavigationInstruction) => {
            try {
                this.guardKey();
                appInsights.trackPageView(instruction.fragment, window.location.href, this._properties);
            } catch (e) {
                console.debug("Error sending AI trackPageView: %O", e);
            }
        });
        this.ea.subscribe("router:navigation:error", (navError) => {
            try {
                this.guardKey();
                appInsights.trackException(navError.result.output);
            } catch (e) {
                console.debug("Error sending AI trackPageView: %O", e);
            }
        });
    }


    public addLogAppender(): void {
        LogManager.addAppender(new AiLogAppender());
    }

    private guardKey(): void {
        if (this._key === null) {
            throw "AppInsights key has not been set. Use 'AureliaAppInsights.key = aiKey;' to set it.";
        }
    }
}