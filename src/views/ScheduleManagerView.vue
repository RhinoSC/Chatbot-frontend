<template>
    <v-container grid-list-xs fluid>
        <v-simple-table fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th v-for="(header, index) in tableHeaders" :key="index" :class="[
                        header.name == 'time' ? 'sm-col' : '',
                        header.name == 'estimate' ? 'md-col' : '',
                        header.name == 'game' ? 'lg-col' : '']">
                            <!-- <th v-for="(header, index) in tableHeaders" :key="index" class="header-container"> -->
                            {{ header.text }}
                        </th>
                    </tr>
                </thead>
                <draggable :list="myArray" tag="tbody" @change="log">
                    <tr v-for="(row, rowIndex) in myArray" :key="rowIndex">
                        <td v-for="(column, index) in row" :key="index">
                            <v-text-field full-width v-model="row[index]" :name="`${rowIndex}${index}`" dense
                                @keyup.enter="logRow(row)">
                            </v-text-field>
                        </td>
                        <!-- <td> {{ row.time }}</td>
                            <td> {{ row.estimate }}</td>
                            <td> {{ row.game }}</td>
                            <td> {{ row.category }}</td>
                            <td> {{ row.runner }}</td>
                            <td> {{ row.platform }}</td>
                            <td> {{ row.coms }}</td>
                            <td> {{ row.comsTwitch }}</td>
                            <td> {{ row.gameTwitch }}</td>
                            <td> {{ row.runnerTwitch }}</td> -->
                    </tr>
                </draggable>
            </template>
        </v-simple-table>
    </v-container>

    <!-- <v-menu offset-y min-width=" 400px" :close-on-content-click="false">
                                <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on" @click="getField(row, column)">{{ column
                                    }}</span>
                                </template>
                                <v-card>
                                    
                                </v-card>
                            </v-menu> -->
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import draggable from 'vuedraggable'

// eslint-disable-next-line
import API from "../api/index";

export default {
    // eslint-disable-next-line
    components: { Sidebar, draggable },
    data() {
        return {
            tableHeaders: [
                { text: 'Hora', name: 'time' },
                { text: 'Estimado', name: 'estimate' },
                { text: 'Juego', name: 'game' },
                { text: 'Categoría', name: 'category' },
                { text: 'Runner/s', name: 'runner' },
                { text: 'Plataforma', name: 'platform' },
                { text: 'Comentaristas', name: 'coms' },
                { text: 'comsTwitch', name: 'comsTwitch' },
                { text: 'gameTwitch', name: 'gameTwitch' },
                { text: 'runnerTwitch', name: 'runnerTwitch' },
                { text: 'setupTime', name: 'setup' }],

            myArray: [
                { time: '10:00 PM', estimate: '05:30:00', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Chemigoku', platform: 'ps1', coms: 'chemigoku', comsTwitch: 'chemigoku2', gameTwitch: 'Dark Souls', runnerTwitch: 'chemigoku2', setup: "0h10m00s" },
                { time: '10:00 PM', estimate: '00:30:10', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Rhino', platform: 'ps1', coms: 'rhino', comsTwitch: 'rhino', gameTwitch: 'Dark Souls', runnerTwitch: 'rhino', setup: "0h10m00s" },
                { time: '10:00 PM', estimate: '00:45:00', game: 'Scott Pilgrim vs. The World: The Game - Complete Edition', category: 'any%', runner: 'Hado', platform: 'ps1', coms: 'hado', comsTwitch: 'hado', gameTwitch: 'Dark Souls', runnerTwitch: 'hado', setup: "0h10m00s" },
            ],
            allowDrag: true,
            selected: [],
            showMenus: [],
            dialogInput: ""
        };
    },
    methods: {
        log() {
            console.log(this.myArray[0].runner, this.myArray[1].runner, this.myArray[2].runner)
        },
        logRow(row) {
            console.log(row)
        }
    },
    mounted: function () {
        // API.getCommands().then((response) => {
        //   this.commands = response.data;
        // //   console.log(this.commands.data);
        // });
    },
};
</script>

<style lang="scss" scoped>
.theme--dark.v-data-table {
    .v-data-table__wrapper {
        table {
            // table-layout: fixed;
            // width: 100%;
            // min-width: max-content;

            thead {
                tr {
                    th {
                        &.lg-col {
                            width: 370px;
                        }
                    }
                }
            }

            tbody {
                tr {

                    // max-height: 50px !important;
                    // min-height: fit-content;
                    // overflow: hidden;
                    td {
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                    }
                }
            }
        }
    }

    // min-width: 76px;
    // &.sm-col {
    //     max-width: 76px;
    //     width: 76px;
    //     color: red;
    // }

    // &.md-col {
    //     max-width: 100px;
    // }

    // &.lg-col {
    //     max-width: 180px;
    // }

}
</style>