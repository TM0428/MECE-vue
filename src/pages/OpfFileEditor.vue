<template>
    <v-app>
        <EpubMakeStepper :step="0" />
        <div class="contents-editor">
            <!-- epub.title is array and made contents -->
            <TitleEdit />
            <CreatorsEdit />
            <DescriptionEdit />
            <div v-for="publisher in epub.publishers" :key="publisher.id">
                <PublisherEdit :id="publisher.id" />
            </div>
            <MetadataEdit />
        </div>
        <EpubMakeRouter :back="back" :next="next" />
    </v-app>
</template>

<script>
import { STEPS } from "../js/statics.js";
import { useEpubStore } from "../stores/epub_store.js";

// component imports
import TitleEdit from "../components/OpfEditor/TitleEdit.vue";
import CreatorsEdit from "../components/OpfEditor/CreatorsEdit.vue";
import DescriptionEdit from "../components/OpfEditor/DescriptionEdit.vue";
import PublisherEdit from "../components/OpfEditor/PublisherEdit.vue";
import MetadataEdit from "../components/OpfEditor/MetadataEdit.vue";
import EpubMakeStepper from "@/components/EpubMakeStepper.vue";
import EpubMakeRouter from "@/components/EpubMakeRouter.vue";

export default {
    name: "MetadataEditor",
    components: {
        TitleEdit,
        CreatorsEdit,
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
