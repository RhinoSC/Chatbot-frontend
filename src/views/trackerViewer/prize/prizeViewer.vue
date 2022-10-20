<template>
    <v-container grid-list-xs v-if="isReady">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Entry threshold
                        </th>
                        <th class="text-left">
                            Image
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prize, i) in prizes" :key="i">
                        <template v-if="prize.active">
                            <td>{{ prize.name }}</td>
                            <td> {{ currencyFormat(prize.minAmount)}}</td>
                            <td>
                                <v-btn text :href="prize.imgUrl" target="_blank">
                                    Link<v-icon>mdi-image-area</v-icon>
                                </v-btn>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Event from '@/utils/types/Event'
import Prize from '@/utils/types/Prize'
import { currencyFormat } from '@/utils/stringFuncs'
import Schedule from '@/utils/types/Schedule'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            isReady: false,
            lookDialog: false,
            lookingPrize: {} as Prize,
            event: {} as Event,
            tempSchedule: {} as Schedule,
            prizes: [] as Prize[]
        }
    },
    async created() {
        const res = await trackerEvent.getOneEventByName(this.axios, process.env.VUE_APP_EVENT)
        // const bidRes = await trackerBid.getBids()

        if (res[0]) {
            this.event = res[0]

            if (this.event.schedule) {
                this.tempSchedule = this.event.schedule
                this.prizes = this.event.prizes
                // console.log(this.prizes)
                this.isReady = true
            }
        }

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
            return currencyFormat(amount, this.event.isCharityData.paypalData.currency)
        },
    }
})
</script>
  