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
            <div v-if="epub_data.title">
                <TitleEdit :title_prop="epub_data.title" />
            </div>
            <div v-for="creator in epub_data.creators" :key="creator.id">
                <CreatorEdit :creator_prop="creator" />
            </div>
            <div v-if="epub_data.description">
                <DescriptionEdit :description_prop="epub_data.description" />
            </div>
            <!-- <div v-if="epub_data.publisher">
                <PublisherEdit :publisher_prop="epub_data.publisher" />
            </div> -->
            <div v-for="publisher in epub_data.publishers" :key="publisher.id">
                <PublisherEdit :publisher_prop="publisher" />
            </div>
            <div v-if="epub_data.metadata">
                <MetadataEdit :metadata_prop="epub_data.metadata" />
            </div>
        </div>
        <div class="contents-selector">
            <!-- create element button, can select title and creator -->
            <v-btn color="primary" @click="createInit"> create metadata </v-btn>
            <!-- <v-btn color="primary" @click="createMetadata"> create title </v-btn> -->
            <v-btn color="primary" @click="debug"> debug </v-btn>
        </div>
    </v-app>
</template>

<script>
import { STEPS } from "../js/statics.js";
import {
    Epub,
    Title,
    Creator,
    Publisher,
    Description,
    Metadata,
} from "../js/epub.js";
// component imports
import CreatorEdit from "../components/CreatorEdit.vue";
import TitleEdit from "../components/TitleEdit.vue";
import DescriptionEdit from "../components/DescriptionEdit.vue";
import PublisherEdit from "../components/PublisherEdit.vue";
import MetadataEdit from "../components/MetadataEdit.vue";

export default {
    name: "MetadataEditor",
    components: {
        CreatorEdit,
        TitleEdit,
        DescriptionEdit,
        MetadataEdit,
        PublisherEdit,
    },
    props: {
        epub_data_prop: {
            type: Epub,
            required: true,
        },
    },
    setup(props) {
        console.log("MetadataEditor setup");
        console.log(props);
    },
    data() {
        return {
            message: "Metadata Editor",
            steps: STEPS,
            epub_data: this.epub_data_prop || new Epub(),
            start_overlay: true,
            isbn: "",
        };
    },
    mounted() {
        //  this.createInit();
        console.log("MetadataEditor mounted");
        console.log(this.epub_data_prop);
    },
    methods: {
        createInit() {
            this.epub_data.title = new Title();
            this.epub_data.creators.push(new Creator());
            this.epub_data.description = new Description();
            this.epub_data.publisher = new Publisher();
            this.epub_data.metadata = new Metadata();
        },
        createMetadata(mode = "title") {
            mode = "title";
            // create editor component
            // add to contents-editor
            console.log("create metadata");
            if (mode == "title") {
                this.epub_data.create_title();
                console.log(this.epub_data);
            } else if (mode == "creator") {
                // this.epub_data.creator.push(new Creator());
            }
        },
        debug() {
            console.log(this.epub_data);
        },
    },
};
</script>
