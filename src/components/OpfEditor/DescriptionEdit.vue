<template>
    <v-sheet border rounded class="ma-2">
        <div class="text-h4 ma-3">
            {{ $t("epubMetadata.description.label") }}
        </div>
        <v-textarea v-model="description.description" class="ma-3" />
    </v-sheet>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "DescriptionEdit",
    created() {
        this.epub = useEpubStore().epub;
        this.description = this.epub.description;
    },
    methods: {
        test() {
            console.log(this.description);
        },
    },
};
</script>
