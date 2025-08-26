/**
 * @file requestWrapper.js
 * @description A utility function to wrap API requests with the configured Axios instance (apiClient).
 * Provides centralized error handling and ensures all requests use the same configuration.
 */

import apiClient from './apiClient';

/**
 * Wrapper function for making API requests using the configured Axios instance.
 *
 * @param {object} options - The Axios request configuration object.
 * @returns {Promise<any>} - The response data from the API.
 * @throws {Error} - Throws an error if the API request fails.
 */
const requestWrapper = async options => {
  try {
    const response = await apiClient(options);
    return response;
  } catch (error) {
    // Handle or log the error appropriately
    throw error;
  }
};

export default requestWrapper;
