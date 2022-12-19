import axiosClient from './axiosClient'

export const campaignApi = {
  create(payload: any) {
    return axiosClient.post('/campaigns', payload)
  },
  getAllCampaigns() {
    return axiosClient.get('/campaigns')
  },
  getOnceCampaigns(id: string) {
    return axiosClient.get(`/campaigns/${id}`)
  },
  updateCampaigns(payload: any) {
    return axiosClient.put('/campaigns', payload)
  },
  deleteMultipleCampaigns(_id: Array<string>) {
    return axiosClient.delete('/campaigns', { params: _id })
  },
  deleteSingleCampaigns(_id: string) {
    return axiosClient.delete(`/campaigns/${_id}`)
  },
}
