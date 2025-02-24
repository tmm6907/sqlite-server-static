<script>
    import { onMount } from "svelte";
    import { EditorState } from "@codemirror/state";
    import { EditorView, keymap } from "@codemirror/view";
    import {
        defaultKeymap,
        history,
        historyKeymap,
    } from "@codemirror/commands";
    import { sql } from "@codemirror/lang-sql";
    import { HighlightStyle } from "@codemirror/language";
    import { tags } from "@lezer/highlight";
    import { syntaxHighlighting } from "@codemirror/language";
    import { queryResults } from "../stores/queryResults";
    import { triggerAlert } from "../stores/alertStore";
    import { renderNavData, renderNavDataWithAlert } from "../util/renderNav";
    import { dbNameStore } from "../stores/dbNameStore";
    import Import from "./Import.svelte";
    import Export from "./Export.svelte";

    /** @type EditorView*/
    let editorView;
    let db;
    let dbInput;

    dbNameStore.subscribe((data) => {
        db = data;
        dbInput = db;
    });

    // Lifecycle function that runs after the component is mounted
    onMount(() => {
        let db = sessionStorage.getItem("openDBName") || "";

        let customHighlightStyle = HighlightStyle.define([
            { tag: tags.keyword, color: "var(--editor-primary)" },
            { tag: tags.string, color: "var(--editor-accent)" }, // Example additional style // Example customization
        ]);

        let parentElement = document.getElementById("sql-editor");
        if (!parentElement) {
            console.error("Parent element with id 'sql-editor' not found.");
            return;
        }

        let startState = EditorState.create({
            doc: "",
            extensions: [
                sql(),
                history(),
                keymap.of([...defaultKeymap, ...historyKeymap]),
                syntaxHighlighting(customHighlightStyle),
            ],
        });

        editorView = new EditorView({
            state: startState,
            parent: parentElement,
        });
        editorView.focus();
    });

    async function runQuery() {
        if (!editorView) {
            console.error("EditorView is not initialized yet.");
            return;
        }
        let query = editorView.state.doc.toString();
        if (query.length === 0) {
            triggerAlert("Query cannot be empty!", "alert-error");
            return;
        }

        let payload = {
            db: db != "" ? (db != "main" ? db : "") : "",
            query: query,
        };
        console.log("Payload: ", payload);
        let resp = await fetch("/api/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        let res = await resp.json();
        if (resp.status >= 400) {
            triggerAlert("Query failed!", "alert-error");
            console.error(res.error);
            return;
        }
        if (res.results) {
            console.log("Res: ", res.results);
            queryResults.set({
                pks: res.pks,
                results: res.results,
            });
            triggerAlert("Query successful!");
        } else {
            let msg = "Rows affected: " + res.rowsAffected;
            queryResults.set({
                pks: [],
                results: [],
            });
            triggerAlert(msg);
        }
        renderNavData();
        editorView.dispatch({
            changes: {
                from: 0,
                to: editorView.state.doc.length,
                insert: "",
            },
        });
    }
</script>

<div class="grid grid-cols-7">
    <div class="col-span-2 flex gap-1 justify-center">
        <div class="h-fit mt-auto">
            <Import />
            <div class="w-full grid grid-cols-2">
                <Export />
                <button class="btn btn-sm btn-success" on:click={runQuery}
                    >Run <i class="fa-solid fa-play text-sm"></i></button
                >
            </div>
        </div>
    </div>
    <div class=" col-span-3">
        <div
            id="sql-editor"
            class="min-h-[10rem] overflow-auto outline rounded p-1"
        ></div>
    </div>
    <div class="col-span-2"></div>
</div>
