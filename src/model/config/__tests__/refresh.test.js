import { test, expect } from 'vitest';
import { range } from "lodash";
import Stage from "../stage";

test("test refresh Stage", () => {
  const items = range(100).map((i) => `item${i}`);
  const s = new Stage(
    "stageA",
    {
      title: "Stage A",
      parameters: [
        { items: items },
        { 
          waitTime: "=range(1, 100)",
          prize: "=select(items)",
        },
      ],
      resolution: {
        wait: { duration: "= waitTime * 60" },
        next: "nextStage"
      },
    },
  );
  const results = [];
  range(50).forEach(() => {
    s.refresh();
    results.push(s.value);
  });
  const durations = new Set(results.map((r) => r.resolution.wait.duration));
  expect(durations.size).toBeGreaterThan(1);
});
