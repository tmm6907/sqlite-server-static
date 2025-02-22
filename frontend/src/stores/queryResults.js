import { writable } from 'svelte/store';

// Store for query results
export const queryResults = writable(
    {
        pks: [],
        results: [],
    }
);