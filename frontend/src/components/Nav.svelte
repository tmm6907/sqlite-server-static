<script>
    import { onMount } from "svelte";
    import {
        navDataStore,
        renderNavDataWithAlert,
        renderNavData,
    } from "../stores/renderNav";
    import { dbNameStore } from "../stores/dbNameStore";
    var modal;
    let openDBName = "main";

    dbNameStore.set(openDBName);

    let databases = {};

    navDataStore.subscribe((data) => {
        console.log("Databases: ", data.databases);
        databases = data.databases;
    });

    function openDB() {
        if (modal) {
            modal.showModal();
        }
    }

    async function createDB(form) {
        var getRadioValue = (name) => {
            const selectedOption = form.querySelector(
                `input[name='${name}']:checked`,
            );
            return selectedOption ? selectedOption.value : "";
        };
        const name = form.querySelector("input[name='name']")?.value || "";
        const cache = getRadioValue("cache");
        const journal = getRadioValue("journal");
        const sync = getRadioValue("sync");
        const lock = getRadioValue("lock");
        var formData = {
            name: name,
            cache: cache,
            journal: journal,
            sync: sync,
            lock: lock,
        };
        try {
            var response = await fetch("/api/db", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                var res = await response.json();
                console.log(res.message);
                modal.close();
                renderNavDataWithAlert("DB created successfully!");
            }
        } catch (e) {
            console.error(e);
        }
    }
    function refreshSchema() {
        navDataStore.set({ databases: {} });
        renderNavDataWithAlert("Schema refreshed successfully!");
    }

    function handleToggle(event, index, dbName) {
        if (event.target.open === false) return;
        openDBName = dbName;
        sessionStorage.setItem("openDBName", openDBName);
        dbNameStore.set(openDBName);
        let dbElements = document.querySelectorAll(".nav-menu-item");
        dbElements.forEach((el, i) => {
            if (i !== index) el.open = false;
            else {
            }
            i !== index ? (el.open = false) : console.log("Selected: ", i);
        });
    }

    // Show the modal on mount
    onMount(() => {
        // Update sessionStorage whenever openDBName changes
        openDBName = sessionStorage.getItem("openDBName") || openDBName;
        $: {
            sessionStorage.setItem("openDBName", openDBName);
        }

        document.addEventListener("submit", (e) => {
            if (e.target.id === "db-form") {
                e.preventDefault();
                createDB(e.target);
                navData = renderNavData();
            }
        });
    });
</script>

<!-- Modal Template -->
<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <form id="db-form" action="" method="POST">
            <h3 class="text-secondary modal-header text-2xl pt-4 pb-8">
                Create Database
            </h3>
            <div class="grid grid-cols-1 gap-y-4 max-w-[64ch]">
                <label class="label cursor-pointer text-accent"
                    ><span>DB Name:</span><input
                        type="text"
                        name="name"
                        class="outline outline-neutral-content rounded"
                    /></label
                >
                <label class="label cursor-pointer text-accent"
                    ><span>Connection Cache:</span>
                    <div class="flex gap-6">
                        <label
                            for="cache-private"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Private</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="cache"
                                id="cache-private"
                                checked
                            /></label
                        >
                        <label
                            for="cache-shared"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Shared</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="cache"
                                id="cache-shared"
                            /></label
                        >
                    </div>
                </label>
                <label class="label cursor-pointer text-accent"
                    ><span>Journal Mode:</span>
                    <div class="flex gap-6">
                        <label
                            for="journal-normal"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Normal</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="journal"
                                id="journal-normal"
                                checked
                            /></label
                        >
                        <label
                            for="journal-wal"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">WAL</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="journal"
                                id="journal-wal"
                            /></label
                        >
                    </div>
                </label>
                <label class="label cursor-pointer text-accent"
                    ><span>Synchronous Mode:</span>
                    <div class="flex gap-6">
                        <label
                            for="sync-normal"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Normal</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="sync"
                                id="sync-normal"
                                checked
                            /></label
                        >
                        <label
                            for="sync-full"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Full</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="sync"
                                id="sync-full"
                            /></label
                        >
                        <label
                            for="sync-off"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Off</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="sync"
                                id="sync-off"
                            /></label
                        >
                    </div>
                </label>
                <label class="label cursor-pointer text-accent"
                    ><span>Locking Mode:</span>
                    <div class="flex gap-6">
                        <label
                            for="lock-normal"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Normal</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="lock"
                                id="lock-normal"
                                checked
                            /></label
                        >
                        <label
                            for="lock-exclusive"
                            class="label cursor-pointer text-neutral-content"
                            ><span class="mr-2">Exclusive</span><input
                                type="radio"
                                class="radio radio-primary"
                                name="lock"
                                id="lock-exclusive"
                            /></label
                        >
                    </div>
                </label>
            </div>
            <div class="modal-action btn-group">
                <button id="cancel-db-btn" class="btn" type="button"
                    >Cancel</button
                >
                <button id="create-db-btn" class="btn btn-primary" type="submit"
                    >Create</button
                >
            </div>
        </form>
    </div>
</dialog>

<div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
        <ul
            class="menu bg-base-200 text-base-content min-h-full min-w-[32ch] p-4"
        >
            <div class="flex justify-between p-2 text-base-content">
                <div>
                    <span>Schemas</span>
                    <button
                        class="btn btn-xs btn-neutral"
                        on:click={refreshSchema}
                        ><i class="fa-solid fa-arrows-rotate"></i></button
                    >
                </div>
                <div>
                    <button class="btn btn-xs btn-neutral" on:click={openDB}
                        ><i class="fa-solid fa-plus"></i>New DB</button
                    >
                </div>
            </div>
            <li id="nav-item-list">
                {#if Object.keys(databases).length > 0}
                    {#each Object.keys(databases) as dbName, index}
                        <details
                            open={index === 0}
                            class="nav-menu-item open:outline open:outline-accent"
                            on:toggle={(e) => handleToggle(e, index, dbName)}
                        >
                            <summary
                                ><i class="fa-solid fa-database"
                                ></i>{dbName}</summary
                            >
                            <ul>
                                {#if databases[dbName].length > 0}
                                    {#each databases[dbName] as name}
                                        <li>
                                            <div>
                                                <i class="fa-solid fa-table"
                                                ></i>
                                                <a href="#">{name}</a>
                                            </div>
                                        </li>
                                    {/each}
                                {:else}
                                    <li>No tables found</li>
                                {/if}
                            </ul>
                        </details>
                    {/each}
                {:else}
                    <div class="flex justify-center">
                        <span class="loading loading-spinner loading-md mx-auto"
                        ></span>
                        <span>Loading Schema</span>
                    </div>
                {/if}
            </li>
        </ul>
    </div>
</div>

<style>
</style>
