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

    /** @type EditorView*/
    let editorView;

    // Lifecycle function that runs after the component is mounted
    onMount(() => {
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
            triggerAlert("Query cannot be empty!", "alert-danger");
        }
        let resp = await fetch("/api/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: query }),
        });
        let res = await resp.json();
        if (resp.status > 400) {
            console.error(res.error);
        }
        if (res.results) {
            console.log(res.results);
            queryResults.set(res.results);
            editorView.dispatch({
                changes: {
                    from: 0,
                    to: editorView.state.doc.length,
                    insert: "",
                },
            });
        } else {
            triggerAlert("Rows affected: ", res.rowsAffected);
            editorView.dispatch({
                changes: {
                    from: 0,
                    to: editorView.state.doc.length,
                    insert: "",
                },
            });
        }
    }
</script>

<div class="grid grid-cols-5">
    <div class="relative">
        <button
            class="btn btn-success absolute bottom-0 right-4"
            on:click={runQuery}>Run</button
        >
    </div>
    <div id="sql-editor"></div>
</div>

<style>
    #sql-editor {
        @apply w-[75ch] min-h-[10rem] overflow-auto border;
        border-color: var(--border-neutral-400);
        border-radius: var(--radius-lg);
        color: var(--text-white);
    }

    /* CodeMirror-specific styling */
    .cm-editor {
        height: 100%; /* Ensure editor fills the parent container */
        background-color: #f0f0f0; /* Light gray background */
        color: var(--base-content); /* Text color */
        padding: 8px; /* Add some padding for readability */
        box-sizing: border-box;
        border-radius: 10px; /* Match container's rounded corners */
    }

    .cm-content {
        font-size: 14px; /* Change text size */
        line-height: 1.5; /* Adjust line spacing */
        color: #000;
    }
    .cm-line {
        caret-color: #fff;
    }

    /* Add hover effect */
    #sql-editor:hover {
        box-shadow: 0 0 10px #00000033;
    }
</style>
