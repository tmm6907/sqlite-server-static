
async function getTables(dbName) {
    try {
        const response = await fetch("/api/table?name=" + dbName); // Replace with your API endpoint
        const res = await response.json();
        if (res.tables) {
            return res.tables;
        }
    } catch (e) {
        console.error(e);
    }
}

async function getDatabases() {
    try {
        const response = await fetch("/api/db"); // Replace with your API endpoint
        const res = await response.json();
        if (res.databases) {
            return res.databases
        }

    } catch (e) {
        console.error(e);
    }
}

export async function renderNavData() {
    let dbs = await getDatabases();
    if (!dbs || !Array.isArray(dbs)) {
        console.error("No databases returned");
        return;
    }
    let data = await Promise.all(
        dbs.map(async (dbname) => {
            let tables = await getTables(dbname);
            return { dbname: tables };
        })
    );
    console.log("Fetched data:", data);
    return data;
}

export async function renderNavDataWithAlert() {

    let data = await renderNavData();
    triggerAlert("Schemas refreshed successfully!");
    return data
}
