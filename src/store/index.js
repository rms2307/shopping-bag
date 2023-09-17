import { createStore } from "vuex"
import axios from "axios"

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products
    },
    loadBag(state, products) {
      state.productsInBag = products
    },
    addToBag(state, product) {
      state.productsInBag.push(product)
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      if (confirm("Deseja remover?")) {
        var updateBag = state.productsInBag.filter((p) => p.id != productId)
        state.productsInBag = updateBag
        localStorage.setItem(
          "productsInBag",
          JSON.stringify(state.productsInBag)
        )
      }
    },
    updateQuantityFromBag(state, product) {
      state.productsInBag.forEach((p) => {
        if (p.id == product.id) {
          p.quantity = product.quantity
        }
      })
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        commit("loadProducts", response.data)
      })
    },
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit("loadBag", JSON.parse(localStorage.getItem("productsInBag")))
      }
    },
    addToBag({ commit }, product) {
      commit("addToBag", product)
    },
    removeFromBag({ commit }, productId) {
      commit("removeFromBag", productId)
    },
    updateQuantityFromBag({ commit }, product) {
      commit("updateQuantityFromBag", product)
    },
  },
  modules: {},
})
