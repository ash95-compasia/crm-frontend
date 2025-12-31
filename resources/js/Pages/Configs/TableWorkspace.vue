<template>
  <div class="flex flex-col md:flex-row gap-4 mb-6">
    <!-- Available Tables (Drag Zone) -->
    <div class="flex-1 bg-white shadow-md rounded-lg p-4 min-h-[400px]">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Available Tables</h2>
      <draggable
        v-model="localAvailableTables"
        group="tables"
        item-key="name"
        :disabled="loading"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[300px]"
        @end="handleDragEnd"
      >
        <template #item="{ element }">
          <div class="bg-gray-50 border rounded-lg p-3 hover:shadow-lg transition-shadow cursor-move">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-sm font-medium text-gray-700">{{ element.customName || element.name }}</h3>
              <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {{ element.columns.length }} fields
              </span>
            </div>
            <ul class="text-sm text-gray-600">
              <li v-for="(col, index) in element.columns.slice(0, 3)" :key="index" class="flex justify-between py-1">
                <span class="truncate">{{ col.key }}</span>
                <span class="truncate text-gray-500">{{ getSampleValue(element.name, col.key) }}</span>
              </li>
              <li v-if="element.columns.length > 3" class="text-center py-1 text-gray-500">
                +{{ element.columns.length - 3 }} more fields
              </li>
            </ul>
          </div>
        </template>
        <template #footer v-if="!localAvailableTables.length">
          <div class="text-center py-8 text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm6-6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
               No tables available. Parse JSON to see tables.
          </div>
        </template>
      </draggable>
    </div>

    <!-- Drop Zone -->
    <div class="flex-1 bg-white shadow-md rounded-lg p-4 min-h-[400px]">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Table Workspace</h2>
      <div 
        class="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[300px] transition-all"
        :class="{'bg-gray-50': localDropZoneTables.length === 0}"
      >
        <draggable
          v-model="localDropZoneTables"
          group="tables"
          item-key="name"
          class="space-y-4"
          @end="handleDragEnd"
        >
          <template #item="{ element }">
            <div class="bg-white border rounded-lg p-3 shadow-sm">
              <div class="flex justify-between items-center mb-2">
                <input
                  v-model="element.customName"
                  :placeholder="element.name"
                  class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  @change="updateTable(element)"
                />
                <button
                  @click="removeFromDropZone(element)"
                  class="ml-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H3a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H6zm-1 3h10v1H5V5zm2 3v9h6V8H7zm3 1a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-gray-700">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="p-2 text-left">Original Field</th>
                      <th class="p-2 text-left">Custom Name</th>
                      <th class="p-2 text-left">Sample Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(col, index) in element.columns" :key="index">
                      <td class="p-2">{{ col.key }}</td>
                      <td class="p-2">
                        <input
                          v-model="col.custom"
                          :placeholder="col.key"
                          class="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          @change="updateTable(element)"
                        />
                      </td>
                      <td class="p-2 truncate">{{ getSampleValue(element.name, col.key) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template #footer v-if="!localDropZoneTables.length">
            <div class="text-center py-8 text-gray-500">
              <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v3.586l2.707-2.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 10.586V7z" clip-rule="evenodd" />
              </svg>
              Drag tables here to customize
              <p class="text-sm mt-2">Drop tables to rename fields and customize output</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  name: 'TableWorkspace',
  components: { Draggable },
  props: {
    availableTables: Array,
    dropZoneTables: Array,
    normalizedData: Object,
    loading: Boolean,
  },
  emits: ['update:availableTables', 'update:dropZoneTables', 'update-table', 'remove-table'],
  data() {
    return {
      localAvailableTables: [...this.availableTables],
      localDropZoneTables: [...this.dropZoneTables]
    }
  },
  watch: {
    availableTables(newVal) {
      this.localAvailableTables = [...newVal];
    },
    dropZoneTables(newVal) {
      this.localDropZoneTables = [...newVal];
    }
  },
  methods: {
    getSampleValue(tableName, key) {
      return this.normalizedData[tableName]?.[0]?.[key] || '';
    },
    handleDragEnd() {
      // Update both zones to ensure consistency
      this.$emit('update:availableTables', this.localAvailableTables);
      this.$emit('update:dropZoneTables', this.localDropZoneTables);
    },
    updateTable(table) {
      this.$emit('update-table', table);
    },
    removeFromDropZone(table) {
      // Remove from drop zone
      this.localDropZoneTables = this.localDropZoneTables.filter(t => t.name !== table.name);
      
      // Add back to available tables if not already there
      if (!this.localAvailableTables.some(t => t.name === table.name)) {
        this.localAvailableTables.push({
          name: table.name,
          customName: table.customName,
          columns: table.columns.map(col => ({...col}))
        });
      }
      
      // Emit updates
      this.$emit('update:availableTables', this.localAvailableTables);
      this.$emit('update:dropZoneTables', this.localDropZoneTables);
      this.$emit('remove-table', table);
    }
  }
};
</script>


<style scoped>
.cursor-move {
  cursor: move;
}
.min-height-300 {
  min-height: 300px;
}
.min-height-400 {
  min-height: 400px;
}

/* Drop zone styling */
.drop-zone-empty {
  background-color: #f9fafb; /* bg-gray-50 equivalent */
  border: 2px dashed #d1d5db; /* border-gray-300 equivalent */
  border-radius: 0.5rem; /* rounded-lg equivalent */
  padding: 1rem; /* p-4 equivalent */
}

/* Table item styling */
.table-item {
  background-color: #f9fafb; /* bg-gray-50 equivalent */
  border: 1px solid #e5e7eb; /* border equivalent */
  border-radius: 0.5rem; /* rounded-lg equivalent */
  padding: 0.75rem; /* p-3 equivalent */
  transition: box-shadow 0.2s; /* transition-shadow equivalent */
}

.table-item:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* hover:shadow-lg equivalent */
}
</style>