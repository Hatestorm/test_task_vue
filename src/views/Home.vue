<template>
  <div class="home">
    <div class="wrapper" v-if="getRates.newRate">
      <div class="row pt-5 pb-5">
        <div class="col-12 col-lg-6">
          <GroupAccordion v-for="(group, index) in data" :key=index :productList=group :groupId=index></GroupAccordion>
        </div>
        <div class="col-12 pt-3 pt-lg-0 col-lg-6">
          <Cart></Cart>
        </div>
      </div>
    </div>
    <Spinner v-else></Spinner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GroupAccordion from '@/components/GroupAccordion/GroupAccordion.vue'
import Cart from '@/components/Cart/Cart.vue'

export default {
  name: 'Home',
  data: () => ({
    data: null
  }),
  async mounted () {
    // получаю json для сопоставления имён
    await this.$store.dispatch('fetchNames')

    this.fetchData()

    // читаю data.json с интервалом
    setInterval(() => {
      this.fetchData()
    }, 15000)
  },
  methods: {
    async fetchData () {
      const data = await this.$store.dispatch('fetchData')

      // группировка продуктов по GroupId
      this.data = this._.groupBy(data.Value.Goods, 'G')
    }
  },
  computed: {
    ...mapGetters(['getRates', 'getData'])
  },
  components: {
    GroupAccordion,
    Cart
  }
}
</script>

<style lang="scss">
  .home {
    .wrapper {
      max-width: 1300px;
      margin: 0 auto;

      @media(max-width: 1299px) {
        padding: 0 20px;
      }
    }
  }
</style>
