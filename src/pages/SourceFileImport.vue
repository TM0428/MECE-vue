<template>
    <div>
        <EpubMakeStepper :step="1" />
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
                <FileTable
                    :prop_files="files_reactive"
                    @update:file="updateReactiveFile(id, data)"
                    @update:files="updateReactiveFiles($event)"
                    @delete:file="deleteReactiveFile(id)"
                />
            </v-col>
        </v-row>
        <EpubMakeRouter :back="back" :next="next" />
    </div>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";
import { PAGE_STYLE } from "@/js/statics";
import FileTable from "@/components/FileTable.vue";
import EpubMakeStepper from "@/components/EpubMakeStepper.vue";
import EpubMakeRouter from "@/components/EpubMakeRouter.vue";
import { reactive } from "vue";
import { ExtendedFile } from "@/js/epub";

export default {
    name: "SourceFileImport",
    components: {
        FileTable,
        EpubMakeStepper,
        EpubMakeRouter,
    },
    data() {
        return {
            dialog: false,
            files: [],
            files_reactive: reactive([]),
            displayType: "right-left",
            file_index: 0,
            styles: PAGE_STYLE,
            back: "/step1",
            next: "/step3",
        };
    },
    created() {
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
        this.file_index = this.epub.files.length;
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
                const ef = new ExtendedFile(
                    file,
                    this.file_index.toString(),
                    "",
                    ""
                );
                ef.id = this.file_index;
                if (ef.file.type.indexOf("image") != -1) {
                    const img_render = new Image();
                    img_render.src = URL.createObjectURL(ef.file);
                    img_render.onload = function () {
                        const width = this.width;
                        const height = this.height;
                        ef.width = width;
                        ef.height = height;
                        console.log(
                            "width: " + ef.width + ", height: " + ef.height
                        );
                    };
                    img_render.onerror = function () {
                        ef.width = 720;
                        ef.height = 1280;
                    };
                }
                this.files_reactive.push(ef);
                this.file_index++;
            });
            this.pageStyleChange();
            this.dialog = true;
        },
        pageStyleChange() {
            console.log("pageStyleChange");
            this.files_reactive.forEach((file, index) => {
                switch (this.displayType) {
                    case "right-left":
                        if (index % 2 === 0) {
                            file.changePageStyle("right");
                        } else {
                            file.changePageStyle("left");
                        }
                        break;
                    case "left-right":
                        if (index % 2 === 0) {
                            file.changePageStyle("left");
                        } else {
                            file.changePageStyle("right");
                        }
                        break;
                    case "center-right-left":
                        // center, right, left, right, left, right, ...
                        if (index === 0) {
                            file.changePageStyle("center");
                        } else if (index % 2 === 0) {
                            file.changePageStyle("left");
                        } else {
                            file.changePageStyle("right");
                        }
                        break;
                    case "center-left-right":
                        // center, left, right, left, right, left, ...
                        if (index === 0) {
                            file.changePageStyle("center");
                        } else if (index % 2 === 0) {
                            file.changePageStyle("right");
                        } else {
                            file.changePageStyle("left");
                        }
                        break;
                    case "center":
                    default:
                        file.changePageStyle("center");
                        break;
                }
            });
            // console.log(this.epub.files);
        },
        updateReactiveFile(id, data) {
            const index = this.files_reactive.findIndex(
                (file) => file.id === id
            );
            this.files_reactive[index] = data;
        },
        updateReactiveFiles(value) {
            this.files_reactive = value;
        },
        deleteReactiveFile(id) {
            const index = this.files_reactive.findIndex(
                (file) => file.id === id
            );
            this.files_reactive.splice(index, 1);
        },
    },
};
</script>
