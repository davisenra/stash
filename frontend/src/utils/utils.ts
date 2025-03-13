type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type SnakeToCamel<T> =
  T extends Array<infer U>
    ? Array<SnakeToCamel<U>>
    : T extends object
      ? {
          [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamel<T[K]>;
        }
      : T;

function snakeToCamel<T>(obj: T): SnakeToCamel<T> {
  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item)) as SnakeToCamel<T>;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      ) as SnakeToCamelCase<typeof key>;
      acc[camelKey] = snakeToCamel((obj as any)[key]);
      return acc;
    }, {} as any);
  }
  return obj as SnakeToCamel<T>;
}

export { snakeToCamel };
