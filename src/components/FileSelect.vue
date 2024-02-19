<template>
    <v-card class="d-flex flex-column">
        <!-- make file preview -->
        <v-card-text style="height: 400px">
            <v-row class="ma-2">
                <v-col
                    cols="4"
                    v-for="file in epub.files"
                    :key="file.id"
                    class="pa-1"
                >
                    <v-card
                        @click="select_file = file"
                        :variant="select_file === file ? 'tonal' : 'elevated'"
                    >
                        <v-img
                            :src="createObjectURL(file)"
                            alt="Preview"
                            style="width: 100%"
                        />
                        <v-card-title class="text-center">
                            {{ file.name }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-auto">
            <v-btn color="primary" @click="updateToc" :disabled="!select_file">
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
        file: Object,
    },
    emits: ["update:file"],
    data() {
        return {
            epub: useEpubStore().epub,
            select_file: null,
        };
    },
    created() {
        if (this.file) {
            this.select_file = this.file;
        }
    },
    methods: {
        createObjectURL(file) {
            return URL.createObjectURL(file);
        },
        updateToc() {
            this.$emit("update:file", this.select_file);
        },
        cancelToc() {
            this.$emit("update:file", null);
        },
    },
};
</script>
