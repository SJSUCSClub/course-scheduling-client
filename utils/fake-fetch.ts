// This file is used to simulate a fetch request to a server.
// It's useful for mocking API responses and testing the UI.
// The code below maps the endpoint name to the response.
// Each endpoint name is a path to any file in the `@/app/mock-api` directory.
// The response is the "response" export of the file.

/**
 * The responses map. The key is the endpoint name, and the value is the response.
 *
 * @example
 * ```ts
 * // app/mock-api/hello-world.ts
 * export const response = 'Hello, world!';
 *
 * // utils/fake-fetch
 * responses.get('/hello-world'); // 'Hello, world!'
 * ```
 */
const responses: Map<string, any> = new Map();
const context = require.context(`@/app/mock-api`, true, /\.ts$/);
context
  .keys()
  .forEach((key) => responses.set(key.slice(1, -3), context(key).response));

// The default timeout for the fake fetch.
const TIMEOUT = 5000;

export interface FetchParams<Params extends object = object> {
  endpoint: string;
  params?: Params;
  timeout?: number;
}

/**
 * Simulates a fetch request to a server.
 *
 * @param endpoint - The endpoint name.
 * @param params - The request parameters.
 * @param timeout - The request timeout. Defaults to 5000ms.
 * @returns The response from the server.
 *
 * @example
 * ```ts
 * // app/mock-api/hello-world.ts
 * export const response = ({ id }: { id: number }) => `Hello, numero ${id}!`;
 *
 * // app/page.tsx
 * const response = await fakeFetch<string, { id: number }>({
 *  endpoint: '/hello-world',
 *  params: { id: 1 },
 *  timeout: 2000,
 * });
 * console.log(response); // 'Hello, numero 1!'
 * ```
 */
const fakeFetch = <Data, Params extends object = object>({
  endpoint,
  params,
  timeout,
}: FetchParams<Params>): Promise<Data> =>
  new Promise<Data>((resolve) =>
    setTimeout(() => {
      const response = responses.get(endpoint);
      if (response) {
        if (params) {
          if (response instanceof Function) {
            resolve(response(params) as Data);
          } else {
            throw new Error('Params provided but no function to handle them');
          }
        } else {
          resolve(response as Data);
        }
      } else {
        throw new Error(`No response found for endpoint ${endpoint}`);
      }
    }, timeout ?? TIMEOUT),
  );

export default fakeFetch;
