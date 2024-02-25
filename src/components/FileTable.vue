<template>
    <v-infinite-scroll
        height="300px"
        :items="showFile"
        mode="manual"
        :onLoad="contentsReload"
    >
        <v-table fixed-header>
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
            <draggable v-model="showFile" tag="tbody" item-key="id">
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
    </v-infinite-scroll>
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
    data() {
        return {
            mdiTrashCanIcon: mdiTrashCan,
            showFile: [],
        };
    },
    mounted() {
        for (let i = 0; i < 10; i++) {
            if (this.prop_files[i]) {
                this.showFile.push(this.prop_files[i]);
            }
        }
    },
    methods: {
        updateFile(id, data) {
            this.$emit("update:file", id, data);
        },
        deleteFile(id) {
            this.$emit("delete:file", id);
        },
        async contentsReload({ done }) {
            const length = this.showFile.length;
            if (length >= this.prop_files.length) {
                done("empty");
                return;
            }
            for (let i = length; i < length + 10; i++) {
                if (this.prop_files[i]) {
                    this.showFile.push(this.prop_files[i]);
                }
            }
            done("ok");
        },
    },
};
</script>
