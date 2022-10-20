<template>
    <div>
        <v-container grid-list-xs>
            <v-row>
                <h2>Events</h2>
                <v-spacer></v-spacer>
                <v-btn link color="success" :to="'events/add'">Add</v-btn>
            </v-row>
            <v-list>
                <v-list-item v-for="event in events" :key="event._id" link :to="`events/edit/${event._id}`">
                    <v-list-item-content>
                        {{ event.name }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import trackerEvent from '@/api/marathon/event'
import Event from '@/utils/types/Event'

export default Vue.extend({
    name: 'manage-tracker',

    components: {
    },
    data() {
        return {
            events: [] as Event[]
        }
    },
    async created() {
        const res = await trackerEvent.getEvents(this.axios)
        // console.log('llegue')
        // console.log(res)
        this.events = res
    },
    mounted() {
        // console.log('hola')
    }
})
</script>
  