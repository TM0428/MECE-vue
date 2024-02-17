<template>
    <div>
        <v-row class="ma-1" align-content="center">
            <v-col align-self="center" cols="6">
                {{ $t("displayStyles.label") }}
            </v-col>
            <v-col cols="6">
                <v-select
                    :label="$t('displayStyles.label')"
                    v-model="displayType"
                    :items="styles"
                    item-title="text"
                    item-value="value"
                    max-width="200"
                    @update:model-value="pageStyleChange"
                    hide-details
                ></v-select>
            </v-col>
            <v-col cols="12">
                <v-file-input
                    v-model="files"
                    :label="$t('importFolderLabel')"
                    multiple
                    show-size
                    show-type
                    hide-details
                    @change="importFile"
                    webkitdirectory
                    class="text-truncate"
                ></v-file-input>
            </v-col>
            <v-col cols="12">
                <FileTable ref="filetable" />
            </v-col>
        </v-row>
        <!-- <v-btn color="primary" @click="importFile"> Import Source File </v-btn> -->
        <!-- <FileImportDialog v-model="dialog" /> -->
    </div>
</template>

<script>
// import FileImportDialog from "@/components/FileImportDialog.vue";
import FileTable from "@/components/FileTable.vue";
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "SourceFileImport",
    components: {
        // FileImportDialog,
        FileTable,
    },
    data() {
        return {
            dialog: false,
            files: [],
            displayType: "right-left",
            file_index: 0,
            styles: [
                {
                    value: "right-left",
                    text: this.$t("displayStyles.options.right-left"),
                },
                {
                    value: "left-right",
                    text: this.$t("displayStyles.options.left-right"),
                },
                {
                    value: "center",
                    text: this.$t("displayStyles.options.center"),
                },
                {
                    value: "center-right-left",
                    text: this.$t("displayStyles.options.center-right-left"),
                },
                {
                    value: "center-left-right",
                    text: this.$t("displayStyles.options.center-left-right"),
                },
            ],
        };
    },
    created() {
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
    },
    methods: {
        importFile() {
            // sort files by name
            this.files.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

            // add value to each file
            // styles: right-left, left-right, center
            this.files.forEach((file) => {
                file.id = this.file_index;
                if (file.type.indexOf("image") != -1) {
                    const img_render = new Image();
                    img_render.src = URL.createObjectURL(file);
                    img_render.onload = function () {
                        const width = this.width;
                        const height = this.height;
                        file.width = width;
                        file.height = height;
                        console.log(
                            "width: " + file.width + ", height: " + file.height
                        );
                    };
                    img_render.onerror = function () {
                        file.width = 720;
                        file.height = 1280;
                    };
                }
                this.epub.files.push(file);
                this.file_index++;
            });
            this.pageStyleChange();
            this.dialog = true;
        },
        pageStyleChange() {
            console.log("pageStyleChange");
            this.epub.files.forEach((file, index) => {
                switch (this.displayType) {
                    case "right-left":
                        if (index % 2 === 0) {
                            file.page_style = "right";
                        } else {
                            file.page_style = "left";
                        }
                        break;
                    case "left-right":
                        if (index % 2 === 0) {
                            file.page_style = "left";
                        } else {
                            file.page_style = "right";
                        }
                        break;
                    case "center-right-left":
                        // center, right, left, right, left, right, ...
                        if (index === 0) {
                            file.page_style = "center";
                        } else if (index % 2 === 0) {
                            file.page_style = "left";
                        } else {
                            file.page_style = "right";
                        }
                        break;
                    case "center-left-right":
                        // center, left, right, left, right, left, ...
                        if (index === 0) {
                            file.page_style = "center";
                        } else if (index % 2 === 0) {
                            file.page_style = "right";
                        } else {
                            file.page_style = "left";
                        }
                        break;
                    case "center":
                    default:
                        file.page_style = "center";
                        break;
                }
            });
            this.$refs.filetable.contentsReload();
            // console.log(this.epub.files);
        },
    },
};
</script>
