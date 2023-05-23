import { getCurrencies } from '@/api/mainRequests'
import { shallowMount } from '@vue/test-utils'
import AllCurrencies from '@/views/AllCurrencies.vue'
import store from '@/store'

describe('mainRequests', () => {
  it('is should get and put in store array of currencies', async (): Promise<void> => {
    const wrapper = shallowMount(AllCurrencies)
    console.log(wrapper.text)
  })
})
