<template>
  <v-container grid-list-xs>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in 1" :key="i">
        <v-expansion-panel-header>
          Add bid
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form>
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="5">
                    <v-text-field name="name" label="Bid name" id="bidName" v-model="newBid.name">
                    </v-text-field>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5">
                    <v-text-field name="bidName" label="Bid option" id="bidOption" v-model="newBidOption" outlined
                      :disabled="isBidwar" @keyup.enter="addBidOption">
                    </v-text-field>
                  </v-col>
                  <v-col class="d-flex justify-center mt-2">
                    <v-btn color="success" @click="addBidOption" :disabled="isBidwar">add</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-textarea outlined name="input-7-4" label="Description" v-model="newBid.description">
                    </v-textarea>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <v-list class="rounded-lg white--text" color="accent">
                      <v-list-item v-for="(item, i) in newBid.bids" :key="i" style="border-bottom: 1px solid black;">
                        <v-list-item-icon>
                          <v-icon>mdi-arrow-right</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content color="grey darken-2">
                          <v-list-item-title> {{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-select :items="goalTypes" label="Goal type" item-text="key" item-value="value"
                      v-model="newBid.type" @change="modifyAllowNewBids">
                    </v-select>
                  </v-col>
                  <v-col cols="2" v-if="isBidwar">
                    <v-text-field name="bidGoal" label="Goal amount" id="bidGoal" type="number"
                      v-model.number="newBid.goal" outlined>
                    </v-text-field>
                  </v-col>
                  <v-col cols="2" v-else>
                    <v-checkbox label="Accept new bids" v-model="newBid.newBids" :disabled="isBidwar"></v-checkbox>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <v-row class="mr-0 mt-2">
                      <v-spacer></v-spacer>
                      <v-btn color="success" @click="addBidToList">Add bid to run</v-btn>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                </v-row>
                <v-row>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card>
      <v-card-title primary-title>
        Bid resume
      </v-card-title>
      <v-card-subtitle>Total added: {{ addedBids.length }}</v-card-subtitle>
      <v-card-subtitle>
        <v-btn color="error" @click="clearAddedBids">Clear all bids</v-btn>
      </v-card-subtitle>
      <v-card-text>
        <v-list class="rounded-lg" color="accent">
          <v-list-item v-for="(addedBid, i) in addedBids" :key="i" style="border-bottom: 1px solid black;">
            <v-list-item-icon>
              <v-icon>mdi-poker-chip</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-col>
                <v-list-item-title> {{ addedBid.name }} </v-list-item-title>
                <v-list-item-subtitle> {{ addedBid.description }}
                </v-list-item-subtitle>
              </v-col>
              <v-col v-if="addedBid.bids.length > 0">
                <v-list-item-title>Options: </v-list-item-title>
                <v-col v-for="(optionBid, ind) in addedBid.bids" :key="ind">
                  <v-row>
                    <v-list-item-subtitle>
                      <v-icon>mdi-arrow-right</v-icon> {{ optionBid.name }}: {{currencyFormat(optionBid.current)}}
                    </v-list-item-subtitle>
                  </v-row>
                </v-col>
              </v-col>
              <v-col v-else>
                Current: {{currencyFormat(addedBid.current)}} / {{currencyFormat(addedBid.goal)}}
              </v-col>
            </v-list-item-content>
            <v-btn color="info" @click="modifyBidState(addedBid)">{{computeBidState(addedBid)}}</v-btn>
            <v-spacer></v-spacer>
            <v-list-item-icon>
              <v-icon @click="removeBid(addedBid)">mdi-close-circle</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
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
import { currencyFormat } from '@/utils/stringFuncs'

export default Vue.extend({
  name: 'manage-tracker',
  props: {
    gameName: {
      type: String,
      required: true
    },
    editBids: {
      type: Array,
      required: true
    }
  },
  components: {
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
      addedBids: [] as Bid[],
      newBid: {
        name: "",
        game: "",
        goal: 0,
        current: 0,
        description: "",
        type: goalType.goal,
        newBids: false,
        bids: [] as any,
        openBid: true
      }
    }
  },
  async created() {
    this.newBid.game = this.$props.gameName
    if (this.$props.editBids) {
      this.addedBids = this.$props.editBids
    }
  },
  computed: {
    isBidwar() {
      return this.newBid.type != 0 ? true : false
    }
  },
  methods: {
    currencyFormat(amount: number) {
      return currencyFormat(amount)
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
    },
    removeBid(addedBid: Bid) {
      let index = this.addedBids.findIndex((bid) => bid.name == addedBid.name)
      this.addedBids.splice(index, 1)
      this.$emit('populateBids', this.addedBids)
    },
    addBidToList() {
      if (this.newBid.game == "")
        this.newBid.game = this.$props.gameName
      this.addedBids.push(this.newBid)
      this.newBid = {
        name: "",
        game: "",
        goal: 0,
        current: 0,
        description: "",
        type: goalType.goal,
        newBids: false,
        bids: [] as any,
        openBid: true
      }
      this.newBid.game = this.$props.gameName
      this.$emit('populateBids', this.addedBids)
    },
    clearAddedBids() {
      this.addedBids = []
      this.$emit('clearBids', true)
    },
    computeBidState(addedBid: Bid) {
      if (addedBid.openBid) return 'Disable'
      return 'Enable'
    },
    modifyBidState(addedBid: Bid) {
      addedBid.openBid = !addedBid.openBid
      // console.log(this.addedBids)
      this.$emit('populateBids', this.addedBids)
    }
  },
  watch: {
    gameName() {
      this.newBid.game = this.$props.gameName
    }
  }
})
</script>

<style lang="scss" scoped>
v-col.list-container {
  border: 1px solid black;
  border-radius: 10px;
}
</style>