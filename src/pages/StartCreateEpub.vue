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
                            <v-btn color="primary" href="/step1">
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
export default {
    name: "StartCreateEpub",
    data() {
        return {
            isbn_dialog: false,
            isbn: "",
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
                    // data is array
                    // data[0] is object
                    // data[0].summary is object
                    // data[0].summary.isbn is string
                    // data[0].summary.title is string
                    // data[0].summary.volume is string
                    // data[0].summary.series is string
                    // data[0].summary.cover is string
                    // data[0].summary.author is array
                    // data[0].summary.author[0] is string
                    // data[0].summary.publisher is string
                    // data[0].summary.pubdate is string
                    // data[0].summary.cover is string
                    // data[0].onix is object
                    // data[0].onix.DescriptiveDetail is object
                    // data[0].onix.DescriptiveDetail.TitleDetail is object
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleType is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement is array
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0] is object
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleElementLevel is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleText is object
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleText.collationkey is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleText.content is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleText.textformat is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleText.textcase is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleText.textscript is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleElementLevel is string
                    // data[0].onix.DescriptiveDetail.TitleDetail.TitleElement[0].TitleText is object
                    // data[0].onix.Descriptive
                });
        },
    },
};
</script>
