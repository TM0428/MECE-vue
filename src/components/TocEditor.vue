<template>
    <v-card>
        <v-card-title>
            <span class="headline">
                {{ this.$t("tocEditor.title") }}
            </span>
        </v-card-title>
        <v-card-text>
            <v-container class="d-flex flex-row">
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            v-model="toc_edit.title"
                            :label="this.$t('tocTable.title')"
                            outlined
                            hide-details
                            class="my-2"
                        ></v-text-field>
                        <v-text-field
                            v-model="file_name"
                            :label="this.$t('tocEditor.source')"
                            outlined
                            hide-details
                            readonly
                            @click="dialog = true"
                            class="my-2"
                        ></v-text-field>
                        <v-dialog v-model="dialog" scrollable max-width="800px">
                            <FileSelect @update:file="updateSelectFile" />
                        </v-dialog>

                        <v-alert type="error" dismissible v-if="error_dialog">
                            {{ this.$t("tocEditor.noFileError") }}
                        </v-alert>
                    </v-col>
                    <v-col v-if="toc_edit.file" cols="6">
                        <!-- 画像を表示 -->
                        <v-img
                            :src="createObjectURL(toc_edit.file)"
                            alt="Preview"
                            style="width: 100%"
                        />
                    </v-col>
                    <v-col v-else cols="6">
                        <v-icon :icon="mdiFileIcon"></v-icon>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="saveToc">
                {{ this.$t("tocEditor.save") }}
            </v-btn>
            <v-btn color="error" @click="cancelToc">
                {{ this.$t("tocEditor.cancel") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { TocContent } from "@/js/epub";
import FileSelect from "./FileSelect.vue";
import { mdiFile } from "@mdi/js";

export default {
    name: "TocEditor",
    components: {
        FileSelect,
    },
    props: {
        toc: TocContent,
    },
    emits: ["update:toc", "cancel:toc"],
    data() {
        return {
            toc_edit: this.toc,
            dialog: false,
            error_dialog: false,
            mdiFileIcon: mdiFile,
        };
    },
    created() {
        console.log(this.toc);
        if (this.toc) {
            this.toc_edit = this.toc;
        } else {
            this.toc_edit = new TocContent();
        }
    },
    methods: {
        createObjectURL(file) {
            return URL.createObjectURL(file);
        },
        updateSelectFile(efile) {
            if (efile) {
                this.toc_edit.setEfile(efile);
                this.error_dialog = false;
            }
            this.dialog = false;
        },
        saveToc() {
            if (this.toc_edit.file === null) {
                this.error_dialog = true;
                return;
            }
            this.$emit("update:toc", this.toc_edit);
        },
        cancelToc() {
            this.$emit("cancel:toc");
        },
    },
    computed: {
        file_name() {
            if (this.toc_edit.file) {
                return this.toc_edit.file.name;
            } else {
                return this.$t("tocEditor.noFile");
            }
        },
    },
};
</script>
