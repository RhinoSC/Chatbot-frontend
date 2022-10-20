<template>
  <v-container>
    <v-card>
      <v-card-title primary-title>
        Add Donation
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>Personal info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" :rules="nameRules" label="Full name" id="name" v-model="newDonation.name"
                  required>
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="email" :rules="emailRules" label="Your email" id="email" v-model="newDonation.email"
                  required>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="mb-5">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <h2>Donation info</h2>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field name="amount" :label="amountLabel" id="amount" v-model="newDonation.amount" type="number"
                  :rules="amountRules">
                </v-text-field>
              </v-col>
              <v-col>
                <v-textarea outlined name="input-7-4" label="Leave a message (optional)" placeholder="You are amazing!"
                  v-model="newDonation.description">
                </v-textarea>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col>
                <v-checkbox label="Donation goes to a bidwar?" v-model="newDonation.toBid">
                </v-checkbox>
              </v-col>
              <v-col v-if="newDonation.toBid">
                <v-row class="mt-8" v-if="savedBid">
                  <v-card>
                    <v-card-title class="text-h5">
                      {{updatedRun?.row.bids[selectedBidIdx].game}}
                    </v-card-title>

                    <v-card-subtitle>
                      {{updatedRun?.row.bids[selectedBidIdx].name}}
                    </v-card-subtitle>
                    <v-card-subtitle class="mt-n5">
                      {{updatedRun?.row.bids[selectedBidIdx].description}}
                    </v-card-subtitle>
                    <v-card-text>
                      <template v-if="updatedRun?.row.bids[selectedBidIdx].type === 0">
                        Option selected:
                        {{updatedRun.row.bids[selectedBidIdx].bids[selectedBidOption].name}}
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
            <v-row v-if="newDonation.toBid && !savedBid">
              <BidComponent :event="event" @saveBid="saveBid($event)">
              </BidComponent>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/donations'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="addDonation">Save</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerDonation from '@/api/marathon/donation'
import trackerEvent from '@/api/marathon/event'
import trackerRun from '@/api/marathon/run'
import Donation from '@/utils/types/Donation'
import Event from '@/utils/types/Event'
import BidComponent from '@/components/Donation/BidComponent.vue'
import ScheduleRow from '@/utils/types/ScheduleRow'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
    BidComponent
  },
  data() {
    return {
      isReady: false,
      event: {} as Event,
      savedBid: false,
      updatedRun: undefined as ScheduleRow | undefined,
      selectedBidIdx: -1,
      selectedBidOption: -1,
      addedNewOpt: false,
      newDonation: {
        name: "",
        email: "",
        time: 0,
        amount: 0,
        description: "",
        toBid: false,
        runId: "",
        bidId: "",
        optionName: "",
        eventId: ""
      },
      nameRules: [
        (v: any) => !!v || 'Name is required',
        (v: string | any[]) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      requiredRules: [
        (v: any) => !!v || 'Amount is required',
      ],
    }
  },
  async created() {
    const res = await trackerEvent.getEvents(this.axios)
    this.event = res.find((event: { name: string }) => event.name === process.env.VUE_APP_EVENT)

    if (this.event) {
      if (this.event._id) {
        this.newDonation.eventId = this.event._id
        this.isReady = true
      }
    }
  },
  methods: {
    async addDonation() {
      if (this.newDonation.toBid) {
        let bid = this.updatedRun?.row.bids[this.selectedBidIdx]

        if (this.updatedRun) {
          if (this.updatedRun.row.bids[this.selectedBidIdx].type === 0) {
            this.newDonation.optionName = bid.bids[this.selectedBidOption].name
            bid.bids[this.selectedBidOption].current += Number(this.newDonation.amount)
            bid.current = 0
            bid.bids.forEach((element: { current: any }) => bid.current += Number(element.current))
          } else {
            bid.current += Number(this.newDonation.amount)
          }

          this.updatedRun.row.bids[this.selectedBidIdx] = bid
          // console.log(this.updatedRun.row)
          await trackerRun.updateRunWithBidsAndTeams(this.axios, this.updatedRun.row)
        }
      }

      this.newDonation.time = new Date().getTime()
      // console.log(this.newDonation)
      try {
        let response = await trackerDonation.postDonation(this.axios, this.newDonation)
        if (response) {
          this.$router.push('/manage/tracker/donations')
        }
      } catch (e) {
        console.error(e)
      }
    },
    removeSelectedBid() {
      this.savedBid = false
      this.newDonation.runId = ""
      this.newDonation.bidId = ""
      this.selectedBidIdx = -1
      this.selectedBidOption = -1
      this.addedNewOpt = false
      this.updatedRun = undefined
    },
    saveBid($event: any) {
      // console.log($event)
      this.savedBid = true
      this.newDonation.runId = $event.runId
      this.newDonation.bidId = $event.bidId
      this.selectedBidIdx = $event.selectedBidIdx
      this.selectedBidOption = $event.selectedBidOption
      this.addedNewOpt = $event.addedNewOpt
      this.updatedRun = $event.runBid
      // console.log('hola', $event.runBid)
      // console.log(this.updatedRun.row.bids)
    },
  },
  computed: {
    amountRules() {
      if (this.event.isCharityData) {
        return [
          (v: any) => !!v || 'Amount is required',
          (v: number) => v >= this.event.isCharityData.minDonation || `Has to be greater than ${this.event.isCharityData.minDonation}`
        ]
      }
      return [(v: any) => !!v || 'Amount is required']
    },
    amountLabel() {
      if (this.event.isCharityData) {
        return `Amount to donate in (${this.event.isCharityData.paypalData.currency})`
      }
      return `Amount to donate`
    }
  }
})
</script>
