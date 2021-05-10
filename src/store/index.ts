import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { StateType } from './stateType'
import modules from './modules'
import axios from 'axios'
Vue.use(Vuex)

const defaultApiRequestOption = {
  method: 'GET',
  url: '',
  isFullResponse: false,
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json; charset=utf-8'
  },
  timeout: 1000
}

const store: StoreOptions<StateType> = {
  modules,
  actions: {
    async apiRequest (context, apiRequestOptions) {
      const options = { ...defaultApiRequestOption, ...apiRequestOptions }
      const { method, url, isFullResponse, data, params, header, baseURL, timeout } = options
      const requestData = {
        method,
        url,
        params,
        data,
        header,
        timeout,
        baseURL
      }

      try {
        const response = await axios(requestData)
        if (response) {
          if (isFullResponse) return response
          return response.data
        }
      } catch (e) {
        throw new Error('API 요청 에러가 발생하였습니다. 잠시후 다시 시도해주세요.')
      }
    }
  }
}

export default new Vuex.Store(store)
