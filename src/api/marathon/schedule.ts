import Schedule from '@/utils/types/Schedule'
import { AxiosInstance } from 'axios'
export default {
    async getSchedules(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/schedule/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneSchedule(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/schedule/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postSchedule(API: AxiosInstance, schedule: Schedule): Promise<any> {
        try {
            const res = await API.post('api/tracker/schedule/', { schedule })
            return res
        } catch (error) {
            return error
        }
    },
    async updateSchedule(API: AxiosInstance, schedule: Schedule): Promise<any> {
        try {
            const res = await API.put(`api/tracker/schedule/${schedule._id}`, { schedule })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteSchedule(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/schedule/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}