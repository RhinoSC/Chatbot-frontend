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
                <v-text-field name="name" label="Prize name" id="prizeName" v-model="newPrize.name">
                </v-text-field>
              </v-col>
              <v-col>
                <v-select :items="events" item-text="name" return-object label="Event name" v-model="selectedEvent">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="minAmount" :label="minAmountLabel" id="minAmount" v-model="newPrize.minAmount">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="imgUrl" label="Img URL" id="imgUrl" v-model="newPrize.imgUrl">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/prizes'">Cancel</v-btn>
              <v-btn color="success" class="mr-5" @click="addPrize">Save</v-btn>
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
import Event from '@/utils/types/Event'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      isReady: false,
      events: [] as Event[],
      selectedEvent: {} as Event,
      newPrize: {
        name: "",
        minAmount: 0,
        imgUrl: "",
        eventId: "",
        active: false,
      }
    }
  },
  async created() {
    const resEvents = await trackerEvent.getEvents()
    this.events = resEvents
    this.isReady = true
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
    async addPrize() {
      if (this.selectedEvent._id)
        this.newPrize.eventId = this.selectedEvent._id
      const res = await trackerPrize.postPrize(this.newPrize)
      if (res) {
        console.log(res)
        this.$router.push('/manage/tracker/prizes')
      }
    },
  },
})
</script>
