<template>
    <v-sheet border rounded class="ma-2">
        <!-- Creator metadata form
            required fields: title, title-yomi, id(not editable)
            -->
        <div class="text-h4 ma-2">{{ $t("epubMetadata.title.label") }}</div>
        <v-form class="ma-3">
            <v-row>
                <v-col cols="6" md="6" ms="12">
                    <v-text-field
                        v-model="title.title"
                        :label="$t('epubMetadata.title.label')"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6" ms="12">
                    <v-text-field
                        v-model="title.title_yomi"
                        :label="$t('epubMetadata.title.yomilabel')"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6" ms="12">
                    <v-text-field
                        v-model="title.id"
                        :label="
                            $t('epubMetadata.title.label') +
                            $t('epubMetadata.id')
                        "
                        readonly
                        disabled
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "TitleEdit",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    created() {
        this.epub = useEpubStore().epub;
        this.title = this.epub.title;
        if (this.title.id != this.id) {
            console.error("TitleEdit: id is not matched");
        }
    },
    methods: {},
};
</script>
