import { test, expect } from 'vitest';
import GameConfig from "../game-config";

test("test GameConfig validation", () => {
  expect(() => new GameConfig({
    stages: {
      a: {},
      b: {}
    },
  })).toThrow("<top>: missing required 'initialStage' entry");

  expect(() => new GameConfig({
    initialStage: "a",
  })).toThrow("<top>: missing required 'stages' entry");

  expect(() => new GameConfig({
    initialStage: "x",
    stages: {
      a: {},
      b: {},
    },
  })).toThrow("<top>: initial stage 'x' not found in stages");

  expect(() => new GameConfig({
    initialStage: "a",
    stages: {
      a: {},
      b: {},
    },
  })).toThrow("stages.a: missing required 'title' entry");

  expect(() => new GameConfig({
    initialStage: "a",
    stages: {
      a: {
        title: "Stage A",
        resolution: {
          next: "c",
          wait: { hidden: true },
        }
      },
    },
  })).toThrow("stages.a.resolution.wait: missing required 'duration' entry");
});

test("test GameConfig structure", () => {
  const g = new GameConfig({
    initialStage: "a",
    stages: {
      a: {
        title: "Stage A",
        description: "This is stage A",
        resolution: {
          next: "c",
          action: "Some action",
        }
      },
      b: {
        title: "Stage B",
        description: "This is stage B",
        resolution: {
          next: "d",
          wait: { duration: 5 },
        }
      },
    },
  });
  expect(g.key).toBe("<top>");
  expect(g.initialStage).toBe("a");
  expect(g.stages).toEqual({
    a: {
      title: "Stage A",
      description: "This is stage A",
      resolution: {
        next: "c",
        action: { message: "Some action" }
      }
    },
    b: {
      title: "Stage B",
      description: "This is stage B",
      resolution: {
        next: "d",
        wait: { duration: 5 },
      }
    },
  });
});

test("test GameConfig with params in stages", () => {
  const g = new GameConfig({
    initialStage: "a",
    stages: {
      a: {
        title: "Stage A",
        description: "This is stage A",
        parameters: [
          { x: 6, y: 7 },
          { z: "=x * y"},
        ],
        resolution: {
          next: "c",
          action: "=~ You win ${z} things",
        }
      },
      b: {
        title: "Stage B",
        description: "This is stage B",
        parameters: [
          { x: 6, y: 7 },
          { z: "=x + y"},
          { minutes: "= z * 2"}
        ],
        resolution: {
          next: "d",
          wait: { duration: "=minutes * 60" },
        }
      },
    },
  });
  expect(g.stages).toEqual({
    a: {
      title: "Stage A",
      description: "This is stage A",
      resolution: {
        next: "c",
        action: { message: "You win 42 things" }
      }
    },
    b: {
      title: "Stage B",
      description: "This is stage B",
      resolution: {
        next: "d",
        wait: { duration: (6 + 7) * 2 * 60 },
      }
    },
  });
});

test("test GameConfig with top-level params", () => {
  const g = new GameConfig({
    initialStage: "a",
    parameters: {
      finalStage: "c",
      prizes: "cakes",
      verb: "eat",
      confirmPhrase: "done eating"
    },
    stages: {
      a: {
        title: "Stage A",
        description: "This is stage A",
        parameters: [
          { x: 6, y: 7 },
          { z: "=x * y"},
          { prizePhrase: "=~ ${z} ${prizes}"}
        ],
        resolution: {
          next: "=finalStage",
          action: {
            message: "=~ Now ${verb} your ${prizePhrase}",
            confirmation: "=~ ${confirmPhrase}",
          },
        },
      },
    }
  });
  expect(g.stages).toEqual({
    a: {
      title: "Stage A",
      description: "This is stage A",
      resolution: {
        next: "c",
        action: { message: "Now eat your 42 cakes", confirmation: "done eating" }
      }
    },
  });
});