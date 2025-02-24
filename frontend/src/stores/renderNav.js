import { writable } from "svelte/store";
import { triggerAlert } from "./alertStore";

export const navDataStore = writable({
    databases: {}
});

async function getDatabases() {
    try {
        const response = await fetch("/api/nav"); // Replace with your API endpoint
        const res = await response.json();
        if (res.results) {
            navDataStore.set({ databases: res.results });
        }

    } catch (e) {
        triggerAlert(("Failed to retrieve database data!", "alert-error"))
        console.error(e);
        throw new Error(e)
    }
}

export async function renderNavData() {
    await getDatabases();
}

export async function renderNavDataWithAlert(msg, type = "alert-success") {
    await renderNavData();
    triggerAlert(msg, type);
}
