import userAPI from './axiosConfig.js'

export default {
  findByEmail: (param, succ, err, final) => {
    userAPI
      .get('/users', { params: param })
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  save: (param, succ, err, final) => {
    userAPI
      .post('/users', param)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  }
}
