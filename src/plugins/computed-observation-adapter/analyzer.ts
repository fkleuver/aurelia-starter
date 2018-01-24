import {
  AccessKeyed,
  AccessMember,
  AccessScope,
  Binary,
  CallMember,
  Conditional,
  Expression,
  ExpressionVisitor,
  LiteralPrimitive,
  LiteralString
} from "aurelia-binding";

/**
 * ExpressionVisitor that analyzes the function body of a property getter, and determines if it can be observed without dirty-checking
 */
export class Analyzer implements ExpressionVisitor {
  public canObserve: boolean;
  public reason: string;

  constructor() {
    this.canObserve = true;
    this.reason = "";
  }

  public static ANALYZE(expression: Expression): { expression: Expression; canObserve: boolean; reason: string } {
    const visitor = new Analyzer();
    expression.accept(visitor);

    return {
      expression,
      canObserve: visitor.canObserve,
      reason: visitor.reason
    };
  }

  public visitArgs(args: Expression[]): void {
    for (const arg of args) {
      arg.accept(this);
    }
  }

  public visitChain(chain: { expressions: Expression[] }): void {
    for (const expression of chain.expressions) {
      expression.accept(this);
    }
  }

  public visitValueConverter(_: Expression): void {
    // this should never happen.
  }

  public visitBindingBehavior(_: Expression): void {
    // this should never happen.
  }

  public visitAssign(assign: { target: Expression; value: Expression }): void {
    assign.target.accept(this);
    assign.value.accept(this);
  }

  public visitConditional(conditional: Conditional): void {
    conditional.condition.accept(this);
    conditional.yes.accept(this);
    conditional.no.accept(this);
  }

  public visitAccessThis(_: Expression): void {
    // this should never happen.
  }

  public visitAccessScope(access: AccessScope): void {
    if (access.name !== "this") {
      this.canObserve = false;
      this.reason += `"${access.name}" can't be accessed from the binding scope.  `;
    }
  }

  public visitAccessMember(access: AccessMember): void {
    access.object.accept(this);
  }

  public visitAccessKeyed(access: AccessKeyed): void {
    access.object.accept(this);
    access.key.accept(this);
  }

  public visitCallScope(call: { args: Expression[] }): void {
    this.visitArgs(call.args);
  }

  public visitCallFunction(call: { func: Expression; args: Expression[] }): void {
    call.func.accept(this);
    this.visitArgs(call.args);
  }

  public visitCallMember(call: CallMember): void {
    call.object.accept(this);
    this.visitArgs(call.args);
  }

  public visitPrefix(prefix: { expression: Expression }): void {
    prefix.expression.accept(this);
  }

  public visitBinary(binary: Binary): void {
    binary.left.accept(this);
    binary.right.accept(this);
  }

  public visitLiteralPrimitive(_: LiteralPrimitive): void {
    return;
  }

  public visitLiteralArray(literal: { elements: Expression[] }): void {
    for (const element of literal.elements) {
      element.accept(this);
    }
  }

  public visitLiteralObject(literal: { values: Expression[] }): void {
    for (const value of literal.values) {
      value.accept(this);
    }
  }

  public visitLiteralString(_: LiteralString): void {
    return;
  }
}
