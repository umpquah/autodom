import { test, expect } from 'vitest';
import Bindings from "../bindings";
import Scope from "../../scope/scope";
import { AppError } from '../../../lib';

test("test Bindings with single group", () => {
  const params = new Bindings(
    "parameters",
    {
      a: 42,
      b: "=range(17, 17)",
      c: "=select(['cake'])"
    },
  );
  expect(params.key).toBe("<top>.parameters");
  const vars = params._components;
  expect(vars["a"].key).toBe("parameters.a");
  expect(vars["b"].key).toBe("parameters.b");
  expect(vars["c"].key).toBe("parameters.c");
  expect(vars["a"].value).toBe(42);
  expect(vars["b"].value).toBe(17);
  expect(vars["c"].value).toBe("cake");
  expect(params.value).toEqual({
    a: 42,
    b: 17,
    c: "cake"
  });
});

test("test Bindings with bad spec", () => {
  const badSpec = () => { return new Bindings("parameters", 1234); };
  expect(badSpec).toThrow("parameters: must be non-empty {...} or [...]");
});

test("test Bindings group cannot reference internally", () => {
  const params = new Bindings(
    "parameters",
    {
      a: 42,
      b: "=a * 10",
    },
    null,
    Scope.globalScope,
  );
  expect(() => { return params.value }).toThrow(AppError);
});

test("test Bindings with list of groups", () => {
  const params = new Bindings(
    "parameters",
    [
      {
        a: 6,
        b: 7,
      },
      {
        c: "= a + b",
        d: "= a * b"
      },
      {
        e: "=a * c",
        f: "=d / a",
      }
    ],
    null,
    Scope.globalScope,
  );
  expect(params.value).toEqual({
    a: 6,
    b: 7,
    c: 13,
    d: 42,
    e: 78,
    f: 7,
  });
  expect(params.value.d).toBe(42);
  expect(params.value.f).toBe(7);
  expect(params._components.a.key).toBe("parameters.a");
  expect(params._components.f.key).toBe("parameters.f");
});

  test("test Bindings groups in list cannot be out of order", () => {
  const params = new Bindings(
    "parameters",
    [
      {
        c: "= a + b",
        d: "= a * b"
      },
      {
        a: 6,
        b: 7,
      },
    ],
    null,
    Scope.globalScope,
  );
  expect(() => params.value.c).toThrow(AppError);
});
  