import api from './axiosConfig'

export default {
  // findByEmail (param, succ, err, final) {
  //   user
  //     .get('/users', { params: { email: param } })
  //     .then((res) => succ(res))
  //     .catch((msg) => err(msg))
  //     .finally(() => final())
  // },
  // save (param, succ, err, final) {
  //   user
  //     .post('/users', param)
  //     .then((res) => succ(res))
  //     .catch((msg) => err(msg))
  //     .finally(() => final())
  // }
  findByEmail: ({ email }) => api.get(`/users?email=${email}`)
}
