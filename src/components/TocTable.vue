<template>
    <v-table fixed-header>
        <thead>
            <tr>
                <th>{{ $t("tocTable.title") }}</th>
                <th>{{ $t("tocTable.source") }}</th>
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
import { TocContent } from "@/js/epub";

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
            this.epub.tables.push(new TocContent(this.$t("cover"), file));
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
