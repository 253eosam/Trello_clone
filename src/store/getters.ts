export default {
  user: (state: any) => {
    return state.user
  },
  isLoading: (state: any) => {
    return state.loading.scheduleCnt !== 0
  }
}
