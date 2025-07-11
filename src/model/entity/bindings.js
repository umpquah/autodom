import { assign, mapValues, size } from "lodash";
import EntityBuilder from "./builder";
import NestedEntity from "./nested";

export default class Bindings extends NestedEntity {
  // ParameterGroup is special case of NestedEntity.
  // After loading and validating, the components are also
  // added to an inner scope, which is then returned
  static validators = [
    (spec) => (
      Array.isArray(spec) && spec.length > 0
      || typeof spec === "object" && size(spec) > 0
      || "must be non-empty {...} or [...]"
    )
  ];

  _loadSpec(spec) {
    this._components = {};
    if (Array.isArray(spec))
      this.innerScope = this._loadListSpec(spec, this.scope);
    else
      this.innerScope = this._loadGroupSpec(spec, this.scope);
  }

  _loadGroupSpec(spec, scope) {
    const groupComponents = mapValues(spec, (value, key) => 
      EntityBuilder.fromAnnotatedSpec(key, value, this, scope)
    );
    const innerScope = scope.createInnerScope();
    innerScope.add(groupComponents);
    assign(this._components, groupComponents);
    return innerScope;
  }

  _loadListSpec(spec, scope) {
    let lastScope = scope;
    spec.forEach((groupSpec) => {
      lastScope = this._loadGroupSpec(groupSpec, lastScope);
    });
    return lastScope;
  }
}