<!-- RoleManagement.vue -->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
    <!-- Main Content -->
    <div class="w-full p-4 lg:p-6">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div>
              <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Role Management</h1>
              <!-- Breadcrumb -->
              <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                <router-link to="/dashboard" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Dashboard
                </router-link>
                <span class="text-gray-400 dark:text-gray-600">/</span>
                <span class="text-gray-900 dark:text-gray-300 font-medium">Roles</span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-gray-600 dark:text-gray-400 text-sm">Total Roles</div>
            <div class="text-xl font-bold text-green-600 dark:text-green-400">{{ roles.length }}</div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Total Roles</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ roles.length }}</p>
              </div>
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Total Modules</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ modules.length }}</p>
              </div>
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Active Permissions</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ activePermissionsCount }}</p>
              </div>
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Total Tenants</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ allTenants.length }}</p>
              </div>
              <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Left Column: Role Management -->
          <div class="space-y-4">
            <!-- Role Form Card -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="font-medium text-gray-900 dark:text-white">
                  {{ editingRole ? 'Edit Role' : 'Create New Role' }}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure role details and tenant assignments</p>
              </div>
              <div class="p-4">
                <form @submit.prevent="saveRole" class="space-y-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role Name <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="roleForm.name"
                      type="text"
                      required
                      placeholder="e.g., Administrator"
                      class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      v-model="roleForm.description"
                      rows="2"
                      placeholder="Brief description of the role..."
                      class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Assign to Tenants <span class="text-red-500">*</span>
                    </label>
                    <div class="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                      <div v-for="tenant in allTenants" :key="tenant.id" class="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <label class="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            :value="tenant.id"
                            v-model="roleForm.tenant_ids"
                            class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                          />
                          <span class="text-sm text-gray-700 dark:text-gray-300">{{ tenant.name }}</span>
                          <span class="text-xs text-gray-500 dark:text-gray-400">({{ tenant.tenant_code }})</span>
                        </label>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ roleForm.tenant_ids.length }} tenant(s) selected</p>
                  </div>
                  <div class="flex space-x-2 pt-2">
                    <button
                      v-if="editingRole"
                      type="button"
                      @click="cancelEdit"
                      class="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="flex-1 px-3 py-2 text-sm bg-green-600 dark:bg-green-700 text-white font-medium rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="isSubmitting" class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                      <span v-else>{{ editingRole ? 'Update Role' : 'Create Role' }}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Quick Actions Card -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h4>
              <div class="space-y-2">
                <button
                  @click="exportRoles"
                  class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md flex items-center space-x-2 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Export Roles Configuration</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Permissions Management -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Role and Tenant Selector -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Select Role</label>
                  <div class="flex space-x-2">
                    <select
                      v-model="selectedRoleId"
                      class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a role...</option>
                      <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{ role.name }}
                      </option>
                    </select>
                    <button
                      v-if="selectedRoleId"
                      @click="editSelectedRole"
                      class="px-3 py-2 text-sm bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                      title="Edit selected role"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-if="selectedRole">
                  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Select Tenant</label>
                  <select
                    v-model="selectedTenantId"
                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a tenant...</option>
                    <option v-for="tenant in selectedRole.tenants" :key="tenant.id" :value="tenant.id">
                      {{ tenant.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div v-if="selectedRole" class="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ selectedRole.name }}</span>
                  <span class="text-gray-500">•</span>
                  <span>{{ selectedRole.description || 'No description' }}</span>
                  <span class="text-gray-500">•</span>
                  <span>{{ selectedRole.tenants?.length || 0 }} tenant(s)</span>
                </div>
              </div>
            </div>

            <!-- Permissions Management -->
            <div v-if="selectedRole && selectedTenantId" class="space-y-4">
              <!-- Quick Permission Actions -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
                <div class="flex flex-wrap gap-2">
                  <button @click="selectAll('create')" class="px-3 py-1.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-800">
                    Grant All Create
                  </button>
                  <button @click="selectAll('read')" class="px-3 py-1.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors border border-green-200 dark:border-green-800">
                    Grant All Read
                  </button>
                  <button @click="selectAll('update')" class="px-3 py-1.5 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors border border-yellow-200 dark:border-yellow-800">
                    Grant All Update
                  </button>
                  <button @click="selectAll('delete')" class="px-3 py-1.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors border border-red-200 dark:border-red-800">
                    Grant All Delete
                  </button>
                  <button @click="clearAll" class="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600">
                    Clear All
                  </button>
                </div>
              </div>

              <!-- Modules and Permissions Grid -->
              <div class="space-y-3">
                <div
                  v-for="module in modules"
                  :key="module.id"
                  class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
                >
                  <div
                    class="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    @click="toggleModule(module.id)"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 transform transition-transform" :class="{ 'rotate-90': expandedModules[module.id] }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ module.name }}</h4>
                        <span class="text-xs text-gray-500 dark:text-gray-400">({{ module.permissions.length }})</span>
                      </div>
                      <div class="flex items-center space-x-4">
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                          {{ getModulePermissionCount(module) }} permission(s) granted
                        </span>
                      </div>
                    </div>
                  </div>
                  <div v-if="expandedModules[module.id]" class="p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div
                        v-for="permission in module.permissions"
                        :key="permission.id"
                        class="border border-gray-200 dark:border-gray-700 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div class="flex items-center justify-between mb-2">
                          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ permission.name }}</span>
                          <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {{ permission.id }}
                          </span>
                        </div>
                        <div class="flex items-center space-x-3">
                          <label v-for="action in ['create', 'read', 'update', 'delete']" :key="action" class="flex items-center space-x-1 cursor-pointer">
                            <input
                              type="checkbox"
                              :checked="hasPermission(module.id, permission.id, action)"
                              @change="togglePermission(module.id, permission.id, action, $event.target.checked)"
                              class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                            />
                            <span class="text-xs text-gray-600 dark:text-gray-400 capitalize">{{ action }}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Save Permissions Button -->
              <div class="sticky bottom-4 z-10">
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                  <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ getTotalGrantedPermissions() }} permission(s) granted for this tenant
                    </div>
                    <button
                      @click="savePermissions"
                      :disabled="isSavingPermissions"
                      class="px-4 py-2 bg-green-600 dark:bg-green-700 text-white font-medium rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="isSavingPermissions" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                      <span v-else>Save Permissions</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-8 text-center">
              <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {{ selectedRole ? 'Select a Tenant' : 'Select a Role' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ selectedRole ? 'Choose a tenant to manage permissions for this role' : 'Choose a role to configure permissions' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <div
      v-if="notification.message"
      :class="[
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 z-50 border',
        notification.type === 'success'
          ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800'
      ]"
    >
      <div class="flex items-center">
        <svg
          v-if="notification.type === 'success'"
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg
          v-else
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="text-sm">{{ notification.message }}</span>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useApi } from '@/router/useApi';
const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const roles = ref([]);
const modules = ref([]);
const allTenants = ref([]);
const selectedRoleId = ref('');
const selectedTenantId = ref('');
const currentPermissions = ref({});
const expandedModules = ref({});
const editingRole = ref(null);
const isSubmitting = ref(false);
const isSavingPermissions = ref(false);
const notification = ref({ message: '', type: '' });

// Form state
const roleForm = ref({
  name: '',
  description: '',
  tenant_ids: []
});

// Permission bits mapping
const permissionBits = {
  create: 1,
  read: 2,
  update: 4,
  delete: 8
};

// Standardized slugify — enforces kebab-case with hyphens
const slugifyChild = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Computed properties
const selectedRole = computed(() => {
  return roles.value.find(r => r.id === selectedRoleId.value) || null;
});

const activePermissionsCount = computed(() => {
  let count = 0;
  roles.value.forEach(role => {
    role.tenants?.forEach(tenant => {
      const permissions = tenant.pivot?.permissions || {};
      Object.values(permissions).forEach(value => {
        let n = value;
        while (n) {
          count += n & 1;
          n >>= 1;
        }
      });
    });
  });
  return count;
});

// Methods
const showNotification = (message, type = 'success') => {
  notification.value = { message, type };
  setTimeout(() => {
    notification.value = { message: '', type: '' };
  }, 5000);
};

// Fetch data
const fetchRoles = async () => {
  try {
    const response = await axios.get('/api/landlord/roles', getAxiosConfig());
    roles.value = response.data;
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    showNotification('Failed to load roles', 'error');
  }
};

const fetchModules = async () => {
  try {
    const response = await axios.get('/api/landlord/nav-items/all', getAxiosConfig());
    const data = response.data;
    const newModules = [];
    const excludeLabels = ['Logout'];

    data.forEach(item => {
      if (!item.is_active || excludeLabels.includes(item.label) || item.parent_id) return;

      const moduleId = slugifyChild(item.label);
      const childItems = item.children?.filter(child => child.is_active) || [];

      if (childItems.length > 0 || item.path !== null) {
        newModules.push({
          id: moduleId,
          name: item.label,
          permissions: childItems.length > 0
            ? childItems.map(child => ({
                id: slugifyChild(child.label),
                name: child.label
              }))
            : [{
                id: moduleId,
                name: item.label
              }]
        });
      }
    });

    modules.value = newModules.filter(m => m.permissions.length > 0);

    // Auto-expand all modules
    modules.value.forEach(module => {
      expandedModules.value[module.id] = true;
    });
  } catch (error) {
    console.error('Failed to fetch modules:', error);
    showNotification('Failed to load modules', 'error');
  }
};

const fetchAllTenants = async () => {
  try {
    const response = await axios.get('/api/tenants', getAxiosConfig());
    allTenants.value = response.data;
  } catch (error) {
    console.error('Failed to fetch tenants:', error);
    showNotification('Failed to load tenants', 'error');
  }
};

const fetchPermissionsForTenant = async () => {
  if (!selectedRoleId.value || !selectedTenantId.value) {
    currentPermissions.value = {};
    return;
  }
  try {
    const response = await axios.get(
      `/api/landlord/roles/${selectedRoleId.value}/tenants/${selectedTenantId.value}/permissions`,
      getAxiosConfig()
    );
    const perms = response.data || {};

    // Normalize any underscore keys to hyphen on load
    const normalized = {};
    Object.keys(perms).forEach(key => {
      const cleanKey = key.replace(/_/g, '-');
      normalized[cleanKey] = perms[key];
    });

    currentPermissions.value = normalized;
  } catch (error) {
    console.error('Failed to fetch permissions:', error);
    showNotification('Failed to load permissions', 'error');
    currentPermissions.value = {};
  }
};

// Role management
const saveRole = async () => {
  if (roleForm.value.tenant_ids.length === 0) {
    showNotification('Please select at least one tenant', 'error');
    return;
  }
  isSubmitting.value = true;
  try {
    const payload = {
      name: roleForm.value.name,
      description: roleForm.value.description,
      tenant_ids: roleForm.value.tenant_ids
    };
    if (editingRole.value) {
      await axios.put(`/api/landlord/roles/${editingRole.value.id}`, payload, getAxiosConfig());
      showNotification('Role updated successfully');
    } else {
      await axios.post('/api/landlord/roles', payload, getAxiosConfig());
      showNotification('Role created successfully');
    }
    await fetchRoles();
    resetRoleForm();
  } catch (error) {
    console.error('Failed to save role:', error);
    showNotification('Failed to save role', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const resetRoleForm = () => {
  roleForm.value = { name: '', description: '', tenant_ids: [] };
  editingRole.value = null;
};

const cancelEdit = () => {
  resetRoleForm();
};

const editSelectedRole = () => {
  const role = roles.value.find(r => r.id === selectedRoleId.value);
  if (role) {
    editingRole.value = role;
    roleForm.value = {
      name: role.name,
      description: role.description || '',
      tenant_ids: role.tenants?.map(t => t.id) || []
    };
  }
};

const exportRoles = () => {
  showNotification('Export feature coming soon', 'info');
};

// Permission management - with key normalization
const hasPermission = (moduleId, permissionId, action) => {
  const key = `${moduleId}.${permissionId}`.replace(/_/g, '-');
  const current = currentPermissions.value[key] || 0;
  const bit = permissionBits[action];
  return (current & bit) !== 0;
};

const togglePermission = (moduleId, permissionId, action, enabled) => {
  const rawKey = `${moduleId}.${permissionId}`;
  const key = rawKey.replace(/_/g, '-');

  let current = currentPermissions.value[key] || 0;
  const bit = permissionBits[action];

  if (enabled) {
    current |= bit;
  } else {
    current &= ~bit;
  }

  if (current === 0) {
    delete currentPermissions.value[key];
    if (rawKey !== key) delete currentPermissions.value[rawKey];
  } else {
    currentPermissions.value[key] = current;
    if (rawKey !== key) delete currentPermissions.value[rawKey];
  }

  currentPermissions.value = { ...currentPermissions.value };
};

const selectAll = (action) => {
  const bit = permissionBits[action];
  const newPerms = { ...currentPermissions.value };
  modules.value.forEach(module => {
    module.permissions.forEach(permission => {
      const key = `${module.id}.${permission.id}`.replace(/_/g, '-');
      newPerms[key] = (newPerms[key] || 0) | bit;
    });
  });
  currentPermissions.value = newPerms;
  showNotification(`All ${action} permissions granted`, 'success');
};

const clearAll = () => {
  currentPermissions.value = {};
  showNotification('All permissions cleared', 'info');
};

const savePermissions = async () => {
  if (!selectedRoleId.value || !selectedTenantId.value) {
    showNotification('Please select a role and tenant first', 'error');
    return;
  }
  isSavingPermissions.value = true;
  try {
    await axios.put(
      `/api/landlord/roles/${selectedRoleId.value}/tenants/${selectedTenantId.value}/permissions`,
      currentPermissions.value,
      getAxiosConfig()
    );
    await fetchRoles();
    showNotification('Permissions saved successfully');
  } catch (error) {
    console.error('Failed to save permissions:', error);
    showNotification('Failed to save permissions', 'error');
  } finally {
    isSavingPermissions.value = false;
  }
};

// UI helpers
const toggleModule = (moduleId) => {
  expandedModules.value[moduleId] = !expandedModules.value[moduleId];
};

const getModulePermissionCount = (module) => {
  let count = 0;
  module.permissions.forEach(permission => {
    const key = `${module.id}.${permission.id}`.replace(/_/g, '-');
    if (currentPermissions.value[key] > 0) count++;
  });
  return count;
};

const getTotalGrantedPermissions = () => {
  return Object.keys(currentPermissions.value).length;
};

// Watchers
watch(selectedRoleId, (newId) => {
  if (newId) {
    selectedTenantId.value = selectedRole.value?.tenants?.[0]?.id || '';
    fetchPermissionsForTenant();
  } else {
    selectedTenantId.value = '';
    currentPermissions.value = {};
  }
});

watch(selectedTenantId, fetchPermissionsForTenant);

// Initialize expanded modules when modules load
watch(
  () => modules.value.length,
  (newLength) => {
    if (newLength > 0) {
      modules.value.forEach(module => {
        expandedModules.value[module.id] = true;
      });
    }
  },
  { immediate: true }
);

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchRoles(),
    fetchModules(),
    fetchAllTenants()
  ]);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.font-inter { font-family: 'Inter', sans-serif; }
* { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
.dark ::-webkit-scrollbar-track { background: #374151; }
::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 3px; }
.dark ::-webkit-scrollbar-thumb { background: #4b5563; }
::-webkit-scrollbar-thumb:hover { background: #a0a0a0; }
.dark ::-webkit-scrollbar-thumb:hover { background: #6b7280; }
.rotate-90 { transform: rotate(90deg); }
.sticky { backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
input, select, textarea { font-size: 0.875rem; }
input[type="checkbox"] { width: 1rem; height: 1rem; }
</style>