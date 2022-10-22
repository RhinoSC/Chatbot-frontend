<template>
    <div>
        <v-container grid-list-xs>
            <v-row>
                <h2>Runs</h2>
                <v-spacer></v-spacer>
                <v-btn link color="success" :to="'runs/add'">Add</v-btn>
            </v-row>
            <v-list>
                <v-list-item v-for="run in runs" :key="run._id" link :to="`runs/edit/${run._id}`">
                    <v-list-item-content>
                        {{ run.name }} - {{ run.scheduleId }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerRun from '@/api/marathon/run'
import Run from '@/utils/types/Run'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            runs: [] as Run[]
        }
    },
    async created() {
        try {
            const res = await trackerRun.getRuns(this.axios)
            this.runs = res
        } catch (error) {
            this.$router.push('/')
        }
    },
})
</script>
  