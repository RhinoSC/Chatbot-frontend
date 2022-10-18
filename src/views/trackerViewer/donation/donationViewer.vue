<template>
    <v-container grid-list-xs>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Run
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left">
                            Amount
                        </th>
                        <th class="text-left">
                            Goal
                        </th>
                    </tr>
                </thead>
                <!-- <tbody>
                    <tr v-for="(bid, i) in bids" :key="i">
                        <td>{{ bid.name }}</td>
                        <td>{{ bid.game }}</td>
                        <td>{{ bid.description }}</td>
                        <td>{{ currencyFormat(bid.current) }}</td>
                        <td>{{ calculateGoal(bid) }}</td>
                    </tr>
                </tbody> -->
            </template>
        </v-simple-table>
    </v-container>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import trackerDonation from '@/api/marathon/donation'
import Event from '@/utils/types/Event'
import Donation from '@/utils/types/Donation'
import { getRunnerString, currencyFormat } from '@/utils/stringFuncs'
import Run from '@/utils/types/Run'
import Schedule from '@/utils/types/Schedule'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            event: {} as Event,
            tempSchedule: {} as Schedule,
            donations: [] as Donation[]
        }
    },
    async created() {
        // const res = await trackerEvent.getOneEventByName(`${process.env.VUE_APP_EVENT}`)
        // const bidRes = await trackerBid.getBids()

        // if (res[0]) {
        //     this.event = res[0]

        //     if (this.event.schedule) {
        //         this.tempSchedule = this.event.schedule
        //     }
        // }

        // if (bidRes) {
        //     this.bids = bidRes
        // }
        // console.log(this.scheduleRows)
    },
    mounted() {
        // console.log('hola')
    },
    methods: {
        currencyFormat(amount: number) {
            return currencyFormat(amount)
        },
    }
})
</script>
  