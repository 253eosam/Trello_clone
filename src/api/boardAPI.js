import boardAPI from './axiosConfig.js'

export default {
  save: (params, succ, err, final) => {
    boardAPI
      .post('boards', params)
      .then(res => succ(res))
      .catch(msg => err(msg))
      .finally(() => final)
  }

}
