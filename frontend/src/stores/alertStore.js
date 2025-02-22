import { writable } from "svelte/store";

export const alertStore = writable({
    msg: "",
    type: "alert-success",
    show: false,
    duration: 3000,
});
export function triggerAlert(msg, type = "alert-success", duration = 3000) {
    alertStore.set({ msg, type, show: true });
    setTimeout(() => {
        alertStore.set({ msg: "", type, show: false });
    }, duration);
}