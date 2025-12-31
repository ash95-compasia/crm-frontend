<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Preview</h2>
    <div v-if="selectedTables.length" class="tabs">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            v-for="(table, index) in selectedTables"
            :key="table.name"
            @click="activeTab = index"
            class="px-4 py-2 text-sm font-medium"
            :class="{
              'border-b-2 border-blue-600 text-blue-600': activeTab === index,
              'text-gray-500 hover:text-gray-700': activeTab !== index,
            }"
          >
            {{ table.customName || table.name }}
          </button>
        </nav>
      </div>
      <div v-for="(table, index) in selectedTables" :key="table.name" v-show="activeTab === index" class="mt-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-md font-medium text-gray-700">{{ table.customName || table.name }}</h3>
          <div class="flex gap-2">
            <button
              @click="$emit('copy', table)"
              class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" /><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h7V6a1 1 0 112 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /><path d="M15 3a2 2 0 00-2 2v7h1a1 1 0 100-2H8v2h1a2 2 0 002-2V5a2 2 0 00-2-2h-1a1 1 0 100 2h2a1 1 0 011 1v6H5V5h1a1 1 0 100-2H5a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
              Copy
            </button>
            <button
              @click="$emit('remove', index)"
              class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H3a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H6zm-1 3h10v1H5V5zm2 3v9h6V8H7zm3 1a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z" /></svg>
              Remove
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-gray-700">
            <thead class="bg-gray-100">
              <tr>
                <th v-for="field in getPreviewFields(table.columns)" :key="field.key" class="p-2 text-left">
                  {{ field.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, rowIndex) in normalizedData[table.name] || []" :key="rowIndex">
                <td v-for="field in getPreviewFields(table.columns)" :key="field.key" class="p-2">
                  {{ item[field.key] || '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" /></svg>
      No tables selected for preview
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewSection',
  props: {
    selectedTables: Array,
    normalizedData: Object,
  },
  emits: ['copy', 'remove'],
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    getPreviewFields(columns) {
      return [
        { key: 'id', label: 'ID' },
        ...columns.map(col => ({ key: col.key, label: col.custom || col.key })),
      ];
    },
  },
};
</script>