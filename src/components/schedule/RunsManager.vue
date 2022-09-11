<template>
    <v-col>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title primary-title>
                        Runs list
                    </v-card-title>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Runner
                                        </th>
                                        <th class="text-left">
                                            Juego
                                        </th>
                                        <th class="text-left">
                                            Estimado
                                        </th>
                                        <th class="text-left">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>runner</td>
                                        <td>juego</td>
                                        <td>10:10:10</td>
                                        <td>Accion</td>
                                    </tr>
                                    <!-- <tr v-for="item in desserts" :key="item.name">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.calories }}</td>
                                    </tr> -->
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title primary-title>
                        Schedule overview
                    </v-card-title>
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
                                        <th class="text-left">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <draggable :list="scheduleRows" tag="tbody" @change="sortRows" :disabled="disableDrag"
                                    draggable=".item-draggable">
                                    <template v-for="(item, i) in scheduleRows">
                                        <template v-if="isRowDay(item)">
                                            <tr :key="i" style="background-color: #2196f3;" class="item-day-tr">
                                                <td></td>
                                                <td></td>
                                                <td class="d-flex justify-center align-center" style="color: white;">
                                                    {{item.dayText}}
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr :key="i" class="item-draggable">
                                                <td>{{ item.row.time }}</td>
                                                <td>{{ item.row.runner }}</td>
                                                <td>{{ item.row.game }}</td>
                                                <td>{{ item.row.estimate }}</td>
                                                <td>Acciones</td>
                                            </tr>
                                        </template>
                                    </template>
                                </draggable>
                            </template>
                        </v-simple-table>
                        <v-btn color="info" @click="addRun">text</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerSchedule from '@/api/marathon/schedule'
import trackerEvent from '@/api/marathon/event'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'
import { MStoStringTime, stringTimeToMS } from '@/utils/parsers'
import draggable from 'vuedraggable'

export default Vue.extend({
    name: 'run-manager-component',

    components: { draggable },
    data() {
        return {
            adding: 1,
            titlePositions: [] as any[],
            disableDrag: false,
            startDate: {} as Date,
            startTime: "",
            startTimeMS: 0,
            actualTimeMS: 0,
            scheduleRows: [] as any
            // scheduleRows: [{ time: "", runner: 'runer', game: 'game', estimate: '24:10:10', }, { time: "", runner: 'runer', game: 'game', estimate: '24:10:10', }]
        }
    },
    async created() {
        const date = new Date('October 30, 2022 00:00:00')
        this.startDate = date
        this.startTimeMS = date.getTime()
        this.startTime = date.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
    },
    methods: {
        isRowDay(item: any) {
            if (item.dayRow) {
                return true
            }
            return false
        },
        getDay(item: any, firstDay: boolean) {
            let newDate;
            if (firstDay) {
                newDate = new Date(this.startTimeMS)
            }
            else {
                newDate = new Date(item.row.start)
            }
            return newDate.toLocaleDateString('en-US', { dateStyle: 'medium' })
        },
        addRun() {
            const run = { dayRow: false, newDay: false, dayText: "", row: { time: "", runner: `runer ${this.adding}`, game: 'game', estimate: '08:10:10', start: 0 } }
            this.adding++

            // const random = Math.floor(Math.random() * 5)
            // switch (random) {
            //     case 0:
            //         run.row.runner = "runner 1"
            //         break;
            //     case 1:
            //         run.row.runner = "runner 2"
            //         break;
            //     case 2:
            //         run.row.runner = "runner 3"
            //         break;
            //     case 3:
            //         run.row.runner = "runner 4"
            //         break;
            //     case 4:
            //         run.row.runner = "runner 5"
            //         break;
            // }
            if (this.scheduleRows.length == 0) {
                this.setFirstRow(run, true)
            } else {
                const oldStartDate = new Date(this.actualTimeMS - stringTimeToMS(this.scheduleRows[this.scheduleRows.length - 1].row.estimate))
                const oldEndDate = new Date(this.actualTimeMS)

                const timeInMS = stringTimeToMS(run.row.estimate)
                this.actualTimeMS += timeInMS

                run.row.start = oldEndDate.getTime()
                run.row.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

                if (oldStartDate.getDate() != oldEndDate.getDate()) {
                    run.newDay = true
                    run.dayText = this.getDay(run, false)
                    this.scheduleRows.push({ index: this.scheduleRows.length, dayRow: true, start: run.row.start, dayText: run.dayText })
                }

                run.dayText = this.getDay(run, false)
                this.scheduleRows.push(run)
            }
            // console.log(this.scheduleRows)
        },
        sortRows(event: any) {
            let titleCount = 0
            const testArr = this.scheduleRows.filter((row: any) => { if (row.dayRow) { titleCount++ } return row.dayRow === false })
            testArr.splice(0, 0, { index: 0, dayRow: true, start: this.startTime, dayText: this.startDate.toLocaleDateString('en-US', { dateStyle: 'medium' }) })

            if (event.moved.newIndex < event.moved.oldIndex) {
                let i = 1
                event.moved.newIndex === 1 ? i = event.moved.newIndex : i = event.moved.newIndex - titleCount
                for (i; i < testArr.length; i++) {
                    const item = testArr[i]

                    // case when we move to the start of the schedule
                    if (event.moved.newIndex == 1) {
                        if (i == 1) {
                            this.setFirstRow(item, false)
                        }
                        else {
                            const oldStartDate = new Date(this.actualTimeMS - stringTimeToMS(testArr[i - 1].row.estimate))
                            const oldEndDate = new Date(this.actualTimeMS)

                            const timeInMS = stringTimeToMS(item.row.estimate)
                            this.actualTimeMS += timeInMS

                            item.row.start = oldEndDate.getTime()
                            item.row.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
                            item.newDay = false

                            if (oldStartDate.getDate() != oldEndDate.getDate()) {
                                item.newDay = true
                            }
                            item.dayText = this.getDay(item, false)
                        }
                    } else {
                        // case when moving backwards in schedule
                        if (i > 1) {

                            const oldRow = testArr[i - 1]
                            const oldStartDate = new Date(oldRow.row.start)
                            const oldEndDate = new Date(oldRow.row.start + stringTimeToMS(oldRow.row.estimate))

                            item.row.start = oldEndDate.getTime()
                            item.row.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
                            item.newDay = false

                            if (oldStartDate.getDate() != oldEndDate.getDate()) {
                                item.newDay = true
                                item.dayText = this.getDay(item, false)
                                // this.titlePositions.push({ index: i, dayRow: true, start: item.row.start, dayText: item.dayText })
                            }
                            item.dayText = this.getDay(item, false)
                        }
                    }
                }
            }
            // case when going forward on schedule
            else {
                // console.log(testArr)
                let i = 1
                event.moved.oldIndex === 1 ? i = event.moved.oldIndex : i = event.moved.oldIndex - titleCount
                for (i; i < testArr.length; i++) {
                    const item = testArr[i]
                    if (event.moved.oldIndex == 1) {
                        if (i == 1) {
                            this.setFirstRow(item, false)
                        } else {
                            this.setNextFirstRows(testArr[i - 1], item)
                        }
                    } else {
                        if (i > 1) {
                            const oldRow = testArr[i - 1]
                            const oldStartDate = new Date(oldRow.row.start)
                            const oldEndDate = new Date(oldRow.row.start + stringTimeToMS(oldRow.row.estimate))

                            item.row.start = oldEndDate.getTime()
                            item.row.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
                            item.newDay = false

                            if (oldStartDate.getDate() != oldEndDate.getDate()) {
                                item.newDay = true
                                item.dayText = this.getDay(item, false)
                            }
                            item.dayText = this.getDay(item, false)
                        }
                    }
                }
            }

            let firstDate = new Date(testArr[1].row.start)
            for (let j = 2; j < testArr.length; j++) {
                const item = testArr[j]
                const newDate = new Date(item.row.start)

                if (firstDate.getDate() != newDate.getDate()) {
                    firstDate = newDate
                    item.newDay = true
                    testArr.splice(j, 0, { dayRow: true, start: item.row.start, dayText: item.dayText })
                    j++
                }
            }
            this.scheduleRows = testArr
            console.log(this.scheduleRows)
        },
        setFirstRow(item: any, firstTime: boolean) {
            const runEstimateMS = stringTimeToMS(item.row.estimate)
            this.actualTimeMS = this.startTimeMS + runEstimateMS

            item.row.start = this.startDate.getTime()
            item.row.time = this.startDate.toLocaleString('en-US', { hour12: false, timeStyle: 'short' })

            if (!firstTime) {
                item.newDay = true
                item.dayText = this.getDay(item, true)
            } else {
                item.newDay = true
                item.dayText = this.getDay(item, true)
                this.scheduleRows.push({ index: 0, dayRow: true, start: item.row.start, dayText: item.dayText })
                this.scheduleRows.push(item)
            }
        },
        setNextFirstRows(itemBefore: any, item: any) {
            const oldStartDate = new Date(this.actualTimeMS - stringTimeToMS(itemBefore.row.estimate))
            const oldEndDate = new Date(this.actualTimeMS)

            const timeInMS = stringTimeToMS(item.row.estimate)
            this.actualTimeMS += timeInMS

            item.row.start = oldEndDate.getTime()
            item.row.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
            item.newDay = false

            if (oldStartDate.getDate() != oldEndDate.getDate()) {
                item.newDay = true
            }
            item.dayText = this.getDay(item, false)
        }
    },
})
</script>

<!-- <style lang="scss" scoped>
.item-draggable {
    &-new-day {
        background-color: red;
        ::before(){

        }
    }
}
</style> -->