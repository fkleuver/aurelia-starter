export class Analyzer {
    public canObserve: boolean;
    public reason: string;

    constructor() {
        this.canObserve = true;
        this.reason = "";
    }

    static analyze(expression) {
        let visitor = new Analyzer();
        expression.accept(visitor);
        return {
            expression: expression,
            canObserve: visitor.canObserve,
            reason: visitor.reason
        };
    }

    public visitArgs(args): void {
        for (let i = 0, length = args.length; i < length; ++i) {
            args[i].accept(this);
        }
    }

    public visitChain(chain): void {
        let expressions = chain.expressions;

        for (let i = 0, length = expressions.length; i < length; ++i) {
            expressions[i].accept(this);
        }
    }

    public visitValueConverter(converter): void {
        // this should never happen.
    }

    public visitBindingBehavior(behavior): void {
        // this should never happen.
    }

    public visitAssign(assign): void {
        assign.target.accept(this);
        assign.value.accept(this);
    }

    public visitConditional(conditional): void {
        conditional.condition.accept(this);
        conditional.yes.accept(this);
        conditional.no.accept(this);
    }

    public visitAccessThis(access): void {
        // this should never happen.
    }

    public visitAccessScope(access): void {
        if (access.name !== "this") {
            this.canObserve = false;
            this.reason += `"${access.name}" can't be accessed from the binding scope.  `;
        }
    }

    public visitAccessMember(access): void {
        access.object.accept(this);
    }

    public visitAccessKeyed(access): void {
        access.object.accept(this);
        access.key.accept(this);
    }

    public visitCallScope(call): void {
        this.visitArgs(call.args);
    }

    public visitCallFunction(call): void {
        call.func.accept(this);
        this.visitArgs(call.args);
    }

    public visitCallMember(call): void {
        call.object.accept(this);
        this.visitArgs(call.args);
    }

    public visitPrefix(prefix): void {
        prefix.expression.accept(this);
    }

    public visitBinary(binary): void {
        binary.left.accept(this);
        binary.right.accept(this);
    }

    public visitLiteralPrimitive(literal): void {
    }

    public visitLiteralArray(literal): void {
        let elements = literal.elements;
        for (let i = 0, length = elements.length; i < length; ++i) {
            elements[i].accept(this);
        }
    }

    public visitLiteralObject(literal): void {
        let keys = literal.keys;
        let values = literal.values;

        for (let i = 0, length = keys.length; i < length; ++i) {
            values[i].accept(this);
        }
    }

    public visitLiteralString(literal): void {
    }
}