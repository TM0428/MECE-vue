<template>
    <td @click="dialog = true" class="cursor-pointer">
        {{ table.title }}
    </td>
    <td @click="dialog = true" class="cursor-pointer">
        {{ table.file.name }}
    </td>
    <div>
        <v-dialog v-model="dialog" max-width="800px">
            <TocEditor :toc="table" />
        </v-dialog>
    </div>
</template>

<script>
import TocEditor from "./TocEditor.vue";
import { TocContent } from "@/js/epub";

export default {
    name: "TocTableContent",
    components: {
        TocEditor,
    },
    props: {
        table: TocContent,
    },
    data() {
        return {
            dialog: false,
        };
    },
};
</script>
