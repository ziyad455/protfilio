const API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Helper to fetch data from Strapi API
 * @param endpoint - The API endpoint (e.g., '/api/global-setting')
 * @param options - Fetch options
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    try {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        const response = await fetch(`${API_URL}${endpoint}`, defaultOptions);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch API Error:', error);
        throw error;
    }
}
