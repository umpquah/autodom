import AppError from "../error";
import { GameConfig } from "../config";

export default class GameStateManager {
  constructor(gameConfigSpec) {
    this.config = new GameConfig(gameConfigSpec);
    this.reset();
  }

  _loadStage(stageKey) {
    const stage = this.config.stages[stageKey];
    if (!stage)
      throw new AppError(stage.key, `next stage '${stageKey}' not found`);
    this.config.stageEntities[stageKey].refresh();
    this.state = stage;
  }

  get allStages() {
    return this.config.stages;
  }

  reset() {
    this._loadStage(this.config.initialStage);
  }

  advance() {
    const { resolution: { next } } = this.state;
    this._loadStage(next);
    return this.state;
  }
}