// apiConfig.js

/**
 * This utility helps ensure API requests work correctly in all environments:
 * - Local development
 * - Vercel deployment
 * - Custom domain deployment
 */

/**
 * Gets the base URL for API requests
 * @returns {string} The base URL to use for API requests
 */
export const getApiUrl = (path) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Use the current origin (hostname + protocol) as the base URL
    return `${window.location.origin}${path}`;
  }
  
  // For server-side rendering, use environment variable or default
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  return `${baseUrl}${path}`;
};

/**
 * Creates an axios instance with the correct base URL
 * @param {import('axios').AxiosRequestConfig} config - Axios config
 * @returns {import('axios').AxiosInstance} Axios instance
 */
export const createAxiosInstance = () => {
  const axios = require('axios');
  return axios.create({
    baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_API_BASE_URL || '',
  });
};