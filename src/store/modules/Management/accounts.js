import Vuex from "vuex";
import Vue from "vue";
import store from "../../";

Vue.use(Vuex);

export const accounts = {
  namespaced: true,
  state: () => ({
    users_index: [],
  }),
  getters: {},
  mutations: {
    SET_USERS_INDEX(state, users) {
      state.users_index = users;
    },
  },
  actions: {
    fetchUsersIndex({ commit }) {
      const url = `account/users`;
      return this.$axios
        .get(url)
        .then((response) => {
          const users = response.data.data;
          commit("SET_USERS_INDEX", users);
        })
        .catch((error) => {
          console.error("Error Fetching Users Index: ", error);
        });
    },
    changeUserPassword({ dispatch }, { id, data }) {
      const url = `account/users/${id}/change-others-password`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          dispatch("fetchUsersIndex");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Error changing password: ", error);
        });
    },
    createNewUser({ dispatch }, data) {
      const url = `account/register`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          dispatch("fetchUsersIndex");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Failed to Register User: ", error);
        });
    },
  },
};