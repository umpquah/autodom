import { test, expect } from 'vitest';
import Scope from "../../scope/scope"
import Wait from "../wait";

test("test Wait", () => {
  const wait = new Wait(
    "wait",
    {
      duration: 99,
      hidden: true,
    },
    null,
    Scope.globalScope,
  );
  expect(wait.key).toBe("<top>.wait");
  expect(wait.value).toEqual(
    {
      duration: 99,
      hidden: true,
    }
  );
});

test("test Wait with bad specs", () => {
  expect(() => {
    new Wait(
      "wait",
      { hidden: false },
      null,
      Scope.globalScope
    );
  }).toThrow("wait: missing required 'duration' entry");
});