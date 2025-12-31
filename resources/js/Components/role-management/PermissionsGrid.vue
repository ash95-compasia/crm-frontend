<!-- components/role-management/PermissionsGrid.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <!-- Bulk Actions -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button @click="selectAll('create')" class="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">All Create</button>
      <button @click="selectAll('read')" class="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">All Read</button>
      <button @click="selectAll('update')" class="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">All Update</button>
      <button @click="selectAll('delete')" class="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">All Delete</button>
      <button @click="clearAll" class="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">Clear All</button>
    </div>

    <!-- Modules -->
    <div class="space-y-4">
      <PermissionModule
        v-for="module in modules"
        :key="module.id"
        :module="module"
        :permissions="currentPermissions"
        @update:permission="updatePermission"
      />
    </div>

    <!-- Save Button -->
    <div class="mt-8 pt-6 border-t border-gray-200 flex justify-end">
      <button
        @click="$emit('save')"
        class="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        Save Permissions
      </button>
    </div>
  </div>
</template>

<script setup>
import PermissionModule from './PermissionModule.vue'

const props = defineProps({
  modules: Array,
  currentPermissions: Object
})

const emit = defineEmits(['update:currentPermissions', 'save'])

const currentPermissions = defineModel('currentPermissions', { type: Object, default: () => ({}) })

const bits = { create: 1, read: 2, update: 4, delete: 8 }

const updatePermission = ({ moduleId, permissionId, action, enabled }) => {
  const key = `${moduleId}.${permissionId}`
  const current = currentPermissions.value[key] || 0
  const bit = bits[action]

  if (enabled) {
    currentPermissions.value[key] = current | bit
  } else {
    currentPermissions.value[key] = current & ~bit
  }

  // Clean up zero values
  if (currentPermissions.value[key] === 0) {
    delete currentPermissions.value[key]
  }

  emit('update:currentPermissions', currentPermissions.value)
}

const selectAll = (action) => {
  const bit = bits[action]
  const newPerms = { ...currentPermissions.value }

  props.modules.forEach(module => {
    module.permissions.forEach(perm => {
      const key = `${module.id}.${perm.id}`
      newPerms[key] = (newPerms[key] || 0) | bit
    })
  })

  currentPermissions.value = newPerms
  emit('update:currentPermissions', newPerms)
}

const clearAll = () => {
  currentPermissions.value = {}
  emit('update:currentPermissions', {})
}
</script>