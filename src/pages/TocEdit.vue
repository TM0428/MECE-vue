<template>
    <v-app>
        <v-main>
            <EpubMakeStepper :step="2" />
            <TocTable />
            <EpubMakeRouter :back="back" :next="next" />
        </v-main>
    </v-app>
</template>

<script>
import TocTable from "@/components/TocTable.vue";
import EpubMakeStepper from "@/components/EpubMakeStepper.vue";
import EpubMakeRouter from "@/components/EpubMakeRouter.vue";

export default {
    name: "TocEdit",
    components: {
        TocTable,
        EpubMakeStepper,
        EpubMakeRouter,
    },
    data() {
        return {
            back: "/step2",
            next: "/step4",
        };
    },
};
</script>
