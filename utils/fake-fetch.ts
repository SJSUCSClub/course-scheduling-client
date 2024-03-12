const responses: Map<string, any> = new Map();
const context = require.context(`@/app/mock-api`, true, /\.ts$/);
context
  .keys()
  .forEach((key) => responses.set(key.slice(1, -3), context(key).response));

const TIMEOUT = 5000;

export interface FetchParams<Params extends object = object> {
  endpoint: string;
  params?: Params;
  timeout?: number;
}

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
