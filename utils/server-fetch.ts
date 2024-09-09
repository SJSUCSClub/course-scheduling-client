/***********************************************
 * This file is used to make a real fetch request to a server.
 ***********************************************/

import {
  CourseIDType,
  ProfessorIDType,
  RequestBodyType,
  RequestParamsType,
} from '@/types/general';

export interface ServerFetchOptions<
  Body extends RequestBodyType = RequestBodyType,
  Params = {},
> {
  endpoint: string;
  timeout?: number;
  params?: RequestParamsType<Params>;
  body?: Body;
}

const formatCourseParams = (params: CourseIDType) => {
  return params.department + '-' + params.courseNumber;
};

const formatProfessorParams = (params: ProfessorIDType) => {
  return params.id;
};

/**
 * Changes all snake_case keys to camelCase.
 *
 * @param response the object to be formatted
 * @returns the formatted object
 */
const formatResponse = async (response: object) => {
  var newResponse = {};
  Object.keys(response).forEach((key) => {
    var newKey: string = key
      .split('_')
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
      )
      .join('');

    // ignore the below line since we're setting new keys with strings
    // and an object of {} doesn't explicitly have a set method for strings
    // @ts-ignore
    newResponse[newKey] = response[key];
  });
  return newResponse;
};

/**
 * Makes a fetch request to a server.
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
const serverFetch = <
  Data,
  Body extends RequestBodyType = RequestBodyType,
  Params = {},
>({
  endpoint,
  timeout,
  params,
  body,
}: ServerFetchOptions<Body, Params>): Promise<Data> =>
  new Promise<Data>((resolve) => {
    // route params provided, so use them
    const [_, base, section] = endpoint.split('/');
    var url;
    if (params) {
      if (endpoint.indexOf('courses') !== -1) {
        url = new URL(
          [
            process.env.BACKEND_URL,
            base,
            formatCourseParams(params as CourseIDType),
            section,
          ].join('/'),
        );
      } else {
        url = new URL(
          [
            process.env.BACKEND_URL,
            base,
            formatProfessorParams(params as ProfessorIDType),
            section,
          ].join('/'),
        );
      }
    } else {
      url = new URL(process.env.BACKEND_URL + endpoint);
    }
    for (const [key, value] of Object.entries(body || {})) {
      url.searchParams.set(key, value as string);
    }
    resolve(
      fetch(url.href, {
        method: 'GET',
      })
        .then((resp) => resp.json())
        .then((resp) => formatResponse(resp) as Promise<Data>),
    );
  });

export default serverFetch;
