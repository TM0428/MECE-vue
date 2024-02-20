<template>
    <v-app>
        <EpubMakeStepper :step="0" />
        <div class="contents-editor">
            <!-- epub.title is array and made contents -->
            <TitleEdit />
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
        <EpubMakeRouter :back="back" :next="next" />
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
import EpubMakeStepper from "@/components/EpubMakeStepper.vue";
import EpubMakeRouter from "@/components/EpubMakeRouter.vue";

export default {
    name: "MetadataEditor",
    components: {
        TitleEdit,
        CreatorEdit,
        DescriptionEdit,
        MetadataEdit,
        PublisherEdit,
        EpubMakeStepper,
        EpubMakeRouter,
    },
    data() {
        return {
            message: "Metadata Editor",
            steps: STEPS,
            epub: useEpubStore().epub,
            start_overlay: true,
            back: "/",
            next: "/step2",
        };
    },
};
</script>
