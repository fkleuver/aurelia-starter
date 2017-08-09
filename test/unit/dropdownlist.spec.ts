import { PLATFORM, DOM } from "aurelia-pal";
import { StageComponent, ComponentTester } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";
import { Dropdownlist } from "../../src/resources/elements/dropdownlist/dropdownlist";

interface TComponentTester<T> extends ComponentTester {
    viewModel: T;
}

const logger = PLATFORM.global.getLogger("dropdownlist.spec.ts");
const resources = [
    "resources/elements/dropdownlist/dropdownlist",
    "resources/value-converters/filter"
];
const view = "<dropdownlist options.bind='options' value.two-way='value'></dropdownlist>";
const optionsNullOrEmptyError = "dropdownlist requires a non-empty list of options";

function arrange(options: any[], value: any, bind: boolean, attach: boolean) {
    let opt = options;
    let val = value;
    let ctx = { options: opt, value: val };

    return Bluebird
        .resolve<TComponentTester<Dropdownlist>>(StageComponent
            .withResources(resources)
            .inView(view)
            .boundTo(ctx)
            .manuallyHandleLifecycle())
        .then(c => {
            return c.create(bootstrap).then(() => Bluebird.resolve(c));
        })
        .then(c => {
            if (bind === true) {
                c.bind(ctx);
            }
            return Bluebird.resolve(c);
        })
        .then(c => {
            if (attach === true) {
                c.attached();
            }
            return Bluebird.resolve(c);
        });
};

describe("dropdownlist", () => {
    let options;

    beforeAll(() => {
        options = [
            { displayName: "Option 1" },
            { displayName: "Option 2" },
            { displayName: "Option 3" }
        ];
    });

    it("should render", (done) => {
        arrange(options, options[0], true, true)
            .then(c => {
                expect(c.viewModel.rootElement).toBeDefined();
                expect(c.viewModel.currentItemElement).toBeDefined();
                expect(c.viewModel.inputElement).toBeDefined();
                expect(c.viewModel.caretElement).toBeDefined();
                expect(c.viewModel.selectableItemsElement).toBeDefined();

                expect(c.viewModel.value).toBe(options[0]);
                expect(c.viewModel.currentText).toBe(options[0].displayName);
                expect(c.viewModel.selectableItemsElement.innerHTML).toContain("Option 1");
                expect(c.viewModel.selectableItemsElement.innerHTML).toContain("Option 2");
                expect(c.viewModel.selectableItemsElement.innerHTML).toContain("Option 3");

                done();
            });
    });

    describe("bind()", () => {
        let sut: Dropdownlist;

        beforeEach(() => {
            sut = new Dropdownlist(null, null);
        });

        it("should throw when options is null", () => {
            sut.options = null;

            expect(() => sut.bind(null, null)).toThrowError(optionsNullOrEmptyError)
        });

        it("should throw when options is an empty array", () => {
            sut.options = [];

            expect(() => sut.bind(null, null)).toThrowError(optionsNullOrEmptyError)
        });

        it("should select first option if no option is selected", () => {
            sut.options = options;
            sut.bind(null, null);

            expect(sut.value).toBe(options[0]);
            expect(sut.value.selected).toBe(true);
        });
    });

    describe("openDropdown()", () => {
        let component: TComponentTester<Dropdownlist>;

        beforeEach((done) => {
            arrange(options, options[0], true, true)
                .then(c => component = c)
                .then(() => component.viewModel.openDropDown())
                .then(result => {
                    expect(result).toBe(true);
                    done();
                });
        });

        it("gives focus to the inputElement", () => {
            expect(DOM.activeElement).toBe(component.viewModel.inputElement);
        });

        it("gives css active class to the currentItemElement", () => {
            expect(component.viewModel.currentItemElement.classList).toContain("dropdownlist__current-item--active");
        });

        it("does nothing when opened the second time in a row", (done) => {
            component.viewModel.openDropDown()
                .then(result => {
                    expect(result).toBe(false);
                    done();
                });
        });
    });

    describe("closeDropdown()", () => {
        let component: TComponentTester<Dropdownlist>;

        beforeEach((done) => {
            arrange(options, options[0], true, true)
                .then(c => component = c)
                .then(() => component.viewModel.openDropDown())
                .then(() => component.viewModel.closeDropDown())
                .then(result => {
                    expect(result).toBe(true);
                    done();
                });
        });

        it("removes focus from the inputElement", () => {
            expect(DOM.activeElement).not.toBe(component.viewModel.inputElement);
        });

        it("removes css active class from the currentItemElement", () => {
            expect(component.viewModel.currentItemElement.classList).not.toContain("dropdownlist__current-item--active");
        });

        it("does nothing when closed the second time in a row", (done) => {
            component.viewModel.closeDropDown()
                .then(result => {
                    expect(result).toBe(false);
                    done();
                });
        });
    });

    describe("toggleDropdown()", () => {
        it("always works as long as the result is awaited", (done) => {
            arrange(options, options[0], true, true)
                .then(c => c.viewModel.toggleDropDown().then(r => expect(r).toBe(true)).then(() => Bluebird.resolve(c)))
                .then(c => c.viewModel.toggleDropDown().then(r => expect(r).toBe(true)).then(() => Bluebird.resolve(c)))
                .then(c => c.viewModel.toggleDropDown().then(r => expect(r).toBe(true)).then(() => Bluebird.resolve(c)))
                .then(c => c.viewModel.toggleDropDown().then(r => expect(r).toBe(true)).then(() => Bluebird.resolve(c)))
                .then(c => {
                    c.viewModel.toggleDropDown()
                        .then(result => {
                            expect(result).toBe(true);
                            done();
                        });
                });
        });
    });

    describe("setValue()", () => {
        let component: TComponentTester<Dropdownlist>;

        beforeEach((done) => {
            arrange(options, options[0], true, true)
                .then(c => component = c)
                .then(() => component.viewModel.openDropDown())
                .then(result => {
                    expect(result).toBe(true);
                    done();
                });
        });

        it("sets the current value", (done) => {
            expect(component.viewModel.value).toBe(options[0]);

            component.viewModel.setValue(options[1])
                .then(() => {
                    expect(component.viewModel.value).toBe(options[1]);
                    done();
                });
        });

        it("closes the dropdown if it's open", (done) => {
            expect(component.viewModel.dropDownIsOpen).toBe(true);

            component.viewModel.setValue(null)
                .then(() => {
                    expect(component.viewModel.dropDownIsOpen).toBe(false);
                    done();
                });
        });

        it("leaves the current value as-is if null is passed in", (done) => {
            expect(component.viewModel.value).toBe(options[0]);

            component.viewModel.setValue(null)
                .then(() => {
                    expect(component.viewModel.value).toBe(options[0]);
                    done();
                });
        });
    });

    describe("when the Enter key is pressed", () => {
        let component: TComponentTester<Dropdownlist>;

        beforeEach((done) => {
            arrange(options, options[0], true, true)
                .then(c => component = c)
                .then(() => {
                    ;
                    done();
                });
        });

        it("setValue() is called", (done) => {
            let arg;
            spyOn(component.viewModel, "setValue").and.callFake((value) => arg = value);

            component.viewModel.rootElement.dispatchEvent(new KeyboardEvent("keyup", {
                code: "Enter"
            }));
            setTimeout(() => {

            }, 0);
            component.viewModel.setValue(options[1])
                .then(() => {
                    expect(component.viewModel.value).toBe(options[1]);
                    done();
                });
        });

        it("closes the dropdown if it's open", (done) => {
            expect(component.viewModel.dropDownIsOpen).toBe(true);

            component.viewModel.setValue(null)
                .then(() => {
                    expect(component.viewModel.dropDownIsOpen).toBe(false);
                    done();
                });
        });

        it("leaves the current value as-is if null is passed in", (done) => {
            expect(component.viewModel.value).toBe(options[0]);

            component.viewModel.setValue(null)
                .then(() => {
                    expect(component.viewModel.value).toBe(options[0]);
                    done();
                });
        });
    });
});