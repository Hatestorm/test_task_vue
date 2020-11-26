<template>
  <div class="home">
    home
    <div v-for="(group, index) in data" :key=index>
      <GroupAccordion :productList=group :groupId=index></GroupAccordion>
    </div>
  </div>
</template>

<script>
import GroupAccordion from '@/components/GroupAccordion/GroupAccordion.vue'

export default {
  name: 'Home',
  data: () => ({
    data: null
  }),
  async mounted () {
    await this.$store.dispatch('fetchNames')
    const data = await this.$store.dispatch('fetchData')

    // группировка продуктов по GroupId
    this.data = this._.groupBy(data.Value.Goods, 'G')
  },
  methods: {},
  components: {
    GroupAccordion
  }
}
</script>
