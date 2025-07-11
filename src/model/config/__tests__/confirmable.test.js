import { test, expect } from 'vitest';
import Confirmable from "../confirmable";
import Scope from "../../scope/scope";

test("test Confirmable", () => {
  const confirmable = new Confirmable(
    "action",
    {
      message: "Are you sure?",
      confirmation: "yes",
    },
      null,
      Scope.globalScope
    );
  expect(confirmable.key).toBe("<top>.action");
  expect(confirmable.value).toEqual({
    message: "Are you sure?",
    confirmation: "yes",
  });

  const confirmable2 = new Confirmable(
    "prepare",
    "Get ready",
    null,
    Scope.globalScope,
  );
  expect(confirmable2.key).toBe("<top>.prepare");
  expect(confirmable2.value).toEqual({
    message: "Get ready",
  });
});

test("test Confirmable bad specs", () => {
  expect(() => {
    new Confirmable(
      "action",
      { confirmation: "Ok"},
      null,
      Scope.globalScope,
    );
  }).toThrow("action: missing required 'message' entry");

  expect(() => {
    new Confirmable(
      "action",
      { message: "Do the thing", extra: "extra"},
      null,
      Scope.globalScope,
    );
  }).toThrow("action: 'extra' not allowed here");
});