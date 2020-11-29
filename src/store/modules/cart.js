import _ from 'lodash'

export default {
  state: {
    cartProducts: []
  },
  mutations: {
    setCartProducts (state, product) {
      let dataCopy = []

      // если массив пустой - добавляю продукт
      if (state.cartProducts.length === 0) {
        if (product.P === product.qty) {
          product.lastItem = true
        }

        dataCopy.push(product)
      } else {
        dataCopy = state.cartProducts.map(item => ({ ...item }))

        // если в массиве нет такого продукта - добавляю
        if (!_.some(dataCopy, { T: product.T })) {
          if (product.P === product.qty) {
            product.lastItem = true
          }

          dataCopy.push(product)
        } else {
        // если в массиве уже есть такой продукт - изменяю его свойство отвечающее за количество в корзине
          const foundItem = _.find(dataCopy, { T: product.T })
          // проверяю не привышает ли количество заказываемого товара количество имеющегося
          if (!foundItem.lastItem) {
            foundItem.qty += 1
            if (foundItem.P === foundItem.qty) {
              foundItem.lastItem = true
            }
          }
        }
      }

      state.cartProducts = dataCopy
    },
    clearCartProducts (state) {
      state.cartProducts = []
    },
    changeQty (state, product) {
      const dataCopy = state.cartProducts.map(item => ({ ...item }))

      const foundItem = _.find(dataCopy, { T: product.productId })

      if (product.val === +1) {
        // добавляю товар в корзину и если количество товара равно добавленному в корзину - устанавливаю флаг lastItem = true
        if (foundItem.P === foundItem.qty) {
          return false
        } else if (foundItem.P === foundItem.qty + 1) {
          foundItem.qty += product.val
          foundItem.lastItem = true
        } else {
          foundItem.qty += product.val
          foundItem.lastItem = false
        }
      }

      if (product.val === -1) {
        // если количество товара больше добавленного в корзину - устанавливаю флаг lastItem = false
        if (foundItem.qty === 1) {
          return false
        } else {
          foundItem.lastItem = false
          foundItem.qty += product.val
        }
      }

      state.cartProducts = dataCopy
    },
    removeProduct (state, productId) {
      // удаляю продукт из массива корзины
      const dataCopy = state.cartProducts.map(item => ({ ...item }))
      const foundItem = _.find(dataCopy, { T: productId })

      _.remove(dataCopy, foundItem)

      state.cartProducts = dataCopy
    }
  },
  actions: {
    addProduct ({ commit }, product) {
      commit('setCartProducts', product)
    },
    clearProducts ({ commit }) {
      commit('clearCartProducts')
    },
    deleteProduct ({ commit }, productId) {
      commit('removeProduct', productId)
    },
    changeProductQty ({ commit }, productInfo) {
      commit('changeQty', productInfo)
    }
  },
  getters: {
    getCartList: s => s.cartProducts
  }
}
