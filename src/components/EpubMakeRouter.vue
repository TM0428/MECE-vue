<template>
    <v-row class="ma-1">
        <v-col cols="6">
            <v-btn
                :to="back"
                color="primary"
                :disabled="!back"
                variant="outlined"
                block
                class="my-2"
            >
                {{ $t("back") }}
            </v-btn>
        </v-col>
        <v-col cols="6">
            <v-btn
                :to="next"
                color="primary"
                :disabled="!next"
                variant="outlined"
                block
                class="my-2"
            >
                {{ $t("next") }}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "EpubMakeRouter",
    props: {
        back: {
            type: String,
            default: "/",
        },
        next: {
            type: String,
            default: "/",
        },
    },
};
</script>
