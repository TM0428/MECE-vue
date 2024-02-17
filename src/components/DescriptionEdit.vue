<template>
    <v-sheet border rounded class="ma-3">
        <div class="text-h3 ma-3">Description</div>
        <v-textarea v-model="description.description" class="ma-2" />
    </v-sheet>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "DescriptionEdit",
    created() {
        console.log("DescriptionEdit created");
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
        this.description = this.epub.description;
        console.log(this.description);
    },
    methods: {
        test() {
            console.log(this.description);
        },
    },
};
</script>
