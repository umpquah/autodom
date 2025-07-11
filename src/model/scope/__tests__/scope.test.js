import { test, describe, expect } from 'vitest';
import EntityBuilder from "../../entity/builder";
import Scope from "../scope";
import { AppError } from '../../../lib';

describe("scope tests", () => {
  test("test scope functionality", () => {
    const scope = new Scope();
    scope.addOne("a", 24);
    scope.addOne("b", 42);
    scope.addOne("c", 7);
    expect(scope.names).toEqual(new Set(["a", "b", "c"]));
    expect(scope.entities).toEqual(new Set([24, 42, 7]));

    const scope2 = new Scope(scope);
    scope2.addOne("d", 100);
    expect(scope2.names).toEqual(new Set(["a", "b", "c", "d"]));
    expect(scope2.entities).toEqual(new Set([24, 42, 7, 100]));
    const attemptDuplicate = () => {
      scope.addOne("a", 100);
    };
    expect(attemptDuplicate).toThrow("'a' is already being used");
  });

  test("test expressions with scopes", () => {
    const scope = new Scope(Scope.global);
    const a = EntityBuilder.fromAnnotatedSpec("basePrice", "= 15 + 15");
    scope.addOne("basePrice", a);
    expect(a.value).toBe(30);

    const b = EntityBuilder.fromAnnotatedSpec("tax", "= 0.2 * basePrice");
    expect(() => { return b.value }).toThrow(AppError)
    
    const c = EntityBuilder.fromAnnotatedSpec("tax", "= 0.2 * basePrice", null, scope);
    expect(c.value).toBe(6);  

    const d = EntityBuilder.fromAnnotatedSpec("marbles", "= range(1, 5)", null, scope);
    for (let i = 0; i < 100; i++) {
      d.refresh();
      expect(d.value).toBeLessThanOrEqual(5);
      expect(d.value).toBeGreaterThanOrEqual(1);
    }
  });
});