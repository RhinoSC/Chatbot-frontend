<template>
    <v-container grid-list-xs>
        <v-card>
            <v-card-title primary-title>
                Editar evento
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
                                <v-text-field name="name" label="Event name" id="eventName" v-model="oldEvent.name">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field name="targetAmount" label="Target amount" id="targeAmount"
                                    v-model="oldEvent.isCharityData.targetAmount"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field name="minDonation" label="Minimum donation" id="minDonation"
                                    v-model="oldEvent.isCharityData.minDonation"></v-text-field>
                            </v-col>
                            <v-col>
                                <!-- <v-text-field name="timezone" label="Timezone" id="timezone"></v-text-field> -->
                                <v-select :items="tz" item-text="text" return-object label="Timezone"
                                    v-model="oldEvent.TZ"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-menu ref="dateStartMenu" v-model="dateStartMenu" :close-on-content-click="false"
                                    :return-value.sync="dates.start" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="dates.start" label="Start date"
                                            prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            @click="getMinDate(false)"></v-text-field>
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
                                <v-menu ref="timeStartMenu" v-model="timeStartMenu" :close-on-content-click="false"
                                    :nudge-right="40" :return-value.sync="dates.startTime" transition="scale-transition"
                                    offset-y max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="dates.startTime" label="Start time"
                                            prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs"
                                            v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="timeStartMenu" v-model="dates.startTime" full-width
                                        @click:minute="$refs.timeStartMenu?.save(dates.startTime)">
                                    </v-time-picker>
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu ref="dateEndMenu" v-model="dateEndMenu" :close-on-content-click="false"
                                    :return-value.sync="dates.end" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="dates.end" label="End date" prepend-icon="mdi-calendar"
                                            readonly v-bind="attrs" v-on="on" @click="getMinDate(true)"></v-text-field>
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
                                <v-menu ref="timeEndMenu" v-model="timeEndMenu" :close-on-content-click="false"
                                    :nudge-right="40" :return-value.sync="dates.endTime" transition="scale-transition"
                                    offset-y max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="dates.endTime" label="End time"
                                            prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs"
                                            v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="timeEndMenu" v-model="dates.endTime" full-width
                                        @click:minute="$refs.timeEndMenu?.save(dates.endTime)">
                                    </v-time-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <v-checkbox label="Is a charity marathon?" v-model="oldEvent.isCharity"></v-checkbox>
                            </v-col>
                            <v-col cols="3">
                                <v-checkbox label="Allow donations" v-model="oldEvent.allowDonations"></v-checkbox>
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
                                    v-model="oldEvent.isCharityData.paypalData.token"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="currencyItems" item-text="name" item-value="iso" label="Currency"
                                    v-model="oldEvent.isCharityData.paypalData.currency"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field name="paypalLogo" label="Paypal logo URL" id="paypalLogo"
                                    v-model="oldEvent.isCharityData.paypalData.logoUrl"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field name="paypalText" label="Paypal description" id="paypalText"
                                    v-model="oldEvent.isCharityData.paypalData.itemName"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
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
                                    Delete event {{ oldEvent.name }}
                                </v-card-title>
                                <v-card-text>
                                    Do you really want to delete this event?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" link @click="deleteEvent" :disabled="true">Delete</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-btn color="warning" class="mr-5" link :to="'/manage/tracker/events'">Cancel</v-btn>
                        <v-btn color="success" class="mr-5" @click="editEvent">Save</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import { tz } from 'moment-timezone'
import selectorOptions from '@/utils/TZ'
import Donation from '@/utils/types/Donation'
import Prize from '@/utils/types/Prize'
import Schedule from '@/utils/types/Schedule'
import ExternalSchedule from '@/utils/types/ExternalSchedule'
import Event from '@/utils/types/Event'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            deleteDialog: false,
            currencyItems: [{ name: "US Dollar", iso: "USD" }, { name: "Euro", iso: "EUR" }],
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
            oldEvent: {
                _id: "",
                name: "",
                start: 0,
                end: 0,
                TZ: {},
                schedule: {} as Schedule,
                ExtSchedule: {} as ExternalSchedule,
                isCharity: true,
                allowDonations: true,
                donations: [] as Donation[],
                prizes: [] as Prize[],
                isCharityData: {
                    targetAmount: 0,
                    minDonation: 0,
                    totalDonated: 0,
                    paypalData: {
                        token: "",
                        currency: "",
                        logoUrl: "",
                        itemName: ""
                    }
                }
            } as Event,
            newEvent: {
                _id: "",
                name: "",
                start: 0,
                end: 0,
                TZ: {},
                schedule: {} as Schedule,
                ExtSchedule: {} as ExternalSchedule,
                isCharity: true,
                allowDonations: true,
                donations: [] as Donation[],
                prizes: [] as Prize[],
                isCharityData: {
                    targetAmount: 0,
                    minDonation: 0,
                    totalDonated: 0,
                    paypalData: {
                        token: "",
                        currency: "",
                        logoUrl: "",
                        itemName: "",
                    }
                }
            } as Event,
        }
    },
    async created() {
        try {
            const res = await trackerEvent.getOneEvent(this.axios, this.$route.params.id)
            this.oldEvent = res[0]
        } catch (error) {
            this.$router.push('/manage/tracker/events')
        }
    },
    mounted() {
        this.tz = selectorOptions
    },
    methods: {
        async deleteEvent() {
            if (this.oldEvent._id) {
                const res = await trackerEvent.deleteEvent(this.axios, this.oldEvent._id)
                if (res) {
                    // console.log(res)
                    this.$router.push('/manage/tracker/events')
                }
            }
        },
        async editEvent() {

            let startDate = new Date(`${this.dates.start}, ${this.dates.startTime}`)
            this.oldEvent.start = startDate.getTime()
            let endDate = new Date(`${this.dates.start}, ${this.dates.startTime}`)
            this.oldEvent.end = endDate.getTime()

            this.newEvent = this.oldEvent

            // console.log(this.newEvent.isCharityData.totalDonated)
            const res = await trackerEvent.updateEvent(this.axios, this.newEvent)
            if (res) {
                // console.log(res)
                this.$router.push('/manage/tracker')
            }
        },
        getMinDate(end: boolean) {
            // console.log(end)
            let today = new Date()
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            this.minDate = `${yyyy}-${mm}-${dd}`;
        }
    },
})
</script>
  