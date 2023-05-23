<template>
  <div class="all-currencies">
    <div class="all-currencies__list">
      <div
        v-for="item in currenciesList"
        class="currency-list"
        :key="item.cc"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AllCurrencies extends Vue {
  get currenciesList(): Array<Record<string, string>> {
    return this.$store.state.currency.currenciesList
  }
}
</script>

<style lang="scss" scoped>
.all-currencies {
  display: flex;
  flex-direction: column;

  &__list {
    display: flex;
    flex-direction: column;
  }
  .currency-item {
  }
}
</style>
