<template>
    <v-sheet border rounded class="ma-2">
        <div class="text-h4 ma-2">
            {{ $t("epubMetadata.anotherMetadata.label") }}
        </div>
        <!-- select language(ja,en,de), id(readonly,disable), type, modified -->
        <v-form class="ma-3">
            <v-row>
                <v-col cols="6">
                    <v-select
                        v-model="epub.metadata.language"
                        :items="lang"
                        item-title="name"
                        item-value="lang"
                        :label="
                            $t('epubMetadata.anotherMetadata.language.label')
                        "
                        required
                    ></v-select>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="epub.metadata.id"
                        label="ID"
                        readonly
                        disabled
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-select
                        v-model="epub.metadata.type"
                        :items="types"
                        item-title="name"
                        item-value="type"
                        :label="$t('epubMetadata.anotherMetadata.type.label')"
                        required
                    ></v-select>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="modified"
                        :label="
                            $t('epubMetadata.anotherMetadata.modified.label')
                        "
                        required
                        readonly
                        type="date"
                        @click="dp_dialog = true"
                    ></v-text-field>
                    <v-dialog v-model="dp_dialog" style="width: 360px">
                        <v-date-picker
                            v-model="epub.metadata.modified"
                            width="360"
                            @update:modelValue="updateDate()"
                            @click:save="dp_dialog = false"
                            @click:cancel="dp_dialog = false"
                        >
                        </v-date-picker>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";
import { LANGUAGES, TYPES } from "@/js/statics.js";

export default {
    name: "AnotherMetadataEdit",
    data() {
        return {
            lang: LANGUAGES,
            types: TYPES,
            dp_dialog: false,
            epub: useEpubStore().epub,
        };
    },
    created() {
        this.epub = useEpubStore().epub;
        this.modified = this.epub.metadata.getDate();
    },
    methods: {
        updateDate() {
            this.modified = this.epub.metadata.getDate();
        },
    },
};
</script>
