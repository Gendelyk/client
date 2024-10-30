import axios from 'axios';

import {
  Config,
  Data,
  ErrorResponse,
  Response,
  SuccessResponse,
} from './types';
import { generateUrl } from './utils';
import { paths } from '@modules/core/types';

/**
 * Builds a request function that can be used to send HTTP requests using axios.
 *
 * @template Url - The key of the path defined in paths.
 * @template Method - The HTTP method (get, post, etc.) for the given path.
 *
 * @param {Config<Url, Method>} config - The configuration object for the request.
 * @returns A function that takes path parameters, request data, and query parameters,
 *          and returns a promise resolving to the response.
 * @example
 * // Create a function specifically for creating a product
 * const createProduct = requestBuilder<'/products', 'post'>({
 *   url: '/api/products',
 *   method: 'post',
 * });
 *
 * // Usage of the createProduct function
 * await createProduct({
 *   data: {
 *     name: 'New Product',
 *     price: 99.99,
 *     category: 'Electronics',
 *   },
 * })
 */

export const requestBuilder =
  <Url extends keyof paths, Method extends keyof paths[Url]>({
    url: _url,
    method,
    ...config
  }: Config<Url, Method>) =>
  async ({
    path,
    data,
    params,
  }: Data<Url, Method>): Promise<Response<Url, Method>> => {
    try {
      config.data = data;
      config.params = params;

      const url: string = generateUrl(_url, path || {});

      const response = await axios<SuccessResponse<typeof _url, typeof method>>(
        {
          ...config,
          url,
          method: method as string,
        },
      );

      return {
        isError: false,
        data: response.data,
      };
    } catch (e) {
      console.error(`Error executing ${method as string} ${_url as string}`, e);

      return {
        isError: true,
        data: e as ErrorResponse<Url, Method>,
      };
    }
  };