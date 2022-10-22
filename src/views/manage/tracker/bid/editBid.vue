<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Edit Bid
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-select :items="events" item-text="name" return-object label="Event" v-model="selectedEvent"
                  @change="getRunArray">
                </v-select>
              </v-col>
              <v-col>
                <v-select :items="runs" item-text="name" return-object label="Run" v-model="selectedRun">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" label="Bid name" id="bidName" v-model="oldBid.name">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea outlined name="input-7-4" label="Description" v-model="oldBid.description">
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select :items="goalTypes" label="Goal type" item-text="key" item-value="value" v-model="oldBid.type"
                  @change="modifyAllowNewBids">
                </v-select>
              </v-col>
              <v-col v-if="isBidwar">
                <v-text-field name="bidGoal" label="Goal amount" id="bidGoal" v-model="oldBid.goal" outlined>
                </v-text-field>
              </v-col>
              <v-col v-else>
                <v-checkbox label="Accept new bids" v-model="oldBid.newBids" :disabled="isBidwar"></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field name="bidName" label="Bid option" id="bidOption" v-model="newBidOption" outlined
                  :disabled="isBidwar" @keyup.enter="addBidOption">
                </v-text-field>
                <v-btn color="success" @click="addBidOption" :disabled="isBidwar">add</v-btn>
              </v-col>
              <v-col>
                <v-card elevation="4">
                  <v-card-title primary-title>
                    Bid options
                  </v-card-title>
                  <v-card-text>
                    <v-list class="rounded-lg" style="border: 1px solid #763131">
                      <v-list-item v-for="(item, i) in oldBid.bids" :key="i" style="border-bottom: 1px solid #763131">
                        <v-list-item-content color="grey darken-2">
                          <v-list-item-title> {{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
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
                    Delete bid {{ oldBid.name }}
                  </v-card-title>
                  <v-card-text>
                    Do you really want to delete this bid?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" link @click="deleteBid">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/bids'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="editBid">Save</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerBid from '@/api/marathon/bid'
import trackerEvent from '@/api/marathon/event'
import Bid from '@/utils/types/Bid'
import bid from '@/api/marathon/bid'
import { goalType } from '@/utils/enums/goal.enum'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      deleteDialog: false,
      newBidOption: "",
      goalTypes: [
        { key: "bidwar", value: 0 },
        { key: "goal", value: 1 },
        { key: "total", value: 2 },
      ],
      events: [] as Event[],
      selectedEvent: {} as Event,
      runs: [] as Run[],
      selectedRun: {} as Run,
      oldBid: {
        _id: "",
        name: "",
        game: "",
        goal: 0,
        current: 0,
        description: "",
        type: goalType.goal,
        newBids: false,
        bids: [] as any,
        openBid: false,
        runId: "",
        eventId: ""
      },
      newBid: {
        name: "",
        game: "",
        goal: 0,
        current: 0,
        description: "",
        type: goalType.goal,
        newBids: false,
        bids: [] as any,
        openBid: false,
        runId: "",
        eventId: ""
      }
    }
  },
  async created() {

    try {
      const res = await trackerBid.getOneBid(this.axios, this.$route.params.id)
      if (res[0]) {
        this.oldBid = res[0]

        const eventRes = await trackerEvent.getEvents(this.axios)

        if (eventRes) {
          this.events = eventRes
          this.selectedEvent = eventRes.find((event: { _id: string }) => event._id === this.oldBid.eventId)
          this.getRunArray(this.selectedEvent)
          // console.log(this.runs)
          let run = this.runs.find(run => {
            // console.log(run._id, this.oldBid.runId, run._id === this.oldBid.runId)
            return run._id === this.oldBid.runId
          })
          if (run)
            this.selectedRun = run
        }
      }
    } catch (error) {
      console.error(error)
      // this.$router.push('/manage/tracker/bids')
    }
  },
  methods: {
    async deleteBid() {
      const res = await trackerBid.deleteBid(this.axios, this.oldBid._id)
      if (res) {
        // console.log(res)
        this.$router.push('/manage/tracker/bids')
      }
    },
    async editBid() {

      this.newBid = this.oldBid

      const res = await trackerBid.updateBid(this.axios, this.newBid)
      if (res) {
        // console.log(res)
        this.$router.push('/manage/tracker/bids')
      }
    },
    getRunArray(event?: Event) {
      if (event) {
        if (event.schedule && event.schedule.rows.length > 0) {
          this.runs = event.schedule.rows.map(scheduleRow => scheduleRow.row)
          this.runs = [...event.schedule.availableRuns, ...this.runs]
        }
      } else {
        if (this.selectedEvent.schedule && this.selectedEvent.schedule.rows.length > 0) {
          this.runs = this.selectedEvent.schedule.rows.map(scheduleRow => scheduleRow.row)
          this.runs = [...this.selectedEvent.schedule.availableRuns, ...this.runs]
        }
      }
    },
    modifyAllowNewBids() {
      if (this.oldBid.type != 0) {
        this.oldBid.newBids = false
        this.oldBid.bids = []
      }
    },
    addBidOption() {
      let index = this.oldBid.bids.findIndex((bid: any) => bid.name == this.newBidOption)
      if (index == -1) {
        this.oldBid.bids.push({ name: this.newBidOption, current: 0 })
      }
      this.newBidOption = ""
    }
  },
  computed: {
    isBidwar() {
      return this.oldBid.type != 0 ? true : false
    }
  },
})
</script>
