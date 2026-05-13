type Primitive = string | number | boolean | null | undefined;
type DeepEqualValue = Primitive | object;

interface DeepEqualOptions {
  strict?: boolean;
  ignoreArrayOrder?: boolean;
  maxDepth?: number;
}

interface ComparisonContext {
  visited: WeakSet<object>;
  depth: number;
  maxDepth: number;
  options: DeepEqualOptions;
}

interface Comparator<T> {
  compare(a: T, b: T, context: ComparisonContext): boolean;
}

function deepEqual<T extends DeepEqualValue>(
  a: T,
  b: T,
  options: DeepEqualOptions = {},
  context?: ComparisonContext
    ): boolean {
    const currentContext: ComparisonContext =
    context ??
    {
      visited: new WeakSet(),
      depth: 0,
      maxDepth: options.maxDepth ?? 100,
      options,
    }

  // Примитивы
  if (a === b) return true;

  // null / undefined
  if (a == null || b == null) return a === b;

  // Проверка типов
  if (typeof a !== typeof b) return false;

  // Не объекты
  if (typeof a !== "object" || typeof b !== "object") {
    return options.strict ? a === b : a == b;
  }

  // Проверка глубины
  if (currentContext.depth > currentContext.maxDepth) {
    throw new Error("Максимальная глубина достигнута");
  }

  // Циклические ссылки
  if (currentContext.visited.has(a as object)) {
    return true;
  }

  currentContext.visited.add(a as object);

  const nextContext: ComparisonContext = {
    ...currentContext,
    depth: currentContext.depth + 1,
  };

  // Массивы
  if (Array.isArray(a) && Array.isArray(b)) {
    const comparator = new ArrayComparator();

    return comparator.compare(a, b, nextContext);
  }

  // Объекты
  const comparator = new PlainObjectComparator();

  return comparator.compare(
    a as Record<string, any>,
    b as Record<string, any>,
    nextContext
  );
}

class ArrayComparator implements Comparator<any[]> {
  compare(
    a: any[],
    b: any[],
    context: ComparisonContext
  ): boolean {
    if (a.length !== b.length) return false;

    // ignoreArrayOrder
    if (context.options.ignoreArrayOrder) {
      return a.every((itemA) =>
        b.some((itemB) =>
          deepEqual(itemA, itemB, context.options, context)
        )
      );
    }

    return a.every((item, index) =>
      deepEqual(item, b[index], context.options, context)
    );
  }
}

class PlainObjectComparator implements Comparator<Record<string, any>> {
  compare(
    a: Record<string, any>,
    b: Record<string, any>,
    context: ComparisonContext
  ): boolean {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(
      (key) =>
        keysB.includes(key) &&
        deepEqual(a[key], b[key], context.options, context)
    );
  }
}

export default deepEqual;