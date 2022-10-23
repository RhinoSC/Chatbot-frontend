<template>
    <div>
        <v-container grid-list-xs v-if="isReady">
            <v-row>
                <h2>Schedule</h2>
            </v-row>
            <v-row>
                <v-card class="flex-grow-1">
                    <v-card-title primary-title class="d-flex justify-center">
                        Schedule overview
                    </v-card-title>
                    <v-card-subtitle>
                        All times are in your timezone ({{Intl.DateTimeFormat().resolvedOptions().timeZone}})
                    </v-card-subtitle>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Tiempo
                                        </th>
                                        <th class="text-left">
                                            Runner
                                        </th>
                                        <th class="text-left">
                                            Juego
                                        </th>
                                        <th class="text-left">
                                            Estimado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item, i) in scheduleRows">
                                        <template v-if="isRowDay(item)">
                                            <tr :key="i" style="background-color: var(--v-secondary-darken1);"
                                                class="item-day-tr">
                                                <!-- <td class="d-flex justify-center align-center" style="color: white;"
                                                    colspan="4">
                                                    {{item.dayText}}
                                                </td> -->
                                                <td colspan="4"
                                                    style="color: white; font-weight: bold; text-align:center;">
                                                    {{item.dayText}}</td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr :key="i">
                                                <td>
                                                    <span>
                                                        <!-- {{item.time}} -->
                                                        {{ convertTimeToTimezone(item.row.start) }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        {{getRunnerString(item.row)}}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        {{ item.row.name }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        {{ item.row.estimateS }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </template>
                                    </template>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Event from '@/utils/types/Event'
import ScheduleRow from '@/utils/types/ScheduleRow'
import { getRunnerString } from '@/utils/stringFuncs'
import Run from '@/utils/types/Run'
import Schedule from '@/utils/types/Schedule'
import moment from 'moment-timezone'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            isReady: false,
            event: {} as Event,
            scheduleRows: [] as ScheduleRow[],
            tempSchedule: {} as Schedule,
            startDate: {} as Date,
            startTime: "",
            startTimeMS: 0,
        }
    },
    async created() {
        const res = await trackerEvent.getOneEventByName(this.axios, process.env.VUE_APP_EVENT)

        if (res[0]) {
            this.event = res[0]

            if (this.event.schedule) {
                this.tempSchedule = this.event.schedule

                const date = new Date(this.tempSchedule.start)
                this.startDate = date
                this.startTimeMS = date.getTime()
                this.startTime = date.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
                let a = this.tempSchedule.rows
                a = this.setTitles(a, true, Intl.DateTimeFormat().resolvedOptions().timeZone)

                // console.log(a)
                this.scheduleRows = a
                // this.tempSchedule.forEach((row: ScheduleRow) => {
                //     this.addRun(row, true)
                // });
            }
        }
        // console.log(this.scheduleRows)
        this.isReady = true
    },
    methods: {
        isRowDay(item: any) {
            if (item.dayRow) {
                return true
            }
            return false
        },
        getRunnerString(item: Run) {
            return getRunnerString(item)
        },
        // setTitles(testArr: ScheduleRow[], creating: boolean) {
        setTitles(testArr: any, creating: boolean, TZName: string) {
            if (creating) {
                testArr.splice(0, 0, { dayRow: true, start: this.startTime, dayText: this.startDate.toLocaleDateString('en-US', { dateStyle: 'medium' }) })
            }

            let firstDate = moment.tz(testArr[1].row.start, TZName)

            for (let j = 2; j < testArr.length; j++) {
                const item = testArr[j]
                const newDate = moment.tz(item.row.start, TZName)

                // console.log(firstDate.dayOfYear(), newDate.dayOfYear(), firstDate.dayOfYear() !== newDate.dayOfYear())
                // console.log(firstDate.toLocaleString(), newDate.toLocaleString(), firstDate.dayOfYear() !== newDate.dayOfYear())
                if (firstDate.dayOfYear() !== newDate.dayOfYear()) {
                    // console.log(item.row.name)
                    item.newDay = true
                    firstDate = newDate
                    testArr.splice(j, 0, { dayRow: true, start: item.row.start, dayText: item.dayText })
                    j++
                }
            }

            return testArr
        },
        convertTimeToTimezone(time: number) {
            const a = moment.tz(time, Intl.DateTimeFormat().resolvedOptions().timeZone)
            return a.format("hh:mm a")
        }
    }
})
</script>
  