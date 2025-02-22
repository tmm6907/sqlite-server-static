export async function checkSession() {
    var modal = document.getElementById("login-modal");
    if (!modal) {
        console.error("no modal element found");
        throw new Error("Login modal not found");
    }

    try {
        console.log("checking session")
        var response = await fetch("api/auth");
        if (response.status === 401) {
            let res = await response.json();
            console.error(res.error);
            modal.showModal();
            throw new Error("Unauthorized session");
        }
    } catch (e) {
        throw e
    }
}