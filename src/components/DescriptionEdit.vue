<template>
    <v-sheet border rounded class="ma-3">
        <div class="text-h3 ma-3">Description</div>
        <v-textarea v-model="description.description" class="ma-2" />
    </v-sheet>
</template>

<script>
import { Description } from "../js/epub.js";

export default {
    name: "DescriptionEdit",
    props: {
        description_prop: {
            type: Description,
            required: true,
        },
    },
    data() {
        return {
            description: this.description_prop,
        };
    },
    created() {
        console.log("DescriptionEdit created");
        console.log(this.description);
    },
    methods: {
        test() {
            console.log(this.description);
        },
    },
};
</script>
