<template>
  <div class="base-currency-input">
    <label
      :class="[
        'base-currency-input__label',
        { 'move-label': isInputFocused || value },
      ]"
      :for="`field-input-${id}`"
      >{{ label }}</label
    >
    <div class="base-currency-input__wrapper">
      <input
        class="base-currency-input__field-input"
        @input="onInput"
        @focus="focusInput"
        @blur="unfocusInput"
        :value="value"
        :id="`field-input-${id}`"
      />

      <div
        class="base-currency-input__currency"
        @click="switchCurrencySelector"
        v-click-outside="closeCurrencySelector"
      >
        <p>{{ selectedCurrency.cc }}</p>
        <div
          :class="[
            'base-currency-input__currency-arrow',
            { 'active-arrow': isCurrencySelectorShown },
          ]"
        ></div>
      </div>

      <div
        v-if="isCurrencySelectorShown"
        class="base-currency-input__currency-selector"
      >
        <div
          v-for="item in currenciesList"
          class="currency-item"
          @click="chooseCurrency(item)"
          :key="item.cc"
        >
          <p class="currency-item__cc">{{ item.txt }}</p>
          <p>{{ item.cc }}</p>
        </div>
      </div>
    </div>

    <p class="base-currency-input__helper">
      {{ helper }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import vClickOutside from 'v-click-outside'

@Component
export default class BaseCurrencyInput extends Vue {
  @Prop({ default: '' }) value!: number | null
  @Prop({ default: '' }) label!: string
  @Prop({ default: null }) id!: number

  isInputFocused = false
  isCurrencySelectorShown = false
  selectedCurrency: Record<string, string> = {
    cc: 'CCY',
  }

  get currenciesList(): Array<Record<string, string>> {
    return this.$store.state.currency.currenciesList
  }
  get helper(): string {
    console.log(this.selectedCurrency.txt)

    return this.selectedCurrency.txt || 'Виберіть валюту зі списку'
  }

  switchCurrencySelector(): void {
    this.isCurrencySelectorShown = !this.isCurrencySelectorShown
  }
  closeCurrencySelector(): void {
    this.isCurrencySelectorShown = false
  }
  chooseCurrency(newCurrency: Record<string, string>): void {
    this.selectedCurrency = newCurrency
    this.$emit('chooseCurrency', newCurrency.rate)
  }
  focusInput(): void {
    this.isInputFocused = true
  }
  unfocusInput(): void {
    this.isInputFocused = false
  }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    const regex = /[^0-9,.]/g

    target.value = target.value
      .replace(regex, '')
      .replace(/,/g, '.')
      .replace(/\.(?=.*\.)/g, '')
    this.$emit('input', target.value)
  }

  created(): void {
    Vue.use(vClickOutside)
  }
}
</script>

<style lang="scss" scoped>
.base-currency-input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;

  &__label {
    @extend p;
    position: absolute;
    top: 14px;
    left: 16px;
    padding: 0 4px;
    border-radius: 30px;
    background-color: $white;
    color: $gray-dark;
    transition-duration: 0.2s;
    user-select: none;
    pointer-events: none;
  }

  &__wrapper {
    display: flex;
    box-shadow: inset 0 0 0 1px $gray-dark;
    border-radius: 4px;
  }

  &__field-input {
    @extend p;
    padding: 14px 16px;
    width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: $black;
      transition: background-color 5000s ease-in-out 0s;
    }

    &::-webkit-calendar-picker-indicator {
      opacity: 0;
    }
  }

  &__currency {
    display: flex;
    align-items: center;
    margin: 10px 12px 10px 0;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;

    &-arrow {
      height: 0;
      margin-left: 8px;
      border-top: 5px solid $black;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      transition-duration: 0.2s;
    }

    &:hover {
      background-color: $gray;
    }
  }

  &__helper {
    margin-top: 8px;
  }

  &__currency-selector {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    display: flex;
    flex-direction: column;
    max-height: 400px;
    width: 100%;
    padding: 14px 0;
    border-radius: 4px;
    background-color: $white;
    border: solid 1px $gray-dark;
    box-shadow: 0 0 11px 0px rgba($gray-dark, 0.5);
    overflow: auto;
  }

  .currency-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 15px;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: $gray;
    }

    &__cc {
      padding-right: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.active-arrow {
  rotate: 180deg;
}

.move-label {
  top: -7px;
  left: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
}
</style>
