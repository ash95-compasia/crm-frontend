<!-- src/components/navigation/tabs/BulkActionsTab.vue -->
<template>
  <div class="space-y-6">
    <!-- Bulk Tenant Assignment -->
    <div v-if="item" class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-semibold text-gray-900 mb-3">Bulk Tenant Assignment</h4>
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <multiselect 
            v-model="bulkTenants" 
            :options="allTenants" 
            :multiple="true" 
            placeholder="Choose tenants" 
            label="name" 
            track-by="id"
            class="text-sm"
          />
        </div>
        <div>
          <select v-model="bulkAction" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500">
            <option value="add">Add to selected</option>
            <option value="replace">Replace existing</option>
            <option value="remove">Remove from selected</option>
          </select>
        </div>
      </div>
      <button @click="applyBulkTenants" :disabled="!bulkTenants.length" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        Apply to Selected Item
      </button>
    </div>

    <!-- Import/Export -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-semibold text-gray-900 mb-3">Import/Export</h4>
      <div class="flex space-x-4">
        <button @click="exportNavigation" class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
          Export JSON
        </button>
        <label class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
          Import JSON
          <input type="file" accept=".json" @change="importNavigation" class="hidden" />
        </label>
      </div>
    </div>

    <!-- Reset Order -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-semibold text-gray-900 mb-3">Reset Navigation Order</h4>
      <p class="text-sm text-gray-600 mb-4">Reset all items to alphabetical order</p>
      <button @click="resetOrder" class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
        Reset Order
      </button>
    </div>

    <!-- No Item Selected Message -->
    <div v-if="!item" class="text-center py-8">
      <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <p class="text-gray-500">Select an item to perform bulk actions</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useApi } from '@/router/useApi'
import Multiselect from 'vue-multiselect'

export default {
  name: 'BulkActionsTab',
  components: { Multiselect },
  props: ['item', 'allTenants', 'allNavItems'],
  emits: ['refresh'],
  setup() { 
    const { getAxiosConfig } = useApi(); 
    return { getAxiosConfig } 
  },
  data() { 
    return { 
      bulkTenants: [], 
      bulkAction: 'add' 
    } 
  },
  methods: {
    async applyBulkTenants() {
      if (!this.item || !this.bulkTenants.length) return
      
      try {
        let tenantIds = this.item.tenants?.map(t => t.id) || []
        const newIds = this.bulkTenants.map(t => t.id)
        
        if (this.bulkAction === 'add') {
          tenantIds = [...new Set([...tenantIds, ...newIds])]
        } else if (this.bulkAction === 'replace') {
          tenantIds = newIds
        } else if (this.bulkAction === 'remove') {
          tenantIds = tenantIds.filter(id => !newIds.includes(id))
        }
        
        await axios.put(`/api/landlord/nav-items/${this.item.id}`, 
          { tenant_ids: tenantIds }, 
          this.getAxiosConfig()
        )
        
        this.bulkTenants = []
        this.$emit('refresh')
      } catch (error) {
        console.error('Bulk tenant update failed:', error)
        alert('Failed to update tenants')
      }
    },
    exportNavigation() {
      if (!this.allNavItems || !this.allTenants) return
      
      const data = { 
        items: this.allNavItems, 
        tenants: this.allTenants,
        exported_at: new Date().toISOString(),
        version: '1.0'
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `nav-export-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
    importNavigation(e) {
      const file = e.target.files[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = async (event) => {
        try {
          const data = JSON.parse(event.target.result)
          console.log('Import data:', data)
          // TODO: Implement import logic
          alert('Import functionality not implemented yet')
        } catch (error) {
          alert('Failed to parse JSON file')
        }
        e.target.value = '' // Reset file input
      }
      reader.readAsText(file)
    },
    async resetOrder() {
      if (!confirm('Are you sure you want to reset all items to alphabetical order?')) return
      
      try {
        await axios.post('/api/landlord/nav-items/reset-order', {}, this.getAxiosConfig())
        this.$emit('refresh')
        alert('Order reset successfully')
      } catch (error) {
        console.error('Reset order failed:', error)
        alert('Failed to reset order')
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>