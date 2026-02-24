import { getCachedData, setCachedData, CACHE_TTL } from './cacheService';

const API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

/** Default TTL used when cacheOptions.ttlMs is not specified */
const DEFAULT_TTL = CACHE_TTL.LIST;

export interface CacheOptions {
    /** Unique cache key (without the internal prefix) */
    key: string;
    /** Time-to-live in ms. Defaults to CACHE_TTL.LIST (10 min) */
    ttlMs?: number;
}

/**
 * Helper to fetch data from Strapi API with optional localStorage caching.
 * @param endpoint - The API endpoint (e.g., '/api/global-setting')
 * @param options  - Fetch options
 * @param cacheOptions - If provided, enables cache-first behaviour
 */
export async function fetchAPI(
    endpoint: string,
    options: RequestInit = {},
    cacheOptions?: CacheOptions,
) {
    // 1. Check cache first
    if (cacheOptions) {
        const cached = getCachedData(cacheOptions.key);
        if (cached) {
            return cached;
        }
    }

    // 2. Fetch from API
    try {
        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            ...options,
        };

        const response = await fetch(`${API_URL}${endpoint}`, defaultOptions);

        if (!response.ok) {
            console.error(`API error: ${response.status} ${response.statusText}`, await response.text());
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // 3. Persist to cache
        if (cacheOptions) {
            setCachedData(cacheOptions.key, data, cacheOptions.ttlMs ?? DEFAULT_TTL);
        }

        return data;
    } catch (error) {
        console.error('Fetch API Error Details:', error);
        throw error;
    }
}
