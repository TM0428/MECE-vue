<template>
    <v-app>
        <div class="stepper">
            <v-stepper model-value="1">
                <v-stepper-header>
                    <v-stepper-item
                        value="1"
                        :title="steps[0]"
                    ></v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item
                        value="2"
                        :title="steps[1]"
                    ></v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item value="3"></v-stepper-item>
                </v-stepper-header>
            </v-stepper>
        </div>
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
            <!-- create element button, can select title and creator -->
            <v-btn color="primary" @click="createInit"> create metadata </v-btn>
            <!-- <v-btn color="primary" @click="createMetadata"> create title </v-btn> -->
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
import TitleEdit from "../components/TitleEdit.vue";
import CreatorEdit from "../components/CreatorEdit.vue";
import DescriptionEdit from "../components/DescriptionEdit.vue";
import PublisherEdit from "../components/PublisherEdit.vue";
import MetadataEdit from "../components/MetadataEdit.vue";

export default {
    name: "MetadataEditor",
    components: {
        TitleEdit,
        CreatorEdit,
        DescriptionEdit,
        MetadataEdit,
        PublisherEdit,
    },
    data() {
        return {
            message: "Metadata Editor",
            steps: STEPS,
            epub_store: useEpubStore(),
            start_overlay: true,
            isbn: "",
        };
    },
    created() {
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
        console.log(this.epub);
    },
    methods: {
        createMetadata(mode = "title") {
            mode = "title";
            // create editor component
            // add to contents-editor
            console.log("create metadata");
            if (mode == "title") {
                this.epub_store.create_title();
                console.log(this.epub_store);
            } else if (mode == "creator") {
                // this.epub_store.creator.push(new Creator());
            }
        },
        debug() {
            console.log(this.epub_store);
        },
    },
};
</script>
