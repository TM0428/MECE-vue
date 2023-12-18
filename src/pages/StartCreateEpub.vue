<template>
    <v-app>
        <!-- User can select two option.
        1. Create new epub file
        2. Create epub with ISBN code
        this page show two option and user can select one of them -->
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Create new epub file</span>
                        </v-card-title>
                        <v-card-text>
                            <p>
                                You can create new epub file with this option.
                                This option is for user who want to create epub
                                file without ISBN code.
                            </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" @click="createEpubInit">
                                Create new epub file
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>
                            <span class="headline">
                                Create epub file with ISBN code
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <p>
                                You can create new epub file with this option.
                                This option is for user who want to create epub
                                file with ISBN code.
                            </p>
                        </v-card-text>
                        <!-- make a dialog and isbn input field. -->
                        <v-card-actions>
                            <v-btn color="primary">
                                Create epub file with ISBN code
                                <v-dialog
                                    v-model="isbn_dialog"
                                    max-width="500px"
                                    activator="parent"
                                >
                                    <!-- dialog has a input field which is ISBN code input -->
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">
                                                Create epub file with ISBN code
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
                    this.epub_store.title = new Title(
                        data[0].onix.DescriptiveDetail.TitleDetail.TitleElement
                            .TitleText.content || "",
                        data[0].onix.DescriptiveDetail.TitleDetail.TitleElement
                            .TitleText.collationkey || ""
                    );
                    for (
                        let i = 0;
                        i < data[0].onix.DescriptiveDetail.Contributor.length;
                        i++
                    ) {
                        let id =
                            "creator" + (i + 1).toString().padStart(2, "0");
                        this.epub_store.creators.push(
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

                    this.epub_store.publishers.push(
                        new Publisher(data[0].summary.publisher || "", "")
                    );
                    this.epub_store.description = new Description();
                    this.epub_store.metadata = new Metadata();

                    console.log(this.epub_store);
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
