<template>
    <v-sheet border rounded class="ma-2">
        <div class="text-h4 ma-2">
            {{ $t("epubMetadata.creator.label") }}
        </div>
        <div v-for="(creator, index) in creators" :key="index">
            <CreatorEdit :id="creator.id" />
        </div>
        <div class="ma-2">
            <v-btn color="primary" @click="addCreator" block>
                {{ $t("epubMetadata.creator.add") }}
            </v-btn>
        </div>
    </v-sheet>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";
import CreatorEdit from "./CreatorEdit.vue";

export default {
    name: "DescriptionEdit",
    components: {
        CreatorEdit,
    },
    created() {
        this.epub = useEpubStore().epub;
    },
    methods: {
        addCreator() {
            this.epub.create_creator();
        },
    },
    computed: {
        creators() {
            return useEpubStore().epub.creators;
        },
    },
};
</script>
