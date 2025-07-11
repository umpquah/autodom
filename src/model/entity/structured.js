import { keys, omit, toPairs } from "lodash";
import AppError from "../error";
import { smartJoin } from "../../lib/util";
import EntityBuilder from "./builder";
import NestedEntity from "./nested";

export default class StructuredEntity extends NestedEntity {
  static requiredProps = [];
  static optionalProps = [];
  static get allProps() { return this.requiredProps.concat(this.optionalProps); }
  static mutexProps = []; // list of sets of mutually exclusive properties
  static needOneOf = []; // list of sets of properties where at least one must be present
  
  static subEntityTypes = {};
  static defaultSubEntityType = undefined;
  static specialProps;

  _validateSpec(spec) {
    if (typeof spec !== "object") {
        throw new AppError(this.key, "format must be { ... }");
    }
    const { allProps, requiredProps, mutexProps, needOneOf } = this.constructor;
    if (allProps.length === 0)
        return;
    requiredProps.forEach((prop) => {
        if (!(prop in spec))
            throw new AppError(this.key, `missing required '${prop}' entry`);
    });
    keys(spec).forEach((prop) => {
      if (!allProps.includes(prop)) 
          throw new AppError(this.key, `'${prop}' not allowed here`);
    });
    mutexProps.forEach((mutexPropSet) => {
      const present = mutexPropSet.filter((prop) => prop in spec);
      if (present.length > 1)
        throw new AppError(this.key, `${smartJoin(present, "and")} cannot be used together`);
    });
    needOneOf.forEach((needSet) => {
      const present = needSet.filter((prop) => prop in spec);
      if (present.length === 0)
        throw new AppError(this.key, `must specify at least one of ${smartJoin(needSet, 'or')}`);
    });
  }

  _loadSpec(spec) {
    this._components = {};
    this._handleSpecialProps(spec);
    const remainingSpec = omit(spec, this.constructor.specialProps);
    const { subEntityTypes, defaultSubEntityType } = this.constructor;
    toPairs(remainingSpec).forEach(([subKey, subSpec]) => {
      const entityClass = subEntityTypes[subKey];
      const subEntity = 
        entityClass 
        ? new entityClass(subKey, subSpec, this, this.scope)
        : defaultSubEntityType
          ? new defaultSubEntityType(subKey, subSpec, this, this.scope)
          : EntityBuilder.fromAnnotatedSpec(subKey, subSpec, this, this.scope); 
      this._components[subKey] = subEntity;
    });
  }

  _handleSpecialProps(spec) { }
}