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
                        :efile="element"
                        @update:file="updateFile(id, data)"
                        @delete:file="deleteFile(id)"
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

export default {
    name: "FileTable",
    components: {
        FileTableContent,
        draggable,
    },
    props: {
        prop_files: {
            type: Array,
            required: true,
        },
    },
    emits: ["update:files", "update:file", "delete:file"],
    created() {},
    data() {
        return {
            mdiTrashCanIcon: mdiTrashCan,
        };
    },
    methods: {
        updateFile(id, data) {
            this.$emit("update:file", id, data);
        },
        deleteFile(id) {
            this.$emit("delete:file", id);
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
                return this.prop_files;
            },
            set(value) {
                // this.epub.files = value;
                console.log(value);
                this.$emit("update:files", value);
            },
        },
    },
};
</script>
