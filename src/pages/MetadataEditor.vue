<template>
    <v-app>
        <div class="stepper">
            <v-stepper model-value="1">
                <v-stepper-header>
                    <v-stepper-item
                        value="1"
                        :title="steps[0]"
                    ></v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item
                        value="2"
                        :title="steps[1]"
                    ></v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item value="3"></v-stepper-item>
                </v-stepper-header>
            </v-stepper>
        </div>
    </v-app>
</template>

<script>
import { STEPS } from "../js/statics.js";

export default {
    name: "MetadataEditor",
    data() {
        return {
            message: "Metadata Editor",
            steps: STEPS,
        };
    },
    mounted() {
        console.log(STEPS);
    },
};
</script>
