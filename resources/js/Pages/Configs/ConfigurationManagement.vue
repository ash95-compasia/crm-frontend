<template>
  <div class="bg-white shadow-md rounded-lg p-4 mb-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Configuration Management</h2>
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">Save Configuration</label>
        <div class="flex gap-2">
          <input
            :value="configName"
            @input="$emit('update:configName', $event.target.value)"
            type="text"
            placeholder="Enter configuration name"
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="!selectedTables.length"
          />
          <button
            @click="$emit('save')"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center"
            :disabled="!configName || !selectedTables.length"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.865 1.128L6 10h-.5a2.5 2.5 0 00-2.5 2.5v3A2.5 2.5 0 005.5 18h9a2.5 2.5 0 002.5-2.5v-3a2.5 2.5 0 00-2.5-2.5H14l-.013-.098a1 1 0 01-.865-1.128l.74-4.435A1 1 0 0114.847 2H17a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" /></svg>
            Save
          </button>
        </div>
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">Load Configuration</label>
        <div class="flex gap-2">
          <select
            :value="selectedConfigId"
            @change="$emit('update:selectedConfigId', $event.target.value)"
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="loading"
          >
            <option :value="null" disabled>Select configuration</option>
            <option v-for="config in configurations" :key="config.value" :value="config.value">
              {{ config.text }}
            </option>
          </select>
          <button
            @click="$emit('load')"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
            :disabled="!selectedConfigId"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4.5A2.5 2.5 0 014.5 2h11A2.5 2.5 0 0118 4.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 15.5v-11zM10 13a3 3 0 100-6 3 3 0 000 6z" /></svg>
            Load
          </button>
          <button
            @click="$emit('delete')"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 flex items-center"
            :disabled="!selectedConfigId"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H3a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H6zm-1 3h10v1H5V5zm2 3v9h6V8H7zm3 1a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z" /></svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationManagement',
  props: {
    configName: String,
    selectedConfigId: [Number, String, null],
    configurations: Array,
    loading: Boolean,
    selectedTables: Array,
  },
  emits: ['update:configName', 'update:selectedConfigId', 'save', 'load', 'delete'],
};
</script>