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
                <FileTable :files="epub.files" />
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
            let value = 0;
            this.files.forEach((file) => {
                file.id = value;
                if (this.displayType === "right-left") {
                    if (value % 2 === 0) {
                        file.page_style = "right";
                    } else {
                        file.page_style = "left";
                    }
                } else if (this.displayType === "left-right") {
                    if (value % 2 === 0) {
                        file.page_style = "left";
                    } else {
                        file.page_style = "right";
                    }
                } else if (this.displayType === "center") {
                    file.page_style = "center";
                }
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
                value++;
            });
            this.dialog = true;
        },
    },
};
</script>
