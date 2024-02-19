<template>
    <v-app>
        <EpubMakeStepper :step="0" />
        <div class="contents-editor">
            <!-- epub.title is array and made contents -->
            <div v-if="epub.title">
                <TitleEdit :id="epub.title.id" />
            </div>
            <div v-for="creator in epub.creators" :key="creator.id">
                <CreatorEdit :id="creator.id" />
            </div>
            <div v-if="epub.description">
                <DescriptionEdit />
            </div>
            <div v-for="publisher in epub.publishers" :key="publisher.id">
                <PublisherEdit :id="publisher.id" />
            </div>
            <div v-if="epub.metadata">
                <MetadataEdit />
            </div>
        </div>
        <div class="contents-selector">
            <v-btn color="primary" @click="debug"> debug </v-btn>
            <router-link to="/step2">
                <v-btn color="primary"> next </v-btn>
            </router-link>
        </div>
    </v-app>
</template>

<script>
import { STEPS } from "../js/statics.js";
import { useEpubStore } from "../stores/epub_store.js";

// component imports
import TitleEdit from "../components/OpfEditor/TitleEdit.vue";
import CreatorEdit from "../components/OpfEditor/CreatorEdit.vue";
import DescriptionEdit from "../components/OpfEditor/DescriptionEdit.vue";
import PublisherEdit from "../components/OpfEditor/PublisherEdit.vue";
import MetadataEdit from "../components/OpfEditor/MetadataEdit.vue";
import EpubMakeStepper from "../components/EpubMakeStepper.vue";

export default {
    name: "MetadataEditor",
    components: {
        TitleEdit,
        CreatorEdit,
        DescriptionEdit,
        MetadataEdit,
        PublisherEdit,
        EpubMakeStepper,
    },
    data() {
        return {
            message: "Metadata Editor",
            steps: STEPS,
            epub: useEpubStore().epub,
            start_overlay: true,
            isbn: "",
        };
    },
    methods: {
        debug() {
            console.log(this.epub);
        },
    },
};
</script>
