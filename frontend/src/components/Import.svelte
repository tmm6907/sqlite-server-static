<script>
    import { onMount } from "svelte";
    import { triggerAlert } from "../stores/alertStore";
    import { renderNavData } from "../stores/renderNav";

    async function Import(form) {
        let input = form.querySelector("#db-import");
        if (!input || input.files.length === 0) {
            triggerAlert("No file selected!", "alert-error");
            return;
        }
        let formData = new FormData();
        for (let file of input.files) {
            console.log("adding ", file);
            formData.append("files", file);
        }
        console.log(Array(...formData.entries()));
        try {
            let response = await fetch("api/db/import", {
                method: "POST",
                body: formData,
            });
            let res = await response.json();
            if (response.status >= 300) {
                console.log("err");
                throw Error(res.error);
            }
            triggerAlert("File imported successfully!");
            renderNavData();
        } catch (error) {
            triggerAlert("Error uploading file!", "alert-error");
            console.error("Error uploading file:", error);
        }
    }

    onMount(() => {
        document.addEventListener("submit", (event) => {
            if (event.target.id == "db-import-form") {
                event.preventDefault();
                Import(event.target);
            }
        });
    });
</script>

<div class="">
    <form action="" id="db-import-form" class="form">
        <div class="grid grid-rows-1 gap-1 rounded-lg">
            <input
                id="db-import"
                type="file"
                class="file-input file-input-sm max-w-xs"
                multiple
                accept=".db, .sqlite"
            />
            <button
                tabindex="0"
                type="submit"
                class="btn btn-sm btn-neutral w-full">Import</button
            >
        </div>
    </form>
</div>
