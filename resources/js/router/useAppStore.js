import { defineStore } from 'pinia'
import axios from 'axios'
import { useApi } from '@/router/useApi'

export const useAppStore = defineStore('app', {
  state: () => ({
    currencyCode: 'SGD'
  }),
  actions: {
    async fetchCurrency() {
      const { getAxiosConfig } = useApi()
      try {
        const { data } = await axios.get('/api/landlord/currency', getAxiosConfig())
        if (Array.isArray(data) && data[0]?.code) {
          this.currencyCode = data[0].code
        } else if (data?.currency_code) {
          this.currencyCode = data.currency_code
        }
      } catch (error) {
        console.error('Currency fetch failed, using default SGD')
        this.currencyCode = 'SGD'
      }
    }
  }
})