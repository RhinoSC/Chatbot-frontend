import Event from '@/utils/types/Event'
import { AxiosInstance } from 'axios'
export default {
    async getEvents(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/event/all')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneEvent(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/event/one/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneEventByName(API: AxiosInstance, name: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/event/name/${name}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postEvent(API: AxiosInstance, event: Event): Promise<any> {
        try {
            const res = await API.post('api/tracker/event/one', { event })
            return res
        } catch (error) {
            return error
        }
    },
    async updateEvent(API: AxiosInstance, event: Event): Promise<any> {
        try {
            const res = await API.put(`api/tracker/event/one/${event._id}`, { event })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteEvent(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/event/one/${id}`)
            return res
        } catch (error) {
            return error
        }
    },

    async getTotalDonated(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/event/one/${id}/total-donated`)
            return res
        } catch (error) {
            return error
        }
    }
}