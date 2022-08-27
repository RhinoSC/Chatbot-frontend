// import axios from "axios";
// const API_URL = 'http://localhost:3000/';

// const API = axios.create({
//   baseURL: API_URL
// })

// export default {
//   getCommands() {
//     return API.get('api/commands/');
//   },
//   postCommand(command) {
//     return API.post('api/commands', {
//       name: command.name,
//       alias: command.alias,
//       permissionLvl: command.permissionLvl,
//       params: command.params,
//       cooldown: command.cooldown,
//       description: command.description,
//       message: command.message,
//       custom: command.custom,
//       active: command.active
//     })
//   },
//   updateCommand(id, command) {
//     return API.post(`api/commands/${id}`, {
//       name: command.name,
//       alias: command.alias,
//       permissionLvl: command.permissionLvl,
//       params: command.params,
//       cooldown: command.cooldown,
//       description: command.description,
//       message: command.message,
//       custom: command.custom,
//       active: command.active
//     })
//   },
//   deleteCommand(id) {
//     return API.post(`api/commands/${id}`)

//   }
// }