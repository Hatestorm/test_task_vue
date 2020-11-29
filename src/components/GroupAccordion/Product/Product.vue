<template>
  <b-card no-body class="overflow-hidden product-card">
    <b-row no-gutters>
      <b-col sm="4">
        <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col sm="8">
        <b-card-body>
          <b-card-text>
            <p>{{ this.getNames[this.groupId].B[this.data.T].N }}</p>
            <p>В наличии: {{data.P}} шт.</p>
            <p>Стоимость: {{data.C | price()}} BYN</p>
          </b-card-text>
          <b-button class="d-inline-block" :disabled=disableBtn href="#" variant="primary" @click.prevent="addToCart">В корзину</b-button>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Product',
  data: () => ({
    productData: null
  }),
  mounted () {
    // объект с данными о продукте
    this.productData = this._.assign(this.data, {
      name: this.getNames[this.groupId].B[this.data.T].N,
      qty: 1,
      lastItem: false
    })
  },
  methods: {
    addToCart () {
      this.$store.dispatch('addProduct', this.productData)
    }
  },
  computed: {
    ...mapGetters(['getNames', 'getCartList', 'getRates']),
    disableBtn () {
      // отключаю кнопку, когда кол-во имеющегося товара равно количеству добавленному в корзину
      if (this.getCartList.length > 0) {
        if (!this._.some(this.getCartList, { T: this.productData.T })) {
          return false
        } else {
          const foundItem = this._.find(this.getCartList, { T: this.productData.T })

          return foundItem.lastItem
        }
      } else return false
    }
  },
  props: ['data', 'groupId']
}
</script>

<style lang="scss" scoped>
  p {
    margin-bottom: 5px;
  }
  .product-card {
    margin-bottom: 20px;

    &:last-child{
      margin-bottom: 0;
    }
    .card-body {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>
