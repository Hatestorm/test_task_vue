<template>
  <p v-if="productData">{{ productData.name }}</p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Product',
  data: () => ({
    productData: null,
    productCount: 0
  }),
  mounted () {
    // массив с данными о продукте
    this.productData = this._.assign(this.data, { name: this.getNames[this.groupId].B[this.data.T].N })
  },
  computed: {
    ...mapGetters(['getNames'])
  },
  props: ['data', 'groupId']
}
</script>
