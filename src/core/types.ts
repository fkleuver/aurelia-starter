const _typeof = {
    number: "number",
    string: "string",
    undefined: "undefined",
    object: "object",
    function: "function"
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isArray(array: any): array is any[] {
    if (Array.isArray) {
        return Array.isArray(array);
    }

    if (array && typeof (array.length) === _typeof.number && array.constructor === Array) {
        return true;
    }

    return false;
}

export function isString(str: any): str is string {
    if (typeof (str) === _typeof.string || str instanceof String) {
        return true;
    }

    return false;
}

export function isStringArray(value: any): value is string[] {
    return isArray(value) && (<any[]>value).every(elem => isString(elem));
}

export function isObject(obj: any): boolean {
    return typeof obj === _typeof.object
        && obj !== null
        && !Array.isArray(obj)
        && !(obj instanceof RegExp)
        && !(obj instanceof Date);
}

export function isNumber(obj: any): obj is number {
    if ((typeof (obj) === _typeof.number || obj instanceof Number) && !isNaN(obj)) {
        return true;
    }

    return false;
}

export function isBoolean(obj: any): obj is boolean {
    return obj === true || obj === false;
}

export function isUndefined(obj: any): boolean {
    return typeof (obj) === _typeof.undefined;
}

export function isUndefinedOrNull(obj: any): boolean {
    return isUndefined(obj) || obj === null;
}

export function isEmptyObject(obj: any): obj is any {
    if (!isObject(obj)) {
        return false;
    }

    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
}

export function isFunction(obj: any): obj is Function {
    return typeof obj === _typeof.function;
}