<!-- src/components/navigation/NavDetailsPanel.vue -->
<template>
  <div class="lg:w-3/5 flex flex-col" style="max-height: calc(100vh - 180px);">
    <!-- Tabs -->
    <div class="flex border-b border-gray-200 mb-4 bg-white rounded-t-lg">
      <button
        @click="activeTab = 'details'"
        :class="[
          'px-4 py-2 text-sm font-medium border-b-2 -mb-px rounded-t-lg transition-colors',
          activeTab === 'details'
            ? 'border-green-600 text-green-600 bg-green-50'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        ]"
      >
        Item Details
      </button>
      <button
        @click="activeTab = 'add'"
        :class="[
          'px-4 py-2 text-sm font-medium border-b-2 -mb-px rounded-t-lg transition-colors',
          activeTab === 'add'
            ? 'border-green-600 text-green-600 bg-green-50'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        ]"
      >
        Add New Item
      </button>
      <button
        @click="activeTab = 'bulk'"
        :class="[
          'px-4 py-2 text-sm font-medium border-b-2 -mb-px rounded-t-lg transition-colors',
          activeTab === 'bulk'
            ? 'border-green-600 text-green-600 bg-green-50'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        ]"
      >
        Bulk Actions
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto bg-white rounded-b-lg border border-gray-200 shadow-sm">
      <div class="p-6">
        <DetailsTab
          v-if="activeTab === 'details'"
          :item="selectedItem"
          :all-tenants="allTenants"
          @edit="$emit('edit', selectedItem)"
          @refresh="$emit('refresh')"
        />
        <AddItemTab
          v-else-if="activeTab === 'add'"
          :all-tenants="allTenants"
          :top-level-items="topLevelItems"
          @added="$emit('refresh')"
        />
        <BulkActionsTab
          v-else
          :item="selectedItem"
          :all-tenants="allTenants"
          :all-nav-items="$parent?.allNavItems || []"
          @refresh="$emit('refresh')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DetailsTab from './tabs/DetailsTab.vue'
import AddItemTab from './tabs/AddItemTab.vue'
import BulkActionsTab from './tabs/BulkActionsTab.vue'

export default {
  name: 'NavDetailsPanel',
  components: { DetailsTab, AddItemTab, BulkActionsTab },
  props: ['selectedItem', 'allTenants', 'topLevelItems'],
  emits: ['edit', 'refresh'],
  data() {
    return { activeTab: 'details' }
  },
  watch: {
    selectedItem(newItem) {
      // Switch to details tab when an item is selected
      if (newItem) {
        this.activeTab = 'details'
      }
    }
  }
}
</script>