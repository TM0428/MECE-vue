<template>
    <v-app>
        <v-main>
            <EpubMakeStepper :step="3" />
            <MakeEpubForm />
            <EpubMakeRouter :back="back" :next="next" />
        </v-main>
    </v-app>
</template>

<script>
import EpubMakeStepper from "@/components/EpubMakeStepper.vue";
import MakeEpubForm from "@/components/MakeEpubForm.vue";
import EpubMakeRouter from "@/components/EpubMakeRouter.vue";

export default {
    name: "MakeEpub",
    components: {
        MakeEpubForm,
        EpubMakeStepper,
        EpubMakeRouter,
    },
    data() {
        return {
            back: "/step3",
            next: "",
        };
    },
};
</script>
