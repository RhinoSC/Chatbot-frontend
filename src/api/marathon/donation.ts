import Donation from '@/utils/types/Donation'
import { AxiosInstance } from 'axios'
export default {
    async getDonations(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/donation/all')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneDonation(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/donation/one/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postDonation(API: AxiosInstance, donation: Donation): Promise<any> {
        try {
            const res = await API.post('api/tracker/donation/one', { donation })
            return res
        } catch (error) {
            return error
        }
    },

    async postDonationPublic(API: AxiosInstance, donation: Donation): Promise<any> {
        try {
            const res = await API.post('api/tracker/donation/public', { donation })
            return res
        } catch (error) {
            return error
        }
    },
    async updateDonation(API: AxiosInstance, donation: Donation): Promise<any> {
        try {
            const res = await API.put(`api/tracker/donation/one/${donation._id}`, { donation })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteDonation(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/donation/one/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}