<template>
    <main>
        <!-- <Sidebar style="position: fixed"></Sidebar> -->
        <div class="container">
            <!-- <draggable v-model="myArray" group="people" @start="drag = true" @end="drag = false">
                <div v-for="element in myArray" :key="element.id">{{ element.name }}</div>
            </draggable> -->
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Runner</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Juegazo</td>
                        <td>Any%</td>
                        <td>Pepe</td>
                    </tr>
                    <tr>
                        <td>Juegazo</td>
                        <td>Any%</td>
                        <td>Pepe1</td>
                    </tr>
                    <tr>
                        <td>Juegazo</td>
                        <td>Any%</td>
                        <td>Pepe2</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
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
            myArray: [{ name: 'Pepe' }, { name: 'El' }, { name: 'Mago' }]
        };
    },
    methods: {
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
</style>