import { createStore } from 'vuex'
const state = {
  selected: 0
}

const mutations = {
  SET_SELECTED(state, payload) {
    state.selected = payload
  }
}

const actions = {
  setSelected(context, index) {
    setTimeout(() => {
      context.commit('SET_SELECTED', index)
    }, 1000)
  }
}

const getters = {
  getSelected(state) {
    return state.selected
  }
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store
