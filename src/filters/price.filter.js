import store from '@/store'
import _ from 'lodash'

export default function priceFilter (price, qty = 1) {
  const rate = store.getters.getRates.newRate

  const totalPrice = (price * qty) * rate

  return _.floor(totalPrice, 2)
}
