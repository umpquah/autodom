import AppError from "../error";
import Scope from "../scope/scope";

export default class Entity {
  static validators = [];

  constructor(name, spec, parent = null, scope = Scope.global) {
    this.name = name;
    this.parent = parent;
    this.scope = scope;
    
    if (spec !== undefined) {
      this._validateSpec(spec);
      this._loadSpec(spec);
    }    
  }

  get value() {
    return undefined;
  }

  get _keyPath() {
    const { parent } = this;
    let path = [];
    if (parent)
      path.push(...parent._keyPath);
    if (this.name)
      path.push(this.name);
    return path;
  }

  get key() {
    const { _keyPath: path } = this;
    if (path.length <= 1)
      path.unshift("<top>");
    return path.join(".");
  }

  _validateSpec(spec) {
    this.constructor.validators.forEach((validator) => {
      const result = validator(spec);
      if (result !== true) {
          throw new AppError(this.key, result);
      }
    });
  }

  _loadSpec(spec) { }

  refresh() { }
}
