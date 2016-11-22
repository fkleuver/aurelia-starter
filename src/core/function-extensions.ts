export function configure() {
    Function.prototype.debounce = function (milliseconds, context) {
        var baseFunction = this,
            timer = null,
            wait = milliseconds;

        return function () {
            var self = context || this,
                args = arguments;

            function complete() {
                baseFunction.apply(self, args);
                timer = null;
            }

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(complete, wait);
        };
    };

    Function.prototype.throttle = function (milliseconds, context) {
        var baseFunction = this,
            lastEventTimestamp = null,
            limit = milliseconds;

        return function () {
            var self = context || this,
                args = arguments,
                now = Date.now();
            let x: Object;

            if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
                lastEventTimestamp = now;
                baseFunction.apply(self, args);
            }
        };
    };
}