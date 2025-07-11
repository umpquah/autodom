import { mapValues, values } from "lodash";
import Entity from "./base";
import EntityBuilder from "./builder"

export default class NestedEntity extends Entity {
  static validators = [
    (spec) => (typeof spec === "object") || "format must be {...}",
  ];

  _loadSpec(spec) {
    this._components = mapValues(spec, (value, key) => 
      EntityBuilder.fromAnnotatedSpec(key, value, this, this.scope)
    );
  }   

  get value() {
    return mapValues(this._components, (component) => component.value);
  }

  get components() {
    return this._components;
  }

  refresh() {
    values(this._components).forEach((component) => {
        component.refresh();
    });
  }
}