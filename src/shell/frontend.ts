import { bindable, DOM, inject, TaskQueue, PLATFORM, bindingMode } from "aurelia-framework";
import { Router, RouterConfiguration, RouteConfig, NavigationInstruction } from "aurelia-router";
import { Logger } from "aurelia-logging";
import { EventAggregator } from "aurelia-event-aggregator";

const logger: Logger = PLATFORM.global.getLogger("frontend");

@inject(DOM.Element, TaskQueue, EventAggregator, Router)
export class Frontend {
    
    /*
    *   BEHAVIOR LIFECYCLE
    */
    constructor(
        public element: HTMLElement,
        private tq: TaskQueue,
        private ea: EventAggregator,
        public router: Router) {

        logger.debug("constructor", element);
    }

    public created() {
        logger.debug("created");
    }

    public bind(bindingContext: any, overrideContext: any): void {
        logger.debug("bind", bindingContext, overrideContext);
    }

    public attached(): void {
        logger.debug("attached");
    }

    public detached(): void {
        logger.debug("detached");
    }

    public unbind(): void {
        logger.debug("unbind");
    }

    public activate(): void {
        logger.debug("activate");
    }

    public deactivate(): void {
        logger.debug("deactivate");
    }

}