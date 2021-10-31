import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedStartDate: '',
    selectedEndDate: '',
    datepickerOpen: false,
  },
  mutations: {
    SET_START_DATE(state, payload) {
      state.selectedStartDate = payload;
    },
    SET_END_DATE(state, payload) {
      state.selectedEndDate = payload;
    },
    CLEAR_SELECTED_DATES(state) {
      state.selectedStartDate = '';
      state.selectedEndDate = '';
    },
    TOGGLE_DATEPICKER(state) {
      state.datepickerOpen = !state.datepickerOpen;
    },
  },
  actions: {
    setStartDate({ commit }, payload) {
      commit('SET_START_DATE', payload);
    },
    setEndDate({ commit }, payload) {
      commit('SET_END_DATE', payload);
    },
    clearSelectedDates({ commit }) {
      commit('CLEAR_SELECTED_DATES');
    },
    toggleDatepicker({ commit }) {
      commit('TOGGLE_DATEPICKER');
    },
  },
});
