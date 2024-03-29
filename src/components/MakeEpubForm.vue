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
                    readonly
                    hide-details
                    class="my-2"
                ></v-text-field>
                <div v-for="(creator, index) in epub.creators" :key="index">
                    <v-text-field
                        v-model="creator.name"
                        :label="this.$t('makeEpubForm.creator')"
                        outlined
                        readonly
                        hide-details
                        class="my-2"
                    ></v-text-field>
                </div>
                <div v-for="(publisher, index) in epub.publishers" :key="index">
                    <v-text-field
                        v-model="publisher.name"
                        :label="this.$t('makeEpubForm.publisher')"
                        outlined
                        readonly
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
                    <confirm-dialog
                        :comfirmTitle="this.$t('makeEpubForm.confirm')"
                        :confirmMessage="this.$t('makeEpubForm.confirmMessage')"
                        :confirmYes="this.$t('makeEpubForm.yes')"
                        :confirmNo="this.$t('makeEpubForm.no')"
                        @confirm="makeEpub"
                    ></confirm-dialog>
                </v-dialog>
                <v-btn
                    @click="this.$router.push('/')"
                    variant="outlined"
                    block
                    size="large"
                >
                    {{ this.$t("makeEpubForm.gotoFirst") }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";
import { mdiFile } from "@mdi/js";
import { create_epub } from "@/js/epub_create";
import ConfirmDialog from "./ConfirmDialog.vue";

export default {
    name: "MakeEpubForm",
    components: {
        ConfirmDialog,
    },
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
        async makeEpub(confirm) {
            if (confirm == false) {
                this.confirmDialog = false;
                return;
            }
            await create_epub(this.epub);
            this.confirmDialog = false;
        },
    },
};
</script>
