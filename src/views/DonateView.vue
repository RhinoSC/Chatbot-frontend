<template>
    <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                    Personal info
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">
                    Donation info
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">
                    Donate
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">
                    Finish
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-5">
                        <v-card-text>
                            <v-col>
                                <v-form>
                                    <v-col>
                                        <v-row>
                                            <v-col>
                                                <v-text-field name="name" label="Full name" id="name"
                                                    v-model="newDonation.name">
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field name="email" label="Your email" id="email"
                                                    v-model="newDonation.email">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-form>
                            </v-col>
                        </v-card-text>
                    </v-card>

                    <v-btn color="primary" @click="e1 = 2">
                        Continue
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card class="mb-5">
                        <v-card-text>
                            <v-col>
                                <v-form>
                                    <v-col>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field name="amount" label="Amount to donate (in USD)"
                                                    id="amount" v-model="newDonation.amount" type="number">
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-textarea outlined name="input-7-4" label="Leave a message"
                                                    placeholder="(optional)" v-model="newDonation.description">
                                                </v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mt-n15">
                                            <v-col>
                                                <v-checkbox label="Donation goes to a bidwar?"
                                                    v-model="newDonation.toBid">
                                                </v-checkbox>
                                            </v-col>
                                            <v-col v-if="newDonation.toBid">
                                                <v-row class="mt-8" v-if="savedBid">
                                                    <v-card>
                                                        <v-card-title class="text-h5">
                                                            {{this.updatedRun.row.bids[this.selectedBidIdx].game}}
                                                        </v-card-title>

                                                        <v-card-subtitle>
                                                            {{this.updatedRun.row.bids[this.selectedBidIdx].name}}
                                                        </v-card-subtitle>
                                                        <v-card-subtitle class="mt-n5">
                                                            {{this.updatedRun.row.bids[this.selectedBidIdx].description}}
                                                        </v-card-subtitle>
                                                        <v-card-text>
                                                            <template
                                                                v-if="this.updatedRun.row.bids[this.selectedBidIdx].type === 0">
                                                                Option selected:
                                                                {{this.updatedRun.row.bids[this.selectedBidIdx].bids[this.selectedBidOption].name}}
                                                            </template>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-btn text color="error" @click="removeSelectedBid">
                                                                Remove
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col v-if="newDonation.toBid">
                                        <v-row v-if="isReady && !savedBid">
                                            <BidComponent :event="event" @saveBid="saveBid($event)"></BidComponent>
                                        </v-row>
                                    </v-col>
                                </v-form>
                            </v-col>
                        </v-card-text>
                    </v-card>

                    <v-btn color="primary" @click="renderPaypalBtn()">
                        Continue
                    </v-btn>

                    <v-btn text @click="e1 = 1">
                        Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-col class="d-flex align-center justify-center">
                        <v-card>
                            <v-card-actions>
                                <div id="paypal-donate-button-container"></div>
                            </v-card-actions>
                            <!-- <form action="https://www.sandbox.paypal.com/donate" method="post" target="_top">
                            <input type="hidden" name="business" value="csolanoc@unal.edu.co">
                            <input type="hidden" name="no_recurring" value="0">
                            <input type="hidden" name="item_name" value="Friends of the Park">
                            <input type="hidden" name="item_number" value="Fall Cleanup Campaign">
                            <input type="hidden" name="currency_code"
                                :value="this.event ? event.isCharityData.paypalData.currency : 'USD'">
                            <input type="hidden" name="amount" :value="newDonation.amount">
                            <input type="hidden" name="return" value="localhost:8080/donate-success">
                            <input type="hidden" name="custom" :value="encodeURIComponent(JSON.stringify(this.testData))">
                            <input type="image" name="submit"
                                src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" alt="Donate">
                            <img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif">
                        </form> -->
                        </v-card>
                    </v-col>

                    <v-btn color="info" @click="e1 = 2">
                        Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-col class="d-flex align-center justify-center">
                        <v-card>
                            <v-card-title primary-title>
                                Thanks for supporting this event!
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>
  
<script>
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import trackerRun from '@/api/marathon/run'
import trackerDonation from '@/api/marathon/donation'
import BidComponent from '@/components/Donation/BidComponent.vue'

import { loadScript, loadCustomScript } from "@paypal/paypal-js";

export default Vue.extend({
    name: 'donate-view',
    components: {
        BidComponent
    },
    data() {
        return {
            e1: 1,
            savedBid: false,
            isReady: false,
            loaded: false,
            newDonation: {
                name: "",
                email: "",
                time: 0,
                amount: 0,
                description: "",
                toBid: false,
                runId: "",
                bidId: "",
                eventId: ""
            },
            paymentCompleted: false,
            event: null,
            updatedRun: {},
            selectedBidIdx: undefined,
            selectedBidOption: undefined,
            addedNewOpt: undefined,
            paypalBtn: {},
            testData: {}
        }
    },
    async created() {
        const res = await trackerEvent.getEvents()

        // change
        // this.event = res.find(event => event.name === 'sre9')
        this.event = res.find(event => event.name === 'sre19')

        if (this.event) {
            this.newDonation.eventId = this.event._id
            this.isReady = true
        }
    },
    async mounted() {
        try {
            await loadCustomScript({
                url: "https://www.paypalobjects.com/donate/sdk/donate-sdk.js",
            });
            console.log("successfully loaded the custom script");
        } catch (error) {
            console.error("failed to load the custom script", error);
        }
    },
    methods: {
        renderPaypalBtn() {
            this.e1 = 3
            let btn = document.querySelector('#donate-button')
            if (btn) {
                btn.remove()
            }
            window.PayPal.Donation.Button({
                currency_code: this.event.isCharityData.paypalData.currency,
                amount: this.newDonation.amount,
                env: process.env.VUE_APP_ENV === 'prod' ? 'production' : 'sandbox',
                business: this.event.isCharityData.paypalData.token || 'csolanoc@unal.edu.co',
                image: {
                    src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
                    title: 'PayPal - The safer, easier way to pay online!',
                    alt: 'Donate with PayPal button'
                },
                onComplete: this.nextStep,
            }).render('#paypal-donate-button-container');
        },
        nextStep(params) {
            this.paymentCompleted = true
        },

        async addDonation() {

            if (this.newDonation.toBid) {
                let bid = this.updatedRun.row.bids[this.selectedBidIdx]

                if (this.updatedRun.row.bids[this.selectedBidIdx].type === 0) {
                    bid.bids[this.selectedBidOption].current += Number(this.newDonation.amount)
                    bid.bids.forEach(element => bid.current += Number(element.current))
                } else {
                    bid.current += Number(this.newDonation.amount)
                }

                this.updatedRun.row.bids[this.selectedBidIdx] = bid
                // console.log(this.updatedRun.row)
                await trackerRun.updateRun(this.updatedRun.row)
            }

            this.newDonation.time = new Date().getTime()
            // console.log(this.newDonation)
            try {
                let response = await trackerDonation.postDonation(this.newDonation)
                if (response) {
                    this.e1 = 4
                }
            } catch (e) {
                console.error(e)
            }
        },
        removeSelectedBid() {
            this.savedBid = false
            this.newDonation.runId = ""
            this.newDonation.bidId = ""
            this.selectedBidIdx = undefined
            this.selectedBidOption = undefined
            this.addedNewOpt = undefined
            this.updatedRun = undefined
        },
        saveBid($event) {
            // console.log($event)
            this.savedBid = true
            this.newDonation.runId = $event.runId
            this.newDonation.bidId = $event.bidId
            this.selectedBidIdx = $event.selectedBidIdx
            this.selectedBidOption = $event.selectedBidOption
            this.addedNewOpt = $event.addedNewOpt
            this.updatedRun = this.event.schedule.rows.find(element => element.row._id === $event.runId)
        }
    },
    watch: {
        paymentCompleted() {
            if (this.paymentCompleted === true) {
                this.addDonation()
            }
        },
    }
})
</script>

<style lang="scss">
.v-application .ml-16 {
    margin-left: 0 !important;
}

.sidebar-component {
    display: none;
}
</style>