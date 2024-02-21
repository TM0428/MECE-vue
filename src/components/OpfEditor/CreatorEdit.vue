<template>
    <v-sheet border rounded class="ma-2">
        <!-- Creator metadata form
            required fields: name, name-yomi, role, seq, id(not editable)
            -->
        <div class="text-h4 ma-2">{{ creator.id }}</div>
        <v-form class="ma-3">
            <v-row align-content="center">
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="creator.name"
                        :label="$t('epubMetadata.creator.label')"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                    <v-text-field
                        v-model="creator.name_yomi"
                        :label="$t('epubMetadata.creator.yomilabel')"
                        hide-details
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
                        hide-details
                    ></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <!-- creator sequence is allowed only number -->
                    <v-text-field
                        v-model="creator.seq"
                        :label="$t('epubMetadata.creator.sequence')"
                        required
                        type="number"
                        hide-details
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
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                    <v-btn
                        color="red-accent-4"
                        @click="delete_dialog = true"
                        block
                        align-self="center"
                        size="large"
                        height="100%"
                        variant="outlined"
                    >
                        {{ $t("epubMetadata.delete") }}
                    </v-btn>
                    <v-dialog v-model="delete_dialog" max-width="400px">
                        <v-card>
                            <v-card-title>
                                {{ $t("epubMetadata.delete") }}
                            </v-card-title>
                            <v-card-text>
                                {{ $t("epubMetadata.creator.deleteConfirm") }}
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    color="primary"
                                    @click="delete_dialog = false"
                                >
                                    {{ $t("epubMetadata.cancel") }}
                                </v-btn>
                                <v-btn color="primary" @click="deleteCreator">
                                    {{ $t("epubMetadata.delete") }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
</template>

<script>
import { ROLES } from "@/js/statics.js";
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "CreatorEdit",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    emits: ["update:creators"],
    data() {
        return {
            role: ROLES,
            delete_dialog: false,
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
    methods: {
        deleteCreator() {
            this.epub.creators = this.epub.creators.filter(
                (creator) => creator.id != this.creator.id
            );
            this.$emit("update:creators", this.epub.creators);
            this.delete_dialog = false;
        },
    },
};
</script>
