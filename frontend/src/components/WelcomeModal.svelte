<script>
    import { onMount } from "svelte";
    function closeModal(event) {
        var modal = document.getElementById("welcome-modal");
        login();
    }

    function closeCustomizeModal(event) {
        console.log("closing");
        var modal = document.getElementById("welcome-modal");
        var options = modal.querySelectorAll("input[type='checkbox']:checked");
        var selected = [];
        options.forEach((option) => {
            let span = option.parentElement.querySelector("span.label-text");
            if (span) selected.push(span.textContent);
        });
        console.log(selected, selected.length);
        // TODO: Handle cookies
        login();
    }

    function customizeCookies() {
        var modal = document.getElementById("welcome-modal");
        var content = modal.querySelector(".modal-box");
        var customizeTempl = document.querySelector("#customize-template");
        content.innerHTML = customizeTempl.innerHTML;
    }

    function login() {
        var modal = document.getElementById("welcome-modal");
        var content = modal.querySelector(".modal-box");
        var loginTempl = document.querySelector("#login-template");
        content.innerHTML = loginTempl.innerHTML;
    }

    onMount(() => {
        var modal = document.getElementById("welcome-modal");
        modal.showModal();
        document.addEventListener("click", (event) => {
            let target = event.target;
            if (target && target.id == "accept-custom-cookies") {
                closeCustomizeModal();
            }
        });
    });
</script>

<template id="customize-template">
    <!-- customize cookies -->
    <h3 class="text-lg font-bold text-primary">Customize Cookies</h3>
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

<template id="login-template">
    <!-- customize cookies -->
    <h3 class="text-lg font-extrabold text-primary">Login/Sign-Up</h3>
    <p class="py-4">Enter user credentials or sign-up:</p>
    <form action="#">
        <h3 class="text-secondary font-bold">Login</h3>
        <div class="form-control max-w-[48ch]">
            <label for="username" class="label cursor-pointer">
                <span>Username</span>
                <input
                    type="text"
                    name="username"
                    id="username"
                    class="outline outline-primary rounded"
                />
            </label>
            <label for="password" class="label cursor-pointer">
                <span>Password</span>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="outline outline-primary rounded"
                />
            </label>
        </div>
        <div class="py-4"><span>- OR -</span></div>
        <h3 class="text-secondary font-bold">Sign-Up</h3>
        <div class="form-control max-w-[48ch]">
            <label for="signup_username" class="label cursor-pointer">
                <span>Username</span>
                <input
                    type="text"
                    name="signup_username"
                    id="signup_username"
                    class="outline outline-primary rounded"
                />
            </label>
            <label for="signup_password" class="label cursor-pointer">
                <span>Password</span>
                <input
                    type="password"
                    name="signup_password"
                    id="signup_password"
                    class="outline outline-primary rounded"
                />
            </label>
            <label for="confirm-password" class="label cursor-pointer">
                <span>Confirm Password</span>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    class="outline outline-primary rounded"
                />
            </label>
        </div>
        <div class="modal-action">
            <div class="btn-group">
                <button id="login-btn" class="btn btn-primary" type="submit"
                    >Submit</button
                >
            </div>
        </div>
    </form>
</template>

<dialog id="welcome-modal" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold text-primary">We value your privacy</h3>
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
                <button id="reject-cookies" class="btn">Reject All</button>
                <button
                    id="accept-cookies"
                    class="btn btn-primary"
                    onclick={closeModal}>Accept All</button
                >
            </div>
        </div>
    </div>
</dialog>
