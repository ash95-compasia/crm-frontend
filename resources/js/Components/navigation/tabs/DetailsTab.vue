<!-- src/components/navigation/tabs/DetailsTab.vue -->
<template>
  <div v-if="item" class="space-y-6">
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 rounded-lg flex items-center justify-center"
          :class="item.parent_id ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
          <i v-if="item.icon" :class="['fas text-lg', item.icon]"></i>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-gray-900">{{ item.label }}</h3>
          <p class="text-sm text-gray-500">{{ item.path || 'No path specified' }}</p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-xs text-gray-500">Display Order</div>
        <div class="text-lg font-semibold">{{ item.order }}</div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <label class="block text-xs font-medium text-gray-500 mb-1">Parent Item</label>
        <div class="text-sm text-gray-900">
          {{ item.parent_id ? getParentLabel(item.parent_id) : 'Top Level' }}
        </div>
      </div>
      <div class="bg-gray-50 p-3 rounded-lg">
        <label class="block text-xs font-medium text-gray-500 mb-1">Created</label>
        <div class="text-sm text-gray-900">
          {{ formatDate(item.created_at) }}
        </div>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-3">
        <label class="text-sm font-medium text-gray-700">Assigned Tenants</label>
        <span class="text-xs text-gray-500">{{ item.tenants?.length || 0 }} tenants</span>
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tenant in item.tenants || []" :key="tenant.id"
          class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
          {{ tenant.name }} <span class="ml-1 text-orange-600">({{ tenant.tenant_code || tenant.code }})</span>
        </span>
        <span v-if="!item.tenants || item.tenants.length === 0" class="text-sm text-gray-400 italic">
          Not assigned to any tenant
        </span>
      </div>
    </div>

    <div class="flex space-x-3 pt-4 border-t border-gray-200">
      <button @click="$emit('edit', item)" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center transition-colors">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        Edit Item
      </button>
      <button @click="duplicateItem" class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center transition-colors">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        Duplicate
      </button>
      <button @click="$emit('refresh')" class="px-4 py-2 text-gray-500 text-sm font-medium rounded-lg hover:text-gray-700 hover:bg-gray-100 transition-colors">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        Clear Selection
      </button>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">No Item Selected</h3>
    <p class="text-gray-500">Click on an item in the navigation tree to view details</p>
  </div>
</template>

<script>
import axios from 'axios'
import { useApi } from '@/router/useApi'

export default {
  name: 'DetailsTab',
  props: ['item', 'allTenants'],
  emits: ['edit', 'refresh'],
  setup() {
    const { getAxiosConfig } = useApi()
    return { getAxiosConfig }
  },
  methods: {
    getParentLabel(id) {
      // Note: This needs access to all nav items, not tenants
      // You should pass allNavItems prop if you want this to work
      return `Parent ID: ${id}`
    },
    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    async duplicateItem() {
      if (!this.item) return
      
      try {
        const copy = { 
          ...this.item, 
          label: `${this.item.label} (Copy)`, 
          order: this.item.order + 1 
        }
        delete copy.id
        delete copy.created_at
        delete copy.updated_at
        
        await axios.post('/api/landlord/nav-items', copy, this.getAxiosConfig())
        this.$emit('refresh')
      } catch (error) {
        console.error('Duplicate failed:', error)
        alert('Failed to duplicate item')
      }
    }
  }
}
</script>