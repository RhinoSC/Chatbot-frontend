<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Add Prize
      </v-card-title>
      <v-card-text>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" label="Prize name" id="prizeName" v-model="oldPrize.name">
                </v-text-field>
              </v-col>
              <v-col>
                <v-select :items="events" item-text="name" return-object label="Event name" v-model="selectedEvent">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="minAmount" :label="minAmountLabel" id="minAmount" v-model="oldPrize.minAmount">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="imgUrl" label="Img URL" id="imgUrl" v-model="oldPrize.imgUrl">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-checkbox label="active?" v-model="oldPrize.active"></v-checkbox>
              <v-spacer></v-spacer>
              <v-dialog v-model="deleteDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="error" v-bind="attrs" v-on="on" class="mr-5">
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title>
                    Delete schedule {{ oldPrize.name }}
                  </v-card-title>
                  <v-card-text>
                    Do you really want to delete this prize?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" link @click="deletePrize">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/prizes'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="editPrize">Save</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerPrize from '@/api/marathon/prize'
import trackerEvent from '@/api/marathon/event'
import Prize from '@/utils/types/Prize'
import prize from '@/api/marathon/prize'
import Event from '@/utils/types/Event'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      isReady: false,
      deleteDialog: false,
      events: [] as Event[],
      selectedEvent: {} as Event,
      newPrize: {
        _id: "",
        name: "",
        minAmount: 0,
        imgUrl: "",
        eventId: "",
        active: false,
      },
      oldPrize: {
        _id: "",
        name: "",
        minAmount: 0,
        imgUrl: "",
        eventId: "",
        active: false,
      }
    }
  },
  async created() {
    try {
      const resEvents = await trackerEvent.getEvents(this.axios)
      this.events = resEvents

      const res = await trackerPrize.getOnePrize(this.axios, this.$route.params.id)
      this.oldPrize = res[0]

      const event = this.events.find(event => this.oldPrize.eventId == event._id)
      if (event) {
        this.selectedEvent = event
      }

      this.isReady = true
    } catch (error) {
      console.error(error)
      // this.$router.push('/manage/tracker/prizes')
    }

  },
  computed: {
    minAmountLabel() {
      if (this.isReady && this.selectedEvent.isCharityData) {
        return `Min amount (${this.selectedEvent.isCharityData.paypalData.currency})`
      }
      return 'Min amount'
    }
  },
  methods: {
    async deletePrize() {
      const res = await trackerPrize.deletePrize(this.axios, this.oldPrize._id)
      if (res) {
        // console.log(res)
        this.$router.push('/manage/tracker/prizes')
      }
    },
    async editPrize() {

      this.newPrize = this.oldPrize

      const res = await trackerPrize.updatePrize(this.axios, this.newPrize)
      if (res) {
        // console.log(res)
        //   this.$router.push('/manage/tracker/prizes')
      }
    },
  },
})
</script>
