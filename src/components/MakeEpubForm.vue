<template>
    <v-container class="d-flex flex-row">
        <v-row>
            <v-col cols="6">
                <!-- cover image view-->
                <div v-if="cover_file">
                    <v-img
                        :src="createObjectURL(cover_file.file)"
                        alt="Preview"
                        style="width: 100%"
                    />
                </div>
                <div v-else class="d-flex justify-center">
                    <v-icon :icon="mdiFileIcon" size="300"></v-icon>
                </div>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="epub.title.title"
                    :label="this.$t('makeEpubForm.title')"
                    outlined
                    hide-details
                    class="my-2"
                ></v-text-field>
                <div v-for="(creator, index) in epub.creators" :key="index">
                    <v-text-field
                        v-model="creator.name"
                        :label="this.$t('makeEpubForm.creator')"
                        outlined
                        hide-details
                        class="my-2"
                    ></v-text-field>
                </div>
                <div v-for="(publisher, index) in epub.publishers" :key="index">
                    <v-text-field
                        v-model="publisher.name"
                        :label="this.$t('makeEpubForm.publisher')"
                        outlined
                        hide-details
                        class="my-2"
                    ></v-text-field>
                </div>
                <v-btn
                    @click="confirmDialog = true"
                    variant="outlined"
                    block
                    size="large"
                >
                    {{ this.$t("makeEpubForm.makeEpub") }}
                </v-btn>
                <v-dialog v-model="confirmDialog" width="500">
                    <v-card>
                        <v-card-title>
                            {{ this.$t("makeEpubForm.confirm") }}
                        </v-card-title>
                        <v-card-text>
                            {{ this.$t("makeEpubForm.confirmMessage") }}
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="makeEpub">
                                {{ this.$t("makeEpubForm.yes") }}
                            </v-btn>
                            <v-btn @click="confirmDialog = false">
                                {{ this.$t("makeEpubForm.no") }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";
import { mdiFile } from "@mdi/js";
import { create_epub } from "@/js/epub_create";

export default {
    name: "MakeEpubForm",
    data() {
        return {
            epub: useEpubStore().epub,
            cover_file: null,
            mdiFileIcon: mdiFile,
            confirmDialog: false,
        };
    },
    created() {
        this.epub.files.forEach((element) => {
            if (element.cover != undefined && element.cover == true) {
                this.cover_file = element;
            }
        });
    },
    methods: {
        createObjectURL(file) {
            return URL.createObjectURL(file);
        },
        makeEpub() {
            create_epub(this.epub);
        },
    },
};
</script>
