<template>
    <v-sheet border rounded class="ma-2">
        <!-- Creator metadata form
            required fields: name, name-yomi, role, seq, id(not editable)
            -->
        <div class="text-h4 ma-2">{{ $t("epubMetadata.creator.label") }}</div>
        <v-form class="ma-3">
            <v-row>
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="creator.name"
                        :label="$t('epubMetadata.creator.label')"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="creator.name_yomi"
                        :label="$t('epubMetadata.creator.yomilabel')"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                    <!-- role have two parameter. role.name is display name. role.role is a value -->
                    <v-select
                        v-model="creator.role"
                        :items="role"
                        item-title="name"
                        item-value="role"
                        :label="$t('epubMetadata.creator.role')"
                        required
                    ></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <!-- creator sequence is allowed only number -->
                    <v-text-field
                        v-model="creator.seq"
                        :label="$t('epubMetadata.creator.sequence')"
                        required
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="creator.id"
                        :label="
                            $t('epubMetadata.creator.label') +
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
import { ROLES } from "../js/statics.js";
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "CreatorEdit",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            creator: this.creator_prop,
            role: ROLES,
        };
    },
    created() {
        this.epub = useEpubStore().epub;
        for (let i = 0; i < this.epub.creators.length; i++) {
            if (this.epub.creators[i].id == this.id) {
                this.creator = this.epub.creators[i];
                break;
            }
        }
    },
    methods: {},
};
</script>
