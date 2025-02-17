<script>
    import { onMount } from "svelte";

    async function login(user, pass) {
        var modal = document.getElementById("login-modal");
        try {
            var formData = {
                username: user,
                password: pass,
            };
            var response = await fetch("api/login", {
                method: "POST", // Change to POST
                headers: {
                    "Content-Type": "application/json", // Ensure the server understands the request format
                },
                body: JSON.stringify(formData),
            });
            var res = await response.json();
            if (response.status !== 200) {
                console.error(res.error);
            } else {
                modal.close();
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function signUp(user, pass) {
        var modal = document.getElementById("login-modal");
        try {
            var formData = {
                username: user,
                password: pass,
            };
            var response = await fetch("api/signup", {
                method: "POST", // Change to POST
                headers: {
                    "Content-Type": "application/json", // Ensure the server understands the request format
                },
                body: JSON.stringify(formData),
            });
            var res = await response.json();
            if (response.status !== 200) {
                console.error(res.error);
            } else {
                modal.close();
            }
        } catch (e) {
            console.error(e);
        }
    }

    onMount(() => {
        var loginForm = document.querySelector("#login-form");
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Debugging: Log inputs to ensure they are found
            const usernameInput = loginForm.querySelector(
                "input[name='username']",
            );
            const passwordInput = loginForm.querySelector(
                "input[name='password']",
            );
            const signupUsernameInput = loginForm.querySelector(
                "input[name='signup_username']",
            );
            const signupPasswordInput = loginForm.querySelector(
                "input[name='signup_password']",
            );
            const confirmPasswordInput = loginForm.querySelector(
                "input[name='confirm_password']",
            );

            console.log("Inputs found:", {
                usernameInput,
                passwordInput,
                signupUsernameInput,
                signupPasswordInput,
                confirmPasswordInput,
            });

            // Safely extract values
            var username = usernameInput?.value || "";
            var password = passwordInput?.value || "";
            var signup_username = signupUsernameInput?.value || "";
            var signup_password = signupPasswordInput?.value || "";
            var confirm_password = confirmPasswordInput?.value || "";

            console.log({
                user: username,
                pass: password,
                signup_user: signup_username,
                signup_pass: signup_password,
                confirm_password: confirm_password,
            });

            if (username && password) {
                login(username, password);
            } else if (
                signup_username &&
                signup_password &&
                signup_password === confirm_password
            ) {
                console.log("Signing up!");
                signUp(signup_username, signup_password);
            } else {
                console.log("Invalid form input!");
            }
        });
    });
</script>

<dialog id="login-modal" class="modal">
    <div class="modal-box">
        <h3 class="text-xl text-secondary" style="font-weight: 600;">
            Login/Sign-Up
        </h3>
        <p class="py-4">Enter user credentials or sign-up:</p>
        <form id="login-form" action="#">
            <h3 class="text-primary font-bold">Login</h3>
            <div class="form-control max-w-[48ch]">
                <label for="username" class="label cursor-pointer">
                    <span>Username</span>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        class="outline outline-neutral-content rounded"
                    />
                </label>
                <label for="password" class="label cursor-pointer">
                    <span>Password</span>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        class="outline outline-neutral-content rounded"
                    />
                </label>
            </div>
            <div class="py-4"><span>- OR -</span></div>
            <h3 class="text-primary font-bold">Sign-Up</h3>
            <div class="form-control max-w-[48ch]">
                <label for="signup_username" class="label cursor-pointer">
                    <span>Username</span>
                    <input
                        type="text"
                        name="signup_username"
                        id="signup_username"
                        class="outline outline-neutral-content rounded"
                    />
                </label>
                <label for="signup_password" class="label cursor-pointer">
                    <span>Password</span>
                    <input
                        type="password"
                        name="signup_password"
                        id="signup_password"
                        class="outline outline-neutral-content rounded"
                    />
                </label>
                <label for="confirm_password" class="label cursor-pointer">
                    <span>Confirm Password</span>
                    <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        class="outline outline-neutral-content rounded"
                    />
                </label>
            </div>
            <div class="modal-action">
                <div class="btn-group">
                    <button
                        id="login-btn"
                        class="btn btn-secondary"
                        type="submit">Submit</button
                    >
                </div>
            </div>
        </form>
    </div>
</dialog>
