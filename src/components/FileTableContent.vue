<template>
    <!-- if file.type == image/png or image/jpg, click and show the image -->
    <td>
        <v-checkbox
            v-model="coverCheck"
            @change="changeCover"
            :disabled="file.type.indexOf('image') == -1"
            hide-details
        ></v-checkbox>
    </td>
    <td @click="dialog = true" class="cursor-pointer">
        <v-icon
            v-if="file.type.indexOf('image') != -1"
            :icon="mdiImageIcon"
        ></v-icon>
        <v-icon v-else :icon="mdiFileIcon"></v-icon>
        {{ file.name }}
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline"> {{ file.name }} </span>
                </v-card-title>
                <v-card-text>
                    <div v-if="file.type.indexOf('image') == -1">
                        <textarea
                            :value="content_text"
                            style="width: 100%; height: 200px"
                            readonly
                        >
                        </textarea>
                    </div>
                    <div v-else>
                        <img
                            :src="createObjectURL(file)"
                            alt="Preview"
                            style="width: 100%"
                        />
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </td>
    <td>
        {{ formatSizeUnits(file.size) }}
    </td>
    <td>{{ file.type }}</td>
    <td>
        <v-icon
            :icon="mdiArrowUpIcon"
            class="cursor-pointer"
            @click="changeFileIndex(1)"
        ></v-icon>
        <v-icon
            :icon="mdiArrowDownIcon"
            class="cursor-pointer"
            @click="changeFileIndex(-1)"
        ></v-icon>
    </td>
    <td>
        <v-select
            :label="this.$t('displayStyle.label')"
            v-model="displayType"
            :items="styles"
            item-title="text"
            item-value="value"
            @update:model-value="changeDisplayStyle"
            outlined
            hide-details
            class="my-2"
        ></v-select>
    </td>
</template>

<script>
// import { ContentFile } from "@/js/epub";
import { useEpubStore } from "@/stores/epub_store";
import { mdiArrowUp, mdiArrowDown, mdiImage, mdiFile } from "@mdi/js";

export default {
    name: "FileTableContent",
    props: {
        file_index: Number,
    },
    data() {
        return {
            dialog: false,
            coverCheck: false,
            content_text: "",
            mdiArrowUpIcon: mdiArrowUp,
            mdiArrowDownIcon: mdiArrowDown,
            mdiImageIcon: mdiImage,
            mdiFileIcon: mdiFile,
            displayType: "right",
            displayStyle: this.$t("displayStyle.label"),
            styles: [
                {
                    value: "right",
                    text: this.$t("displayStyle.options.right"),
                },
                {
                    value: "left",
                    text: this.$t("displayStyle.options.left"),
                },
                {
                    value: "center",
                    text: this.$t("displayStyle.options.center"),
                },
            ],
        };
    },
    created() {
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
        this.file = this.epub.files[this.file_index];
        console.log(this.file);
        // if file type is not image, show content_text
        if (this.file.type.indexOf("image") == -1) {
            this.content_text = this.file.text;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.content_text = e.target.result;
            };
            reader.readAsText(this.file.content);
        }
        this.displayType = this.file.page_style;
    },
    methods: {
        formatSizeUnits(bytes) {
            if (bytes >= 1073741824) {
                bytes = (bytes / 1073741824).toFixed(2) + " GB";
            } else if (bytes >= 1048576) {
                bytes = (bytes / 1048576).toFixed(2) + " MB";
            } else if (bytes >= 1024) {
                bytes = (bytes / 1024).toFixed(2) + " KB";
            } else if (bytes > 1) {
                bytes = bytes + " bytes";
            } else if (bytes == 1) {
                bytes = bytes + " byte";
            } else {
                bytes = "0 byte";
            }
            return bytes;
        },
        createObjectURL(file) {
            return URL.createObjectURL(file);
        },
        changeDisplayStyle() {
            console.log(this.displayType);
            this.file.page_style = this.displayType;
        },
        changeCover() {
            console.log(this.coverCheck);
            this.file.cover = this.coverCheck;
        },
        changeFileIndex(count) {
            // change file index
            let tmp = this.file;
            this.epub.files[this.file_index] =
                this.epub.files[this.file_index + count];
            this.epub.files[this.file_index + count] = tmp;
            // this.epub.changeFileIndex(this.file_index, count);
        },
    },
    // if change file, update content_text
    watch: {
        file: function (new_file) {
            if (this.file.type.indexOf("image") == -1) {
                this.content_text = this.file.text;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.content_text = e.target.result;
                };
                reader.readAsText(this.file.content);
            }
            this.displayType = new_file.page_style;
            console.log(this.displayType);
        },
        file_index: function (new_index) {
            this.file = this.epub.files[new_index];
        },
    },
};
</script>
