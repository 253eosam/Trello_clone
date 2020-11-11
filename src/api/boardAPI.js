import api from './axiosConfig'

const path = '/boards'

export default {
  save: (board) => api.post(`${path}/`, board),
  findByBid: ({ id }) => api.get(`${path}/${id}`),
  findByUid: (uid) => api.get(`${path}?user=${uid}`),
  update: (board) => api.put(`${path}/${board.id}`, board),
  delete: ({ id }) => api.delete(`${path}/${id}`)
}
