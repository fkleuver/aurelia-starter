declare module "aurelia-testing" {
    import { Aurelia } from "aurelia-framework";

    export class ComponentTester {
        constructor();
        bind(): Promise<void>;
        attached(): Promise<void>;
        detached(): Promise<void>;
        unbind(): Promise<void>;

        host: HTMLElement;
        element: HTMLElement;
        viewModel: any;

        configure(aurelia: Aurelia): void;
        bootstrap(configure: (aurelia: Aurelia) => void): void;
        withResources(resources: (string | string[])): ComponentTester;
        inView(html: string): ComponentTester;
        boundTo(bindingContext: any): ComponentTester;
        manuallyHandleLifecycle(): ComponentTester;
        create(bootstrap: (configure: (aurelia: Aurelia) => void) => void): Promise<void>;
        dispose(): any;

        _resources: (string | string[]);
        _html: string;
        _bindingContext: any;
        _prepareLifecycle(): void;
    }

    export var StageComponent: {
        withResources(resources: (string | string[])): ComponentTester;
    }
}