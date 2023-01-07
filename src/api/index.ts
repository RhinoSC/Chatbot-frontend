import { AxiosInstance } from 'axios';
import Vue from 'vue'

export default {

  getCommands(API: AxiosInstance) {
    return API.get('api/commands/');
  },
  postCommand(API: AxiosInstance, command: { name: any; alias: any; permissionLvl: any; params: any; cooldown: any; description: any; message: any; custom: any; active: any; }) {
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
  updateCommand(API: AxiosInstance, id: any, command: { name: any; alias: any; permissionLvl: any; params: any; cooldown: any; description: any; message: any; custom: any; active: any; }) {
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
  deleteCommand(API: AxiosInstance, id: any) {
    return API.post(`api/commands/${id}`)
  },
  getHoraro(API: AxiosInstance) {
    return API.get(`api/horaro/all`)
  }
}