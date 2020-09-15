export function awaitWrapper<T, U = any>(promise: Promise<T>) {
  return promise
    .then<[null, T]>((res: T) => [null, res])
    .catch<[U, null]>((err) => [err, null]);
}

export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];