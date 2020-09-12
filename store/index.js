import axios from 'axios'

export const strict = false

export const state = () => ({
    searchResults: [],
    totalResultCount: 0
})

export const mutations = {
  storeResults (state, payload) {
    state.searchResults = payload.items
    state. totalResultCount = payload.total_count
  }
}

export const actions = {
  storeSearchResults ({commit}, data) {
    commit('storeResults', data)

    console.log('test: \n', data)
  }
}