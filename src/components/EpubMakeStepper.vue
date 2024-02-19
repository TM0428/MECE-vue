<template>
    <div class="stepper">
        <v-stepper v-model="e1">
            <v-stepper-header>
                <template v-for="(step, index) in steps" :key="index">
                    <v-stepper-item
                        :complete="e1 > index"
                        :title="step"
                        :value="index"
                    ></v-stepper-item>

                    <v-divider
                        v-if="index !== steps.length - 1"
                        :key="index"
                    ></v-divider>
                </template>
            </v-stepper-header>
        </v-stepper>
    </div>
</template>
<script>
import { STEPS } from "@/js/statics";

export default {
    name: "EpubMakeStepper",
    props: {
        step: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            steps: STEPS,
            e1: this.step,
        };
    },
};
</script>
