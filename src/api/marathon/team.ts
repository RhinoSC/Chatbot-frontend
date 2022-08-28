import Team from '@/utils/types/Team'
import api from '../index'
export default {
    async getTeams(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/team/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneTeam(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/team/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postTeam(team: Team): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/team/', { team })
            return res
        } catch (error) {
            return error
        }
    },
    async updateTeam(team: Team): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/team/${team._id}`, { team })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteTeam(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/team/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}