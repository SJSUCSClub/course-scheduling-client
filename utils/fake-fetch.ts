const TIMEOUT = 5000;

export const fakeFetch = <T>(data: T, timeout?: number): Promise<T> =>
  new Promise<T>((resolve) =>
    setTimeout(() => resolve(data), timeout ?? TIMEOUT),
  );
