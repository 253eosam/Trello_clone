import api from './axiosConfig'

const path = '/tasks'

export default {
  save: (task) => api.post(path, task),
  findByTid: ({ id }) => api.get(`${path}/${id}`),
  delete: ({ id }) => api.delete(`${path}/${id}`),
  update: (task) => api.put(`${path}/${task.id}`, task)
}
