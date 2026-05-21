import deepEqual from "./deepEqual";

describe("deepEqual — базовые проверки", () => {

  test("ошибка при превышении максимальной глубины", () => {
  const obj1 = {
    a: {
      b: {
        c: {
          d: 1,
        },
      },
    },
  };

  const obj2 = {
    a: {
      b: {
        c: {
          d: 1,
        },
      },
    },
  };

  expect(() =>
    deepEqual(obj1, obj2, { maxDepth: 2 })
  ).toThrow("Максимальная глубина достигнута");
  });

  test("сравнение разных примитивов", () => {
    expect(deepEqual(1, 5)).toBe(false);
  });

  test("сравнение простых объектов", () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
  });

  test("сравнение вложенных объектов", () => {
    expect(
      deepEqual({ a: { b: 2 } }, { a: { b: 2 } })
    ).toBe(true);
  });

  test("сравнение массивов с разными значениями", () => {
    expect(deepEqual([1, 2, 3], [1, 2, 12])).toBe(false);
  });

});