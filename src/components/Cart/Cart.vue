<template>
  <b-card>
    <div class="table-responsive-sm">
      <table class="cart-table table">
        <tr>
          <th>Наименование товара</th>
          <th style="text-align:center">Количество</th>
          <th style="text-align:center">Цена</th>
          <th></th>
        </tr>
        <tr v-for="item in getCartList" :key=item.T>
          <td>{{ item.name }}</td>
          <td style="text-align:center">
            <div>
              <b-icon icon="caret-left-fill" class="pointer" @click="changeQty(item.T, -1)"></b-icon>
              {{ item.qty }}
              <b-icon icon="caret-right-fill" class="pointer" @click="changeQty(item.T, +1)"></b-icon>
              <p v-if="item.lastItem" class="info">Количество ограничено</p>
            </div>
          </td>
          <td style="text-align:center">
            {{ item.C | price(item.qty) }}
            <b-icon v-if="getRates.newRate < getRates.oldRate" icon="caret-down-fill" variant="success"></b-icon>
            <b-icon v-else-if="getRates.newRate > getRates.oldRate" icon="caret-up-fill" variant="danger"></b-icon>
          </td>
          <td style="text-align:center"><b-badge pill variant="danger" class="pointer" @click="deleteProduct(item.T)">Удалить</b-badge></td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:right">ИТОГО:</td>
          <td style="text-align:center">{{ calculateTotal() }}</td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td class="pt-4"><b-button variant="success" @click.prevent="buyProducts">Оплатить</b-button></td>
          <td class="pt-4"><b-button variant="danger" @click.prevent="cartClear">Очистить</b-button></td>
        </tr>
      </table>
    </div>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data: () => ({
    total: 0
  }),
  computed: {
    ...mapGetters(['getCartList', 'getRates'])
  },
  methods: {
    calculateTotal () {
      let total = 0
      // прохожу по всему массиву добавленных в корзину товаров и считаю общую стоимость
      this.getCartList.map(item => {
        total = total + ((item.C * item.qty) * this.getRates.newRate)
      })

      this.total = this._.floor(total, 2)
      return this._.floor(total, 2) + ' BYN'
    },
    cartClear () {
      this.$store.dispatch('clearProducts')
    },
    buyProducts () {
      if (this.getCartList.length > 0) {
        console.log(this.total, 'total')
        console.log(this.getCartList, 'cartList')
        console.log(this.getRates.newRate, 'rate')
      }
    },
    changeQty (productId, val) {
      const productInfo = {
        productId,
        val
      }

      this.$store.dispatch('changeProductQty', productInfo)
    },
    deleteProduct (productId) {
      this.$store.dispatch('deleteProduct', productId)
    }
  }
}
</script>

<style lang="scss" scoped>
 .cart-table {
    width: 100%;

    tr {
      padding-top: 5px;
      padding-bottom: 5px;

      &:not(:last-child) {
        border-bottom: 1px solid #d0d0d0;
      }

      th {
        padding: 10px 5px;
        font-weight: 600;
        font-size: 14px;
        color: rgb(100, 100, 100);
        border-top: none;
      }

      td {
        padding: 6px 5px;
        font-size: 14px;

        .info {
          text-align: center;
          margin-bottom: 0;
          border: 1px dashed rgb(219, 18, 18);
        }
      }

      .pointer {
        cursor: pointer;
      }
    }
 }
</style>
