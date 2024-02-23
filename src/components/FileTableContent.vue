<template>
    <!-- if file.type == image/png or image/jpg, click and show the image -->
    <td>
        <v-checkbox
            v-model="coverCheck"
            @change="changeCover"
            :disabled="efile.file.type.indexOf('image') == -1"
            hide-details
        ></v-checkbox>
    </td>
    <td @click="dialog = true" class="cursor-pointer">
        <v-icon
            v-if="efile.file.type.indexOf('image') != -1"
            :icon="mdiImageIcon"
        ></v-icon>
        <v-icon v-else :icon="mdiFileIcon"></v-icon>
        {{ efile.file.name }}
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline"> {{ efile.file.name }} </span>
                </v-card-title>
                <v-card-text>
                    <div v-if="efile.file.type.indexOf('image') == -1">
                        <textarea
                            :value="content_text"
                            style="width: 100%; height: 200px"
                            readonly
                        >
                        </textarea>
                    </div>
                    <div v-else>
                        <img
                            :src="createObjectURL(efile.file)"
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
        {{ formatSizeUnits(efile.file.size) }}
    </td>
    <td>{{ efile.file.type }}</td>
    <td>
        <v-select
            :label="this.$t('displayStyle.label')"
            v-model="pageStyle"
            :items="styles"
            item-title="text"
            item-value="value"
            @update:model-value="changeDisplayStyle"
            outlined
            hide-details
            class="my-2"
        ></v-select>
        <!-- {{ efile.page_style }} -->
    </td>
    <td>
        <v-icon
            :icon="mdiTrashCanIcon"
            class="cursor-pointer"
            @click="deleteDialog = true"
        ></v-icon>
        <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">
                        {{ this.$t("deleteFile.title") }}
                    </span>
                </v-card-title>
                <v-card-text>
                    <p>{{ this.$t("deleteFile.message") }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="deleteDialog = false">
                        {{ this.$t("deleteFile.cancel") }}
                    </v-btn>
                    <v-btn color="error" @click="deleteFile(efile.id)">
                        {{ this.$t("deleteFile.delete") }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </td>
</template>

<script>
// import { ContentFile } from "@/js/epub";
import { mdiTrashCan, mdiImage, mdiFile } from "@mdi/js";
import { ExtendedFile } from "@/js/epub";

export default {
    name: "FileTableContent",
    props: {
        efile: ExtendedFile,
    },
    emits: ["update:file", "delete:file"],
    data() {
        return {
            dialog: false,
            deleteDialog: false,
            coverCheck: false,
            content_text: "",
            mdiTrashCanIcon: mdiTrashCan,
            mdiImageIcon: mdiImage,
            mdiFileIcon: mdiFile,
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
        // this.epub_store = useEpubStore();
        // this.epub = this.epub_store.epub;
        // this.file = this.epub.files[this.file_index];
        // if file type is not image, show content_text
        this.init();
    },
    methods: {
        init() {
            if (this.efile.file.type.indexOf("image") == -1) {
                this.content_text = this.efile.file.text;
                // read file as tex in this.efile.file
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.content_text = e.target.result;
                };
                reader.readAsText(this.efile.file);
            }
            this.coverCheck = this.efile.cover;
        },
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
        coverDisabled() {
            if (this.efile.file.type.indexOf("image") == -1) {
                return true;
            }
        },
        createObjectURL(file) {
            return URL.createObjectURL(file);
        },
        changeDisplayStyle() {
            console.log(this.pageStyle);
        },
        changeCover() {
            console.log(this.coverCheck);
            const ef = this.efile;
            ef.cover = this.coverCheck;
            this.$emit("update:file", this.efile.id, ef);
        },
        deleteFile(id) {
            this.$emit("delete:file", id);
        },
    },
    // if change file, update content_text
    computed: {
        pageStyle: {
            get() {
                return this.efile.page_style;
            },
            set(value) {
                const ef = this.efile;
                ef.page_style = value;
                this.$emit("update:file", this.efile.id, ef);
            },
        },
    },
};
</script>
