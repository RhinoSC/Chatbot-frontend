<template>
    <v-col>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn color="success" class="mr-3" @click="saveStatus">save runs</v-btn>
        </v-row>
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
                                    <tr v-for="(run, i) in availableRows" :key="i">
                                        <td>{{getRunnerString(run)}}</td>
                                        <td>{{run.name}}</td>
                                        <td>{{run.estimateS}}</td>
                                        <td class="d-flex justify-center align-center">
                                            <v-btn small icon color="info" @click="addRun(run, false)">
                                                <v-icon>
                                                    mdi-greater-than
                                                </v-icon>
                                            </v-btn>
                                            <!-- <v-app-bar-nav-icon small icon></v-app-bar-nav-icon> -->
                                        </td>
                                        <!-- <td>runner</td>
                                        <td>juego</td>
                                        <td>10:10:10</td>
                                        <td>Accion</td> -->
                                    </tr>
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
                                    draggable=".item-draggable" handle=".drag-btn">
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
                                                <td>
                                                    <span>
                                                        {{ item.time }}
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
                                                <td class="d-flex justify-center align-center">
                                                    <v-btn small icon color="info" @click="removeRun(item)">
                                                        <v-icon>
                                                            mdi-less-than
                                                        </v-icon>
                                                    </v-btn>
                                                    <v-app-bar-nav-icon small icon style="cursor: grab;"
                                                        class="drag-btn">
                                                    </v-app-bar-nav-icon>
                                                </td>
                                            </tr>
                                        </template>
                                    </template>
                                </draggable>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerSchedule from '@/api/marathon/schedule'
import Run from '@/utils/types/Run'
import draggable from 'vuedraggable'
import ScheduleRow from '@/utils/types/ScheduleRow'
import Schedule from '@/utils/types/Schedule'
import { getRunnerString } from '@/utils/stringFuncs'

export default Vue.extend({
    name: 'run-manager-component',

    components: { draggable },
    props: {
        schedule: {
            type: Object,
            required: true
        }
        // scheduleId: {
        //     type: String,
        //     required: true
        // }
    },
    data() {
        return {
            adding: 1,
            titlePositions: [] as any[],
            disableDrag: false,
            startDate: {} as Date,
            startTime: "",
            startTimeMS: 0,
            actualTimeMS: 0,
            scheduleRows: [] as any[],
            availableRows: [] as Run[],
            // tempSchedule: {} as Schedule
            tempSchedule: this.schedule
        }
    },
    created() {
        // console.log(this.scheduleId
        // const res = await trackerSchedule.getOneSchedule(this.scheduleId)
        // this.tempSchedule = res[0]
        // const date = new Date('October 30, 2022 00:00:00')
        const date = new Date(this.tempSchedule.start)
        this.startDate = date
        this.startTimeMS = date.getTime()
        this.startTime = date.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

        console.log('child', this.tempSchedule)
        this.availableRows = this.tempSchedule.availableRuns
        if (this.tempSchedule.rows.length > 0) {
            this.tempSchedule.rows.forEach((row: ScheduleRow) => {
                this.addRun(row.row, true)
            });
        }

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
        getRunnerString(item: Run) {
            return getRunnerString(item)
        },
        removeRun(item: ScheduleRow) {
            const index = this.scheduleRows.findIndex((row: ScheduleRow) => row === item)
            const removedRow = this.scheduleRows.splice(index, 1)

            this.availableRows.push(removedRow[0].row)
            this.sortRows({ moved: { newIndex: this.scheduleRows.length - 1, oldIndex: index } })
        },
        addRun(item: Run, fetching: boolean) {
            // only necessary when testing and not deleting on runs list
            const copy = structuredClone(item)
            const run: ScheduleRow = { dayRow: false, newDay: false, dayText: "", time: "", row: copy }

            if (!fetching) {
                const indexAvailable = this.availableRows.findIndex((row: Run) => row === item)
                this.availableRows.splice(indexAvailable, 1)
            }

            if (this.scheduleRows.length === 0) {
                this.setFirstRow(run, true)
            } else {
                const oldStartDate = new Date(this.actualTimeMS - this.scheduleRows[this.scheduleRows.length - 1].row.estimate)
                const oldEndDate = new Date(this.actualTimeMS)

                this.actualTimeMS += run.row.estimate


                run.row.start = oldEndDate.getTime()
                run.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

                if (oldStartDate.getDate() != oldEndDate.getDate()) {
                    run.newDay = true
                    run.dayText = this.getDay(run, false)
                    this.scheduleRows.push({ index: this.scheduleRows.length, dayRow: true, start: run.row.start, dayText: run.dayText })
                }

                run.dayText = this.getDay(run, false)


                this.scheduleRows.push(run)
            }
        },
        sortRows(event: any) {
            let titleCount = 0
            let testArr = this.scheduleRows.filter((row: any) => { if (row.dayRow) { titleCount++ } return row.dayRow === false })

            if (testArr.length === 0) {
                this.scheduleRows = testArr
                return
            }
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
                            this.setNextFirstRows(testArr[i - 1], item)
                        }
                    } else {
                        // case when moving backwards in schedule
                        if (i > 1) {
                            this.setNextRows(testArr[i - 1], item)
                        }
                    }
                }
            }
            // case when going forward on schedule
            else {
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
                            this.setNextRows(testArr[i - 1], item)
                        }
                    }
                }
            }

            testArr = this.setTitles(testArr, false)
            this.scheduleRows = testArr
        },
        setFirstRow(item: any, firstTime: boolean) {
            this.actualTimeMS = this.startTimeMS + item.row.estimate

            item.row.start = this.startDate.getTime()
            item.time = this.startDate.toLocaleString('en-US', { hour12: false, timeStyle: 'short' })

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
            const oldStartDate = new Date(this.actualTimeMS - itemBefore.row.estimate)
            const oldEndDate = new Date(this.actualTimeMS)

            this.actualTimeMS += item.row.estimate

            item.row.start = oldEndDate.getTime()
            item.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
            item.newDay = false

            if (oldStartDate.getDate() != oldEndDate.getDate()) {
                item.newDay = true
            }
            item.dayText = this.getDay(item, false)
        },
        setNextRows(itemBefore: any, item: any) {
            const oldStartDate = new Date(itemBefore.row.start)
            const oldEndDate = new Date(itemBefore.row.start + itemBefore.row.estimate)

            item.row.start = oldEndDate.getTime()
            item.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })
            item.newDay = false

            if (oldStartDate.getDate() != oldEndDate.getDate()) {
                item.newDay = true
                item.dayText = this.getDay(item, false)
            }
            item.dayText = this.getDay(item, false)
        },
        setTitles(testArr: any, creating: boolean) {
            if (creating) {
                testArr.splice(0, 0, { index: 0, dayRow: true, start: this.startTime, dayText: this.startDate.toLocaleDateString('en-US', { dateStyle: 'medium' }) })
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
            return testArr
        },
        saveStatus() {
            this.$emit('saveRuns', [this.scheduleRows.filter((row: any) => { return row.dayRow === false }), this.availableRows])
        }
    },
    // watch: {
    //     scheduleRows() {
    //         this.$emit('updateScheduleRows', this.scheduleRows.filter((row: any) => { return row.dayRow === false }))
    //     },
    //     availableRows() {
    //         this.$emit('updateAvailableRuns', this.availableRows)
    //     },
    // }
})
</script>

<style lang="scss" scoped>
.default-row {
    cursor: auto;
}
</style>