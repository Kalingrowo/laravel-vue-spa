import { getLocalUser } from "./helpers/auth";

const user = getLocalUser();

export default {
  state: {
    welcomeMsg: "Welcome to my Vue-SPA",
    welMsg: "Welcome SPA",
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
    customers: []
  },
  getters: {
    welcome(state) { return state.welcomeMsg; },
    wel(state) { return state.welMsg; },
    isLoading(state) { return state.loading; },
    isLoggedIn(state) { return state.isLoggedIn; },
    currentUser(state) { return state.currentUser; },
    authError(state) { return state.auth_error; },
    customers(state) { return state.customers; }
  },
  mutations: {
    login(state) {
      state.loading = true;
      state.auth_error = null;
    },
    logginSuccess(state, payload) {
      state.auth_error = null;
      state.isLoggedIn = true;
      state.loading = false;
      state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    logginFailed(state, payload) {
      state.loading = false;
      state.auth_error = payload.error;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    updateCustomers(state, payload) {
      state.customers = payload;
    }
  },
  actions: {
    login(context) {
      context.commit("login");
    },
    getCustomers(context) {
      const AuthStr = 'Bearer '.concat(context.state.currentUser.token);
      axios.get('/api/customers', {
        headers: {
          "Authorization": AuthStr
        }
      })
      .then((response) => {
        context.commit('updateCustomers', response.data.customers);
      })
    }
  }
}
