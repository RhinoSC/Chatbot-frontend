<template>
  <div>
    <h1>Tracker manager</h1>
    <v-container grid-list-xs>
      <v-row>
        <h2>Events</h2>
        <v-spacer></v-spacer>
        <v-btn link color="success" :to="'tracker/add'">Add</v-btn>
      </v-row>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            SRE9
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'manage-tracker',

  components: {
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log('hola')
  }
})
</script>
