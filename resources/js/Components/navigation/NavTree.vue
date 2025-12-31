<!-- src/components/navigation/NavTree.vue -->
<template>
  <div class="lg:w-2/5 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900">Navigation Structure</h3>
        <div class="text-xs text-gray-500">{{ items.length }} items</div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <draggable
        v-model="localItems"
        @end="handleDragEnd"
        item-key="id"
        group="nav"
        class="space-y-1"
        :animation="200"
        ghost-class="dragging-ghost"
      >
        <template #item="{ element: item }">
          <div
            @click="$emit('select', item)"
            class="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-move group border border-transparent"
            :class="{
              'ml-6': item.parent_id,
              'bg-blue-50 border border-blue-100': selectedItem?.id === item.id
            }"
          >
            <div class="mr-2 text-gray-400 opacity-0 group-hover:opacity-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
              </svg>
            </div>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
              :class="item.parent_id ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
              <i v-if="item.icon" :class="['fas', item.icon]"></i>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="font-medium text-sm truncate">{{ item.label }}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500">{{ item.order }}</span>
                  <span v-if="item.parent_id" class="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Child</span>
                  <span v-else class="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Top</span>
                </div>
              </div>
              <div class="text-xs text-gray-500 truncate mt-0.5">{{ item.path || 'No path' }}</div>
              <div v-if="item.tenants?.length" class="mt-1 flex flex-wrap gap-1">
                <span v-for="t in item.tenants.slice(0,2)" :key="t.id" class="text-xs px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded">
                  {{ t.tenant_code || t.code }}
                </span>
                <span v-if="item.tenants.length > 2" class="text-xs text-gray-500">+{{ item.tenants.length - 2 }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button @click.stop="$emit('edit', item)" class="p-1 text-gray-400 hover:text-blue-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button @click.stop="$emit('delete', item.id)" class="p-1 text-gray-400 hover:text-red-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'NavTree',
  components: { draggable },
  props: ['items', 'selectedItem'],
  emits: ['select', 'drag-end', 'edit', 'delete'],
  data() {
    return { 
      localItems: [...this.items] 
    }
  },
  watch: {
    items: {
      handler(newItems) { 
        this.localItems = [...newItems] 
      },
      deep: true
    }
  },
  methods: {
    handleDragEnd(evt) {
      // Extract IDs in the new order
      const orderIds = this.localItems.map(item => item.id)
      this.$emit('drag-end', orderIds)
    }
  }
}
</script>

<style scoped>
.dragging-ghost {
  opacity: 0.5;
  background: #f3f4f6;
}
</style>