<template>
    <v-card width="500">
        <v-card-title>
            {{ comfirmTitle }}
        </v-card-title>
        <v-card-text>
            {{ confirmMessage }}
        </v-card-text>
        <v-card-actions>
            <v-btn @click="yesClick">
                {{ confirmYes }}
            </v-btn>
            <v-btn @click="noClick">
                {{ confirmNo }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "ConfirmDialog",
    props: {
        comfirmTitle: {
            type: String,
            required: true,
        },
        confirmMessage: {
            type: String,
            required: true,
        },
        confirmYes: {
            type: String,
            required: true,
        },
        confirmNo: {
            type: String,
        },
    },
    emits: ["confirm"],
    methods: {
        yesClick() {
            this.$emit("confirm", true);
        },
        noClick() {
            this.$emit("confirm", false);
        },
    },
};
</script>
