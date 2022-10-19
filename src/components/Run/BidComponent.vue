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
        <v-btn color="error" @click="confirmClearBids">Clear all bids</v-btn>
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
            <!-- <v-btn color="info" @click="modifyBidState(addedBid)">{{computeBidState(addedBid)}}</v-btn> -->
            <v-btn color="info" class="mr-1" small @click="openEditDialog(addedBid)">Edit</v-btn>
            <v-btn :color="computeBidState(addedBid) === 'Enable' ? 'success' : 'warning'"
              @click="modifyBidState(addedBid)" small>{{computeBidState(addedBid)}}</v-btn>
            <v-spacer></v-spacer>
            <v-list-item-icon>
              <v-icon @click="confirmRemoveBid(addedBid)">mdi-close-circle</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <v-dialog v-model="editDialog" width="500">
          <v-card>
            <v-card-title primary-title>
              Edit bid: {{ tryEditBid.name }}
            </v-card-title>
            <v-card-text>
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field name="name" label="Bid name" id="bidName" v-model="tryEditBid.name">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea outlined name="input-7-4" label="Description" v-model="tryEditBid.description">
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <template v-if="tryEditBid.type !== 0">
                    <v-col>
                      <v-row>
                        <v-col>
                          <v-text-field name="bidGoal" label="Current amount" id="bidCurrent" type="number"
                            v-model="tryEditBid.current" outlined>
                          </v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field name="bidGoal" label="Goal amount" id="bidGoal" v-model="tryEditBid.goal"
                            type="number" outlined>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </template>
                  <template v-else>
                    <v-col>
                      <v-row>
                        <v-col>
                          <v-text-field name="bidCurrent" label="Current amount" id="bidCurrent" type="number"
                            v-model="tryEditBid.current" outlined readonly>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <h2 class="mb-5">Options</h2>
                          <v-row>
                            <v-text-field name="newOption" label="New option" id="newOption" type="text"
                              v-model="editNewOption" solo outlined dense>
                            </v-text-field>
                            <v-btn color="success" icon @click="addEditNewOption()">
                              <v-icon>mdi-check-circle</v-icon>
                            </v-btn>
                          </v-row>
                          <v-list>
                            <v-list-item v-for="(option, i) in tryEditBid.bids" :key="i">
                              <v-list-item-icon>
                                <v-icon>mdi-arrow-right</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title> {{ option.name }} </v-list-item-title>
                                <v-text-field name="optionCurrent" label="Current amount" id="bidCurrent" type="number"
                                  v-model="option.current" solo outlined dense @change="updateCurrentAmount()">
                                </v-text-field>
                              </v-list-item-content>
                              <v-spacer></v-spacer>
                              <v-btn color="error" icon @click="deleteOption(i)">
                                <v-icon>mdi-close-circle</v-icon>
                              </v-btn>
                            </v-list-item>
                          </v-list>
                        </v-col>
                      </v-row>
                    </v-col>
                  </template>
                </v-row>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" link @click="editBid()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" width="500">
          <v-card>
            <v-card-title primary-title>
              Delete bid: {{ tryDeleteBid.name }}
            </v-card-title>
            <v-card-text>
              Do you really want to delete this bid? Any donation will be erased
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" link @click="removeBid(tryDeleteBid)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="deleteAllDialog" width="500">
          <v-card>
            <v-card-title primary-title>
              Delete bids
            </v-card-title>
            <v-card-text>
              Do you really want to delete all bids? Any donation will be erased
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" link @click="clearAddedBids">Delete all bids</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      editDialog: false,
      deleteDialog: false,
      deleteAllDialog: false,
      tryEditBid: {} as Bid,
      editNewOption: "",
      tryDeleteBid: {} as Bid,
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
        openBid: true,
        runId: "",
        eventId: "",
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
    },
  },
  methods: {
    currencyFormat(amount: number) {
      return currencyFormat(amount, this.selectedEvent.isCharityData.paypalData.currency)
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
    confirmRemoveBid(bid: Bid) {
      this.deleteDialog = true
      this.tryDeleteBid = bid
    },
    removeBid(addedBid: Bid) {
      this.deleteDialog = false
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
        openBid: true,
        runId: "",
        eventId: ""
      }
      this.newBid.game = this.$props.gameName
      this.$emit('populateBids', this.addedBids)
    },
    openEditDialog(tryEditBid: Bid) {
      this.editDialog = true
      this.tryEditBid = tryEditBid
      this.sortedOptions()
    },
    editBid() {
      // console.log('hola')
      const idx = this.addedBids.findIndex(bid => bid._id === this.tryEditBid._id)
      if (idx !== -1) {
        this.addedBids[idx] = this.tryEditBid
      }
      this.editDialog = false
      // this.tryEditBid = tryEditBid
    },
    confirmClearBids() {
      this.deleteAllDialog = true
    },
    clearAddedBids() {
      this.addedBids = []
      this.deleteAllDialog = false
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
    },
    sortedOptions() {
      return this.tryEditBid.bids.sort((a: any, b: any) => parseFloat(b.current) - parseFloat(a.current))
    },
    updateCurrentAmount() {
      this.tryEditBid.current = 0
      this.tryEditBid.bids.forEach((element: { current: any }) => this.tryEditBid.current += Number(element.current))
    },
    deleteOption(i: number) {
      this.tryEditBid.bids.splice(i, 1)
      this.updateCurrentAmount()
    },
    addEditNewOption() {
      this.tryEditBid.bids.push({ name: this.editNewOption, current: 0 })
      this.editNewOption = ""
    }
  },
  watch: {
    gameName() {
      this.newBid.game = this.$props.gameName
    },

  }
})
</script>

<style lang="scss" scoped>
v-col.list-container {
  border: 1px solid black;
  border-radius: 10px;
}
</style>