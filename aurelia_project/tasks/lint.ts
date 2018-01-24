import * as gulp from "gulp";
import gulpTslint from "gulp-tslint";
import * as tslint from "tslint";
import { project } from "../aurelia";

export default function lint() {
  const program = tslint.Linter.createProgram("./tsconfig.json");

  return gulp
    .src([project.transpiler.source], { base: "." })
    .pipe(
      gulpTslint({
        formatter: "prose",
        program
      })
    )
    .pipe(
      gulpTslint.report({
        emitError: false
      })
    );
}
