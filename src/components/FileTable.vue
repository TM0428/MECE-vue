<template>
    <v-table>
        <thead>
            <tr>
                <th>File Name</th>
                <th>File Size</th>
                <th>File Type</th>
                <th><v-icon :icon="mdiSortIcon"></v-icon></th>
                <th>Display Style</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="file in files" :key="file.id">
                <FileTableContent
                    :file="file"
                    @change-display-style="handleDisplayStyle"
                />
            </tr>
        </tbody>
    </v-table>
</template>

<script>
import FileTableContent from "./FileTableContent.vue";
import { mdiSort } from "@mdi/js";

export default {
    name: "FileTable",
    props: {
        files: Array,
    },
    components: {
        FileTableContent,
    },
    data() {
        return {
            mdiSortIcon: mdiSort,
        };
    },
    methods: {
        handleDisplayStyle() {
            console.log("handleDisplayStyle");
        },
    },
};
</script>
