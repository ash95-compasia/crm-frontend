<!-- components/role-management/QuickStats.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    <div class="bg-white rounded-lg p-4 shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-600">Total Roles</p>
          <p class="text-lg font-bold text-gray-900 mt-1">{{ roles.length }}</p>
        </div>
        <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-600">Active Permissions</p>
          <p class="text-lg font-bold text-gray-900 mt-1">{{ activePermissionsCount }}</p>
        </div>
        <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-600">Modules</p>
          <p class="text-lg font-bold text-gray-900 mt-1">{{ modules.length }}</p>
        </div>
        <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  roles: Array,
  modules: Array,
  activePermissionsCount: Number
})
</script>