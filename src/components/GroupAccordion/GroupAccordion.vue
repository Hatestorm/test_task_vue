<template>
  <div>
    <h3>{{ getNames[groupId].G }}</h3>
    <Product v-for="product in productList" :key=product.T :data=product :groupId=groupId></Product>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Product from '@/components/GroupAccordion/Product/Product.vue'

export default {
  name: 'Accordion',
  data: () => ({}),
  mounted () {
    console.log(this.getNames, 'getNames')
  },
  computed: {
    ...mapGetters(['getNames'])
  },
  props: ['productList', 'groupId'],
  components: {
    Product
  }
}
</script>
