<template>
    <v-container grid-list-xs>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col class="overflow-y-auto" style="max-height: 400px;">
                                <h3>Runs</h3>
                                <v-expansion-panels v-model="selectedRunIdx">
                                    <v-expansion-panel v-for="(run, i) in filteredRows" :key="i">
                                        <template v-if="verifyRunWithActiveBids(run)">
                                            <v-expansion-panel-header>
                                                {{ run.row.name }}
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <v-row>
                                                    <v-col>
                                                        <span>Runners: </span>{{ getRunnerString(run.row) }}
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col>
                                                        <span>Category: </span>{{ run.row.category }}
                                                    </v-col>
                                                    <v-col>
                                                        <span>Estimate: {{ run.row.estimateS }}</span>
                                                    </v-col>
                                                </v-row>
                                            </v-expansion-panel-content>
                                        </template>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                            <v-col class="overflow-y-auto" style="max-height: 400px;">
                                <h3>Bids</h3>
                                <v-btn color="success" class="mt-5" @click="saveBid()" :disabled="validateBtn()">Save
                                    bid</v-btn>
                                <v-expansion-panels v-model="selectedBidIdx">
                                    <v-expansion-panel v-for="(bid, i) in selectedRun.bids" :key="i">
                                        <template v-if="bid.openBid">
                                            <v-expansion-panel-header>
                                                {{ bid.name }}
                                                <v-spacer></v-spacer>
                                                <template v-if="selectedBidIdx === i">
                                                    <v-icon color="success">mdi-check-circle</v-icon>
                                                </template>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <span>Description: </span>
                                                        <span class="text-subtitle-2">{{ bid.description }}</span>
                                                    </v-col>
                                                    <v-col class="mt-n7" v-if="bid.type === 0">
                                                        <span class="text-caption">Select your option: </span>
                                                    </v-col>
                                                    <v-col class="mt-n5" v-else-if="bid.type === 1 || bid.type === 2">
                                                        <span>
                                                            Current: {{ currencyFormat(bid.current) }} /
                                                        </span>
                                                        <span>
                                                            Goal: {{ currencyFormat(bid.goal) }}
                                                        </span>
                                                    </v-col>
                                                </v-row>
                                                <template v-if="bid.type === 0">
                                                    <v-row>
                                                        <v-col>
                                                            <v-list-item-group v-model="selectedBidOption"
                                                                color="primary">
                                                                <v-list-item v-for="(bidOption, j) in bid.bids"
                                                                    :key="j">
                                                                    <v-list-item-content>
                                                                        <v-list-item-title>
                                                                            {{ bidOption.name }}
                                                                        </v-list-item-title>
                                                                        <v-list-item-subtitle>
                                                                            {{ currencyFormat(bidOption.current) }}
                                                                        </v-list-item-subtitle>
                                                                    </v-list-item-content>
                                                                    <v-spacer></v-spacer>
                                                                    <template v-if="selectedBidOption === j">
                                                                        <v-icon color="success" class="mb-1">
                                                                            mdi-check-circle</v-icon>
                                                                    </template>
                                                                    <template
                                                                        v-if="createdNewBidOption && bid.newBids && j == bid.bids.length - 1">
                                                                        <v-list-item-icon>
                                                                            <v-icon color="error"
                                                                                @click="deleteNewBidOption()">
                                                                                mdi-close-circle</v-icon>
                                                                        </v-list-item-icon>
                                                                    </template>
                                                                </v-list-item>
                                                            </v-list-item-group>
                                                            <template v-if="bid.newBids && !createdNewBidOption">
                                                                <v-container grid-list-xs
                                                                    class="d-flex justify-space-between">
                                                                    <v-text-field hide-details dense solo
                                                                        v-model="bidOptionName" name="newBidOption"
                                                                        label="Add your option" id="newBidOption"
                                                                        class="shrink">
                                                                    </v-text-field>
                                                                    <v-btn color="primary" @click="addBidOption()" icon
                                                                        large>
                                                                        <v-icon>mdi-plus-circle</v-icon>
                                                                    </v-btn>
                                                                </v-container>
                                                            </template>
                                                        </v-col>
                                                    </v-row>
                                                </template>
                                            </v-expansion-panel-content>
                                        </template>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Bid from '@/utils/types/Bid'
import { goalType } from '@/utils/enums/goal.enum'
import Run from '@/utils/types/Run'
import Event from '@/utils/types/Event'
import { getRunnerString, currencyFormat } from '@/utils/stringFuncs'

export default Vue.extend({
    name: 'manage-tracker',
    props: {
        event: {
            type: Object,
            required: true
        },
        isEditedBid: {
            type: Object
        }

    },

    data() {
        return {
            selectedRunIdx: undefined,
            selectedRun: {} as Run,
            selectedBidIdx: -1,
            createdNewBidOption: false,
            bidOptionName: "",
            selectedBidOption: -1,
            filteredRows: [] as any,
        }
    },
    mounted() {
        console.log(this.event.isCharityData.paypalData.currency)
        this.filteredRows = this.event.schedule.rows

        if (this.isEditedBid !== undefined) {
            // console.log(this.isEditedBid)
            this.selectedRunIdx = this.filteredRows.findIndex((row: { row: { _id: any } }) => row.row._id === this.isEditedBid.runId)
            if (this.selectedRunIdx !== undefined) {
                this.selectedRun = this.filteredRows[this.selectedRunIdx].row
                this.selectedBidIdx = this.selectedRun.bids.findIndex(bid => bid._id === this.isEditedBid.bidId)
                this.selectedRun.bids[this.selectedBidIdx].bids.sort((a: any, b: any) => parseFloat(b.current) - parseFloat(a.current))
                this.selectedBidOption = this.selectedRun.bids[this.selectedBidIdx].bids.findIndex((option: { name: any }) => option.name === this.isEditedBid.optionName)
                // this.selectedBidOption = this.selectedRun.bids[this.selectedBidIdx].bids.findIndex((option: { name: any }) => {
                //     console.log(option.name, this.isEditedBid.optionName)
                //     return option.name === this.isEditedBid.optionName
                // })
                // console.log(this.selectedBidOption)
                this.saveBid()
            }
            // console.log(this.selectedBidIdx)
        }
        // console.log(this.selectedBidOption)
    },
    beforeDestroy() {
        if (this.createdNewBidOption) {
            this.deleteNewBidOption()
        }
    },
    methods: {
        verifyRunWithActiveBids(run: any) {
            let idx = run.row.bids.findIndex((bid: { openBid: boolean }) => bid.openBid === true)
            if (idx === -1) return false
            return true
        },
        getRunnerString(item: Run) {
            return getRunnerString(item)
        },
        currencyFormat(amount: number) {
            return currencyFormat(amount, this.event.isCharityData.paypalData.currency)
        },
        addBidOption() {
            if (!this.createdNewBidOption) {
                this.createdNewBidOption = true
                this.selectedRun.bids[this.selectedBidIdx].bids.push({ name: this.bidOptionName, current: 0 })
                this.selectedBidOption = this.selectedRun.bids[this.selectedBidIdx].bids.length - 1
                this.bidOptionName = ""

                // console.log(this.selectedRun.bids[this.selectedBidIdx].bids.length)
                // console.log(this.selectedRun.bids[this.selectedBidIdx].bids[this.selectedBidOption])
                // console.log(this.selectedRun.bids[this.selectedBidIdx])
            }
        },
        deleteNewBidOption() {
            this.selectedRun.bids[this.selectedBidIdx].bids.pop()
            this.createdNewBidOption = false
            this.selectedBidOption = -1
        },
        saveBid() {
            // console.log(this.selectedRun.bids[this.selectedBidIdx])

            let output = {
                runId: this.selectedRun._id,
                bidId: this.selectedRun.bids[this.selectedBidIdx]._id,
                selectedBidIdx: this.selectedBidIdx as number | undefined,
                selectedBidOption: undefined as number | undefined,
                addedNewOpt: undefined as boolean | undefined,
                runBid: undefined
            }
            if (this.selectedRunIdx !== undefined) {
                this.filteredRows[this.selectedRunIdx].row = this.selectedRun
                output.runBid = JSON.parse(JSON.stringify(this.filteredRows[this.selectedRunIdx]))
            }
            if (this.selectedRun.bids[this.selectedBidIdx].type === 0) {
                output.selectedBidOption = this.selectedBidOption
                output.addedNewOpt = this.createdNewBidOption
            }
            this.$emit('saveBid', output)
        },
        validateBtn() {
            if (this.selectedRunIdx === undefined) return true

            // console.log(this.selectedRunIdx, this.selectedBidIdx, this.selectedBidOption)
            // console.log(this.selectedRunIdx, this.selectedBidIdx, this.selectedRun.bids[this.selectedBidIdx])
            if (this.selectedRun.bids[this.selectedBidIdx] !== undefined) {
                if (this.selectedRun.bids[this.selectedBidIdx].type === 0) {
                    return this.selectedBidOption === -1
                } else {
                    return false
                }
            }
            return true
        }
    },
    watch: {
        selectedRunIdx() {
            if (this.selectedRunIdx !== undefined) {
                this.selectedRun = this.filteredRows[this.selectedRunIdx].row
            } else {
                this.selectedRun = {} as Run
            }
        },
        selectedBidIdx() {
            // console.log(this.selectedBidIdx)
            if (this.selectedBidIdx === undefined) return
            if (this.selectedRun.bids[this.selectedBidIdx].type === 0)
                this.selectedRun.bids[this.selectedBidIdx].bids.sort((a: any, b: any) => parseFloat(b.current) - parseFloat(a.current))

            this.selectedBidOption = -1
        },
        selectedBidOption() {
            if (this.selectedBidOption !== this.selectedRun.bids[this.selectedBidIdx].bids.length - 1 &&
                this.createdNewBidOption &&
                this.selectedRun.bids[this.selectedBidIdx].newBids) {

                this.selectedRun.bids[this.selectedBidIdx].bids.pop()
                this.createdNewBidOption = false
                this.bidOptionName = ""
            }
        },
        active() {
            console.log('activo')
            this.filteredRows = this.event.schedule.rows
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