<template>
    <v-card>
        <v-card-title>
            <span class="headline">
                {{ this.$t("tocEditor.title") }}
            </span>
        </v-card-title>
        <v-card-text>
            <v-container class="d-flex flex-row">
                <div>
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
                                v-model="toc_edit.file.name"
                                :label="this.$t('tocEditor.source')"
                                outlined
                                hide-details
                                readonly
                                @click="dialog = true"
                                class="my-2"
                            ></v-text-field>
                            <v-dialog
                                v-model="dialog"
                                scrollable
                                max-width="800px"
                            >
                                <FileSelect @update:file="updateSelectFile" />
                            </v-dialog>
                        </v-col>
                        <v-col cols="6">
                            <!-- 画像を表示 -->
                            <img
                                :src="createObjectURL(toc_edit.file)"
                                alt="Preview"
                                style="width: 100%"
                            />
                        </v-col>
                    </v-row>
                </div>
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
        };
    },
    methods: {
        createObjectURL(file) {
            return URL.createObjectURL(file);
        },
        updateSelectFile(file) {
            if (file) {
                this.toc_edit.file = file;
            }
            this.dialog = false;
        },
        saveToc() {
            this.$emit("update:toc", this.toc_edit);
        },
        cancelToc() {
            this.$emit("cancel:toc");
        },
    },
};
</script>
