<template>
    <v-container>
        <v-card>
            <v-card-title primary-title class="justify-center font-weight-bold">
                DONATE
            </v-card-title>
            <v-card-text>
                <v-col>
                    <v-form class="mb-5">
                        <v-col>
                            <v-row>
                                <h2>Your info</h2>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field name="name" label="Full name" id="name" v-model="newDonation.name">
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field name="email" label="Your email" id="email"
                                        v-model="newDonation.email">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-divider></v-divider>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field name="amount" label="Amount to donate (in USD)" id="amount"
                                        v-model="newDonation.amount" type="number">
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-textarea outlined name="input-7-4" label="Leave a message"
                                        placeholder="(optional)" v-model="newDonation.description">
                                    </v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-divider></v-divider>
                            </v-row>
                            <v-row class="mt-8">
                                <h2>Bid info</h2>
                                <v-card>
                                    <v-card-title primary-title>
                                        
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn color="primary">text</v-btn>
                                        <v-btn color="primary">text</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-row>
                            <v-row v-if="isReady">
                                <BidComponent :event="event"></BidComponent>
                            </v-row>
                        </v-col>
                    </v-form>

                </v-col>
                <!-- <v-col class="d-flex flex-column align-center">
                    <v-form class="mb-5">
                        <v-col>
                            <v-row>
                                <h2>Your info</h2>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field name="name" label="Full name" id="name" v-model="newDonation.name">
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field name="email" label="Your email" id="email"
                                        v-model="newDonation.email">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-divider></v-divider>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field name="amount" label="Amount to donate" id="amount"
                                        v-model="newDonation.amount" type="number">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/users'">Cancel
                                </v-btn>
                                <v-btn color="success" class="mr-5" @click="addUser">Save</v-btn>
                            </v-row>
                        </v-col>
                    </v-form>
                    <div id="paypal-donate-button-container"></div>
                </v-col> -->
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script>
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import BidComponent from '@/components/Donation/BidComponent.vue'

export default Vue.extend({
    name: 'donate-view',
    components: {
        BidComponent
    },
    data() {
        return {
            isReady: false,
            loaded: false,
            newDonation: {
                name: "",
                email: "",
                time: 0,
                amount: 0,
                description: "",
                toBid: false,
                toBidArray: [],
                bids: [],
                eventId: ""
            },
            event: null
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
    mounted() {
        let donationScript = document.createElement('script')
        donationScript.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
        donationScript.addEventListener('load', this.setDonationScriptLoaded)
        document.head.appendChild(donationScript)
    },
    methods: {
        setDonationScriptLoaded() {
            this.loaded = true

            window.PayPal.Donation.Button({
                env: 'sandbox',
                // hosted_button_id: 'GD652TWFGE6HN',
                hosted_button_id: 'PP42K8WK5PBZ2',
                // business: 'YOUR_EMAIL_OR_PAYERID',
                image: {
                    src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
                    title: 'PayPal - The safer, easier way to pay online!',
                    alt: 'Donate with PayPal button'
                },
                onComplete: function (params) {
                    this.addDonation(params)
                    // Your onComplete handler
                },
            }).render('#paypal-donate-button-container');
        },
        addDonation(params) {
            console.log(params)
        }
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