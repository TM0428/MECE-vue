<template>
    <v-sheet border rounded class="ma-2">
        <div class="text-h3 ma-1">Another Metadata</div>
        <!-- select language(ja,en,de), id(readonly,disable), type, modified -->
        <v-form class="ma-3">
            <v-row>
                <v-col cols="12" md="6">
                    <v-select
                        v-model="metadata.language"
                        :items="lang"
                        item-title="name"
                        item-value="lang"
                        label="Language"
                        required
                        @update:model-value="setLang"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="metadata.id"
                        label="ID"
                        readonly
                        disabled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select
                        v-model="metadata.type"
                        :items="types"
                        item-title="name"
                        item-value="type"
                        label="Type"
                        required
                    ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="metadata.modified"
                        label="Modified"
                        required
                        type="datetime-local"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
</template>

<script>
import { Metadata } from "../js/epub.js";

export default {
    name: "AnotherMetadataEdit",
    props: {
        metadata_prop: {
            type: Metadata,
            required: true,
        },
    },
    data() {
        return {
            metadata: this.metadata_prop,
            lang: [
                { lang: "ja", name: "Japanese" },
                { lang: "en", name: "English" },
                { lang: "de", name: "German" },
            ],
            types: [
                { type: "comic", name: "Comic" },
                { type: "novel", name: "Novel" },
                { type: "magazine", name: "Magazine" },
                { type: "photo", name: "Photo" },
                { type: "video", name: "Video" },
                { type: "music", name: "Music" },
                { type: "game", name: "Game" },
                { type: "application", name: "Application" },
                { type: "unknown", name: "Unknown" },
            ],
        };
    },
    created() {
        console.log("AnotherMetadataEdit created");
        console.log(this.metadata);
    },
    methods: {
        test() {
            console.log(this.metadata);
        },
        setLang() {
            console.log(this.metadata);
        },
    },
};
</script>
