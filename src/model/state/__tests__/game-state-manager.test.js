
import { test, expect } from 'vitest';import GameStateManager from "../game-state-manager";

test("test GameStateManager", () => {
  const spec = {
    initialStage: "stageA",
    stages: {
      stageA: {
        title: "Stage A",
        parameters: { waitTime: 5 },
        resolution: {
          wait: { duration: "= waitTime * 60" },
          next: "stageB",
        },
      },
      stageB: {
        title: "Stage B",
        parameters: { food: "pizza" },
        description: "This is stage B",
        resolution: {
          action: "=~ Eat some ${food}",
          next: "stageA",
        },
      },
    },
  };
  const expStageAState = {
    title: "Stage A",
    resolution: {
      wait: { duration: 300 },
      next: "stageB",
    },
  };
  const expStageBState = {
    title: "Stage B",
    description: "This is stage B",
    resolution: {
      action: { message: "Eat some pizza" },
      next: "stageA",
    },
  };
  const manager = new GameStateManager(spec);

  expect(manager.state).toEqual(expStageAState);
  manager.advance();
  expect(manager.state).toEqual(expStageBState);
  manager.advance();
  expect(manager.state).toEqual(expStageAState);
});