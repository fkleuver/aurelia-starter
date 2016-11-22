import {
    customElement,
    TaskQueue,
    bindable,
    ViewCompiler,
    ViewSlot,
    View,
    ViewResources,
    Container,
    ViewFactory,
    inlineView,
    inject,
    DOM,
    createOverrideContext,
    bindingMode
} from "aurelia-framework";
import * as Types from "../../core/types";

@customElement("dynamic-html")
@inlineView("<template><div></div></template>")
@inject(DOM.Element, TaskQueue, Container, ViewCompiler)
export class DynamicHtml {
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    public html: string;

    @bindable({ defaultBindingMode: bindingMode.oneWay })
    public context: any;

    public element: HTMLElement;

    private tq: TaskQueue;
    private container: Container;
    private viewCompiler: ViewCompiler;

    private runtimeView: View;
    private runtimeViewSlot: ViewSlot;
    private runtimeViewFactory: ViewFactory;
    private runtimeViewAnchor: HTMLDivElement;

    constructor(element, tq, container, viewCompiler) {
        this.element = <HTMLElement>element;
        this.tq = tq;
        this.container = container;
        this.viewCompiler = viewCompiler;
    }

    public bindingContext: any;
    public overrideContext: any;
    public bind(bindingContext: any, overrideContext: any): void {
        this.bindingContext = this.context || bindingContext.context || bindingContext;
        this.overrideContext = createOverrideContext(this.bindingContext, overrideContext);

        if (this.html) {
            this.htmlChanged(this.html, undefined);
        }
    }

    public unbind(): void {
        this.disposeView();

        this.bindingContext = null;
        this.overrideContext = null;
    }

    public needsApply: boolean = false;
    public isAttached: boolean = false;
    public attached(): void {
        this.runtimeViewAnchor = <HTMLDivElement>this.element.firstElementChild;

        this.isAttached = true;
        if (this.needsApply) {
            this.needsApply = false;
            this.apply();
        }
    }

    public detached(): void {
        this.isAttached = false;

        this.runtimeViewAnchor = null;
    }

    private htmlChanged(newValue: string, oldValue: void): void {
        if (newValue) {
            if (this.isAttached) {
                this.tq.queueMicroTask(() => {
                    this.apply();
                });
            } else {
                this.needsApply = true;
            }
        } else {
            if (this.isApplied) {
                this.disposeView();
            }
        }
    }

    private isApplied: boolean = false;
    private apply(): void {
        if (this.isApplied) {
            this.disposeView();
        }

        this.compileView();
    }

    private disposeView(): void {
        if (this.runtimeViewSlot) {
            this.runtimeViewSlot.unbind();
            this.runtimeViewSlot.detached();
            this.runtimeViewSlot.removeAll();
            this.runtimeViewSlot = null;
        }

        if (this.runtimeViewFactory) {
            this.runtimeViewFactory = null;
        }

        if (this.runtimeView) {
            this.runtimeView = null;
        }

        this.isApplied = false;
    }

    private compileView(): void {
        this.runtimeViewFactory = createViewFactory(this.viewCompiler, this.container, this.html);

        this.runtimeView = createView(this.runtimeViewFactory, this.container);

        this.runtimeViewSlot = createViewSlot(this.runtimeViewAnchor);
        this.runtimeViewSlot.add(this.runtimeView);
        this.runtimeViewSlot.bind(this.bindingContext, this.overrideContext);
        this.runtimeViewSlot.attached();

        this.isApplied = true;
    }

}

function createViewFactory(viewCompiler: ViewCompiler, container: Container, html: string): ViewFactory {
    if (!html.startsWith("<template>")) {
        html = `<template>${html}</template>`;
    }
    let viewResources: ViewResources = container.get(ViewResources);
    let viewFactory = viewCompiler.compile(html, viewResources);
    return viewFactory;
}

function createView(viewFactory: ViewFactory, container: Container): View {
    let childContainer = container.createChild();
    let view = viewFactory.create(childContainer);
    return view;
}

function createViewSlot(containerElement: Element): ViewSlot {
    let viewSlot = new ViewSlot(containerElement, true);
    return viewSlot;
}