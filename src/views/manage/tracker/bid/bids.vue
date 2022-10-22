<template>
    <div>
        <v-container grid-list-xs>
            <v-row>
                <h2>Bids</h2>
                <v-spacer></v-spacer>
                <v-btn link color="success" :to="'bids/add'" :disabled="true">Add</v-btn>
            </v-row>
            <v-list class="mt-5">
                <v-list-item v-for="bid in bids" :key="bid._id" link :to="`bids/edit/${bid._id}`">
                    <v-list-item-content>
                        {{ bid.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerBid from '@/api/marathon/bid'
import Bid from '@/utils/types/Bid'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            bids: [] as Bid[]
        }
    },
    async created() {
        try {
            const res = await trackerBid.getBids(this.axios)
            this.bids = res
        } catch (error) {
            this.$router.push('/')
        }
    },
    mounted() {
        // console.log('hola')
    }
})
</script>
  