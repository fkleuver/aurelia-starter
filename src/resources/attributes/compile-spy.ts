// Source: https://github.com/aurelia/testing/blob/master/src/compile-spy.js

import { customAttribute, TargetInstruction, PLATFORM } from "aurelia-framework";

const logger = PLATFORM.global.getLogger("compile-spy");

@customAttribute("compile-spy")
export class CompileSpy {
    constructor(element: Element, instruction: TargetInstruction) {
        logger.info(<any>element, instruction);
    }
}