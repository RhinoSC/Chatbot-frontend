<template>
  <v-app>
    <Sidebar class="sidebar-component" v-if="!$route.meta?.hideNavbar"></Sidebar>
    <v-main style="padding: 0;" :class="!$route.meta?.hideNavbar ? 'ml-16' : ''">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Sidebar from "./components/Sidebar.vue";

export default Vue.extend({
  name: 'App',
  components: { Sidebar },

  data: () => ({
    //
  }),
  created() {
    document.title = 'SRE9'

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      const theme = localStorage.getItem('dark-theme')
      if (!theme) {
        localStorage.setItem('dark-theme', true)
      }
    }
  }
  // async created() {
  //   if (this.$auth.isAuthenticated) {
  //     const token = await this.$auth.getTokenSilently();
  //     console.log('lo registre')
  //     this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  //   }
  // }
});
</script>

<style lang="scss">
// :root {
//   --primary: #4ade80;
//   --grey: #64748b;
//   --dark: #1e293b;
//   --dark-alt: #334155;
//   --light: #f1f5f9;
//   --light-alt: #A7A1AE;
//   --sidebar-width: 168px;
// }

* {
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // color: var(--light);
  // color: var(--light-alt);
  // color: black;
  // display: flex;
}

// body {
//   // background: var(--light);
//   // background: var(--dark);
//   background: #1F2739;
// }

// #app {
//   display: flex;

//   main {
//     flex: 1 1 0;
//     padding: 2rem;

//     @media (max-width: 768px) {
//       padding-left: 6rem;
//     }
//   }
// }

// button {
//   cursor: pointer;
//   appearance: none;
//   border: none;
//   outline: none;
//   background: none;
// }
</style>