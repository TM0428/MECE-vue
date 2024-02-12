<template>
    <div>
        <v-row>
            <v-col> ファイル表示形式: </v-col>
            <v-col>
                <v-select
                    label="表示形式"
                    v-model="displayType"
                    :items="styles"
                    item-title="text"
                    item-value="value"
                ></v-select>
            </v-col>
        </v-row>
        <!-- <v-btn color="primary" @click="importFile"> Import Source File </v-btn> -->
        <!-- <FileImportDialog v-model="dialog" /> -->
        <v-file-input
            v-model="files"
            label="Select Source File"
            multiple
            show-size
            show-type
            @change="importFile"
            webkitdirectory
        ></v-file-input>
        <FileTable :files="files" />
    </div>
</template>

<script>
// import FileImportDialog from "@/components/FileImportDialog.vue";
import FileTable from "@/components/FileTable.vue";

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
            content_files: [],
            displayType: "right-left",
            styles: [
                {
                    value: "right-left",
                    text: "右左を順に表示する",
                },
                {
                    value: "left-right",
                    text: "左右を順に表示する",
                },
                {
                    value: "center",
                    text: "中央に表示する",
                },
            ],
        };
    },
    methods: {
        importFile() {
            console.log(this.files);
            // sort files by name
            this.files.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

            // add value to each file
            // styles: right-left, left-right, center
            let value = 0;
            this.files.forEach((file) => {
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
                value++;
            });
            this.dialog = true;
        },
    },
};
</script>
