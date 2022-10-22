<template>
  <v-container v-if="isReady">
    <v-card>
      <v-card-title primary-title>
        Donation review
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>Personal info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" :rules="nameRules" label="Full name" id="name" v-model="oldDonation.name"
                  required readonly>
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="email" :rules="emailRules" label="Your email" id="email" v-model="oldDonation.email"
                  required readonly>
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
                <v-text-field name="amount" :label="amountLabel" id="amount" v-model="oldDonation.amount" type="number"
                  :rules="amountRules" readonly>
                </v-text-field>
              </v-col>
              <v-col>
                <v-textarea outlined name="input-7-4" label="Leave a message (optional)" placeholder="You are amazing!"
                  v-model="oldDonation.description" readonly>
                </v-textarea>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col>
                <v-checkbox label="Donation goes to a bidwar?" v-model="oldDonation.toBid" :disabled="true">
                </v-checkbox>
              </v-col>
              <v-col v-if="oldDonation.toBid">
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
                      <v-btn text color="error" :disabled="true">
                        Remove
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-if="oldDonation.toBid && !savedBid">
              <BidComponent :event="event" @saveBid="saveBid($event)" :isEditedBid="isEditedBid">
              </BidComponent>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-spacer></v-spacer>
              <v-dialog v-model="deleteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="error" v-bind="attrs" v-on="on" class="mr-5">
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    Delete user {{ oldDonation.name }}
                  </v-card-title>
                  <v-card-text>
                    Do you really want to delete this donation?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" link @click="deleteDonation">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/donations'">Cancel</v-btn>
              <!-- <v-btn color="success" class="mr-5" @click="editDonation">Save</v-btn> -->
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
      deleteDialog: false,
      oldDonation: {
        _id: "",
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
      } as Donation,
      newDonation: {
        _id: "",
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
      } as Donation,
      isEditedBid: {} as any,
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

    try {
      const res: Event[] = await trackerEvent.getEvents(this.axios)
      const donRes: Donation[] = await trackerDonation.getOneDonation(this.axios, this.$route.params.id)

      if (donRes[0]) {
        let event = res.find((event) => event._id === donRes[0].eventId)
        if (event) {
          this.event = event
          if (this.event._id)
            this.newDonation.eventId = this.event._id
        }

        this.oldDonation = donRes[0]

        this.isEditedBid = {
          runId: this.oldDonation.runId,
          bidId: this.oldDonation.bidId,
          optionName: this.oldDonation.optionName,
        }
        this.isReady = true
      }
    } catch (error) {
      this.$router.push('/manage/tracker/donations')
    }
  },
  methods: {
    async deleteDonation() {
      if (this.oldDonation.toBid) {
        let bid = this.updatedRun?.row.bids[this.selectedBidIdx]

        // console.log(this.updatedRun)
        if (this.updatedRun) {
          if (this.updatedRun.row.bids[this.selectedBidIdx].type === 0) {
            bid.bids[this.selectedBidOption].current -= Number(this.oldDonation.amount)
            bid.bids.forEach((element: { current: any }) => bid.current += Number(element.current))
          } else {
            bid.current -= Number(this.oldDonation.amount)
          }

          this.updatedRun.row.bids[this.selectedBidIdx] = bid
          // console.log(this.updatedRun.row)
          await trackerRun.updateRun(this.axios, this.updatedRun.row)
        }

      }

      if (this.oldDonation._id) {
        const res = await trackerDonation.deleteDonation(this.axios, this.oldDonation._id)
        if (res) {
          // console.log(res)
          this.$router.push('/manage/tracker/donations')
        }
      }
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