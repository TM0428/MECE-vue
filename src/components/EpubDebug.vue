<template>
    <v-btn block @click="showLog"> debug </v-btn>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";

export default {
    methods: {
        showLog() {
            console.log(useEpubStore().epub);
        },
    },
};
</script>
