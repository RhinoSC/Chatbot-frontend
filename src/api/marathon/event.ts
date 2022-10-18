import Event from '@/utils/types/Event'
import api from '../index'
export default {
    async getEvents(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/event/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneEvent(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/event/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneEventByName(name: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/event/name/${name}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postEvent(event: Event): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/event/', { event })
            return res
        } catch (error) {
            return error
        }
    },
    async updateEvent(event: Event): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/event/${event._id}`, { event })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteEvent(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/event/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}