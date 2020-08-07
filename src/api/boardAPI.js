import boardAPI from './axiosConfig.js'

export default {
  save: (params, succ, err, final) => {
    boardAPI
      .post('/boards', params)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final)
  },
  update: (params, succ, err, final) => {
    boardAPI
      .put('/boards', params)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final)
  },
  delete: (params, succ, err, final) => {
    boardAPI
      .delete(`/boards/${params.bid}`)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final)
  },
  findByBid: (params, succ, err, final) => {
    boardAPI
      .get(`/boards/${params}`)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final)
  },
  findByUid: (params, succ, err, final) => {
    boardAPI
      .get('/boards', { user: params })
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final)
  }
}
