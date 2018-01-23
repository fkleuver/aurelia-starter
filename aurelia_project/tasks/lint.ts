import * as gulp from "gulp";
import tslint from "gulp-tslint";
import { project } from "../aurelia";

export default function lint() {
  return gulp
    .src([project.transpiler.source])
    .pipe(
      tslint({
        formatter: "prose"
      })
    )
    .pipe(tslint.report({
      emitError: false
    }));
}
