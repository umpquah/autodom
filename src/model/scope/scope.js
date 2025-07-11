import { entries, keys } from "lodash";
import { AppError, RESERVED_WORDS } from "../../lib";
import BUILTINS from "./builtins";
import { Literal } from "../entity/expression";

export default class Scope {
  constructor(enclosingScope = null) {
    this._enclosingScope = enclosingScope;
    this._entityMap = new Map();
  }

  addOne(name, entity) {

    if (this.names.has(name)) {
      if (keys(BUILTINS).includes(name))
        throw new AppError(entity.key, `'${name}' is a built-in function and cannot be used`);
      throw new AppError(entity.key, `'${name}' is already being used`);
    }
    if (RESERVED_WORDS.includes(name))
      throw new AppError(entity.key, `'${name}' is reserved and cannot be used`);
    this._entityMap.set(name, entity);
  }

  add(entityMap) {
    Object.entries(entityMap).forEach(([name, entity]) => {
      this.addOne(name, entity);
    });
  }

  get innermostNames() {
    return new Set(this._entityMap.keys());
  }

  get innermostEntities() {
    return new Set(this._entityMap.values());
  }

  get names() {
    return this._enclosingScope
      ? new Set([...this.innermostNames, ...this._enclosingScope.names])
      : this.innermostNames;
  }

  get entities() {
    return this._enclosingScope
      ? new Set([...this.innermostEntities, ...this._enclosingScope.entities]) 
      : this.innermostEntities;
  }

  createInnerScope() {
    return new Scope(this);
  }

  static _globalScope;

  static get global() {
    if(!Scope._globalScope) {
      Scope._globalScope = new Scope();
      entries(BUILTINS).forEach(([name, fn]) => {
        Scope._globalScope.addOne(name, new Literal(name, fn, null));
      });
    }
    return Scope._globalScope;
  }
}
