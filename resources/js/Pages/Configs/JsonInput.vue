<template>
  <div class="bg-white shadow-md rounded-lg p-4 mb-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">JSON Input</h2>
    <div v-for="(input, index) in jsonInputs" :key="input.id" class="mb-4">
      <div class="flex items-center gap-2">
        <textarea
          v-model="input.value"
          placeholder="Paste your JSON here"
          rows="6"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': jsonInputStates[input.id] === false, 'border-green-500': jsonInputStates[input.id] === true }"
        ></textarea>
        <button
          v-if="jsonInputs.length > 1"
          @click="$emit('remove-json', input.id)"
          class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
        </button>
      </div>
    </div>
    <div class="flex gap-2">
      <button
        @click="$emit('add-json')"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>
        Add JSON Input
      </button>
      <button
        @click="$emit('parse')"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        :disabled="loading || !jsonInputs.some(input => input.value.trim())"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
        Parse JSON
      </button>
      <button
        @click="$emit('clear')"
        class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
        Clear
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonInput',
  props: {
    jsonInputs: Array,
    loading: Boolean,
    jsonInputStates: Object,
  },
  emits: ['update:jsonInputs', 'parse', 'clear', 'add-json', 'remove-json'],
};
</script>