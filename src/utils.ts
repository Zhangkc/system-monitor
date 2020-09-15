export function awaitWrapper<T, U = any>(promise: Promise<T>) {
  return promise
    .then<[null, T]>((res: T) => [null, res])
    .catch<[U, null]>((err) => [err, null]);
}
