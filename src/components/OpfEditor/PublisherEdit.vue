<template>
    <v-sheet border rounded class="ma-2">
        <div class="text-h4 ma-3">{{ $t("epubMetadata.publisher.label") }}</div>
        <!-- publisher name, yomi, id(readonly, disable) -->
        <v-form class="ma-3">
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="publisher.name"
                        :label="$t('epubMetadata.publisher.label')"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="publisher.name_yomi"
                        :label="$t('epubMetadata.publisher.yomilabel')"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="publisher.id"
                        :label="
                            $t('epubMetadata.publisher.label') +
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
    name: "PublisherEdit",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    created() {
        this.epub = useEpubStore().epub;
        for (let i = 0; i < this.epub.publishers.length; i++) {
            if (this.epub.publishers[i].id == this.id) {
                this.publisher = this.epub.publishers[i];
                break;
            }
        }
    },
    methods: {},
};
</script>
