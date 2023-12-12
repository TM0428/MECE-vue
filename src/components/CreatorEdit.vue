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
                        @update:model-value="setRole"
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
import { Creator } from "../js/metadata.js";
import { ROLES } from "../js/statics.js";

export default {
    name: "CreatorEdit",
    props: {
        creator_prop: {
            type: Creator,
            required: true,
        },
    },
    data() {
        return {
            creator: this.creator_prop,
            role: ROLES,
        };
    },
    mounted() {
        // console.log(Creator);
    },
    methods: {
        // set role
        setRole() {
            console.log(this.creator);
        },
        test() {
            console.log(this.creator);
        },
    },
};
</script>
