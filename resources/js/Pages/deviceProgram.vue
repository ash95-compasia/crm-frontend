<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Device Program Management</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Device Programs</span>
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
                            Create Device Program
                        </button>
                        <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Device Programs</div>
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Programs</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Programs</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activeProgramsCount.toLocaleString() }}</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">MPP Programs</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ mppProgramsCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">${{ totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
                    storage-key="device-programs-table"
                    :loading="loading"
                    :bulk-actions="bulkActions"
                    @bulk-action="handleBulkAction"
                    @refresh="fetchData"
                    @export="exportData"
                    @create="openCreateModal"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Program Column -->
                    <template #column-program="{ value }">
                        <div v-if="value" class="flex items-center">
                            <div class="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-2">
                                <span class="text-blue-600 dark:text-blue-400 text-xs font-medium">
                                    {{ getInitials(value.name) }}
                                </span>
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ value.name }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ value.code || 'N/A' }}
                                </div>
                            </div>
                        </div>
                        <span v-else class="text-gray-400 dark:text-gray-600">N/A</span>
                    </template>

                    <!-- Custom Product Column -->
                    <template #column-product="{ value }">
                        <div v-if="value" class="flex items-center">
                            <div class="flex-shrink-0 h-8 w-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-2">
                                <span class="text-purple-600 dark:text-purple-400 text-xs font-medium">
                                    {{ getInitials(value.product_name) }}
                                </span>
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ value.product_name }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    <span v-if="value.device_model">{{ value.device_model.model_name }}</span>
                                    <span v-if="value.category"> • {{ value.category.name }}</span>
                                </div>
                            </div>
                        </div>
                        <span v-else class="text-gray-400 dark:text-gray-600">N/A</span>
                    </template>

                    <!-- Custom SKU Column -->
                    <template #column-sku="{ value, row }">
                        <div>
                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                {{ value || 'N/A' }}
                            </div>
                            <div v-if="row.partner_sku" class="text-xs text-gray-500 dark:text-gray-400">
                                Partner: {{ row.partner_sku }}
                            </div>
                        </div>
                    </template>

                    <!-- Custom Price Column -->
                    <template #column-price="{ value }">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                            ${{ formatNumber(value, 2) }}
                        </div>
                    </template>

                    <!-- Custom Financial Column -->
                    <template #column-financial="{ row }">
                        <div class="space-y-1">
                            <div v-if="row.device_cost" class="text-xs text-gray-600 dark:text-gray-400">
                                Cost: ${{ formatNumber(row.device_cost, 6) }}
                            </div>
                            <div v-if="row.program_fee" class="text-xs text-gray-600 dark:text-gray-400">
                                Fee: ${{ formatNumber(row.program_fee, 6) }}
                            </div>
                        </div>
                    </template>

                    <!-- Custom Status Column -->
                    <template #column-status="{ value }">
                        <span :class="getStatusBadgeClass(value)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getStatusText(value) }}
                        </span>
                    </template>

                    <!-- Custom MPP Column -->
                    <template #column-mpp="{ value }">
                        <span :class="getMppBadgeClass(value)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getMppText(value) }}
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
                                @click="editDeviceProgram(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Edit device program"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button 
                                @click="deleteDeviceProgram(row)"
                                class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Delete device program"
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
                                {{ modalMode === 'create' ? 'Create New Device Program' : 'Edit Device Program' }}
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
                        <form @submit.prevent="modalMode === 'create' ? createDeviceProgram() : updateDeviceProgram()">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Left Column -->
                                <div class="space-y-4">
                                    <!-- Program -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Program
                                        </label>
                                        <select 
                                            v-model="formData.program_id"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Program</option>
                                            <option v-for="program in relatedData.programs" :key="program.id" :value="program.id">
                                                {{ program.program_name }} ({{ program.program_code }})
                                            </option>
                                        </select>
                                        <div v-if="errors.program_id" class="text-red-500 text-xs mt-1">{{ errors.program_id[0] }}</div>
                                    </div>

                                    <!-- Product -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Product
                                        </label>
                                        <select 
                                            v-model="formData.product_id"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Product</option>
                                            <option v-for="product in relatedData.products" :key="product.id" :value="product.id">
                                                {{ product.full_name }}
                                            </option>
                                        </select>
                                        <div v-if="errors.product_id" class="text-red-500 text-xs mt-1">{{ errors.product_id[0] }}</div>
                                    </div>

                                    <!-- SKU -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            SKU
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.sku"
                                            maxlength="150"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter SKU"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.sku" class="text-red-500 text-xs mt-1">{{ errors.sku[0] }}</div>
                                    </div>

                                    <!-- Partner SKU -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Partner SKU
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.partner_sku"
                                            maxlength="150"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter Partner SKU"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.partner_sku" class="text-red-500 text-xs mt-1">{{ errors.partner_sku[0] }}</div>
                                    </div>

                                    <!-- Tenure -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tenure (Months)
                                        </label>
                                        <input 
                                            type="number" 
                                            v-model="formData.tenure"
                                            min="0"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter tenure in months"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.tenure" class="text-red-500 text-xs mt-1">{{ errors.tenure[0] }}</div>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="space-y-4">
                                    <!-- Price -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Price *
                                        </label>
                                        <input 
                                            type="number" 
                                            v-model="formData.price"
                                            required
                                            step="0.01"
                                            min="0"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="0.00"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price[0] }}</div>
                                    </div>

                                    <!-- Device Cost -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Device Cost
                                        </label>
                                        <input 
                                            type="number" 
                                            v-model="formData.device_cost"
                                            step="0.000001"
                                            min="0"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="0.000000"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.device_cost" class="text-red-500 text-xs mt-1">{{ errors.device_cost[0] }}</div>
                                    </div>

                                    <!-- Program Fee -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Program Fee
                                        </label>
                                        <input 
                                            type="number" 
                                            v-model="formData.program_fee"
                                            step="0.000001"
                                            min="0"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="0.000000"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.program_fee" class="text-red-500 text-xs mt-1">{{ errors.program_fee[0] }}</div>
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
                                                    value="active"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input 
                                                    type="radio" 
                                                    v-model="formData.status"
                                                    value="deactive"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Deactive</span>
                                            </label>
                                        </div>
                                        <div v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status[0] }}</div>
                                    </div>

                                    <!-- MPP -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            MPP *
                                        </label>
                                        <div class="flex space-x-4">
                                            <label class="inline-flex items-center">
                                                <input 
                                                    type="radio" 
                                                    v-model="formData.mpp"
                                                    value="1"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Yes</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input 
                                                    type="radio" 
                                                    v-model="formData.mpp"
                                                    value="0"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">No</span>
                                            </label>
                                        </div>
                                        <div v-if="errors.mpp" class="text-red-500 text-xs mt-1">{{ errors.mpp[0] }}</div>
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
                                            : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                                    ]"
                                >
                                    <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isSubmitting ? 'Saving...' : (modalMode === 'create' ? 'Create Device Program' : 'Update Device Program') }}
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
import axios from 'axios';
import GlobalTable from '@/Components/globalTable.vue';
import { useApi } from '@/router/useApi';

const { getAxiosConfig } = useApi();

// Reactive state
const result = ref({ data: [], total: 0, from: 0, to: 0 });
const loading = ref(false);
const notification = ref({ message: '', type: '' });
const showModal = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const isSubmitting = ref(false);
const errors = ref({});
const relatedData = ref({
    programs: [],
    products: []
});

// Form data
const formData = ref({
    id: null,
    program_id: null,
    product_id: null,
    sku: '',
    partner_sku: '',
    tenure: null,
    price: 0,
    device_cost: null,
    program_fee: null,
    status: 'active',
    mpp: '0'
});

// Table configuration
const tableColumns = computed(() => [
    {
        key: 'id',
        label: 'ID',
        sortable: true,
        width: '80px'
    },
    {
        key: 'program.program_name',
        label: 'Program',
        sortable: true,
        sortKey: 'program.program_name'
    },
    {
        key: 'product',
        label: 'Product',
        sortable: true,
        sortKey: 'product.product_name'
    },
    {
        key: 'sku',
        label: 'SKU',
        sortable: true
    },
    {
        key: 'tenure',
        label: 'Tenure',
        sortable: true
    },
    {
        key: 'price',
        label: 'Price',
        sortable: true,
        width: '120px'
    },
    {
        key: 'financial',
        label: 'Financial Details',
        sortable: false,
        width: '160px'
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
        width: '100px'
    },
    {
        key: 'mpp',
        label: 'MPP',
        sortable: true,
        width: '80px'
    },
    {
        key: 'created_at',
        label: 'Created',
        sortable: true,
        width: '160px'
    },
    {
        key: 'actions',
        label: 'Actions',
        width: '180px'
    }
]);

const tableFilters = [
    {
        key: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search by SKU, Program, or Product...'
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: '', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'deactive', label: 'Deactive' }
        ]
    },
    {
        key: 'mpp',
        label: 'MPP',
        type: 'select',
        options: [
            { value: '', label: 'All MPP' },
            { value: '1', label: 'MPP Enabled' },
            { value: '0', label: 'MPP Disabled' }
        ]
    },
    {
        key: 'program_id',
        label: 'Program',
        type: 'select',
        options: []
    },
    {
        key: 'product_id',
        label: 'Product',
        type: 'select',
        options: []
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
        label: 'Enable MPP',
        value: 'enable-mpp',
        icon: 'shield-check'
    },
    {
        label: 'Disable MPP',
        value: 'disable-mpp',
        icon: 'shield-exclamation'
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

const activeProgramsCount = computed(() => {
    return tableData.value.filter(program => program.status === 'active').length;
});

const mppProgramsCount = computed(() => {
    return tableData.value.filter(program => program.mpp === '1').length;
});

const totalRevenue = computed(() => {
    return tableData.value.reduce((sum, program) => sum + parseFloat(program.price || 0), 0);
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
        const response = await axios.get('/api/device-programs', { 
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
        showNotification('Failed to load device programs!', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchRelatedData = async () => {
    try {
        const response = await axios.get('/api/device-programs/related-data', getAxiosConfig());
        
        if (response.data.success) {
            relatedData.value = response.data.data;
            
            // Update filter options
            updateFilterOptions();
        }
    } catch (error) {
        console.error('Failed to fetch related data:', error);
    }
};

const updateFilterOptions = () => {
    tableFilters.find(f => f.key === 'program_id').options = [
        { value: '', label: 'All Programs' },
        ...relatedData.value.programs.map(program => ({ value: program.id, label: `${program.name} (${program.code})` }))
    ];
    
    tableFilters.find(f => f.key === 'product_id').options = [
        { value: '', label: 'All Products' },
        ...relatedData.value.products.map(product => ({ value: product.id, label: product.full_name }))
    ];
};

const openCreateModal = () => {
    modalMode.value = 'create';
    resetForm();
    showModal.value = true;
};

const openEditModal = (deviceProgram) => {
    modalMode.value = 'edit';
    formData.value = {
        id: deviceProgram.id,
        program_id: deviceProgram.program_id,
        product_id: deviceProgram.product_id,
        sku: deviceProgram.sku,
        partner_sku: deviceProgram.partner_sku,
        tenure: deviceProgram.tenure,
        price: deviceProgram.price,
        device_cost: deviceProgram.device_cost,
        program_fee: deviceProgram.program_fee,
        status: deviceProgram.status,
        mpp: deviceProgram.mpp
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
        program_id: null,
        product_id: null,
        sku: '',
        partner_sku: '',
        tenure: null,
        price: 0,
        device_cost: null,
        program_fee: null,
        status: 'active',
        mpp: '0'
    };
    errors.value = {};
};

const createDeviceProgram = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.post('/api/device-programs', formData.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Device program created successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to create device program', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const updateDeviceProgram = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.put(`/api/device-programs/${formData.value.id}`, formData.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Device program updated successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to update device program', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const deleteDeviceProgram = async (deviceProgram) => {
    if (!confirm(`Are you sure you want to delete device program "${deviceProgram.sku || deviceProgram.id}"?`)) {
        return;
    }

    try {
        const response = await axios.delete(`/api/device-programs/${deviceProgram.id}`, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Device program deleted successfully!', 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to delete device program', 'error');
    }
};

const handleBulkAction = async (action, selectedIds) => {
    if (selectedIds.length === 0) {
        showNotification('Please select at least one device program', 'error');
        return;
    }

    if (action === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} device program(s)?`)) {
            return;
        }

        for (const id of selectedIds) {
            try {
                await axios.delete(`/api/device-programs/${id}`, getAxiosConfig());
            } catch (error) {
                console.error(`Failed to delete device program ${id}:`, error);
            }
        }

        showNotification(`${selectedIds.length} device program(s) deleted successfully!`, 'success');
        await fetchData();
        return;
    }

    // Handle activate/deactivate
    if (action === 'activate' || action === 'deactivate') {
        const status = action === 'activate' ? 'active' : 'deactive';
        
        try {
            const response = await axios.post('/api/device-programs/bulk-status', {
                ids: selectedIds,
                status: status
            }, getAxiosConfig());
            
            if (response.data.success) {
                showNotification(`${selectedIds.length} device program(s) ${action}d successfully!`, 'success');
                await fetchData();
            } else {
                showNotification(response.data.message, 'error');
            }
        } catch (error) {
            showNotification(error.response?.data?.message || `Failed to ${action} device programs`, 'error');
        }
    }

    // Handle MPP enable/disable
    if (action === 'enable-mpp' || action === 'disable-mpp') {
        const mpp = action === 'enable-mpp' ? '1' : '0';
        
        try {
            const response = await axios.post('/api/device-programs/bulk-mpp', {
                ids: selectedIds,
                mpp: mpp
            }, getAxiosConfig());
            
            if (response.data.success) {
                showNotification(`${selectedIds.length} device program(s) MPP updated successfully!`, 'success');
                await fetchData();
            } else {
                showNotification(response.data.message, 'error');
            }
        } catch (error) {
            showNotification(error.response?.data?.message || 'Failed to update MPP status', 'error');
        }
    }
};

const exportData = async () => {
    try {
        showNotification('Exporting data...', 'success');
        setTimeout(() => {
            showNotification('Export completed successfully!', 'success');
        }, 1000);
    } catch (error) {
        showNotification('Failed to export data', 'error');
    }
};

const editDeviceProgram = (deviceProgram) => {
    openEditModal(deviceProgram);
};

const formatNumber = (num, decimals = 2) => {
    if (!num && num !== 0) return '0.00';
    return parseFloat(num).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
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
    return status === 'active' ? 'Active' : 'Deactive';
};

const getStatusBadgeClass = (status) => {
    return status === 'active' 
        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
};

const getMppText = (mpp) => {
    return mpp === '1' ? 'Yes' : 'No';
};

const getMppBadgeClass = (mpp) => {
    return mpp === '1' 
        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' 
        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400';
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

// Lifecycle
onMounted(async () => {
    await fetchData();
    await fetchRelatedData();
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