<template>
    <v-table fixed-header>
        <thead>
            <tr>
                <th>{{ $t("tablesTable.title") }}</th>
                <th>{{ $t("tablesTable.source") }}</th>
            </tr>
        </thead>
        <draggable
            v-model="epub.tables"
            tag="tbody"
            item-key="index"
            @end="onDragEnd"
        >
            <template #item="{ element }">
                <tr>
                    <TocTableContent :table="element" ref="TocTableContent" />
                </tr>
            </template>
        </draggable>
    </v-table>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";
import draggable from "vuedraggable";
import TocTableContent from "./TocTableContent.vue";

export default {
    name: "TableOfContentTable",
    components: {
        draggable,
        TocTableContent,
    },
    data() {
        return {
            epub: useEpubStore().epub,
        };
    },
    created() {
        if (this.epub.tables.length === 0) {
            // 表紙の目次のみを追加
            const file = this.epub.files.find((file) => file.cover === true);
            this.epub.tables.push({
                title: this.$t("cover"),
                source: file.name,
            });
        }
    },
    methods: {
        onDragEnd(event) {
            // useEpubStore().updateToc(event.newIndex, event.oldIndex);
            console.log(event);
        },
    },
};
</script>
