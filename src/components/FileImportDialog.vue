<template>
    <div>
        <!-- this component is a dialog that import some img file.
        click button and make a dialog.
        dialog can drag and drop img file.
        or click button and select img folder.
        -->
        <v-btn color="primary" @click="dialog = true">
            import img
            <v-dialog v-model="dialog" max-width="500px" activator="parent">
                <v-card>
                    <v-card-title>
                        <span class="headline"> import img </span>
                    </v-card-title>
                    <v-card-text>
                        <p>You can import img file with this option.</p>
                        <v-text-field
                            v-model="img_path"
                            label="img folder path"
                            required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="dialog = false">
                            Cancel
                        </v-btn>
                        <v-btn color="primary" @click="importImg">
                            import img
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-btn>
    </div>
</template>

<script>
import { useEpubStore } from "../stores/epub_store.js";

export default {
    name: "FileImportDialog",
    setup() {
        const epub_store = useEpubStore();
        const dialog = { value: false };

        const importImg = () => {
            dialog.value = false;
            epub_store.importImg();
        };

        return {
            dialog,
            importImg,
        };
    },
};
</script>
