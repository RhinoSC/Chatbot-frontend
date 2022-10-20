import Team from '@/utils/types/Team'
import { AxiosInstance } from 'axios'
export default {
    async getTeams(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/team/all')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneTeam(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/team/one/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postTeam(API: AxiosInstance, team: Team): Promise<any> {
        try {
            const res = await API.post('api/tracker/team/one', { team })
            return res
        } catch (error) {
            return error
        }
    },
    async updateTeam(API: AxiosInstance, team: Team): Promise<any> {
        try {
            const res = await API.put(`api/tracker/team/one/${team._id}`, { team })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteTeam(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/team/one/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}