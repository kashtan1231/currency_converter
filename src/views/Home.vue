<template>
  <div class="home">
    <h1 class="home__title">Курси обміну валют</h1>

    <div class="home__inputs">
      <BaseCurrencyInput
        v-model="inputFirst.value"
        @input="calculateSecondInput"
        @chooseCurrency="chooseFirstCurrency"
        :id="0"
        label="В мене є"
      />
      <BaseCurrencyInput
        v-model="inputSecond.value"
        @input="calculateFirstInput"
        @chooseCurrency="chooseSecondCurrency"
        :id="1"
        label="Я отримаю"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseCurrencyInput from '@/components/BaseCurrencyInput.vue'

interface InputFirst {
  value: null | number
  rate: number
}

@Component({
  components: { BaseCurrencyInput },
})
export default class Home extends Vue {
  inputFirst: InputFirst = {
    value: null,
    rate: 0,
  }
  inputSecond: InputFirst = {
    value: null,
    rate: 0,
  }
  chooseFirstCurrency(newRate: number): void {
    this.inputFirst.rate = newRate
    this.calculateFirstInput()
  }
  chooseSecondCurrency(newRate: number): void {
    this.inputSecond.rate = newRate
    this.calculateSecondInput()
  }
  calculateFirstInput(): void {
    if (
      this.inputSecond.value &&
      this.inputFirst.rate &&
      this.inputSecond.rate
    ) {
      this.inputFirst.value =
        (this.inputSecond.rate / this.inputFirst.rate) * this.inputSecond.value
    } else this.inputFirst.value = null
  }
  calculateSecondInput(): void {
    if (
      this.inputFirst.value &&
      this.inputFirst.rate &&
      this.inputSecond.rate
    ) {
      this.inputSecond.value =
        (this.inputFirst.rate / this.inputSecond.rate) * this.inputFirst.value
    } else this.inputSecond.value = null
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  padding: 0 46px;

  &__title {
    text-align: center;
    margin-bottom: 64px;
  }

  &__inputs {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style>
