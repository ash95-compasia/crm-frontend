<!-- src/components/navigation/tabs/AddItemTab.vue -->
<template>
  <form @submit.prevent="addNavItem" class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Label *</label>
        <input
          v-model="form.label"
          type="text"
          required
          placeholder="Dashboard, Settings, etc."
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Path</label>
        <input
          v-model="form.path"
          type="text"
          placeholder="/dashboard"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Icon</label>
        <input
          v-model="form.icon"
          type="text"
          placeholder="fa-cog"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Parent</label>
        <select
          v-model="form.parent_id"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">Top Level</option>
          <option v-for="p in topLevelItems" :key="p.id" :value="p.id">{{ p.label }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Order</label>
        <input
          v-model.number="form.order"
          type="number"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          min="0"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Tenants *</label>
      <multiselect
        v-model="form.tenant_ids"
        :options="allTenants"
        :multiple="true"
        :close-on-select="false"
        placeholder="Select tenants"
        label="name"
        track-by="id"
        class="text-sm"
      >
        <template #option="{ option }">
          <div class="flex items-center space-x-2">
            <span class="text-sm">{{ option.name }}</span>
            <span class="text-xs text-gray-500">({{ option.tenant_code }})</span>
          </div>
        </template>
      </multiselect>
    </div>

    <div class="pt-4 border-t border-gray-200">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
      >
        <!-- Loading spinner -->
        <svg
          v-if="isSubmitting"
          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <!-- Plus icon when not submitting -->
        <svg
          v-else
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>

        Add Navigation Item
      </button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { useApi } from '@/router/useApi'
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  props: ['allTenants', 'topLevelItems'],
  emits: ['added'],
  setup() {
    const { getAxiosConfig } = useApi()
    return { getAxiosConfig }
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        label: '',
        path: '',
        icon: 'fa-cog',
        parent_id: null,
        order: 0,
        tenant_ids: []
      }
    }
  },
  methods: {
    async addNavItem() {
      if (!this.form.label.trim()) return

      this.isSubmitting = true
      try {
        const payload = {
          ...this.form,
          tenant_ids: this.form.tenant_ids.map(t => (typeof t === 'object' ? t.id : t))
        }

        await axios.post('/api/landlord/nav-items', payload, this.getAxiosConfig())

        // Reset form
        this.form = {
          label: '',
          path: '',
          icon: 'fa-cog',
          parent_id: null,
          order: 0,
          tenant_ids: []
        }

        this.$emit('added')
      } catch (error) {
        console.error('Failed to add item:', error)
        alert('Failed to add navigation item')
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>