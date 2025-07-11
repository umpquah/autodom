import { test, expect } from 'vitest';
import Stage from "../stage";

test("test Stage", () => {
  const stage = new Stage(
    "stage",
    {
      title: "Test Stage",
      description: "This is a test stage.",
      parameters: [
        { a: 6, b: 7 },
        { combo: "=a*b" },
      ],
      preamble: {
        message: "Welcome to the test stage.",
        confirmation: "Continue",
      },
      resolution: { 
        wait: { duration: "=a + b" },
        next: "nextStage" 
      },
    },
    null,
  );
  
  expect(stage.value).toEqual({
    title: "Test Stage",
    description: "This is a test stage.",
    preamble: {
      message: "Welcome to the test stage.",
      confirmation: "Continue",
    },
    resolution: {
      wait: { duration: 13 },
      next: "nextStage",
    },
  });
});