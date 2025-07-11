import AppError from "../error";
import Stages from "./stages";
import StructuredWithParameters from "./parameters";


export default class GameConfig extends StructuredWithParameters {
  static requiredProps = ["stages", "initialStage"];
  static optionalProps = ["parameters"];
  static subEntityTypes = {
    stages: Stages
  };

  constructor(spec) {
    super(null, spec);
  }

  get initialStage() {
    return this.value.initialStage;
  }

  get stages() {
    return this.value.stages;
  }

  _validateSpec(spec) {
    super._validateSpec(spec);
    if (!(spec.initialStage in spec.stages))
      throw new AppError(this.key, `initial stage '${spec.initialStage}' not found in stages`);
  }

  _loadSpec(spec) {
    super._loadSpec(spec);
    this.stageEntities = this._components.stages._components;
  }
}
