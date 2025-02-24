import { writable } from "svelte/store";
import { triggerAlert } from "./alertStore";

export const navDataStore = writable({
    databases: {}
});
async function getTables(dbName) {
    try {
        let url = "/api/table?name=" + dbName
        console.log("URL: ", url)
        const response = await fetch(url); // Replace with your API endpoint
        const res = await response.json();
        return res.tables ? [...res.tables] : []
    } catch (e) {
        triggerAlert(("Failed to retrieve table data!", "alert-error"))
        console.error(e);
        throw new Error(e)
    }
}

async function getDatabases() {
    try {
        const response = await fetch("/api/db"); // Replace with your API endpoint
        const res = await response.json();
        if (res.databases) {
            const databases = {};
            for (let dbName of res.databases) {
                console.log(dbName);
                const tables = await getTables(dbName);
                databases[dbName] = tables;
            }
            navDataStore.set({ databases });
        }

    } catch (e) {
        triggerAlert(("Failed to retrieve database data!", "alert-error"))
        console.error(e);
        throw new Error(e)
    }
}

export async function renderNavData() {
    // let placeholder = `

    // `
    // document.querySelector("#nav-item-list").innerHTML = placeholder;
    await getDatabases();
}

export async function renderNavDataWithAlert(msg, type = "alert-success") {
    await renderNavData();
    triggerAlert(msg, type);
}
