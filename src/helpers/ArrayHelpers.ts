type equalFunc<T> = (a: T, b: T) => boolean;

/**
 * Helper for working with arrays
 */
export class ArrayHelpers {
  /**
     * Convert an array to an object, for the key would be used field passed via key-parameter
     * example:
     * var array = [
             { key: 'a', value: 1 },
             { key: 'b', value: 2 },
        ];
        keyBy(array, 'key')
        // => {a: { key: 'a', value: 1 }, b: { key: 'b', value: 2 }}
     * @param array
     * @param key
     */
  static keyBy<T extends Record<K, any>, K extends keyof T>(array: readonly T[], key: K) {
    return array.reduce((map, source) => {
      map[source[key]] = source;
      return map;
    }, {} as Record<T[K], T>);
  }

  /**
     * Convert an array to an object, for the key would be used field passed via key-parameter, for value - value-parameter
     * value parameter might a string or a function
     * * var array = [
         { key: 'a', value: 1 },
         { key: 'b', value: 2 },
        ];
        keyByWith(array, 'key', 'value')
        // => {a: 1, b: 2}
        keyByWith(array, 'key', (item) => item.value * 2)
        // => {a: 2, b: 4}
     * @param array
     * @param key
     * @param value
     */
  static keyByWith(array: any[], key: string, value: string | ((item: any) => any)) {
    return array.reduce((map, source) => {
      let currentValue = {};
      if (typeof value == 'function') {
        currentValue = value(source);
      } else {
        currentValue = source[value];
      }
      map[source[key]] = currentValue;
      return map;
    }, {});
  }

  /* Returns the index of the last element in the array where predicate is true, and -1
   * otherwise.
   * @param array The element array to search in
   * @param predicate find calls predicate once for each element of the array, in descending
   * order, until it finds one where predicate returns true. If such an element is found,
   * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
   */
  static findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
    let l = array.length;
    while (l--) {
      if (predicate(array[l], l, array)) {
        return l;
      }
    }
    return -1;
  }

  /**
   * Returns intersection of two arrays
   * a = [1,2]
   * b = [1,3]
   * intersect(a,b) => [1]
   * @param a
   * @param b
   */
  static intersect<T>(a: Array<T>, b: Array<T>): Array<T> {
    return a.filter(x => b.indexOf(x) > -1);
  }

  /**
   * Returns difference of two arrays of primitives
   * a = [1,2,3]
   * b = [2,3,5]
   * difference(a,b) => [1]
   * @param a
   * @param b
   */
  static difference<T>(a: Array<T>, b: Array<T>): Array<T> {
    return a.filter(x => !b.includes(x));
  }

  /**
   * Returns difference of two arrays by comparing function
   * a = [{ name: "John Smith", age: 23 }, { name: "Mary Key", age: 18 }, { name: "Bob-small", age: 6 }]
   * b = [{ name: "John Smith", age: 24 }]
   * differenceBy(a, b, (x, y) => x.name === y.name) => [{ name: "Mary Key", age: 18 }, { name: "Bob-small", age: 6 }]
   * @param a The element array
   * @param b Array to find same elements
   * @param f Function return true if argument1 equals argument2, otherwise false
   */
  static differenceBy<T>(a: Array<T>, b: Array<T>, f: equalFunc<T>): Array<T> {
    return a.filter(x => !b.some(y => f(x, y)));
  }

  /**
   * Returns false if arrays contain different values and true otherwise
   * a = [1,2,3]
   * b = [2,3,5]
   * isSameValues(a,b) => false
   *
   * a = [1,2,2]
   * b = [1,2]
   * isSameValues(a,b) => true
   * @param a
   * @param b
   */
  static isSameValues<T>(a: Array<T>, b: Array<T>): boolean {
    return !ArrayHelpers.difference(a, b).length && !ArrayHelpers.difference(b, a).length;
  }

  /**
   * Returns array filled with unique numbers according to length
   * @param n length
   */
  static getRandomNumberArrayByLength(n: number): number[] {
    if (!n) {
      return [];
    }

    const linearArray = [];
    const randomArray = [];
    let i = 1;
    let j = n;
    let k = 1;

    while (i <= n) {
      linearArray.push(i);
      i++;
    }

    while (j--) {
      k = Math.floor(Math.random() * (j + 1));

      randomArray.push(linearArray[k]);
      linearArray.splice(k, 1);
    }

    return randomArray;
  }

  /**
   * Sum of array elements field
   * Example:
   * var array = [
   *   { key: 'a', value: 1 },
   *   { key: 'b', value: 2 },
   *   ];
   * sumBy(array, 'value')=> 3
   * @param array
   * @param field
   */
  static sumBy(array: any[], field: string): number {
    return array.reduce((accumulator, item) => (accumulator += item[field] || 0), 0);
  }
}
