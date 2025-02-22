<script>
    async function Import() {
        const input = document.getElementById("db-import");
        if (!input.files.length) {
            console.error("No file selected.");
            return;
        }
        let formData = new FormData();
        formData.append("files", [...input.files]);
        try {
            let response = await fetch("api/db/import", {
                method: "POST",
                body: formData, // No need to set Content-Type, fetch will do it automatically
            });

            let result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
</script>

<div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-sm">Import</div>

    <ul class="menu dropdown-content bg-neutral rounded-box z-20 p-2 shadow">
        <li>
            <input
                id="db-import"
                type="file"
                class="file-input-sm file-input-neutral max-w-xs"
                multiple
            />
        </li>
        <li class="mt-2">
            <button
                id="import-btn"
                class="btn btn-sm btn-accent"
                on:click={Import}>Import DB</button
            >
        </li>
    </ul>
</div>
