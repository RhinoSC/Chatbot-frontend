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
                <tbody>
                    <tr v-for="(bid, i) in bids" :key="i" @click="bidSummerize(bid)">
                        <td>{{ bid.name }}</td>
                        <td>{{ bid.game }}</td>
                        <td>{{ bid.description }}</td>
                        <td>{{ currencyFormat(bid.current) }}</td>
                        <td>{{ calculateGoal(bid) }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-dialog v-model="lookDialog" width="500">
            <v-card class="mx-auto">
                <v-card-text>
                    <div>{{lookingBid.game}}</div>
                    <p class="text-h4 text--primary">
                        {{lookingBid.name}}
                    </p>
                    <v-divider></v-divider>
                    <template v-if="lookingBid.type !== 0">
                        <div class="text--primary d-flex">
                            {{lookingBid.description}}
                            <v-spacer></v-spacer>
                            {{currencyFormat(lookingBid.current)}} /
                            {{currencyFormat(lookingBid.goal)}}
                        </div>
                    </template>
                    <template v-else>
                        <div class="text--primary d-flex">
                            {{lookingBid.description}}
                            <v-spacer></v-spacer>
                            {{currencyFormat(lookingBid.current)}}
                        </div>
                        <div class="text--primary d-flex flex-column">
                            <b>Options:</b>
                            <div v-for="(optionBid, ind) in lookingBid.bids" :key="ind">
                                <v-icon>mdi-arrow-right</v-icon> {{ optionBid.name }}:
                                {{currencyFormat(optionBid.current)}}
                            </div>
                        </div>
                    </template>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import trackerBid from '@/api/marathon/bid'
import Event from '@/utils/types/Event'
import Bid from '@/utils/types/Bid'
import ScheduleRow from '@/utils/types/ScheduleRow'
import { getRunnerString, currencyFormat } from '@/utils/stringFuncs'
import Run from '@/utils/types/Run'
import Schedule from '@/utils/types/Schedule'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            isReady: false,
            lookDialog: false,
            event: {} as Event,
            tempSchedule: {} as Schedule,
            bids: [] as Bid[],
            lookingBid: {} as Bid,
        }
    },
    async created() {
        const res = await trackerEvent.getOneEventByName(`${process.env.VUE_APP_EVENT}`)
        const bidRes = await trackerBid.getBids()

        if (res[0]) {
            this.event = res[0]

            if (this.event.schedule) {
                this.tempSchedule = this.event.schedule
            }
        }

        if (bidRes) {
            this.bids = bidRes
            // console.log(this.bids)
            // console.log(this.bids)
        }
        this.isReady = true
        // console.log(this.scheduleRows)
    },
    mounted() {
        // console.log('hola')
    },
    methods: {
        calculateGoal(bid: Bid) {
            if (bid.type === 0) return '(None)'
            return currencyFormat(bid.goal, this.event.isCharityData.paypalData.currency)
        },
        currencyFormat(amount: number) {
            return currencyFormat(amount, this.event.isCharityData.paypalData.currency)
        },
        bidSummerize(bid: Bid) {
            this.lookingBid = bid
            this.lookDialog = true
        }
    },
    watch: {
        lookDialog() {
            // console.log(this.lookDialog)
        }
    }

})
</script>
  