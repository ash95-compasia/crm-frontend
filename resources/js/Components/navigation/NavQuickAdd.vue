<!-- src/components/navigation/NavQuickAdd.vue -->
<template>
  <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
    <div class="flex items-center space-x-3 flex-1">
      <div class="relative flex-1 max-w-sm">
        <input v-model="localSearch" @input="updateSearch" type="text" placeholder="Search items..." class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500" />
        <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <div class="flex space-x-2">
        <button @click="toggleFilter('topLevel')" :class="filterBtn('topLevel')" class="px-3 py-1.5 text-xs rounded-lg border transition-colors">
          Top Level
        </button>
        <button @click="toggleFilter('hasChildren')" :class="filterBtn('hasChildren')" class="px-3 py-1.5 text-xs rounded-lg border transition-colors">
          With Children
        </button>
      </div>
    </div>
    <button @click="showQuickAdd = !showQuickAdd" class="ml-3 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center transition-colors">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      Quick Add
    </button>
  </div>

  <!-- Quick Add Dropdown -->
  <div v-if="showQuickAdd" class="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
    <input v-model="quickLabel" @keyup.enter="quickAdd" placeholder="Enter item label..." class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-1 focus:ring-green-500" />
    <div class="flex space-x-2">
      <select v-model="quickParent" class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500">
        <option value="">Top Level</option>
        <option v-for="p in topLevelItems" :key="p.id" :value="p.id">{{ p.label }}</option>
      </select>
      <button @click="quickAdd" :disabled="!quickLabel.trim()" class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Add
      </button>
      <button @click="cancelQuickAdd" class="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useApi } from '@/router/useApi'

export default {
  name: 'NavQuickAdd',
  emits: ['refresh', 'update:search', 'toggle-filter'],
  props: {
    topLevelItems: Array,
    allTenants: Array
  },
  setup() { 
    const { getAxiosConfig } = useApi(); 
    return { getAxiosConfig } 
  },
  data() { 
    return { 
      showQuickAdd: false, 
      quickLabel: '', 
      quickParent: '',
      localSearch: ''
    } 
  },
  methods: {
    updateSearch() {
      this.$emit('update:search', this.localSearch)
    },
    async quickAdd() {
      if (!this.quickLabel.trim()) return
      try {
        await axios.post('/api/landlord/nav-items', {
          label: this.quickLabel,
          parent_id: this.quickParent || null,
          order: 999,
          tenant_ids: this.allTenants.slice(0, 3).map(t => t.id)
        }, this.getAxiosConfig())
        this.quickLabel = ''
        this.quickParent = ''
        this.showQuickAdd = false
        this.$emit('refresh')
      } catch (error) {
        console.error('Quick add failed:', error)
        alert('Failed to add item')
      }
    },
    cancelQuickAdd() {
      this.showQuickAdd = false
      this.quickLabel = ''
      this.quickParent = ''
    },
    filterBtn(key) {
      // This should be handled by parent through props or we need to receive active filters
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
    },
    toggleFilter(filter) {
      this.$emit('toggle-filter', filter)
    }
  }
}
</script>