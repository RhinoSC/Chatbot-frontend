<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-title primary-title>
        Agregar evento
      </v-card-title>
      <v-card-text>
        <v-col>
          <v-divider></v-divider>
        </v-col>
        <v-form class="mb-5">
          <v-col>
            <v-row>
              <h2>General info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="name" label="Event name" id="eventName" v-model="newEvent.name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="targetAmount" label="Target amount" id="targeAmount"
                  v-model="newEvent.isCharityData.targetAmount"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field name="minDonation" label="Minimum donation" id="minDonation"
                  v-model="newEvent.isCharityData.minDonation"></v-text-field>
              </v-col>
              <v-col>
                <!-- <v-text-field name="timezone" label="Timezone" id="timezone"></v-text-field> -->
                <v-select :items="tz" item-text="text" return-object label="Timezone" v-model="newEvent.TZ"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu ref="dateStartMenu" v-model="dateStartMenu" :close-on-content-click="false"
                  :return-value.sync="dates.start" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dates.start" label="Start date" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on" @click="getMinDate(false)"></v-text-field>
                  </template>
                  <v-date-picker v-model="dates.start" no-title scrollable :min="minDate">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dateStartMenu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.dateStartMenu?.save(dates.start)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <!-- <v-text-field name="time" label="Time" id="Time"></v-text-field> -->
                <v-menu ref="timeStartMenu" v-model="timeStartMenu" :close-on-content-click="false" :nudge-right="40"
                  :return-value.sync="dates.startTime" transition="scale-transition" offset-y max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dates.startTime" label="Start time"
                      prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="timeStartMenu" v-model="dates.startTime" full-width
                    @click:minute="$refs.timeStartMenu?.save(dates.startTime)">
                  </v-time-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu ref="dateEndMenu" v-model="dateEndMenu" :close-on-content-click="false"
                  :return-value.sync="dates.end" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dates.end" label="End date" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on" @click="getMinDate(true)"></v-text-field>
                  </template>
                  <v-date-picker v-model="dates.end" no-title scrollable :min="minDate">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dateEndMenu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.dateEndMenu?.save(dates.end)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <!-- <v-text-field name="time" label="Time" id="Time"></v-text-field> -->
                <v-menu ref="timeEndMenu" v-model="timeEndMenu" :close-on-content-click="false" :nudge-right="40"
                  :return-value.sync="dates.endTime" transition="scale-transition" offset-y max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dates.endTime" label="End time" prepend-icon="mdi-clock-time-four-outline"
                      readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="timeEndMenu" v-model="dates.endTime" full-width
                    @click:minute="$refs.timeEndMenu?.save(dates.endTime)">
                  </v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-checkbox label="Is a charity marathon?" v-model="newEvent.isCharity"></v-checkbox>
              </v-col>
              <v-col cols="3">
                <v-checkbox label="Allow donations" v-model="newEvent.allowDonations"></v-checkbox>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-divider></v-divider>
          </v-col>
          <v-col>
            <v-row>
              <h2>Paypal info</h2>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="reciever" label="Reciever" id="recieverPaypal"
                  v-model="newEvent.isCharityData.paypalData.token"></v-text-field>
              </v-col>
              <v-col>
                <v-select :items="currencyItems" item-text="name" return-object label="Currency"
                  v-model="newEvent.isCharityData.paypalData.currency"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field name="paypalLogo" label="Paypal logo URL" id="paypalLogo"
                  v-model="newEvent.isCharityData.paypalData.logoUrl"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="warning" class="mr-5" link :to="'/manage/tracker'">Cancel</v-btn>
            <v-btn color="success" class="mr-5" @click="addEvent">Save</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import moment from 'moment-timezone'
import selectorOptions from '@/utils/TZ'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {
      allowDonations: false,
      currencyItems: [{ name: "US Dollar" }, { name: "Euro" }],
      tz: [] as any[],
      minDate: "",
      dateStartMenu: false,
      dateEndMenu: false,
      timeStartMenu: false,
      timeEndMenu: false,
      dates: {
        start: "",
        end: "",
        startTime: "",
        endTime: "",
      },
      newEvent: {
        name: "",
        start: 0,
        end: 0,
        TZ: {},
        allowDonations: true,
        isCharity: true,
        isCharityData: {
          targetAmount: 0,
          minDonation: 0,
          paypalData: {
            token: "",
            currency: "",
            logoUrl: ""
          }
        }
      }
    }
  },
  mounted() {
    this.tz = selectorOptions
  },
  methods: {
    addEvent() {

      let startDate = new Date(`${this.dates.start}, ${this.dates.startTime}`)
      this.newEvent.start = startDate.getTime()
      let endDate = new Date(`${this.dates.start}, ${this.dates.startTime}`)
      this.newEvent.end = endDate.getTime()

      // console.log(this.newEvent.start, this.newEvent.end)
      console.log(this.newEvent)
    },
    getMinDate(end: boolean) {
      console.log(end)
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      this.minDate = `${yyyy}-${mm}-${dd}`;
    }
  },
})
</script>
