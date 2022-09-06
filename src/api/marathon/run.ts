import Run from '@/utils/types/Run'
import api from '../index'
export default {
    async getRuns(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/run/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneRun(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/run/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postRun(run: Run): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/run/', { run })
            return res
        } catch (error) {
            return error
        }
    },
    async postRunWithEmptyFields(run: Run): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/run/', { run })
            return res
        } catch (error) {
            return error
        }
    },
    async updateRun(run: Run): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/run/${run._id}`, { run })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteRun(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/run/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}