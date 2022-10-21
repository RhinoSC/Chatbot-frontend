<template>
  <!-- <hello-world /> -->
  <v-container grid-list-xs class="d-flex align-center justify-center mt-15">
    <v-card max-width="344">
      <v-img alt="SRE logo" src="../assets/logo_plano.png" style="background-color: rgb(100,100,100)"></v-img>
      <v-card-actions class="d-flex justify-center" v-if="!$auth.loading">
        <v-btn color="primary" to="/" class="flex-grow-1" @click="login" v-if="!$auth.isAuthenticated">Login</v-btn>
        <v-btn color="primary" to="/" class="flex-grow-1" @click="logout" v-if="$auth.isAuthenticated">Logout</v-btn>
      </v-card-actions>
    </v-card>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <!-- <div v-if="!$auth.loading"> -->
    <!-- show login when not authenticated -->
    <!-- <button v-if="!$auth.isAuthenticated" @click="login">Log in</button> -->
    <!-- show logout when authenticated -->
    <!-- <button v-if="$auth.isAuthenticated" @click="logout">Log out</button> -->
    <!-- </div> -->
  </v-container>
</template>

<script>
import Vue from 'vue'
// import HelloWorld from '../components/HelloWorld.vue'

export default Vue.extend({
  name: 'home-view',

  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  },
  updated() {
    // console.log(this.$auth.isAuthenticated)
    if (this.$auth.isAuthenticated) {
      const roles = ["Admin"]

      const multipleExist = this.$auth.user['sre9/roles'].every((value) => {
        return roles.includes(value);
      });

      if (multipleExist)
        this.$router.push('/manage/tracker')
      else
        this.$router.push('/tracker')
    }
  }
})
</script>
