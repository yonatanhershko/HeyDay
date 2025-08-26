import { Platform } from 'react-native';
import axiosInstance from './axiosConfig'; // Import the configured Axios instance
import config from '../../config.json';

/**
 * Wrapper for making GET requests with optional custom headers
 * @param {string} url - API endpoint
 * @param {object} params - Query parameters to be sent with the request
 * @param {object} headers - Custom headers to be sent with the request
 * @returns {Promise} - Response from the API
 */

const get = async (url, params = {}, headers = {}) => {
  try {
    const response = await axiosInstance.get(url, {
      params,
      headers,
      withCredentials: true, // Ensure credentials like cookies or tokens are sent
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return error.response.data;
  }
};

/**
 * Wrapper for making POST requests with optional FormData and custom headers
 * @param {string} url - API endpoint
 * @param {object|FormData} data - Data to be sent in the body of the request (can be FormData)
 * @param {object} headers - Custom headers to be sent with the request
 * @returns {Promise} - Response from the API
 */
const post = async (url, data = {}, headers = {}) => {
  const isFormData = data instanceof FormData;
  return await axiosInstance
    .post(url, data, {
      headers: {
        ...headers,
        ...(isFormData && { 'Content-Type': 'multipart/form-data' }),
        withCredentials: true, // Ensure credentials like cookies or tokens are sent
      },
    })
    .then(response => response.data)
    .catch(error => {
      handleApiError(error);
      return error.response.data || error;
    });
};

/**
 * Wrapper for making PUT requests with optional FormData and custom headers
 * @param {string} url - API endpoint
 * @param {object|FormData} data - Data to be sent in the body of the request (can be FormData)
 * @param {object} headers - Custom headers to be sent with the request
 * @returns {Promise} - Response from the API
 */
const put = async (url, data = {}, headers = {}) => {
  const isFormData = data instanceof FormData;
  return await axiosInstance
    .put(url, data, {
      headers: {
        ...headers,
        ...(isFormData && { 'Content-Type': 'multipart/form-data' }),
        withCredentials: true, // Ensure credentials like cookies or tokens are sent
      },
    })
    .then(response => response.data)
    .catch(error => {
      handleApiError(error);
      return error.response.data;
    });
};

/**
 * Wrapper for making DELETE requests with optional custom headers
 * @param {string} url - API endpoint
 * @param {object} headers - Custom headers to be sent with the request
 * @returns {Promise} - Response from the API
 */
const del = (url, headers = {}) => {
  return axiosInstance
    .delete(url, {
      headers,
      withCredentials: true, // Ensure credentials like cookies or tokens are sent
    })
    .then(response => response.data)
    .catch(error => {
      handleApiError(error);
      return error.response.data;
    });
};

/**
 * Wrapper for making PATCH requests with optional FormData and custom headers
 * @param {string} url - API endpoint
 * @param {object|FormData} data - Data to be sent in the body of the request (can be FormData)
 * @param {object} headers - Custom headers to be sent with the request
 * @returns {Promise} - Response from the API
 */

const patch = (url, data = {}, headers = {}) => {
  // Check if the data is FormData to set appropriate headers
  const isFormData = data instanceof FormData;

  return axiosInstance
    .patch(url, data, {
      headers: {
        ...(Platform.OS !== 'web' && { 'Origin': config.baseURL }),
        ...headers,
        ...(isFormData && { 'Content-Type': 'multipart/form-data' }), // Set correct header for FormData
      },
      withCredentials: true, // Ensure credentials like cookies or tokens are sent
    })
    .then(response => response.data)
    .catch(error => {
      handleApiError(error);
      return error.response.data;
    });
};

/**
 * Error handling function to process API errors
 * @param {object} error - Error object from Axios
 */
const handleApiError = error => {
  if (error.response) {
    // Server responded with a status other than 200 range
    console.error(
      `API Error: ${error.response.status} - ${error.response.data.message}`,
    );
  } else if (error.request) {
    // Request was made but no response was received
    console.error('API Error: No response received');
  } else {
    // Something happened in setting up the request
    console.error('API Error: ', error.message);
  }
};

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
