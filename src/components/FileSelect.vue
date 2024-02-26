<template>
    <v-card class="d-flex flex-column">
        <!-- make file preview -->
        <v-card-text>
            <v-row class="ma-2">
                <v-col
                    cols="4"
                    v-for="file in displayedFiles"
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
                        >
                            <template v-slot:placeholder>
                                <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                >
                                    <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                    ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                        <v-card-title class="text-center">
                            {{ file.file.name }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="9">
                    <v-pagination
                        v-model="currentPage"
                        :length="totalPages"
                    ></v-pagination>
                </v-col>
                <v-col cols="3">
                    <v-select
                        :items="listPages"
                        v-model="currentPage"
                        width="50px"
                    ></v-select>
                </v-col>
            </v-row>
            <!-- <v-pagination
                v-model="currentPage"
                :length="totalPages"
            ></v-pagination> -->
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
            currentPage: 1,
            itemsPerPage: 6,
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
    computed: {
        totalPages() {
            return Math.ceil(this.epub.files.length / this.itemsPerPage);
        },
        listPages() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        },
        displayedFiles() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.epub.files.slice(start, end);
        },
    },
};
</script>
