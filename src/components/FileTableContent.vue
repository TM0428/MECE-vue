<template>
    <!-- if file.type == image/png or image/jpg, click and show the image -->
    <td @click="dialog = true">
        {{ file.name }}
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline"> {{ file.name }} </span>
                </v-card-title>
                <v-card-text>
                    <div
                        v-if="
                            file.type == 'image/png' || file.type == 'image/jpg'
                        "
                    >
                        <img
                            :src="createObjectURL(file)"
                            alt="Preview"
                            style="width: 100%"
                        />
                    </div>
                    <div v-else>
                        <!-- show raw content -->
                        <textarea
                            :value="content_text"
                            style="width: 100%; height: 200px"
                            readonly
                        >
                        </textarea>
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
        <v-icon :icon="mdiArrowUpIcon"></v-icon>
        <v-icon :icon="mdiArrowDownIcon"></v-icon>
    </td>
    <td>
        <v-select
            label="表示形式"
            v-model="displayType"
            :items="styles"
            item-title="text"
            item-value="value"
            @change="changeDisplayStyle"
        ></v-select>
    </td>
</template>

<script>
// import { ContentFile } from "@/js/epub";
import { mdiArrowUp, mdiArrowDown } from "@mdi/js";

export default {
    name: "FileTableContent",
    props: {
        file: File,
    },
    data() {
        return {
            dialog: false,
            content_text: "",
            mdiArrowUpIcon: mdiArrowUp,
            mdiArrowDownIcon: mdiArrowDown,
            displayType: "right",
            styles: [
                {
                    value: "right",
                    text: "page-spread-right",
                },
                {
                    value: "left",
                    text: "page-spred-left",
                },
                {
                    value: "center",
                    text: "page-spread-center",
                },
            ],
        };
    },
    mounted() {
        if (this.file.type != "image/png" && this.file.type != "image/jpg") {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.content_text = e.target.result;
            };
            reader.readAsText(this.file.content);
        }
        // console.log(this.file);
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
            this.$emit("change-display-style", this.displayType);
        },
    },
    // if change file, update content_text
    watch: {
        file: function (new_file) {
            if (new_file.type != "image/png" && new_file.type != "image/jpg") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.content_text = e.target.result;
                };
                reader.readAsText(new_file);
            }
            this.displayType = new_file.page_style;
        },
    },
};
</script>
