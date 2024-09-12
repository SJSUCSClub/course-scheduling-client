/***********************************************
 * This file is used to allow compatability between our frontend fetches
 * and the backend requests
 ***********************************************/

/**
 * Changes all snake_case keys to camelCase.
 *
 * @param response the object to be formatted
 * @returns the formatted response
 */
export const formatResponse: (response: any) => any = (response: any) => {
  if (typeof response !== 'object' || response === null) {
    return response;
  } else if (!Array.isArray(response)) {
    let newResponse = {};
    Object.keys(response).forEach((key) => {
      let newKey: string = key
        .split('_')
        .map((part, index) =>
          index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
        )
        .join('');

      // ignore the below line since we're setting new keys with strings
      // and an object of {} doesn't explicitly have a set method for strings
      // @ts-ignore
      newResponse[newKey] = formatResponse(response[key]);
    });
    return newResponse;
  } else {
    return response.map(formatResponse);
  }
};

/**
 * Formats the search params into a string (starting with ?) for use in a URL.
 *
 * @param searchParams an object containing the search params
 * @returns string containing the formatted search params
 */
export const formatSearchParams: (searchParams: object) => string = (
  searchParams,
) => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams || {})) {
    if (value !== undefined && value !== null) {
      // workaround because our backend is django and it doesn't support arrays,
      // so we just have to "append" the same key multiple times
      if (Array.isArray(value)) {
        for (const v of value) {
          urlSearchParams.append(key, v);
        }
      } else {
        urlSearchParams.append(key, value as string);
      }
    }
  }

  return '?' + urlSearchParams.toString();
};
