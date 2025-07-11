import { StructuredEntity } from "../entity";

export default class Confirmable extends StructuredEntity {
  static requiredProps = ["message"];
  static optionalProps = ["clear", "confirmation", "fade"];

  constructor(name, spec, parent, scope){
    super(name, Confirmable._adaptSpec(spec), parent, scope)
  }

  static _adaptSpec(spec) {
    return (typeof spec === "object") ? spec : { message: spec };
  }
}