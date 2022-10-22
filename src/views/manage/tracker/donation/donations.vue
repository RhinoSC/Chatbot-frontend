<template>
    <div>
        <v-container grid-list-xs>
            <v-row>
                <h2>Donations</h2>
                <v-spacer></v-spacer>
                <v-btn link color="success" :to="'donations/add'">Add</v-btn>
            </v-row>
            <v-list>
                <v-list-item v-for="donation in donations" :key="donation._id" link
                    :to="`donations/edit/${donation._id}`">
                    <v-list-item-content>
                        {{ donation.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerDonation from '@/api/marathon/donation'
import Donation from '@/utils/types/Donation'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            donations: [] as Donation[]
        }
    },
    async created() {
        try {
            const res = await trackerDonation.getDonations(this.axios)
            this.donations = res
        } catch (error) {
            this.$router.push('/')
        }
    },
})
</script>
  