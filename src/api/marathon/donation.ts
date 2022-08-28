import Donation from '@/utils/types/Donation'
import api from '../index'
export default {
    async getDonations(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/donation/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneDonation(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/donation/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postDonation(donation: Donation): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/donation/', { donation })
            return res
        } catch (error) {
            return error
        }
    },
    async updateDonation(donation: Donation): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/donation/${donation._id}`, { donation })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteDonation(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/donation/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}