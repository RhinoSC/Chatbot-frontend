<template>
  <div class="container">
    <router-link class="link" :to="{ name: 'Commands' }">
      <font-awesome-icon class="icons" icon="edit"></font-awesome-icon>
    </router-link>
    <router-link class="link" :to="{ name: 'Commands' }">
      <font-awesome-icon class="icons" icon="trash" />
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Sidebar",
});
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  &:visited {
    color: black;
  }
  &:active {
    color: black;
  }
}
.icons {
  width: 22px;
  height: 22px;
  margin-right: 8px;
}
.container {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 8px 16px;

//   position: static;
//   width: 105px;
//   height: 37px;
//   left: 0px;
//   top: 370px;

//   background: #ffffff;
//   box-shadow: inset 0px -1px 0px rgba(17, 17, 17, 0.1);

//   /* Inside Auto Layout */

//   flex: none;
//   order: 10;
//   align-self: stretch;
//   flex-grow: 0;
//   margin: 0px 0px;
}
</style>