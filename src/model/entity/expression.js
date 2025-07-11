import { map } from "lodash";
import { AppError } from "../../lib";
import Entity from "./base";

export class Literal extends Entity {
  _loadSpec(spec) {
    this._value = spec;
  }

  get value() {
    return this._value;
  }
}

export class Expression extends Entity {
  _loadSpec(spec) {
    // eslint-disable-next-line no-new-func
    this._fn = new Function(...this.scope.names, "return " + spec + ";"); 
    this._value = undefined;
  }

  _calcValue() {
    return this._fn(...(map([...this.scope.entities], (entity) => entity.value)));
  }

  get value() {
    if (this._value === undefined) {
      try {
        this._value = this._calcValue();
      } catch (err) {
        if (err instanceof ReferenceError || err instanceof TypeError) {
          throw new AppError(this.key, err.message);
        } else {
          throw err;
        }
      }
    }
    return this._value;
  }

  refresh() {
    this._value = undefined;
    this.scope.entities.forEach((entity) => {
      entity.refresh();
    });
  }
}

export class StringExpression extends Expression {
  constructor(name, spec, parent, scope) {
    super(name, "`" + spec + "`", parent, scope);
  }
}
