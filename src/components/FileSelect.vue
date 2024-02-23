<template>
    <v-card class="d-flex flex-column">
        <!-- make file preview -->
        <v-card-text style="height: 600px">
            <v-row class="ma-2">
                <v-col
                    cols="4"
                    v-for="file in epub.files"
                    :key="file.id"
                    class="pa-1"
                >
                    <v-card
                        @click="select_efile = file"
                        :variant="select_efile === file ? 'tonal' : 'elevated'"
                    >
                        <v-img
                            :src="createObjectURL(file.file)"
                            alt="Preview"
                            style="width: 100%"
                        />
                        <v-card-title class="text-center">
                            {{ file.file.name }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-auto">
            <v-btn color="primary" @click="updateToc" :disabled="!select_efile">
                {{ this.$t("tocEditor.save") }}
            </v-btn>
            <v-btn color="error" @click="cancelToc">
                {{ this.$t("tocEditor.cancel") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "FileSelect",
    props: {
        efile: Object,
    },
    emits: ["update:file"],
    data() {
        return {
            epub: useEpubStore().epub,
            select_efile: null,
        };
    },
    created() {
        if (this.efile) {
            this.select_efile = this.efile;
        }
    },
    methods: {
        createObjectURL(file) {
            return URL.createObjectURL(file);
        },
        updateToc() {
            this.$emit("update:file", this.select_efile);
        },
        cancelToc() {
            this.$emit("update:file", null);
        },
    },
};
</script>
