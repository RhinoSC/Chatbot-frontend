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
                            Time Received
                        </th>
                        <th class="text-left">
                            Amount
                        </th>
                        <th class="text-left">
                            Comment
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(donation, i) in donations" :key="i" @click="donationSummerize(donation)">
                        <td>{{ donation.name }}</td>
                        <td>{{ getDateFromMS(donation.time) }}</td>
                        <td>{{ currencyFormat(donation.amount) }}</td>
                        <td>{{ donation.description !== "" ? 'Yes' : 'No' }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-dialog v-model="lookDialog" width="500">
            <v-card class="mx-auto">
                <v-card-text>
                    <div>{{ lookingDonation.name }}</div>
                    <p class="text-h5 text--primary">
                        {{ getDateFromMS(lookingDonation.time) }}
                    </p>
                    <v-divider></v-divider>
                    <div>
                        <p>
                            {{ lookingDonation.description }}
                        </p>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Event from '@/utils/types/Event'
import Donation from '@/utils/types/Donation'
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
            lookingDonation: {} as Donation,
            event: {} as Event,
            tempSchedule: {} as Schedule,
            donations: [] as Donation[]
        }
    },
    async created() {
        const res = await trackerEvent.getOneEventByName(this.axios, process.env.VUE_APP_EVENT)
        // const bidRes = await trackerBid.getBids()

        if (res[0]) {
            this.event = res[0]

            if (this.event.schedule) {
                this.tempSchedule = this.event.schedule
                this.donations = this.event.donations.sort((a: Donation, b: Donation) => {
                    const dateA = new Date(a.time)
                    const dateB = new Date(b.time)
                    return dateB.getMilliseconds() - dateA.getMilliseconds()
                })
                // console.log(this.donations)
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
        getRunName(runId: string) {
            const run = this.tempSchedule.rows.find(row => row.row._id === runId)
            if (run) {
                return run.row.name
            }
        },
        donationSummerize(donation: Donation) {
            this.lookingDonation = donation
            // console.log(this.lookingDonation)
            this.lookDialog = true
        },
        getDateFromMS(ms: number) {
            if (ms) {
                const date = new Date(ms)
                return date.toLocaleString('en-GB', { hour12: true })
            }
        }
        // getDateFromMS(ms: number) {
        //     return new Date(ms).toLocaleDateString('en-US', { dateStyle: 'medium' })
        // }
    }
})
</script>
  