// dbutils/response.js

/**
 * Uniform API Response Formatter
 * @param {number} statusCode - HTTP Status Code
 * @param {object|string} body - Response body
 * @returns {object} formatted response
 */
export function formatResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",   // Allow all origins
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    },
    body: JSON.stringify(body),
  };
}

