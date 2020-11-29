<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle=groupId variant="info">{{ getNames[groupId].G }}</b-button>
      </b-card-header>
      <b-collapse :id=groupId visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <Product v-for="product in productList" :key=product.T :data=product :groupId=groupId></Product>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Product from '@/components/GroupAccordion/Product/Product.vue'

export default {
  name: 'Accordion',
  data: () => ({}),
  mounted () {},
  computed: {
    ...mapGetters(['getNames'])
  },
  props: ['productList', 'groupId'],
  components: {
    Product
  }
}
</script>
