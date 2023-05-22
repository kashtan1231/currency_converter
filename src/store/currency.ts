export default {
  namespaced: true,
  state: {
    currenciesList: [],
  },
  mutations: {
    setCurrencies(
      state: any,
      currenciesList: Array<Record<string, string>>
    ): void {
      state.currenciesList = currenciesList
      const hryvniaObject = {
        cc: 'UAH',
        exchangedate: '23.05.2023',
        rate: 1,
        txt: 'Гривня',
      }
      state.currenciesList.unshift(hryvniaObject)
    },
  },
}
