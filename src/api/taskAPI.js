import taskAPI from './axiosConfig.js'

export default {
  findByTid: (params, succ, err, final) => {
    taskAPI
      .get(`/tasks/${params.tid}`)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  save: (params, succ, err, final) => {
    taskAPI
      .post('/tasks', params)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  update: (params, succ, err, final) => {
    taskAPI
      .put('/tasks', params)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  },
  delete: (params, succ, err, final) => {
    taskAPI
      .delete(`/tasks/${params.bid}`)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final())
  }

}
