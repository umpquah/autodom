import { Literal, Expression, StringExpression } from "./expression"
import NestedEntity from "./nested";

export default class EntityBuilder {
  static fromAnnotatedSpec(name, spec, parent, scope) {
    if (typeof spec === "string") {
      if (spec.length >= 2 && spec.substring(0, 2) === "=~")
        return new StringExpression(name, spec.replace(/^=~ */, ""), parent, scope);
      else if (spec.length >= 1 && spec[0] === "=")
        return new Expression(name, spec.replace(/^= */, ""), parent, scope);
    } else if (typeof spec === "object" && !Array.isArray(spec)) {
      return new NestedEntity(name, spec, parent, scope);
    }
    return new Literal(name, spec, parent, scope);
  } 
}

