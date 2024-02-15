import { defineStore } from "pinia";
import { Epub } from "../js/epub.js";

export const useEpubStore = defineStore("epub", {
    state: () => ({
        epub: Epub,
    }),
    actions: {
        reset() {
            this.epub = undefined;
        },
        createInit() {
            this.epub = new Epub();
        },
    },
});
