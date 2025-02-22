<script>
    import { onMount } from "svelte";
    import { dbNameStore } from "../stores/dbNameStore";

    let db;
    dbNameStore.subscribe((value) => (db = value));
    function ExportDB(type) {
        window.location.href = `/api/db/export?db=${db}&type=${type}`;
    }

    onMount(() => {
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("export-option")) {
                ExportDB(event.target.dataset.value);
            }
        });
    });
</script>

<div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-sm">Export</div>
    <ul
        id="db-export"
        class="menu dropdown-content bg-neutral rounded-box z-20 min-w-[24ch] p-2 shadow"
    >
        <li>
            <button class="export-option" data-value="db"
                >Export DB as '.db'</button
            >
        </li>
        <li>
            <button class="export-option" data-value="csv"
                >Export DB as '.csv'</button
            >
        </li>
        <li>
            <button class="export-option" data-value="tsv"
                >Export DB as '.tsv'</button
            >
        </li>
        <li>
            <button class="export-option" data-value="json"
                >Export DB as '.json'</button
            >
        </li>
        <li>
            <button class="export-option" data-value="sql"
                >Dump DB as '.sql'</button
            >
        </li>
    </ul>
</div>
