
declare class Draggable {

    static version: string;
    static zIndex: number;

    allowEventDefault: boolean;
    autoScroll: number;
    endRotation: number;
    endX: number;
    endY: number;
    isDragging: boolean;
    isPressed: boolean;
    lockAxis: boolean;
    lockedAxis: string;
    maxRotation: number;
    maxX: number;
    maxY: number;
    minRotation: number;
    minX: number;
    minY: number;
    pointerEvent: PointerEvent;
    pointerX: number;
    pointerY: number;
    rotation: number;
    tween: TweenLite;
    vars: Draggable.Vars;
    x: number;
    y: number;

    constructor(target: Object, vars?: Draggable.Vars);

    static create(target: Object, vars?: Draggable.Vars): Draggable[];
    static get(target: Object): Draggable;
    static hitTest(testObject1: Draggable.TestObject, testObject2: Draggable.TestObject, threshold?: number | string): boolean;
    static timeSinceDrag(): number;

    addEventListener(type: string, callback: Function);
    applyBounds(newBounds?: Draggable.Bounds): this;
    disable(type?: string): this;
    drag(event: Event): void;
    enable(type?: string): this;
    enabled(): boolean;
    enabled(value: boolean, type?: string): this;
    endDrag(event: Event): void;
    getDirection(from: "start", diagonalThreshold?: number): string;
    getDirection(from: "velocity", diagonalThreshold?: number): string;
    getDirection(from: Draggable.DOMTarget, diagonalThreshold?: number): string;
    hitTest(testObject: Draggable.TestObject, threshold?: number | string): boolean;
    getDirection(from?: string, diagonalThreshold?: number): string;
    kill(): this;
    removeEventListener(type: string, callback: Function);
    startDrag(event: Event): this;
    timeSinceDrag(): number;
    update(applyBounds?: boolean): this;
}

declare namespace Draggable {

    type DOMElement = string | Element | List<Element> | JQuery;
    type DOMTarget = DOMElement | DOMElement[];
    type TestObject = string | DOMTarget | Event | BoundsRectangle;
    type Bounds = string | DOMTarget | BoundsMinMax | BoundsRectangle | BoundsRotation;
    type EventCallback = (event: any | PointerEvent, ...params: any[]) => any;
    type SnapFunction = (endValue: number) => number | void;
    type SnapObject = TweenProps<SnapFunction | number[]>;

    interface List<T> {
        [index: number]: T;
        length: number;
    }

    interface BoundsMinMax {
        minX?: number;
        maxX?: number;
        minY?: number;
        maxY?: number;
    }

    interface BoundsRectangle {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
        height?: number;
        width?: number;
    }

    interface BoundsRotation {
        minRotation?: number;
        maxRotation?: number;
    }

    interface TweenProps<T> {
        x?: T;
        y?: T;
        top?: T;
        left?: T;
        rotation?: T;
    }

    interface Vars {
        allowEventDefault?: boolean;
        autoScroll?: number;
        bounds?: Bounds;
        clickableTest?: (clickable: Element) => boolean | void;
        cursor?: string;
        dragClickables?: boolean;
        dragResistance?: number;
        edgeResistance?: number;
        liveSnap?: boolean | number[] | SnapFunction | SnapObject;
        lockAxis?: boolean;
        maxDuration?: number;
        minDuration?: number;
        minimumMovement?: number;
        onClick?: EventCallback;
        onClickParams?: any[];
        onClickScope?: any;
        onDrag?: EventCallback;
        onDragParams?: any[];
        onDragScope?: any;
        onDragEnd?: EventCallback;
        onDragEndParams?: any[];
        onDragEndScope?: any;
        onDragStart?: EventCallback;
        onDragStartParams?: any[];
        onDragStartScope?: any;
        onLockAxis?: EventCallback;
        onPress?: EventCallback;
        onPressParams?: any[];
        onPressScope?: any;
        onRelease?: EventCallback;
        onReleaseParams?: any[];
        onReleaseScope?: any;
        onThrowComplete?: EventCallback;
        onThrowCompleteParams?: any[];
        onThrowCompleteScope?: any;
        onThrowUpdate?: EventCallback;
        onThrowUpdateParams?: any[];
        onThrowUpdateScope?: any;
        overshootTolerance?: number;
        snap?: number[] | SnapFunction | SnapObject;
        throwProps?: boolean;
        throwResistance?: number;
        trigger?: string | Element;
        type?: string;
        zIndexBoost?: boolean;
    }
}