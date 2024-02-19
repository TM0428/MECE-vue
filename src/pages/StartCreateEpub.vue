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
                            <p>
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
                                                You can create new epub file
                                                with this option. This option is
                                                for user who want to create epub
                                                file with ISBN code.
                                            </p>
                                            <v-text-field
                                                v-model="isbn"
                                                label="ISBN code"
                                                required
                                            ></v-text-field>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn
                                                color="primary"
                                                @click="isbn_dialog = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                color="primary"
                                                @click="dataImportFromOpenBD"
                                            >
                                                Create epub file with ISBN code
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
import {
    Title,
    Creator,
    Publisher,
    Description,
    Metadata,
} from "../js/epub.js";
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
        dataImportFromOpenBD() {
            // import data from openBD
            // request isbn code to openBD
            // url is https://api.openbd.jp/v1/get?isbn={isbn code}
            // response is json
            console.log(this.isbn);
            const url = "https://api.openbd.jp/v1/get?isbn=" + this.isbn;
            // request to openBD
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    // reset epub store
                    this.epub_store.reset();
                    this.epub_store.createInit();
                    const epub = this.epub_store.epub;
                    epub.title = new Title(
                        data[0].onix.DescriptiveDetail.TitleDetail.TitleElement
                            .TitleText.content || "",
                        data[0].onix.DescriptiveDetail.TitleDetail.TitleElement
                            .TitleText.collationkey || ""
                    );
                    epub.creators = [];
                    for (
                        let i = 0;
                        i < data[0].onix.DescriptiveDetail.Contributor.length;
                        i++
                    ) {
                        let id =
                            "creator" + (i + 1).toString().padStart(2, "0");
                        epub.creators.push(
                            new Creator(
                                data[0].onix.DescriptiveDetail.Contributor[i]
                                    .PersonName.content || "",
                                data[0].onix.DescriptiveDetail.Contributor[i]
                                    .PersonName.collationkey || "",
                                "aut",
                                Number(
                                    data[0].onix.DescriptiveDetail.Contributor[
                                        i
                                    ].SequenceNumber || i + 1
                                ),
                                id,
                                i
                            )
                        );
                    }
                    epub.publishers = [];
                    epub.publishers.push(
                        new Publisher(data[0].summary.publisher || "", "")
                    );
                    epub.description = new Description();
                    epub.metadata = new Metadata();

                    console.log(epub);
                    this.$router.push({
                        name: "OpfFileEditor",
                    });
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
