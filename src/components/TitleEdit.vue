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
import { Title } from "../js/epub.js";

export default {
    name: "TitleEdit",
    props: {
        title_prop: {
            type: Title,
            required: true,
        },
    },
    data() {
        return {
            title: this.title_prop,
        };
    },
    created() {
        console.log("TitleEdit created");
        console.log(this.title);
    },
    methods: {},
};
</script>
