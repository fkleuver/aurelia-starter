import * as Types from "../../core/types";
import * as moment from "moment";
import { valueConverter } from "aurelia-framework";

@valueConverter("sort")
export class Sort {
    public toView(arr: Array<any>, propertyName: string, comparison = "ordinalIgnoreCase", direction = "ascending"): Array<any> {
        if (!Types.isArray(arr)) {
            return arr;
        }
        if (arr.length === 0) {
            return arr;
        }

        let directionFactor = direction === "ascending" ? 1 : -1;
        let comparer = this[comparison + "Comparison"];

        if (propertyName === undefined) {
            return arr.sort((a, b) => comparer(a, b) * directionFactor);
        }

        return arr.sort((a, b) => comparer(a[propertyName], b[propertyName]) * directionFactor);
    }

    private ordinalIgnoreCaseComparison(a: string, b: string): number {
        if (Types.isUndefinedOrNull(a) && Types.isUndefinedOrNull(b)) return 0;
        if (Types.isUndefinedOrNull(a)) return -1;
        if (Types.isUndefinedOrNull(b)) return 1;

        a = a.toString().toLowerCase();
        b = b.toString().toLowerCase();

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }

        return 0;
    }

    private ordinalComparison(a: string, b: string): number {
        if (Types.isUndefinedOrNull(a) && Types.isUndefinedOrNull(b)) return 0;
        if (Types.isUndefinedOrNull(a)) return -1;
        if (Types.isUndefinedOrNull(b)) return 1;

        a = a.toString();
        b = b.toString();

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }

        return 0;
    }

    private dateComparison(a: number, b: number): number {
        if (Types.isUndefinedOrNull(a) && Types.isUndefinedOrNull(b)) return 0;
        if (Types.isUndefinedOrNull(a)) return -1;
        if (Types.isUndefinedOrNull(b)) return 1;

        return moment(b).diff(moment(a));
    }

    private numberComparison(a: number, b: number): number {
        if (Types.isUndefinedOrNull(a) && Types.isUndefinedOrNull(b)) return 0;
        if (Types.isUndefinedOrNull(a)) return -1;
        if (Types.isUndefinedOrNull(b)) return 1;

        return a - b;
    }
}