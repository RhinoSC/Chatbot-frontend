<template>
    <div>
        <v-container grid-list-xs>
            <v-row>
                <h2>Prizes</h2>
                <v-spacer></v-spacer>
                <v-btn link color="success" :to="'prizes/add'">Add</v-btn>
            </v-row>
            <v-list class="mt-5">
                <v-list-item v-for="prize in prizes" :key="prize._id" link :to="`prizes/edit/${prize._id}`">
                    <v-list-item-content>
                        {{ prize.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerPrize from '@/api/marathon/prize'
import Prize from '@/utils/types/Prize'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            prizes: [] as Prize[]
        }
    },
    async created() {
        try {
            const res = await trackerPrize.getPrizes(this.axios)
            this.prizes = res
        } catch (error) {
            this.$router.push('/')
        }
    },
})
</script>
  