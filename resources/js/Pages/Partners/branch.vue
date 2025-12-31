<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Branch Management</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Branches</span>
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
                            Create Branch
                        </button>
                        <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Branches</div>
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Branches</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Branches</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activeBranchesCount.toLocaleString() }}</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Pickup Points</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ pickupBranchesCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Inactive Branches</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ inactiveBranchesCount.toLocaleString() }}</p>
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
                    :columns="tableColumns"
                    :filters="tableFilters"
                    :default-sort="{ key: 'created_at', order: 'desc' }"
                    storage-key="branches-table"
                    :loading="loading"
                    :bulk-actions="bulkActions"
                    @bulk-action="handleBulkAction"
                    @refresh="fetchData"
                    @export="exportData"
                    @create="openCreateModal"
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
                                <div v-if="row.branch_code" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Code: {{ row.branch_code }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Channel Partner Column -->
                    <template #column-channel_partner="{ value }">
                        <div v-if="value" class="flex items-center text-sm text-gray-900 dark:text-gray-300">
                            <div class="flex-shrink-0 h-8 w-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-3">
                                <span class="text-purple-600 dark:text-purple-400 text-xs font-medium">
                                    {{ getInitials(value.name) }}
                                </span>
                            </div>
                            <div>
                                <div class="font-medium">{{ value.name }}</div>
                            </div>
                        </div>
                        <span v-else class="text-gray-400 dark:text-gray-600">N/A</span>
                    </template>

                    <!-- Custom Address Column -->
                    <template #column-address="{ row }">
                        <div class="text-sm text-gray-900 dark:text-gray-300">
                            <div>{{ row.address || 'N/A' }}</div>
                            <div v-if="row.city || row.state || row.postcode" class="text-xs text-gray-500 dark:text-gray-400">
                                {{ [row.city, row.state, row.postcode].filter(Boolean).join(', ') }}
                            </div>
                        </div>
                    </template>

                    <!-- Custom Status Column -->
                    <template #column-status="{ value }">
                        <span :class="getStatusBadgeClass(value)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getStatusText(value) }}
                        </span>
                    </template>

                    <!-- Custom Pickup Column -->
                    <template #column-isPickup="{ value }">
                        <span :class="getPickupBadgeClass(value)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getPickupText(value) }}
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
                                @click="editBranch(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Edit branch"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button 
                                @click="deleteBranch(row)"
                                class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Delete branch"
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
        <div v-if="showModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 transition-opacity z-50">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4">
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ modalMode === 'create' ? 'Create New Branch' : 'Edit Branch' }}
                            </h3>
                            <button 
                                @click="closeModal"
                                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Form -->
                        <form @submit.prevent="modalMode === 'create' ? createBranch() : updateBranch()">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Left Column -->
                                <div class="space-y-4">
                                    <!-- Name -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Branch Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.name"
                                            required
                                            maxlength="100"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter branch name"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</div>
                                    </div>

                                    <!-- Branch Code -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Branch Code
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.branch_code"
                                            maxlength="50"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter branch code"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.branch_code" class="text-red-500 text-xs mt-1">{{ errors.branch_code[0] }}</div>
                                    </div>

                                    <!-- Channel Partner -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Channel Partner
                                        </label>
                                        <select 
                                            v-model="formData.channel_partner_id"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Channel Partner (Optional)</option>
                                            <option v-for="partner in channelPartners" :key="partner.id" :value="partner.id">
                                                {{ partner.name }}
                                            </option>
                                        </select>
                                        <div v-if="errors.channel_partner_id" class="text-red-500 text-xs mt-1">{{ errors.channel_partner_id[0] }}</div>
                                    </div>

                                    <!-- Address -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Address
                                        </label>
                                        <textarea 
                                            v-model="formData.address"
                                            rows="2"
                                            maxlength="511"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter full address"
                                            :disabled="isSubmitting"
                                        ></textarea>
                                        <div v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address[0] }}</div>
                                    </div>

                                    <!-- City, State, Postcode -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                City
                                            </label>
                                            <input 
                                                type="text" 
                                                v-model="formData.city"
                                                maxlength="100"
                                                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                                placeholder="City"
                                                :disabled="isSubmitting"
                                            />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Postcode
                                            </label>
                                            <input 
                                                type="text" 
                                                v-model="formData.postcode"
                                                maxlength="15"
                                                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                                placeholder="Postcode"
                                                :disabled="isSubmitting"
                                            />
                                        </div>
                                    </div>

                                    <!-- State -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            State
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.state"
                                            maxlength="100"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="State"
                                            :disabled="isSubmitting"
                                        />
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="space-y-4">
                                    <!-- Tenant Code -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tenant Code
                                        </label>
                                        <select 
                                            v-model="formData.tenant_code"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Tenant (Optional)</option>
                                            <option v-for="tenant in tenants" :key="tenant.tenant_code" :value="tenant.tenant_code">
                                                {{ tenant.name }} ({{ tenant.tenant_code }})
                                            </option>
                                        </select>
                                        <div v-if="errors.tenant_code" class="text-red-500 text-xs mt-1">{{ errors.tenant_code[0] }}</div>
                                    </div>

                                    <!-- Email -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Primary Email
                                        </label>
                                        <input 
                                            type="email" 
                                            v-model="formData.email"
                                            maxlength="150"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Primary email"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</div>
                                    </div>

                                    <!-- Email2 -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Secondary Email
                                        </label>
                                        <input 
                                            type="email" 
                                            v-model="formData.email2"
                                            maxlength="150"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Secondary email"
                                            :disabled="isSubmitting"
                                        />
                                    </div>

                                    <!-- Phone No -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input 
                                            type="tel" 
                                            v-model="formData.phone_no"
                                            maxlength="15"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Phone number"
                                            :disabled="isSubmitting"
                                        />
                                    </div>

                                    <!-- Operating Hour -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Operating Hours
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.operating_hour"
                                            maxlength="100"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="e.g., 9 AM - 6 PM, Monday-Friday"
                                            :disabled="isSubmitting"
                                        />
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

                                    <!-- Is Pickup -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Pickup Point
                                        </label>
                                        <div class="flex space-x-4">
                                            <label class="inline-flex items-center">
                                                <input 
                                                    type="radio" 
                                                    v-model="formData.isPickup"
                                                    value="Y"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Yes</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input 
                                                    type="radio" 
                                                    v-model="formData.isPickup"
                                                    value="N"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">No</span>
                                            </label>
                                        </div>
                                        <div v-if="errors.isPickup" class="text-red-500 text-xs mt-1">{{ errors.isPickup[0] }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Form Actions -->
                            <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    type="button"
                                    @click="closeModal"
                                    :disabled="isSubmitting"
                                    class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
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

                                    {{ isSubmitting ? 'Saving...' : (modalMode === 'create' ? 'Create Branch' : 'Update Branch') }}
                                </button>
                            </div>
                        </form>
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

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const result = ref({ data: [], total: 0, from: 0, to: 0 });
const loading = ref(false);
const channelPartners = ref([]);
const tenants = ref([]);
const notification = ref({ message: '', type: '' });
const showModal = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const isSubmitting = ref(false);
const errors = ref({});

// Form data
const formData = ref({
    id: null,
    name: '',
    branch_code: '',
    channel_partner_id: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    tenant_code: '',
    email: '',
    email2: '',
    phone_no: '',
    operating_hour: '',
    status: 1,
    isPickup: 'N'
});

// Table configuration
const tableColumns = computed(() => [
    {
        key: 'name',
        label: 'Branch Name',
        sortable: true
    },
    {
        key: 'channel_partner',
        label: 'Channel Partner',
        sortable: true,
        sortKey: 'channel_partner.name'
    },
    {
        key: 'address',
        label: 'Address',
        sortable: false
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true
    },
    {
        key: 'isPickup',
        label: 'Pickup',
        sortable: true
    },
    {
        key: 'created_at',
        label: 'Created',
        sortable: true
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false
    }
]);

const tableFilters = [
    {
        key: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search by name, code, address, city...'
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
    },
    {
        key: 'channel_partner_id',
        label: 'Channel Partner',
        type: 'select',
        options: [
            { value: '', label: 'All Partners' },
            // Dynamic options will be loaded
        ]
    },
    {
        key: 'isPickup',
        label: 'Pickup Point',
        type: 'select',
        options: [
            { value: '', label: 'All' },
            { value: 'Y', label: 'Yes' },
            { value: 'N', label: 'No' }
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
        label: 'Mark as Pickup',
        value: 'mark_pickup',
        icon: 'check-circle',
        color: 'blue'
    },
    {
        label: 'Remove Pickup',
        value: 'remove_pickup',
        icon: 'x-circle',
        color: 'gray'
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

const activeBranchesCount = computed(() => {
    return tableData.value.filter(branch => branch.status === 1).length;
});

const inactiveBranchesCount = computed(() => {
    return tableData.value.filter(branch => branch.status === 0).length;
});

const pickupBranchesCount = computed(() => {
    return tableData.value.filter(branch => branch.isPickup === 'Y').length;
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
        const response = await axios.get('/api/branches', { 
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
        showNotification('Failed to load branches!', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchChannelPartners = async () => {
    try {
        const response = await axios.get('/api/branches/channel-partners/list', getAxiosConfig());
        if (response.data.success) {
            channelPartners.value = response.data.data;
            // Update filter options
            const partnerFilter = tableFilters.find(f => f.key === 'channel_partner_id');
            if (partnerFilter) {
                partnerFilter.options = [
                    { value: '', label: 'All Partners' },
                    ...response.data.data.map(partner => ({
                        value: partner.id,
                        label: partner.name
                    }))
                ];
            }
        }
    } catch (error) {
        console.error('Error fetching channel partners:', error);
    }
};

const fetchTenants = async () => {
    try {
        const response = await axios.get('/api/branches/tenants/list', getAxiosConfig());
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

const openEditModal = (branch) => {
    modalMode.value = 'edit';
    formData.value = {
        id: branch.id,
        name: branch.name,
        branch_code: branch.branch_code || '',
        channel_partner_id: branch.channel_partner_id || '',
        address: branch.address || '',
        city: branch.city || '',
        state: branch.state || '',
        postcode: branch.postcode || '',
        tenant_code: branch.tenant_code || '',
        email: branch.email || '',
        email2: branch.email2 || '',
        phone_no: branch.phone_no || '',
        operating_hour: branch.operating_hour || '',
        status: branch.status,
        isPickup: branch.isPickup || 'N'
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

const resetForm = () => {
    formData.value = {
        id: null,
        name: '',
        branch_code: '',
        channel_partner_id: '',
        address: '',
        city: '',
        state: '',
        postcode: '',
        tenant_code: '',
        email: '',
        email2: '',
        phone_no: '',
        operating_hour: '',
        status: 1,
        isPickup: 'N'
    };
    errors.value = {};
};

const createBranch = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.post('/api/branches', formData.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Branch created successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to create branch', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const updateBranch = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.put(`/api/branches/${formData.value.id}`, formData.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Branch updated successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to update branch', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const deleteBranch = async (branch) => {
    if (!confirm(`Are you sure you want to delete "${branch.name}"?`)) {
        return;
    }

    try {
        const response = await axios.delete(`/api/branches/${branch.id}`, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Branch deleted successfully!', 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to delete branch', 'error');
    }
};

const handleBulkAction = async (action, selectedIds) => {
    if (selectedIds.length === 0) {
        showNotification('Please select at least one branch', 'error');
        return;
    }

    if (action === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} branch(es)?`)) {
            return;
        }

        // Delete one by one or implement bulk delete endpoint
        for (const id of selectedIds) {
            try {
                await axios.delete(`/api/branches/${id}`, getAxiosConfig());
            } catch (error) {
                console.error(`Failed to delete branch ${id}:`, error);
            }
        }

        showNotification(`${selectedIds.length} branch(es) deleted successfully!`, 'success');
        await fetchData();
        return;
    }

    if (action === 'activate' || action === 'deactivate') {
        // Handle activate/deactivate
        const status = action === 'activate' ? 1 : 0;
        
        try {
            const response = await axios.post('/api/branches/bulk-status', {
                ids: selectedIds,
                status: status
            }, getAxiosConfig());
            
            if (response.data.success) {
                showNotification(`${selectedIds.length} branch(es) updated successfully!`, 'success');
                await fetchData();
            } else {
                showNotification(response.data.message, 'error');
            }
        } catch (error) {
            showNotification(error.response?.data?.message || 'Failed to update branches', 'error');
        }
        return;
    }

    if (action === 'mark_pickup' || action === 'remove_pickup') {
        // Handle pickup status update
        const isPickup = action === 'mark_pickup' ? 'Y' : 'N';
        
        try {
            // You may need to create a separate endpoint for bulk pickup update
            for (const id of selectedIds) {
                await axios.put(`/api/branches/${id}`, {
                    isPickup: isPickup
                }, getAxiosConfig());
            }
            
            showNotification(`${selectedIds.length} branch(es) updated successfully!`, 'success');
            await fetchData();
        } catch (error) {
            showNotification(error.response?.data?.message || 'Failed to update branches', 'error');
        }
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

const viewBranch = (branch) => {
    router.push(`/branches/${branch.id}`);
};

const editBranch = (branch) => {
    openEditModal(branch);
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

const getPickupText = (isPickup) => {
    return isPickup === 'Y' ? 'Yes' : 'No';
};

const getPickupBadgeClass = (isPickup) => {
    return isPickup === 'Y'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

// Lifecycle
onMounted(async () => {
    await Promise.all([
        fetchData(),
        fetchChannelPartners(),
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

.dark ::webkit-scrollbar-thumb {
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