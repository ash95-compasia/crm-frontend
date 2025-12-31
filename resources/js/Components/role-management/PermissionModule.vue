<!-- components/role-management/PermissionModule.vue -->
<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div class="bg-gray-50 px-4 py-3 border-b">
      <h3 class="font-medium text-gray-900">{{ module.name }}</h3>
    </div>
    <div class="p-4 space-y-3">
      <div
        v-for="permission in module.permissions"
        :key="permission.id"
        class="flex items-center justify-between text-sm"
      >
        <span class="text-gray-700">{{ permission.name }}</span>
        <div class="flex gap-1">
          <button
            v-for="action in actions"
            :key="action"
            @click="toggle(module.id, permission.id, action)"
            :class="[
              'w-8 h-8 rounded text-xs font-medium border transition-all',
              hasPermission(module.id, permission.id, action)
                ? colorMap[action]
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            ]"
            :title="action.charAt(0).toUpperCase() + action.slice(1)"
          >
            {{ action[0].toUpperCase() }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  module: Object,
  permissions: Object
})

const emit = defineEmits(['update:permission'])

const actions = ['create', 'read', 'update', 'delete']
const bits = { create: 1, read: 2, update: 4, delete: 8 }

const colorMap = {
  create: 'bg-blue-500 text-white border-blue-600',
  read: 'bg-green-500 text-white border-green-600',
  update: 'bg-yellow-500 text-white border-yellow-600',
  delete: 'bg-red-500 text-white border-red-600'
}

const hasPermission = (moduleId, permissionId, action) => {
  const key = `${moduleId}.${permissionId}`
  const value = props.permissions[key] || 0
  return (value & bits[action]) !== 0
}

const toggle = (moduleId, permissionId, action) => {
  const enabled = !hasPermission(moduleId, permissionId, action)
  emit('update:permission', { moduleId, permissionId, action, enabled })
}
</script>