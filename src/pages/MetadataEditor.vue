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
            <div v-for="title in epub_data.title" :key="title.id">
                <TitleEdit :title_prop="title" />
            </div>
            <div v-for="creator in epub_data.creator" :key="creator.id">
                <CreatorEdit :creator_prop="creator" />
            </div>
        </div>
        <!-- <div class="test">
            <CreatorEdit />
            <TitleEdit />
        </div> -->
        <div class="contents-selector">
            <!-- create element button, can select title and creator -->
            <v-btn color="primary" @click="create_metadata">
                create metadata
            </v-btn>
        </div>
    </v-app>
</template>

<script>
import { STEPS } from "../js/statics.js";
import { Epub } from "../js/metadata.js";
// component imports
import CreatorEdit from "../components/CreatorEdit.vue";
import TitleEdit from "../components/TitleEdit.vue";

export default {
    name: "MetadataEditor",
    components: {
        CreatorEdit,
        TitleEdit,
    },
    data() {
        return {
            message: "Metadata Editor",
            steps: STEPS,
            epub_data: new Epub(),
        };
    },
    mounted() {
        this.epub_data = new Epub();
        // this.epub_data.create_title();
        console.log(this.epub_data.title);
    },
    methods: {
        create_metadata(mode = "title") {
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
    },
};
</script>
