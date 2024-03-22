/***********************************************
 * This file is used to simulate a fetch request to a server.
 * It's useful for mocking API responses and testing the UI.
 * The code below maps the endpoint name to the response.
 * Each endpoint name is a path to any file in the `@/app/mock-api` directory.
 * The response is the "response" export of the file.
 ***********************************************/

import { RequestBodyType, RequestParamsType } from '@/types/general';

export type FakeResponseType<
  Params = undefined,
  Body = undefined,
> = Params extends undefined
  ? Body extends undefined
    ? never // If neither Params nor Body is provided
    : (body: Body) => any // If only Body is provided
  : Body extends undefined
  ? (params: RequestParamsType<Params>) => any // If only Params is provided
  : (params: RequestParamsType<Params>, body: Body) => any; // If both Params and Body are provided

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

export interface FakeFetchOptions<
  Body extends RequestBodyType = RequestBodyType,
  Params = {},
> {
  endpoint: string;
  timeout?: number;
  params?: RequestParamsType<Params>;
  body?: Body;
}

/**
 * Simulates a fetch request to a server.
 *
 * @param endpoint - The endpoint name.
 * @param timeout - The request timeout. Defaults to 5000ms.
 * @param params - The request parameters.
 * @param body - The request body.
 * @returns The response from the server.
 *
 * @example
 * ```ts
 * // app/mock-api/hello-world.ts
 * export const response = ({ id }: { id: string }, { name }: { name: string }) => `Hello, numero ${id}! My name is ${name}`;
 *
 * // app/page.tsx
 * const response = await fakeFetch<string, { id: string }, { name: string }>({
 *  endpoint: '/hello-world',
 *  timeout: 2000,
 *  params: { id: '1' },
 *  body: { name: 'John' },
 * });
 * console.log(response); // 'Hello, numero 1! My name is John'
 * ```
 */
const fakeFetch = <
  Data,
  Body extends RequestBodyType = RequestBodyType,
  Params = {},
>({
  endpoint,
  timeout,
  params,
  body,
}: FakeFetchOptions<Body, Params>): Promise<Data> =>
  new Promise<Data>((resolve) =>
    setTimeout(() => {
      const response = responses.get(endpoint);
      if (response) {
        if (params || body) {
          if (params && body) {
            if (response instanceof Function) {
              const responseFunction = response as FakeResponseType<
                Params,
                Body
              >;
              resolve(responseFunction(params, body) as Data);
            } else {
              throw new Error(
                'Params and Body provided but no function to handle them',
              );
            }
          } else if (params) {
            if (response instanceof Function) {
              const responseFunction = response as FakeResponseType<Params>;
              resolve(responseFunction(params) as Data);
            } else {
              throw new Error('Params provided but no function to handle them');
            }
          } else if (body) {
            if (response instanceof Function) {
              const responseFunction = response as FakeResponseType<
                undefined,
                Body
              >;
              resolve(responseFunction(body) as Data);
            } else {
              throw new Error('Body provided but no function to handle them');
            }
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
