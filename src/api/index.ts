import axios from "axios";
const API_URL = `http://${process.env.VUE_APP_BACKEND_URL}:${process.env.VUE_APP_BACKEND_PORT}/`;
// const API_URL = `http://localhost:3000/`;
console.log(`${process.env.VUE_APP_BACKEND_URL}:${process.env.VUE_APP_BACKEND_PORT}`)

const API = axios.create({
  baseURL: API_URL
})

export default {
  getCommands() {
    return API.get('api/commands/');
  },
  postCommand(command: { name: any; alias: any; permissionLvl: any; params: any; cooldown: any; description: any; message: any; custom: any; active: any; }) {
    return API.post('api/commands', {
      name: command.name,
      alias: command.alias,
      permissionLvl: command.permissionLvl,
      params: command.params,
      cooldown: command.cooldown,
      description: command.description,
      message: command.message,
      custom: command.custom,
      active: command.active
    })
  },
  updateCommand(id: any, command: { name: any; alias: any; permissionLvl: any; params: any; cooldown: any; description: any; message: any; custom: any; active: any; }) {
    return API.post(`api/commands/${id}`, {
      name: command.name,
      alias: command.alias,
      permissionLvl: command.permissionLvl,
      params: command.params,
      cooldown: command.cooldown,
      description: command.description,
      message: command.message,
      custom: command.custom,
      active: command.active
    })
  },
  deleteCommand(id: any) {
    return API.post(`api/commands/${id}`)

  }
}