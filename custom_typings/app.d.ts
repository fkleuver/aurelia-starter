declare var Element: {
  prototype: Element;
  new (): Element;
}

interface Function {
  /**
 * debounce
 * @param {integer} milliseconds This param indicates the number of milliseconds
 *     to wait after the last call before calling the original function.
 * @param {object} What "this" refers to in the returned function.
 * @return {function} This returns a function that when called will wait the
 *     indicated number of milliseconds after the last call before
 *     calling the original function.
 */
  debounce(milliseconds: number, context: any): Function;

  /**
  * throttle
  * @param {integer} milliseconds This param indicates the number of milliseconds
  *     to wait between calls before calling the original function.
  * @param {object} What "this" refers to in the returned function.
  * @return {function} This returns a function that when called will wait the
  *     indicated number of milliseconds between calls before
  *     calling the original function.
  */
  throttle(milliseconds: number, context: any): Function;
}