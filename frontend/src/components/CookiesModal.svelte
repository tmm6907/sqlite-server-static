<script>
    import { onMount } from "svelte";
    import { checkSession } from "../stores/checkSession";
    import { renderNavData } from "../stores/renderNav";

    function open() {
        console.log("opening cookies");
        var modal = document.getElementById("cookies-modal");
        modal.showModal();
    }

    function close() {
        var modal = document.getElementById("cookies-modal");
        var options = modal.querySelectorAll("input[type='checkbox']:checked");
        var selected = [];
        options.forEach((option) => {
            let span = option.parentElement.querySelector("span.label-text");
            if (span) selected.push(span.textContent);
        });
        modal.close();
        checkSession();
        renderNavData();
    }

    function customizeCookies() {
        var modal = document.getElementById("cookies-modal");
        var content = modal.querySelector(".modal-box");
        var customizeTempl = document.querySelector("#customize-template");
        content.innerHTML = customizeTempl.innerHTML;
    }

    onMount(() => {
        try {
            checkSession();
            renderNavData();
        } catch (e) {
            open();
            console.error("Session check failed:", e);
        }

        document.addEventListener("click", (event) => {
            let target = event.target;
            if (
                target &&
                (target.id == "accept-custom-cookies" ||
                    target.id == "accept-cookies")
            ) {
                close();
            }
        });
    });
</script>

<dialog id="cookies-modal" class="modal">
    <div class="modal-box">
        <h3 class="text-xl text-secondary modal-header">
            We value your privacy!
        </h3>
        <p class="py-4">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze site traffic. You can choose which
            cookies to allow.
        </p>
        <div class="modal-action">
            <div class="btn-group flex gap-2">
                <button
                    id="customize-cookies"
                    class="btn"
                    onclick={customizeCookies}>Customize</button
                >
                <button id="reject-cookies" class="btn" onclick={close}
                    >Reject All</button
                >
                <button
                    id="accept-cookies"
                    class="btn btn-primary"
                    onclick={close}>Accept All</button
                >
            </div>
        </div>
    </div>
</dialog>
<template id="customize-template">
    <!-- customize cookies -->
    <h3 class="text-xl text-secondary" style="font-weight: 600;">
        Customize Cookies
    </h3>
    <p class="py-4">Adjust your preferences below to suit your needs.</p>
    <ul class="w-[30ch] mx-auto">
        <li>
            <div class="">
                <label class="label cursor-pointer">
                    <span class="label-text">Essential (required)</span>
                    <input
                        type="checkbox"
                        checked="checked"
                        disabled
                        class="checkbox"
                        required
                    />
                </label>
            </div>
        </li>
        <li>
            <div class="">
                <label class="label cursor-pointer">
                    <span class="label-text">Analytics</span>
                    <input type="checkbox" checked="checked" class="checkbox" />
                </label>
            </div>
        </li>
        <li>
            <div class="">
                <label class="label cursor-pointer">
                    <span class="label-text">Marketing/Tracking</span>
                    <input type="checkbox" checked="checked" class="checkbox" />
                </label>
            </div>
        </li>
        <li>
            <div class="">
                <label class="label cursor-pointer">
                    <span class="label-text">Preferences/Personalization</span>
                    <input type="checkbox" checked="checked" class="checkbox" />
                </label>
            </div>
        </li>
    </ul>
    <div class="modal-action">
        <div class="btn-group">
            <button id="accept-custom-cookies" class="btn btn-primary"
                >Accept Cookies</button
            >
        </div>
    </div>
</template>
