const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Fetch data from the API
 * @param {string} endpoint - The endpoint to fetch from
 * @param {Object} options - The options for the request
 * @param {Object} body - The body of the request
 * @returns {Promise<Object>} The response from the API
 */
export async function apiFetch(endpoint, options = {}, body = null) {
    const endpointUrl = new URL(endpoint, BASE_URL);
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(endpointUrl.toString(), config);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}