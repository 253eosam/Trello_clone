import board from './axiosConfig.js'

export default {
  save: (params, succ, err, final) => {
    board
      .post('/boards', params)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  update: (params, succ, err, final) => {
    board
      .put(`/boards/${params.bid}`, { tag: params.tag })
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  delete: (params, succ, err, final) => {
    board
      .delete(`/boards/${params.bid}`)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  findByBid: (params, succ, err, final) => {
    board
      .get(`/boards/${params}`)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  findByUid: (params, succ, err, final) => {
    board
      .get('/boards', { params: { user: params } })
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  }
}
