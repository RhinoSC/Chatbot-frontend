<template>
  <main>
    <!-- <Sidebar></Sidebar> -->
    <div class="container">
      <h1 class="title">Commands</h1>
      <table class="table">
        <thead>
          <tr>
            <th class="table-header-command">Command</th>
            <th class="table-header-description">Description</th>
            <th class="table-header-user">User level</th>
            <th class="table-header-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="command in commands" :key="command.id">
            <td class="table-row-data-command">!{{ command.name }}</td>
            <td class="table-row-data-description">
              {{ command.description }}
            </td>
            <td class="table-row-data-user">{{ command.permissionLvl }}</td>
            <td><actions></actions></td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Actions from "../components/Actions.vue";

// eslint-disable-next-line
import API from "../api/index";

export default {
  // eslint-disable-next-line
  components: { Sidebar, Actions },
  data() {
    return {
      commands: [],
      itemsPerPage: 5
    };
  },
  methods:{
      totalPages(){
          Math.ceil(this.commands.length / this.itemsPerPage);
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
.table {
  //   display: flex;
  //   flex-direction: row;
  //   align-items: flex-start;
  //   padding: 0px;

  position: absolute;
  width: 1224px;
  height: 408px;
  left: 192px;
  top: 176px;
  &-header {
  }
  &-row-data {
  }
}
.title {
  position: absolute;
  width: 288px;
  height: 88px;
  left: 192px;
  top: 80px;

  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 46px;
  line-height: 69px;

  color: #000000;
}
</style>