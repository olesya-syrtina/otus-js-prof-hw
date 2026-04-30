class DeepEqualEngine {
  constructor() {
    this.comparators = [
      new PrimitiveComparator(),
      new ArrayComparator(),
      new ObjectComparator(),
    ];
    this.visited = new WeakSet();
  }

  deepEqual(a, b) {
    // Проверка на циклические ссылки
    if (typeof a === "object" && a !== null) {
      if (this.visited.has(a)) {
        return a === b;
      }
      this.visited.add(a);
    }

    // Поиск подходящего компаратора
    const comparator = this.findComparator(a);
    if (!comparator) {
      throw new Error(`Не найден компаратор для типа: ${typeof a}`);
    }

    return comparator.compare(a, b, this);
  }

  findComparator(value) {
    return this.comparators.find((comp) => comp.canHandle(value));
  }

  // Метод для добавления новых компараторов
  addComparator(comparator) {
    if (!(comparator instanceof Comparator)) {
      throw new Error("Компаратор должен наследоваться от класса Comparator");
    }
    this.comparators.unshift(comparator); // добавляем в начало для приоритета
  }
}

// Абстрактный базовый класс для сравнения
class Comparator {
  compare(a, b) {
    throw new Error("Метод compare должен быть переопределен");
  }

  canHandle(value) {
    throw new Error("Метод canHandle должен быть переопределен");
  }
}

// Сравнение примитивных типов
class PrimitiveComparator extends Comparator {
  canHandle(value) {
    return value == null || typeof value !== "object";
  }

  compare(a, b) {
    return a === b;
  }
}

// Сравнение массивов
class ArrayComparator extends Comparator {
  canHandle(value) {
    return Array.isArray(value);
  }

  compare(a, b, context) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    return a.every((item, index) => context.deepEqual(item, b[index]));
  }
}

// Сравнение объектов
class ObjectComparator extends Comparator {
  canHandle(value) {
    return value != null && typeof value === "object" && !Array.isArray(value);
  }

  compare(a, b, context) {
    if (typeof b !== "object" || b == null || Array.isArray(b)) {
      return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(
      (key) => keysB.includes(key) && context.deepEqual(a[key], b[key])
    );
  }
}

module.exports = DeepEqualEngine;