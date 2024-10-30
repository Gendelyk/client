import { paths } from '@modules/core/types';
import { AxiosRequestConfig } from 'axios';
import { ErrorStatusCodes, SuccessStatusCodes } from './constants/statusCodes';

export type Config<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> = Omit<AxiosRequestConfig, 'method' | 'url'> & {
  method: Method;
  url: Url;
};

/**
 * Builds a request function that can be used to send HTTP requests using axios.
 *
 * @template Url - The key of the path defined in paths.
 * @template Method - The HTTP method (get, post, etc.) for the given path.
 *
 * @returns A function that takes path parameters, request data, and query parameters,
 *          and returns a promise resolving to the response.
 * @example
 * type LoginData = DataParams<'/auth/login', 'post'>
 */
export type DataParams<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> = 'requestBody' extends keyof paths[Url][Method]
  ? paths[Url][Method]['requestBody'] extends {
      content: { 'application/json': infer Data };
    }
    ? Data
    : never
  : never;

/**
 * Builds a request function that can be used to send HTTP requests using axios.
 *
 * @template Url - The key of the path defined in paths.
 * @template Method - The HTTP method (get, post, etc.) for the given path.
 *
 * @returns A function that takes path parameters, request data, and query parameters,
 *          and returns a promise resolving to the response.
 * @example
 * type LoginQuery = QueryParams<'/auth/login', 'get'>
 */
export type QueryParams<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> = 'parameters' extends keyof paths[Url][Method]
  ? paths[Url][Method]['parameters'] extends { query: infer Query }
    ? Query
    : never
  : never;

/**
 * Builds a request function that can be used to send HTTP requests using axios.
 *
 * @template Url - The key of the path defined in paths.
 * @template Method - The HTTP method (get, post, etc.) for the given path.
 *
 * @returns A function that takes path parameters, request data, and query parameters,
 *          and returns a promise resolving to the response.
 * @example
 * type LoginPathParams = PathParams<'/auth/login', 'get'>
 */
export type PathParams<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> = 'parameters' extends keyof paths[Url][Method]
  ? paths[Url][Method]['parameters'] extends { path: infer Path }
    ? Path
    : never
  : never;

export type Data<Url extends keyof paths, Method extends keyof paths[Url]> = {
  data?: DataParams<Url, Method>;
  params?: QueryParams<Url, Method>;
  path?: PathParams<Url, Method>;
};

type ErrorStatusCodeKeys = keyof typeof ErrorStatusCodes;
type SuccessStatusCodeKeys = keyof typeof SuccessStatusCodes;

type ResponseSchema<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> = 'responses' extends keyof paths[Url][Method]
  ? paths[Url][Method]['responses']
  : never;

type ExtractResponseBody<
  Responses,
  Code extends keyof Responses,
> = Responses[Code] extends {
  content: { 'application/json': infer Body };
}
  ? Body
  : never;

export type SuccessResponse<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> = ExtractResponseBody<
  ResponseSchema<Url, Method>,
  Extract<keyof ResponseSchema<Url, Method>, SuccessStatusCodeKeys>
>;

// Type for error responses
export type ErrorResponse<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> = ExtractResponseBody<
  ResponseSchema<Url, Method>,
  Extract<keyof ResponseSchema<Url, Method>, ErrorStatusCodeKeys>
>;

export type Response<
  Url extends keyof paths,
  Method extends keyof paths[Url],
> =
  | { data: ErrorResponse<Url, Method>; isError: true }
  | { data: SuccessResponse<Url, Method>; isError: false };
