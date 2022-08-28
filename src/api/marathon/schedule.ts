import Schedule from '@/utils/types/Schedule'
import api from '../index'
export default {
    async getSchedules(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/schedule/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneSchedule(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/schedule/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postSchedule(schedule: Schedule): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/schedule/', { schedule })
            return res
        } catch (error) {
            return error
        }
    },
    async updateSchedule(schedule: Schedule): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/schedule/${schedule._id}`, { schedule })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteSchedule(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/schedule/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}