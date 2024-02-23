<template>
    <v-table fixed-header class="ma-2">
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
    <v-btn color="primary" @click="addToc">
        {{ $t("tocTable.add") }}
    </v-btn>
    <v-dialog v-model="create_dialog" max-width="800px">
        <TocEditor
            :toc="new_toc"
            @update:toc="updateToc"
            @cancel:toc="cancelToc"
        />
    </v-dialog>
</template>

<script>
import { useEpubStore } from "@/stores/epub_store";
import draggable from "vuedraggable";
import TocTableContent from "./TocTableContent.vue";
import { TocContent } from "@/js/epub";
import TocEditor from "./TocEditor.vue";

export default {
    name: "TableOfContentTable",
    components: {
        draggable,
        TocTableContent,
        TocEditor,
    },
    data() {
        return {
            epub: useEpubStore().epub,
            create_dialog: false,
        };
    },
    mounted() {
        if (this.epub.tables.length === 0) {
            // 表紙の目次のみを追加
            const file = this.epub.files.find((file) => file.cover === true);
            if (file) {
                this.epub.tables.push(new TocContent(this.$t("cover"), file));
            }
        }
    },
    methods: {
        onDragEnd(event) {
            // useEpubStore().updateToc(event.newIndex, event.oldIndex);
            console.log(event);
        },
        addToc() {
            this.new_toc = new TocContent("title", null, "id");
            this.create_dialog = true;
        },
        updateToc(toc) {
            this.epub.tables.push(toc);
            this.create_dialog = false;
        },
        cancelToc() {
            this.create_dialog = false;
        },
    },
};
</script>
