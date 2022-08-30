<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Add Bid
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
                <v-text-field name="name" label="Bid name" id="bidName" v-model="newBid.name">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea outlined name="input-7-4" label="Description" v-model="newBid.description">
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select :items="goalTypes" label="Goal type" item-text="key" item-value="value" v-model="newBid.type"
                  @change="modifyAllowNewBids">
                </v-select>
              </v-col>
              <v-col>
                <v-checkbox label="Accept new bids" v-model="newBid.newBids" :disabled="isBidwar"></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field name="bidName" label="Bid option" id="bidOption" v-model="newBidOption" outlined
                  :disabled="isBidwar" @keyup.enter="addBidOption">
                </v-text-field>
                <v-btn color="success" @click="addBidOption">add</v-btn>
              </v-col>
              <v-col>
                <v-card elevation="4">
                  <v-card-title primary-title>
                    Bid options
                  </v-card-title>
                  <v-card-text>
                    <v-list class="rounded-lg" style="border: 1px solid #763131">
                      <v-list-item v-for="(item, i) in newBid.bids" :key="i" style="border-bottom: 1px solid #763131">
                        <v-list-item-content color="grey darken-2">
                          <v-list-item-title> {{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/bids'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="addBid">Save</v-btn>
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
import trackerSchedule from '@/api/marathon/schedule'
import trackerEvent from '@/api/marathon/event'
import Bid from '@/utils/types/Bid'
import { goalType } from '@/utils/enums/goal.enum'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'

export default Vue.extend({
  name: 'manage-tracker',
  components: {
  },
  propsData: {
    popup: Boolean,
  },
  data() {
    return {
      newBidOption: "",
      events: [] as Event[],
      selectedEvent: {} as Event,
      runs: [] as Run[],
      selectedRun: {} as Run,
      goalTypes: [
        { key: "bidwar", value: 0 },
        { key: "goal", value: 1 },
        { key: "total", value: 2 },
      ],
      newBid: {
        name: "",
        game: "",
        goal: 0,
        current: 0,
        description: "",
        type: goalType.goal,
        newBids: false,
        bids: [] as any,
        runId: "",
      }
    }
  },
  async created() {
    const eventRes = await trackerEvent.getEvents()
    this.events = eventRes
  },
  computed: {
    isBidwar() {
      return this.newBid.type != 0 ? true : false
    }
  },
  methods: {
    async addBid() {
      const res = await trackerBid.postBid(this.newBid)
      if (res) {
        console.log(res)
        if (!this.$props.popup)
          this.$router.push('/manage/tracker/bids')
      }
    },
    getRunArray() {
      if (this.selectedEvent.schedule && this.selectedEvent.schedule.rows.length > 0)
        this.runs = this.selectedEvent.schedule.rows
    },
    modifyAllowNewBids() {
      if (this.newBid.type != 0) {
        this.newBid.newBids = false
        this.newBid.bids = []
      }
    },
    addBidOption() {
      let index = this.newBid.bids.findIndex((bid: any) => bid.name == this.newBidOption)
      if (index == -1) {
        this.newBid.bids.push({ name: this.newBidOption, current: 0 })
      }
      this.newBidOption = ""
    }
  },
})
</script>

<style lang="scss" scoped>
v-col.list-container {
  border: 1px solid black;
  border-radius: 10px;
}
</style>