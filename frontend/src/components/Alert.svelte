<script>
    import { fly } from "svelte/transition";
    import { alertStore } from "../stores/alertStore";

    let msg = "";
    let type = "alert-success";
    let show = false;
    // Subscribe to the store
    alertStore.subscribe((alert) => {
        console.log("Alert show state:", show);
        msg = alert.msg;
        type = alert.type;
        show = alert.show;
    });
</script>

{#if show}
    <div
        role="alert"
        class="alert {type} max-w-[60ch] absolute top-16 left-[35%] z-20"
        transition:fly={{ y: -100, duration: 500 }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current h-6 w-6 shrink-0"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
        </svg>
        <span>{msg}</span>
    </div>
{/if}
