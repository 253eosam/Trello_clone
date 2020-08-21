import api from './axiosConfig'

export default {
  findByEmail: ({ email }) => api.get(`/users?email=${email}`),
  save: (user) => api.post('/users', user)
}
