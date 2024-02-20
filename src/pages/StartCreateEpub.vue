<template>
    <v-app>
        <v-container class="fill-height">
            <v-row style="height: 100%" align="center" justify="center">
                <v-col cols="6" md="6" align-self="center">
                    <v-card style="height: 300px" class="d-flex flex-column">
                        <v-card-title>
                            <span class="headline">{{
                                $t("start.title")
                            }}</span>
                        </v-card-title>
                        <v-card-text>
                            <p class="text-body-1">
                                {{ $t("start.description") }}
                            </p>
                        </v-card-text>
                        <v-card-actions class="mt-auto">
                            <v-btn color="primary" @click="createEpubInit">
                                {{ $t("start.create") }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="6" md="6" align-self="center">
                    <v-card style="height: 300px" class="d-flex flex-column">
                        <v-card-title>
                            <span class="headline">
                                {{ $t("start.createWithIsbnTitle") }}
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <p class="text-body-1">
                                {{ $t("start.descriptionWithIsbn") }}
                            </p>
                        </v-card-text>
                        <!-- make a dialog and isbn input field. -->
                        <v-card-actions class="mt-auto">
                            <v-btn color="primary">
                                {{ $t("start.createWithIsbn") }}
                                <v-dialog
                                    v-model="isbn_dialog"
                                    max-width="500px"
                                    activator="parent"
                                >
                                    <!-- dialog has a input field which is ISBN code input -->
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">
                                                {{
                                                    $t(
                                                        "start.createWithIsbnTitle"
                                                    )
                                                }}
                                            </span>
                                        </v-card-title>
                                        <v-card-text>
                                            <p>
                                                {{
                                                    $t(
                                                        "start.isbnCodeDescription"
                                                    )
                                                }}
                                            </p>
                                            <v-text-field
                                                v-model="isbn"
                                                :label="$t('start.isbnCode')"
                                                required
                                            ></v-text-field>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn
                                                color="primary"
                                                @click="isbn_dialog = false"
                                            >
                                                {{ $t("start.cancel") }}
                                            </v-btn>
                                            <v-btn
                                                color="primary"
                                                @click="dataImportFromOpenBD"
                                            >
                                                {{ $t("start.import") }}
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { create_epub_from_isbn } from "@/js/epub.js";
import { useEpubStore } from "../stores/epub_store.js";

export default {
    name: "StartCreateEpub",
    data() {
        return {
            isbn_dialog: false,
            isbn: "",
            epub_store: useEpubStore(),
        };
    },
    methods: {
        async dataImportFromOpenBD() {
            // import data from openBD
            // request isbn code to openBD
            // url is https://api.openbd.jp/v1/get?isbn={isbn code}
            // response is json
            console.log(this.isbn);
            const epub = await create_epub_from_isbn(this.isbn);
            this.epub_store.epub = epub;
            console.log(this.epub_store.epub);
            this.$router.push({
                name: "OpfFileEditor",
            });
        },
        createEpubInit() {
            // make epub data and router push to OpfFileEditor
            this.epub_store.reset();
            this.epub_store.createInit();
            this.$router.push({
                name: "OpfFileEditor",
            });
        },
    },
};
</script>
