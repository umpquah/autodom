import { test, expect } from 'vitest';
import EntityBuilder from "../builder";
import { Expression, Literal, StringExpression  }from "../expression";
import NestedEntity from "../nested";

test('test literals', () => {
    const a = new Literal("answer", 24);
    const b = new Literal("dessert", "cake");
    expect(a.key).toBe("<top>.answer");
    expect(a.value).toBe(24);
    expect(b.key).toBe("<top>.dessert");
    expect(b.value).toBe("cake");
});

test('test expression', () => {
    const a = new Expression("total", "10 + 7");
    const b = new Expression("gimme", "`Give me ${2 + 3} cookies.`");
    const d = new StringExpression("count", "There are ${2 + 3} lights!");
    expect(a.value).toBe(17);
    expect(b.value).toBe("Give me 5 cookies.");
    expect(d.value).toBe("There are 5 lights!");
});

test('test expression with parent', () => {
    const a = new Expression("foo", 1);
    const b = new Expression("bar", 2, a);
    const c = new Expression("baz", 3, b);
    expect(a.key).toBe("<top>.foo");
    expect(b.key).toBe("foo.bar");
    expect(c.key).toBe("foo.bar.baz");
});

test('test annotated spec', () => {
    const a = EntityBuilder.fromAnnotatedSpec("foo", "cake");
    const b = EntityBuilder.fromAnnotatedSpec("bar", "= 1 + 2");
    const c = EntityBuilder.fromAnnotatedSpec("baz", "=~ The answer is ${6 * 7}.");
    expect(a instanceof Literal).toBe(true);
    expect(b instanceof Expression).toBe(true);
    expect(c instanceof StringExpression).toBe(true);
    expect(a.value).toBe("cake");
    expect(b.value).toBe(3);
    expect(c.value).toBe("The answer is 42.");
});

test('test nested spec', () => {
  const badSpec = () => { return new NestedEntity("foo", ""); };
  expect(badSpec).toThrow("foo: format must be {...}");
  const nested = new NestedEntity(
    "game",
    {
      result: {
        banner: "Congratulations!",
        score: "= 6 * 7",
        message: "=~ You get ${6 * 7} points",
      },
      stage: 17,
    }
  );
  expect(nested.value).toEqual({
    result: {
      banner: "Congratulations!",
      score: 42,
      message: "You get 42 points",
    },
    stage: 17,
  });
});