<script>
    import { onMount } from "svelte";
    import { EditorState } from "@codemirror/state";
    import { EditorView, keymap } from "@codemirror/view";
    import { defaultKeymap } from "@codemirror/commands";
    import { sql } from "@codemirror/lang-sql";
    import { HighlightStyle } from "@codemirror/language";
    import { tags } from "@lezer/highlight";
    import { syntaxHighlighting } from "@codemirror/language";

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
            doc: "SELECT * FROM users WHERE name ='Ben';",
            extensions: [
                sql(),
                keymap.of(defaultKeymap),
                syntaxHighlighting(customHighlightStyle),
            ],
        });

        let view = new EditorView({
            state: startState,
            parent: parentElement,
        });
        view.focus();
    });
</script>

<div class="grid grid-cols-5">
    <div class="relative">
        <button class="btn btn-success absolute bottom-0 right-4">Run</button>
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
