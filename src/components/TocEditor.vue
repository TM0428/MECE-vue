<template>
    <v-card>
        <v-card-title>
            <span class="headline">
                {{ this.$t("tocEditor.title") }}
            </span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="toc_edit.title"
                            :label="this.$t('tocEditor.title')"
                            outlined
                            hide-details
                            class="my-2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="toc_edit.source"
                            :label="this.$t('tocEditor.source')"
                            outlined
                            hide-details
                            class="my-2"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="saveToc">
                {{ this.$t("tocEditor.save") }}
            </v-btn>
            <v-btn color="error" @click="cancelToc">
                {{ this.$t("tocEditor.cancel") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "TocEditor",
    props: {
        toc: Object,
    },
    data() {
        return {
            toc_edit: this.toc,
        };
    },
};
</script>
