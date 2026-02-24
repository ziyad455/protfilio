const CACHE_PREFIX = 'strapi_cache_';

interface CacheEntry<T> {
    data: T;
    expiry: number;
}

/**
 * Retrieve cached data from localStorage.
 * Returns null if not found or expired.
 */
export function getCachedData<T>(key: string): T | null {
    try {
        const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
        if (!raw) return null;

        const entry: CacheEntry<T> = JSON.parse(raw);
        if (Date.now() > entry.expiry) {
            localStorage.removeItem(`${CACHE_PREFIX}${key}`);
            return null;
        }

        return entry.data;
    } catch {
        return null;
    }
}

/**
 * Store data in localStorage with a TTL (time-to-live) in milliseconds.
 */
export function setCachedData<T>(key: string, data: T, ttlMs: number): void {
    try {
        const entry: CacheEntry<T> = {
            data,
            expiry: Date.now() + ttlMs,
        };
        localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
    } catch (err) {
        // localStorage might be full or disabled — fail silently
        console.warn('Cache write failed:', err);
    }
}

/**
 * Clear cached entries. If a prefix is given, only keys matching that prefix are removed.
 * Otherwise all strapi cache entries are cleared.
 */
export function clearCache(prefix?: string): void {
    const fullPrefix = `${CACHE_PREFIX}${prefix || ''}`;
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(fullPrefix)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
}

// Default TTLs (in milliseconds)
export const CACHE_TTL = {
    /** 30 minutes — for rarely-changing content (hero, about, socials) */
    STATIC: 30 * 60 * 1000,
    /** 10 minutes — for list/collection endpoints (projects, articles) */
    LIST: 10 * 60 * 1000,
} as const;
