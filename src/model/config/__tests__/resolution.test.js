import { test, expect } from 'vitest';
import Resolution from "../resolution";
import Scope from "../../scope/scope"

test("test Resolution validation", () => {
  expect(() => new Resolution(
    "resolution",
    {
        action: "Do something",
        wait: { duration: 5 },
    },
  )).toThrow("resolution: missing required 'next' entry");

  expect(() => new Resolution(
    "resolution",
    {
        action: "Do something",
        wait: { duration: 5 },
        next: "next",
    },
  )).toThrow("resolution: action and wait cannot be used together");

  expect(() => new Resolution(
    "resolution",
    {
        wait: { hidden: true },
        next: "next",
    },
  )).toThrow("resolution.wait: missing required 'duration' entry");

  expect(() => new Resolution(
    "resolution",
    {
        wait: { hidden: true },
        next: "next",
    },
  )).toThrow("resolution.wait: missing required 'duration' entry");

  expect(() => new Resolution(
    "resolution",
    {
        next: "next",
    },
  )).toThrow("resolution: must specify at least one of action or wait");

  expect(() => new Resolution(
    "resolution",
    {
        next: "next",
        cake: "yum",
    },
    null,
    Scope.globalScope,
  )).toThrow("resolution: 'cake' not allowed here");
});

test("test Resolution structure", () => {
  const r = new Resolution(
    "resolution",
    {
        next: "next",
        action: { message: "Do something", confirmation: "Doing it"},
        clearStages: true,
    },
  );
  expect(r.value).toEqual(
    {
        next: "next",
        action: { message: "Do something", confirmation: "Doing it"},
        clearStages: true,
    }
  );
});
