<template>
    <v-sheet border rounded class="ma-3">
        <div class="text-h3 ma-3">Publisher</div>
        <!-- publisher name, yomi, id(readonly, disable) -->
        <v-form class="ma-3">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="publisher.name"
                        label="Publisher Name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="publisher.name_yomi"
                        label="Publisher Name Yomi"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="publisher.id"
                        label="Publisher ID"
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
    name: "PublisherEdit",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    created() {
        console.log("PublisherEdit created");
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
        for (let i = 0; i < this.epub.publishers.length; i++) {
            if (this.epub.publishers[i].id == this.id) {
                this.publisher = this.epub.publishers[i];
                break;
            }
        }
        console.log(this.publisher);
    },
    methods: {},
};
</script>
