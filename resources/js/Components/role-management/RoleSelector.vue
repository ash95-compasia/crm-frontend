<!-- components/role-management/RoleSelector.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 class="text-lg font-bold text-gray-900">Permission Management</h2>

      <div class="flex flex-col sm:flex-row gap-3">
        <select
          v-model="selectedRoleId"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>

        <select
          v-if="selectedRole?.tenants?.length"
          v-model="selectedTenantId"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Tenant</option>
          <option v-for="tenant in selectedRole.tenants" :key="tenant.id" :value="tenant.id">
            {{ tenant.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- No tenants warning -->
    <div v-if="selectedRole && selectedRole.tenants?.length === 0" class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p class="text-sm text-yellow-800">
        No tenants assigned.
        <button
          @click="$emit('edit-role', selectedRole)"
          class="font-medium underline hover:text-yellow-900 ml-1"
        >
          Assign tenants
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Fix: Properly define props
const props = defineProps({
  roles: {
    type: Array,
    required: true,
    default: () => []
  },
  selectedRoleId: {
    type: [String, Number],
    default: ''
  },
  selectedTenantId: {
    type: [String, Number],
    default: ''
  }
})

// Two-way binding with v-model support
const selectedRoleId = defineModel('selectedRoleId', { required: true })
const selectedTenantId = defineModel('selectedTenantId', { required: true })

const emit = defineEmits(['edit-role'])

// Now this works — using `props.roles`
const selectedRole = computed(() => {
  return props.roles.find(r => r.id === selectedRoleId.value) || null
})
</script>