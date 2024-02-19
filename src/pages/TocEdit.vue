<template>
    <v-app>
        <v-main>
            <EpubMakeStepper :step="2" />
            <TocTable />
        </v-main>
    </v-app>
</template>

<script>
import TocTable from "@/components/TocTable.vue";
import EpubMakeStepper from "@/components/EpubMakeStepper.vue";

export default {
    name: "TocEdit",
    components: {
        TocTable,
        EpubMakeStepper,
    },
};
</script>
