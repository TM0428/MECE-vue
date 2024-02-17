<template>
    <v-sheet border rounded class="ma-2">
        <!-- Creator metadata form
            required fields: title, title-yomi, id(not editable)
            -->
        <div class="text-h3 ma-1">Title</div>
        <v-form class="ma-3">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="title.title"
                        label="Title Name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="title.title_yomi"
                        label="Title Name Yomi"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="title.id"
                        label="Title ID"
                        readonly
                        disabled
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "TitleEdit",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    created() {
        console.log("TitleEdit created");
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
        this.title = this.epub.title;
        if (this.title.id != this.id) {
            console.error("TitleEdit: id is not matched");
        }
        console.log(this.title);
    },
    methods: {},
};
</script>
