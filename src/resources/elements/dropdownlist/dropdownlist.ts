import { bindable, observable, DOM, inject, TaskQueue, PLATFORM, bindingMode } from "aurelia-framework";
import * as Bluebird from "bluebird";
import * as Types from "../../../core/types";

type option = { displayName: string, selected: boolean };

const logger = PLATFORM.global.getLogger("dropdownlist");

@inject(DOM.Element, TaskQueue)
export class Dropdownlist {
    @bindable({ defaultBindingMode: bindingMode.oneWay })
    public options: option[];

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    public value: option;

    @observable()
    public currentText: string;


    public rootElement: HTMLElement;

    public currentItemElement: HTMLDivElement;
    public inputElement: HTMLInputElement;
    public caretElement: HTMLDivElement;
    public selectableItemsElement: HTMLDivElement;

    private filteredOptions: option[];
    private currentOption: option;
    public dropDownIsOpen: boolean;
    private ignoreFilter: boolean;
    private displayCollapsed: boolean;
    private isAttached: boolean;
    private isToggling: boolean;

    private get valueDisplayName(): string {
        if (Types.isUndefinedOrNull(this.value)) {
            return null;
        } else {
            return this.value.displayName;
        }
    }

    /*
    *   BEHAVIOR LIFECYCLE
    */
    constructor(element, private tq: TaskQueue) {
        logger.debug("constructor", element);

        this.rootElement = element;

        this.dropDownIsOpen = false;
        this.displayCollapsed = true;
        this.ignoreFilter = true;

        this.options = null;
        this.value = null;

        this.isAttached = false;
        this.isToggling = false;
    }

    public bind(bindingContext: any, overrideContext: any): void {
        logger.debug("bind", bindingContext, overrideContext);

        if (this.options === null || this.options.length === 0) {
            throw new Error("dropdownlist requires a non-empty list of options");
        }

        if (this.value === null || this.options.indexOf(this.value) === -1) {
            this.value = this.options[0];
            this.value.selected = true;
        }

        this.currentText = this.valueDisplayName;
    }

    public unbind(): void {
        logger.debug("unbind");

        this.options = null;
        this.value = null;
        this.currentText = null;
    }

    public attached(): void {
        logger.debug("attached");

        this.isAttached = true;

        this.currentItemElement = <any>this.rootElement.querySelector(".dropdownlist__current-item");
        this.inputElement = <any>this.rootElement.querySelector(".dropdownlist__input");
        this.caretElement = <any>this.rootElement.querySelector(".dropdownlist__caret");
        this.selectableItemsElement = <any>this.rootElement.querySelector(".dropdownlist__selectable-items");
    }

    public detached(): void {
        logger.debug("detached");

        this.currentItemElement = null;
        this.inputElement = null;
        this.caretElement = null;
        this.selectableItemsElement = null;

        this.isAttached = false;
    }

    private setCurrentOption(value: option): void {
        logger.debug("setCurrentOption", value.displayName, value.selected);

        if (this.options.indexOf(value) > -1) {
            this.currentOption = value;
        } else {
            this.currentOption = this.value;
        }

        for (let option of this.options) {
            option.selected = (option === value);
        }
    }

    public setValue(value: option): Bluebird<any> {
        logger.debug("setValue", value);

        this.value = value || this.value;
        return this.closeDropDown();
    }

    public toggleDropDown(): Bluebird<boolean> {
        logger.debug("toggleDropDown");

        if (this.dropDownIsOpen === false) {
            return this.openDropDown();
        } else {
            return this.closeDropDown();
        }
    }

    public openDropDown(): Bluebird<boolean> {
        if (this.isToggling === true || this.dropDownIsOpen === true) {
            logger.debug("openDropDown", false);
            return Bluebird.resolve(false);
        }

        logger.debug("openDropDown", true);
        this.isToggling = true;

        return new Bluebird<boolean>((resolve, reject) => {
            this.dropDownIsOpen = true;
            this.displayCollapsed = false;
            this.inputElement.focus();
            this.currentItemElement.classList.add("dropdownlist__current-item--active");

            TweenLite.fromTo(this.selectableItemsElement, 0.15,
                {
                    alpha: 0,
                    scale: 0.95,
                    ease: Power1.easeIn,
                    onComplete: () => {
                        this.isToggling = false;
                        resolve(true);
                    }
                },
                {
                    scale: 1,
                    alpha: 1
                });
        });
    }

    public closeDropDown($event?: FocusEvent): Bluebird<boolean> {
        if (this.isToggling === true || this.dropDownIsOpen === false) {
            logger.debug("closeDropDown", false);
            return Bluebird.resolve(false);
        }

        logger.debug("closeDropDown", true);
        this.isToggling = true;

        return new Bluebird<boolean>((resolve, reject) => {

            this.currentOption = null;
            this.currentText = this.valueDisplayName;
            this.dropDownIsOpen = false;
            this.ignoreFilter = true;

            for (let option of this.options) {
                option.selected = (option === this.value);
            }

            TweenLite.to(this.selectableItemsElement, 0.15,
                {
                    alpha: 0,
                    scale: 0.95,
                    ease: Power1.easeIn,
                    onComplete: () => {
                        this.displayCollapsed = true;
                        this.currentItemElement.classList.remove("dropdownlist__current-item--active");

                        this.isToggling = false;
                        resolve(true);
                    }
                });
        });
    }


    /*
    *   CHANGE HANDLERS
    */
    private currentTextChanged(newValue: string, oldValue: string): void {
        const execute = this.isAttached && !this.isToggling;
        logger.debug("currentTextChanged", execute, newValue, oldValue);
        if (!execute) return;

        this.ignoreFilter = Types.isUndefinedOrNull(newValue) || !this.dropDownIsOpen
        const isChangeFromInputElement = this.valueDisplayName !== newValue;
        if (isChangeFromInputElement) {
            this.openDropDown();
        }

        if (this.dropDownIsOpen) {
            this.filteredOptions = this.options.filter(o => o.displayName.toLowerCase().indexOf(newValue.toLowerCase()) > -1);
            const candidateOption = this.filteredOptions.length > 0 ? this.filteredOptions[0] : this.value;
            this.setCurrentOption(candidateOption);
        }
    }

    private valueChanged(newValue: option, oldValue: option): void {
        logger.debug("valueChanged", newValue, oldValue);

        this.currentText = this.valueDisplayName;
        this.setCurrentOption(newValue);
    }

    /*
    *   DOM EVENT HANDLERS
    */
    private onKeyUp($event: KeyboardEvent): any {
        logger.debug("onKeyUp", $event);

        switch ($event.code) {
            case "Enter": {
                this.setValue(this.currentOption);
                break;
            }
            case "Escape": {
                this.setValue(this.value);
                break;
            }
            default: {
                return true;
            }
        }
    }

    private onKeyDown($event: KeyboardEvent): any {
        logger.debug("onKeyDown", $event);

        switch ($event.code) {
            case "ArrowDown": {
                this.moveSelection(1);
                break;
            }
            case "ArrowUp": {
                this.moveSelection(-1);
                break;
            }
            default: {
                return true;
            }
        }
    }

    private onWheel($event: WheelEvent): any {
        logger.debug("onWheel", $event);

        const hasScrollbar = this.selectableItemsElement.scrollHeight > this.selectableItemsElement.clientHeight;
        const isVisible = this.selectableItemsElement.style.display !== "none";

        if (hasScrollbar === true && isVisible === true) return true;

        if ($event.deltaY > 0) {
            this.moveSelection(1);
        } else {
            this.moveSelection(-1);
        }
    }

    private moveSelection(offset: number): void {
        logger.debug("moveSelection", offset);

        if (this.dropDownIsOpen === false) {
            this.openDropDown();
            return;
        }

        let currentOption: option, allOptions: option[];
        if (this.ignoreFilter) {
            currentOption = this.currentOption || this.value;
            allOptions = this.options;
        } else {
            currentOption = this.currentOption;
            allOptions = this.filteredOptions;
        }

        const currentOptionIndex = currentOption ? allOptions.indexOf(currentOption) : 0;
        let newOptionIndex: number;
        if (offset > 0) {
            newOptionIndex = ((allOptions.length - offset) > currentOptionIndex) ? (currentOptionIndex + offset) : 0;
        } else {
            offset *= -1;
            newOptionIndex = (currentOptionIndex > 0) ? (currentOptionIndex - offset) : (allOptions.length - offset);
        }

        const newOption = allOptions[newOptionIndex];
        this.setCurrentOption(newOption);
    }
}