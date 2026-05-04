const DeepEqualEngine = require('./deepEqual');

test('примитивы равны', () => {
  const engine = new DeepEqualEngine();
  expect(engine.deepEqual(1, 1)).toBe(true);
});

test('примитивы не равны', () => {
  const engine = new DeepEqualEngine();
  expect(engine.deepEqual(1, 2)).toBe(false);
});

test('массивы равны', () => {
  const engine = new DeepEqualEngine();
  expect(engine.deepEqual([1,2], [1,2])).toBe(true);
});

test('массивы не равны', () => {
  const engine = new DeepEqualEngine();
  expect(engine.deepEqual([1,2], [1])).toBe(false);
});

test('объекты  равны', () => {
  const objA = {
    "name": "Cat",
    "age": 8
  }
    const objB = {
    "name": "Cat",
    "age": 8
  }
  const engine = new DeepEqualEngine();
  expect(engine.deepEqual(objA, objB)).toBe(true);
});

test('объекты не равны', () => {
  const objA = {
    "name": "Cat",
    "age": 8
  }
    const objB = {
    "age": 8
  }
  const engine = new DeepEqualEngine();
  expect(engine.deepEqual(objA, objB)).toBe(false);
});