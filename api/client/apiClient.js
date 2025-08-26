/**
 * @file apiClient.js
 * @description Axios instance configured with a base URL for making HTTP requests to the backend.
 */

import axios from 'axios';
import config from './../../config.json';

/**
 * Create an Axios instance.
 * @const {AxiosInstance}
 * @see {@link https://github.com/axios/axios|Axios}
 */
const apiClient = axios.create({
  baseURL: config.customAPIConfig.baseURL, //customAPIConfig do not exist
  headers: {
    'X-API-Key': config.customAPIConfig.APIKey,//customAPIConfig do not exist
  },
});

export default apiClient;
