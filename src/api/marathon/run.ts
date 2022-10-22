import Run from '@/utils/types/Run'
import { AxiosInstance } from 'axios'
export default {
    async getRuns(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/run/all')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneRun(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/run/one/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postRun(API: AxiosInstance, run: Run): Promise<any> {
        try {
            const res = await API.post('api/tracker/run/one', { run })
            return res
        } catch (error) {
            return error
        }
    },
    async createWithBidsAndTeams(API: AxiosInstance, run: Run): Promise<any> {
        try {
            const res = await API.post('api/tracker/run/advanced', { run })
            return res
        } catch (error) {
            return error
        }
    },
    async updateRun(API: AxiosInstance, run: Run): Promise<any> {
        try {
            const res = await API.put(`api/tracker/run/one/${run._id}`, { run })
            return res
        } catch (error) {
            return error
        }
    },
    async updateRunWithBidsAndTeams(API: AxiosInstance, run: Run): Promise<any> {
        try {
            const res = await API.put(`api/tracker/run/one/advanced/${run._id}`, { run })
            return res
        } catch (error) {
            return error
        }
    },
    async updateRunWithBids(API: AxiosInstance, run: Run): Promise<any> {
        try {
            const res = await API.put(`api/tracker/run/bids/${run._id}`, { run })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteRun(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/run/one/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}