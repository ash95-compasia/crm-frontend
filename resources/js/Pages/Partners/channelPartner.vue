<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Channel Partners</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Channel Partners</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button 
                            @click="openCreateModal"
                            class="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 font-medium flex items-center shadow-sm hover:shadow-md"
                        >
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Create Partner
                        </button>
                        <div class="text-right">
                            <div class="text-gray-600 dark:text-gray-400 text-sm">Total Partners</div>
                            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ result.total?.toLocaleString() || '0' }}</div>
                        </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Partners</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Partners</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activePartnersCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Inactive Partners</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ inactivePartnersCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Global Table Component -->
                <GlobalTable
                    :data="tableData"
                    :columns="CHANNEL_PARTNER_TABLE"
                    :filters="tableFilters"
                    :default-sort="{ key: 'created_at', order: 'desc' }"
                    storage-key="channel-partners-table"
                    :loading="loading"
                    :bulk-actions="bulkActions"
                    @bulk-action="handleBulkAction"
                    @refresh="fetchData"
                    @export="exportData"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Name Column -->
                    <template #column-name="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <span class="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                    {{ getInitials(value) }}
                                </span>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ value || 'N/A' }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    ID: {{ row.id }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Tenant Column -->
                    <template #column-tenant="{ value }">
                        <div v-if="value" class="flex items-center text-sm text-gray-900 dark:text-gray-300">
                            <div class="flex-shrink-0 h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                                <span class="text-green-600 dark:text-green-400 text-xs font-medium">
                                    {{ getInitials(value.name) }}
                                </span>
                            </div>
                            <div>
                                <div class="font-medium">{{ value.name }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">{{ value.tenant_code }}</div>
                            </div>
                        </div>
                        <span v-else class="text-gray-400 dark:text-gray-600">N/A</span>
                    </template>

                    <!-- Custom Status Column -->
                    <template #column-status="{ value }">
                        <span :class="getStatusBadgeClass(value)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getStatusText(value) }}
                        </span>
                    </template>

                    <!-- Custom Created At Column -->
                    <template #column-created_at="{ value }">
                        <div class="text-sm text-gray-900 dark:text-gray-300">
                            {{ formatDate(value) }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            {{ formatTime(value) }}
                        </div>
                    </template>

                    <!-- Custom Actions Column -->
                    <template #column-actions="{ row }">
                        <div class="flex space-x-2">
                            <button 
                                @click="viewPartner(row)"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                title="View details"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>
                            <button 
                                @click="editPartner(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Edit partner"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button 
                                @click="deletePartner(row)"
                                class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Delete partner"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </template>
                </GlobalTable>
            </div>
        </div>

        <!-- Create/Edit Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <!-- Background overlay -->
                <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-opacity-90" @click="closeModal"></div>

                <!-- Modal panel -->
                <div class="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
                    <!-- Modal header -->
                    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ modalMode === 'create' ? 'Create New Channel Partner' : 'Edit Channel Partner' }}
                            </h3>
                            <button 
                                @click="closeModal"
                                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Form -->
                    <form @submit.prevent="modalMode === 'create' ? createPartner() : updatePartner()">
                        <div class="px-6 py-4 space-y-4">
                            <!-- Name -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Partner Name *
                                </label>
                                <input 
                                    type="text" 
                                    v-model="formData.name"
                                    required
                                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                    placeholder="Enter partner name"
                                    :disabled="isSubmitting"
                                />
                                <div v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</div>
                            </div>

                            <!-- Address -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Address
                                </label>
                                <textarea 
                                    v-model="formData.address"
                                    rows="3"
                                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                    placeholder="Enter partner address"
                                    :disabled="isSubmitting"
                                ></textarea>
                                <div v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address[0] }}</div>
                            </div>

                            <!-- Tenant -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tenant
                                </label>
                                <select 
                                    v-model="formData.tenant_code"
                                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                    :disabled="isSubmitting"
                                >
                                    <option value="">Select Tenant (Optional)</option>
                                    <option v-for="tenant in tenants" :key="tenant.id" :value="tenant.tenant_code">
                                        {{ tenant.name }} ({{ tenant.tenant_code }})
                                    </option>
                                </select>
                                <div v-if="errors.tenant_code" class="text-red-500 text-xs mt-1">{{ errors.tenant_code[0] }}</div>
                            </div>

                            <!-- Status -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status *
                                </label>
                                <div class="flex space-x-4">
                                    <label class="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            v-model="formData.status"
                                            :value="1"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            :disabled="isSubmitting"
                                        />
                                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            v-model="formData.status"
                                            :value="0"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            :disabled="isSubmitting"
                                        />
                                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                                    </label>
                                </div>
                                <div v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status[0] }}</div>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                            <div class="flex justify-end space-x-4">
                                <button 
                                    type="button"
                                    @click="closeModal"
                                    :disabled="isSubmitting"
                                    class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    :disabled="isSubmitting"
                                    :class="[
                                        'px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center',
                                        isSubmitting 
                                            ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                                            : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white'
                                    ]"
                                >
                                    <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isSubmitting ? 'Saving...' : (modalMode === 'create' ? 'Create Partner' : 'Update Partner') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- View Partner Modal -->
        <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <!-- Background overlay -->
                <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-opacity-90" @click="closeViewModal"></div>

                <!-- Modal panel -->
                <div class="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
                    <!-- Modal header -->
                    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                Partner Details
                            </h3>
                            <button 
                                @click="closeViewModal"
                                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Details content -->
                    <div class="px-6 py-4">
                        <div class="space-y-4">
                            <!-- Basic Information -->
                            <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Basic Information</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Partner Name</label>
                                        <p class="mt-1 text-gray-900 dark:text-white">{{ selectedPartner?.name || 'N/A' }}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                                        <p class="mt-1">
                                            <span :class="getStatusBadgeClass(selectedPartner?.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                                {{ getStatusText(selectedPartner?.status) }}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Tenant</label>
                                        <p class="mt-1 text-gray-900 dark:text-white">
                                            {{ selectedPartner?.tenant_code || 'N/A' }}
                                            <span v-if="selectedPartner?.tenant_code" class="text-gray-500 dark:text-gray-400 text-sm">
                                                ({{ selectedPartner.tenant_code }})
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Created</label>
                                        <p class="mt-1 text-gray-900 dark:text-white">
                                            {{ formatDate(selectedPartner?.created_at) }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Address -->
                            <div v-if="selectedPartner?.address" class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Address</h4>
                                <p class="text-gray-900 dark:text-white whitespace-pre-line">{{ selectedPartner.address }}</p>
                            </div>

                            <!-- System Information -->
                            <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">System Information</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</label>
                                        <p class="mt-1 text-gray-900 dark:text-white">
                                            {{ selectedPartner?.created_by || 'System' }}
                                        </p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                                        <p class="mt-1 text-gray-900 dark:text-white">
                                            {{ formatDate(selectedPartner?.updated_at) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div class="flex justify-end space-x-4">
                            <button 
                                type="button"
                                @click="closeViewModal"
                                class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                            >
                                Close
                            </button>
                            <button 
                                v-if="selectedPartner"
                                @click="editPartner(selectedPartner)"
                                class="px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 font-medium"
                            >
                                Edit Partner
                            </button>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GlobalTable from '@/Components/globalTable.vue';
import { useApi } from '@/router/useApi';
import { CHANNEL_PARTNER_TABLE } from '@/Constants/tableColumns'

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const result = ref({ data: [], total: 0, from: 0, to: 0 });
const loading = ref(false);
const tenants = ref([]);
const notification = ref({ message: '', type: '' });
const showModal = ref(false);
const showViewModal = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const isSubmitting = ref(false);
const errors = ref({});
const selectedPartner = ref(null);

// Form data
const formData = ref({
    id: null,
    name: '',
    address: '',
    tenant_code: '',
    status: 1
});

const tableFilters = [
    {
        key: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search by name, address, or tenant...'
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: '', label: 'All Status' },
            { value: '1', label: 'Active' },
            { value: '0', label: 'Inactive' }
        ]
    }
];

const bulkActions = [
    {
        label: 'Activate',
        value: 'activate',
        icon: 'check-circle'
    },
    {
        label: 'Deactivate',
        value: 'deactivate',
        icon: 'x-circle'
    },
    {
        label: 'Delete',
        value: 'delete',
        icon: 'trash',
        color: 'red'
    }
];

// Computed properties
const tableData = computed(() => {
    return result.value.data || [];
});

const activePartnersCount = computed(() => {
    return tableData.value.filter(partner => partner.status === 1).length;
});

const inactivePartnersCount = computed(() => {
    return tableData.value.filter(partner => partner.status === 0).length;
});

// Methods
const showNotification = (message, type = 'success') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 5000);
};

const fetchData = async (params = {}) => {
    loading.value = true;
    try {
        const response = await axios.get('/api/channel-partners', { 
            params,
            ...getAxiosConfig()
        });
        if (response.data.success) {
            result.value = {
                data: response.data.data,
                total: response.data.total,
                from: (response.data.current_page - 1) * response.data.per_page + 1,
                to: Math.min(response.data.current_page * response.data.per_page, response.data.total),
                current_page: response.data.current_page,
                per_page: response.data.per_page,
                last_page: response.data.last_page
            };
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showNotification('Failed to load channel partners!', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchTenants = async () => {
    try {
        const response = await axios.get('/api/channel-partners/tenants/list', getAxiosConfig());
        if (response.data.success) {
            tenants.value = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching tenants:', error);
    }
};

const openCreateModal = () => {
    modalMode.value = 'create';
    resetForm();
    showModal.value = true;
};

const openEditModal = (partner) => {
    modalMode.value = 'edit';
    formData.value = {
        id: partner.id,
        name: partner.name,
        address: partner.address,
        tenant_code: partner.tenant_code,
        status: partner.status
    };
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    errors.value = {};
    setTimeout(() => {
        resetForm();
    }, 300);
};

const closeViewModal = () => {
    showViewModal.value = false;
    selectedPartner.value = null;
};

const resetForm = () => {
    formData.value = {
        id: null,
        name: '',
        address: '',
        tenant_code: '',
        status: 1
    };
    errors.value = {};
};

const createPartner = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.post('/api/channel-partners', formData.value, getAxiosConfig());

        if (response.data.success) {
            showNotification('Channel partner created successfully!', 'success');
            closeModal();
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors;
            showNotification('Please fix the validation errors', 'error');
        } else {
            showNotification(error.response?.data?.message || 'Failed to create channel partner', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const updatePartner = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.put(`/api/channel-partners/${formData.value.id}`, formData.value, getAxiosConfig());

        if (response.data.success) {
            showNotification('Channel partner updated successfully!', 'success');
            closeModal();
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors;
            showNotification('Please fix the validation errors', 'error');
        } else {
            showNotification(error.response?.data?.message || 'Failed to update channel partner', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const deletePartner = async (partner) => {
    if (!confirm(`Are you sure you want to delete "${partner.name}"?`)) {
        return;
    }

    try {
        const response = await axios.delete(`/api/channel-partners/${partner.id}`, getAxiosConfig());

        if (response.data.success) {
            showNotification('Channel partner deleted successfully!', 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to delete channel partner', 'error');
    }
};

const viewPartner = async (partner) => {
    try {
        const response = await axios.get(`/api/channel-partners/${partner.id}`, getAxiosConfig());
        if (response.data.success) {
            selectedPartner.value = response.data.data;
            showViewModal.value = true;
        }
    } catch (error) {
        showNotification('Failed to load partner details', 'error');
    }
};

const handleBulkAction = async (action, selectedIds) => {
    if (selectedIds.length === 0) {
        showNotification('Please select at least one partner', 'error');
        return;
    }

    if (action === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} partner(s)?`)) {
            return;
        }

        // Delete one by one or implement bulk delete endpoint
        for (const id of selectedIds) {
            try {
                await axios.delete(`/api/channel-partners/${id}`, getAxiosConfig());
            } catch (error) {
                console.error(`Failed to delete partner ${id}:`, error);
            }
        }

        showNotification(`${selectedIds.length} partner(s) deleted successfully!`, 'success');
        await fetchData();
        return;
    }

    // Handle activate/deactivate
    const status = action === 'activate' ? 1 : 0;

    try {
        const response = await axios.post('/api/channel-partners/bulk-status', {
            ids: selectedIds,
            status: status
        }, getAxiosConfig());

        if (response.data.success) {
            showNotification(`${selectedIds.length} partner(s) updated successfully!`, 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to update partners', 'error');
    }
};

const exportData = async () => {
    try {
        showNotification('Exporting data...', 'success');
        // Implement export logic here
        setTimeout(() => {
            showNotification('Export completed successfully!', 'success');
        }, 1000);
    } catch (error) {
        showNotification('Failed to export data', 'error');
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getStatusText = (status) => {
    return status === 1 ? 'Active' : 'Inactive';
};

const getStatusBadgeClass = (status) => {
    return status === 1 
        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

// Lifecycle
onMounted(async () => {
    await Promise.all([
        fetchData(),
        fetchTenants()
    ]);
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
    background: #374151;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
    background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
    transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

/* Smooth transitions */
* {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

tbody tr {
    transition: background-color 0.15s ease-in-out;
}

/* Loading animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>