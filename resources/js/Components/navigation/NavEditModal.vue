<!-- src/components/navigation/NavEditModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="font-semibold text-gray-900">Edit Navigation Item</h2>
      </div>
      <div class="p-6 space-y-4">
        <input v-model="local.label" type="text" placeholder="Label" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
        <div class="flex space-x-4">
          <input v-model="local.path" type="text" placeholder="Path" class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <input v-model.number="local.order" type="number" placeholder="Order" class="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
        </div>
        <div class="flex space-x-3 pt-4">
          <button @click="$emit('save', local)" class="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
            Save Changes
          </button>
          <button @click="$emit('close')" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  emits: ['save', 'close'],
  data() {
    return { local: { ...this.item } }
  },
  watch: {
    item(newVal) {
      if (newVal) this.local = { ...newVal }
    }
  }
}
</script>