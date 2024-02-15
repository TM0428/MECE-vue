<template>
    <v-sheet border rounded class="ma-2">
        <!-- Creator metadata form
            required fields: name, name-yomi, role, seq, id(not editable)
            -->
        <div class="text-h3 ma-1">Creator</div>
        <v-form class="ma-3">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="creator.name"
                        label="Creator Name"
                        required
                        @change="test"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="creator.name_yomi"
                        label="Creator Name Yomi"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <!-- role have two parameter. role.name is display name. role.role is a value -->
                    <v-select
                        v-model="creator.role"
                        :items="role"
                        item-title="name"
                        item-value="role"
                        label="Creator Role"
                        required
                    ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <!-- creator sequence is allowed only number -->
                    <v-text-field
                        v-model="creator.seq"
                        label="Creator Sequence"
                        required
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="creator.id"
                        label="Creator ID"
                        readonly
                        disabled
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
    </v-sheet>
</template>

<script>
import { ROLES } from "../js/statics.js";
import { useEpubStore } from "@/stores/epub_store";

export default {
    name: "CreatorEdit",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            creator: this.creator_prop,
            role: ROLES,
        };
    },
    created() {
        this.epub_store = useEpubStore();
        this.epub = this.epub_store.epub;
        for (let i = 0; i < this.epub.creators.length; i++) {
            if (this.epub.creators[i].id == this.id) {
                this.creator = this.epub.creators[i];
                break;
            }
        }
        console.log(this.creator);
    },
    methods: {},
};
</script>
