<template>
    <v-app>
        <v-main>
            <TocTable />
        </v-main>
    </v-app>
</template>

<script>
import TocTable from "@/components/TocTable.vue";

export default {
    name: "TocEdit",
    components: {
        TocTable,
    },
};
</script>
