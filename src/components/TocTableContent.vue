<template>
    <td @click="dialog = true" class="cursor-pointer">
        {{ table.title }}
    </td>
    <td @click="dialog = true" class="cursor-pointer">
        {{ table.source }}
    </td>
    <div>
        <v-dialog v-model="dialog" max-width="500px">
            <TocEditor :toc="table" />
        </v-dialog>
    </div>
</template>

<script>
import TocEditor from "./TocEditor.vue";

export default {
    name: "TocTableContent",
    components: {
        TocEditor,
    },
    props: {
        table: Object,
    },
    data() {
        return {
            dialog: false,
        };
    },
};
</script>
