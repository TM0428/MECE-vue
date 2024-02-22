<template>
    <v-table height="300px" fixed-header>
        <thead>
            <tr>
                <th>{{ $t("filesTable.cover") }}</th>
                <th>{{ $t("filesTable.name") }}</th>
                <th>{{ $t("filesTable.size") }}</th>
                <th>{{ $t("filesTable.filetype") }}</th>
                <th>{{ $t("filesTable.displayStyle") }}</th>
                <th><v-icon :icon="mdiTrashCanIcon"></v-icon></th>
            </tr>
        </thead>

        <draggable v-model="files" tag="tbody" item-key="id">
            <template #item="{ element }">
                <tr>
                    <FileTableContent
                        :file="element"
                        @update:page-style="changePageStyle"
                        @update:cover-check="changeCoverCheck"
                        @delete:file="deleteFile"
                        ref="fileTableContent"
                    />
                </tr>
            </template>
        </draggable>
    </v-table>
    <v-btn @click="debug">Debug</v-btn>
</template>

<script>
import FileTableContent from "./FileTableContent.vue";
import draggable from "vuedraggable";
import { mdiTrashCan } from "@mdi/js";
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "FileTable",
    components: {
        FileTableContent,
        draggable,
    },
    created() {
        this.epub = useEpubStore().epub;
        useEpubStore().$subscribe((mutation, state) => {
            console.log(mutation);
            console.log(state);
            // this.contentsReload();
        });
    },
    data() {
        return {
            mdiTrashCanIcon: mdiTrashCan,
        };
    },
    methods: {
        changePageStyle(id, page_style) {
            const file = this.epub.files.find((file) => file.id === id);
            file.page_style = page_style;
        },
        changeCoverCheck(id, cover_check) {
            const file = this.epub.files.find((file) => file.id === id);
            file.cover = cover_check;
        },
        deleteFile(id) {
            this.epub.files.forEach((element) => {
                if (element.id === id) {
                    this.epub.files.splice(this.epub.files.indexOf(element), 1);
                }
            });
        },
        contentsReload() {
            if (this.$refs.fileTableContent) {
                // this.$refs.fileTableContent.forEach((element) => {
                //     element.reload();
                // });
            }
        },
        debug() {
            console.log(this.files);
        },
    },
    computed: {
        files: {
            get() {
                return this.epub.files;
            },
            set(value) {
                this.epub.files = value;
            },
        },
    },
};
</script>
