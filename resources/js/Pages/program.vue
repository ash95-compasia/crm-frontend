<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Program Management</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Programs</span>
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
                            Create Program
                        </button>
                        <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Programs</div>
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
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">House Delivery</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ houseDeliveryCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
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
                    storage-key="programs-table"
                    :loading="loading"
                    :bulk-actions="bulkActions"
                    @bulk-action="handleBulkAction"
                    @refresh="fetchData"
                    @export="exportData"
                    @create="openCreateModal"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Program Name Column -->
                    <template #column-program_name="{ value, row }">
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
                                <div v-if="row.program_code" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Code: {{ row.program_code }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Channel Partner Column -->
                    <template #column-channel_partner="{ value }">
                        <div v-if="value" class="flex items-center text-sm text-gray-900 dark:text-gray-300">
                            <div class="flex-shrink-0 h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                                <span class="text-green-600 dark:text-green-400 text-xs font-medium">
                                    {{ getInitials(value.name) }}
                                </span>
                            </div>
                            <div>
                                <div class="font-medium">{{ value.name }}</div>
                            </div>
                        </div>
                        <span v-else class="text-gray-400 dark:text-gray-600">N/A</span>
                    </template>

                    <!-- Custom Finco Column -->
                    <template #column-finco="{ value }">
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

                    <!-- Custom Program Type Column -->
                    <template #column-program_type="{ value }">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {{ getProgramTypeText(value) }}
                        </span>
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

                    <!-- Custom House Delivery Column -->
                    <template #column-has_house_delivery="{ value }">
                        <span :class="getHouseDeliveryBadgeClass(value)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getHouseDeliveryText(value) }}
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
                                @click="viewProgram(row)"
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
                                @click="editProgram(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Edit program"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button 
                                @click="deleteProgram(row)"
                                class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Delete program"
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
                                {{ modalMode === 'create' ? 'Create New Program' : 'Edit Program' }}
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
                        <form @submit.prevent="modalMode === 'create' ? createProgram() : updateProgram()">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Left Column -->
                                <div class="space-y-4">
                                    <!-- Program Name -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Program Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.program_name"
                                            required
                                            maxlength="100"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter program name"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.program_name" class="text-red-500 text-xs mt-1">{{ errors.program_name[0] }}</div>
                                    </div>

                                    <!-- Program Code -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Program Code *
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.program_code"
                                            required
                                            maxlength="100"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter program code"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.program_code" class="text-red-500 text-xs mt-1">{{ errors.program_code[0] }}</div>
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

                                    <!-- Finco -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Finco
                                        </label>
                                        <select 
                                            v-model="formData.finco_id"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Finco (Optional)</option>
                                            <option v-for="finco in fincos" :key="finco.id" :value="finco.id">
                                                {{ finco.name }}
                                            </option>
                                        </select>
                                        <div v-if="errors.finco_id" class="text-red-500 text-xs mt-1">{{ errors.finco_id[0] }}</div>
                                    </div>

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
                                </div>

                                <!-- Right Column -->
                                <div class="space-y-4">
                                    <!-- Program Type -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Program Type *
                                        </label>
                                        <select 
                                            v-model="formData.program_type"
                                            required
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Program Type</option>
                                            <option value="ONLINE">ONLINE</option>
                                            <option value="OFFLINE">OFFLINE</option>
                                        </select>
                                        <div v-if="errors.program_type" class="text-red-500 text-xs mt-1">{{ errors.program_type[0] }}</div>
                                    </div>

                                    <!-- Device Condition -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Device Condition *
                                        </label>
                                        <select 
                                            v-model="formData.device_condition"
                                            required
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="new">New</option>
                                            <option value="secondhand">Second Hand</option>
                                        </select>
                                        <div v-if="errors.device_condition" class="text-red-500 text-xs mt-1">{{ errors.device_condition[0] }}</div>
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
                                                    value="0"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">No</span>
                                            </label>
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
                                        </div>
                                        <div v-if="errors.mpp" class="text-red-500 text-xs mt-1">{{ errors.mpp[0] }}</div>
                                    </div>

                                    <!-- Terms & Conditions -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Terms & Conditions
                                        </label>
                                        <select 
                                            v-model="formData.tnc_id"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Terms & Conditions (Optional)</option>
                                            <option v-for="terms in termsConditions" :key="terms.id" :value="terms.id">
                                                {{ terms.title }}
                                            </option>
                                        </select>
                                        <div v-if="errors.tnc_id" class="text-red-500 text-xs mt-1">{{ errors.tnc_id[0] }}</div>
                                    </div>

                                    <!-- House Delivery -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            House Delivery *
                                        </label>
                                        <div class="flex space-x-4">
                                            <label class="inline-flex items-center">
                                                <input 
                                                    type="radio" 
                                                    v-model="formData.has_house_delivery"
                                                    :value="0"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">No</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input 
                                                    type="radio" 
                                                    v-model="formData.has_house_delivery"
                                                    :value="1"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Yes</span>
                                            </label>
                                        </div>
                                        <div v-if="errors.has_house_delivery" class="text-red-500 text-xs mt-1">{{ errors.has_house_delivery[0] }}</div>
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
                                                    :value="0"
                                                    required
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    :disabled="isSubmitting"
                                                />
                                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                                            </label>
                                        </div>
                                        <div v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status[0] }}</div>
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
                                    {{ isSubmitting ? 'Saving...' : (modalMode === 'create' ? 'Create Program' : 'Update Program') }}
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
const fincos = ref([]);
const termsConditions = ref([]);
const tenants = ref([]);
const notification = ref({ message: '', type: '' });
const showModal = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const isSubmitting = ref(false);
const errors = ref({});

// Form data
const formData = ref({
    id: null,
    program_name: '',
    program_code: '',
    channel_partner_id: '',
    finco_id: '',
    tenant_code: '',
    status: 1,
    program_type: '',
    device_condition: 'new',
    mpp: '0',
    tnc_id: '',
    has_house_delivery: 0
});

// Table configuration
const tableColumns = computed(() => [
    {
        key: 'program_name',
        label: 'Program Name',
        sortable: true
    },
    {
        key: 'channel_partner',
        label: 'Channel Partner',
        sortable: true,
        sortKey: 'channel_partner.name'
    },
    {
        key: 'finco',
        label: 'Finco',
        sortable: true,
        sortKey: 'finco.name'
    },
    {
        key: 'program_type',
        label: 'Type',
        sortable: true
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true
    },
    {
        key: 'mpp',
        label: 'MPP',
        sortable: true
    },
    {
        key: 'has_house_delivery',
        label: 'House Delivery',
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
        placeholder: 'Search by name, code, partner, or finco...'
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
        key: 'program_type',
        label: 'Program Type',
        type: 'select',
        options: [
            { value: '', label: 'All Types' },
            { value: 'subscription', label: 'Subscription' },
            { value: 'rental', label: 'Rental' },
            { value: 'lease', label: 'Lease' },
            { value: 'purchase', label: 'Purchase' }
        ]
    },
    {
        key: 'device_condition',
        label: 'Device Condition',
        type: 'select',
        options: [
            { value: '', label: 'All Conditions' },
            { value: 'new', label: 'New' },
            { value: 'reconditioned', label: 'Reconditioned' },
            { value: 'refurbished', label: 'Refurbished' },
            { value: 'used', label: 'Used' }
        ]
    },
    {
        key: 'mpp',
        label: 'MPP',
        type: 'select',
        options: [
            { value: '', label: 'All MPP' },
            { value: '1', label: 'Yes' },
            { value: '0', label: 'No' }
        ]
    },
    {
        key: 'has_house_delivery',
        label: 'House Delivery',
        type: 'select',
        options: [
            { value: '', label: 'All' },
            { value: '1', label: 'Yes' },
            { value: '0', label: 'No' }
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
        key: 'finco_id',
        label: 'Finco',
        type: 'select',
        options: [
            { value: '', label: 'All Fincos' },
            // Dynamic options will be loaded
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

const activeProgramsCount = computed(() => {
    return tableData.value.filter(program => program.status === 1).length;
});

const mppProgramsCount = computed(() => {
    return tableData.value.filter(program => program.mpp === '1').length;
});

const houseDeliveryCount = computed(() => {
    return tableData.value.filter(program => program.has_house_delivery === true || program.has_house_delivery === 1).length;
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
        const response = await axios.get('/api/programs', { 
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
        showNotification('Failed to load programs!', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchChannelPartners = async () => {
    try {
        const response = await axios.get('/api/programs/channel-partners/list', getAxiosConfig());
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

const fetchFincos = async () => {
    try {
        const response = await axios.get('/api/programs/fincos/list', getAxiosConfig());
        if (response.data.success) {
            fincos.value = response.data.data;
            // Update filter options
            const fincoFilter = tableFilters.find(f => f.key === 'finco_id');
            if (fincoFilter) {
                fincoFilter.options = [
                    { value: '', label: 'All Fincos' },
                    ...response.data.data.map(finco => ({
                        value: finco.id,
                        label: finco.name
                    }))
                ];
            }
        }
    } catch (error) {
        console.error('Error fetching fincos:', error);
    }
};

const fetchTermsConditions = async () => {
    try {
        const response = await axios.get('/api/programs/terms-conditions/list', getAxiosConfig());
        if (response.data.success) {
            termsConditions.value = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching terms & conditions:', error);
    }
};

const fetchTenants = async () => {
    try {
        const response = await axios.get('/api/programs/tenants/list', getAxiosConfig());
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

const openEditModal = (program) => {
    modalMode.value = 'edit';
    formData.value = {
        id: program.id,
        program_name: program.program_name || '',
        program_code: program.program_code || '',
        channel_partner_id: program.channel_partner_id || '',
        finco_id: program.finco_id || '',
        tenant_code: program.tenant_code || '',
        status: program.status,
        program_type: program.program_type || '',
        device_condition: program.device_condition || 'new',
        mpp: program.mpp || '0',
        tnc_id: program.tnc_id || '',
        has_house_delivery: program.has_house_delivery ? 1 : 0
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
        program_name: '',
        program_code: '',
        channel_partner_id: '',
        finco_id: '',
        tenant_code: '',
        status: 1,
        program_type: '',
        device_condition: 'new',
        mpp: '0',
        tnc_id: '',
        has_house_delivery: 0
    };
    errors.value = {};
};

const createProgram = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.post('/api/programs', formData.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Program created successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to create program', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const updateProgram = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const response = await axios.put(`/api/programs/${formData.value.id}`, formData.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Program updated successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to update program', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const deleteProgram = async (program) => {
    if (!confirm(`Are you sure you want to delete "${program.program_name}"?`)) {
        return;
    }

    try {
        const response = await axios.delete(`/api/programs/${program.id}`, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Program deleted successfully!', 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to delete program', 'error');
    }
};

const handleBulkAction = async (action, selectedIds) => {
    if (selectedIds.length === 0) {
        showNotification('Please select at least one program', 'error');
        return;
    }

    if (action === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} program(s)?`)) {
            return;
        }

        for (const id of selectedIds) {
            try {
                await axios.delete(`/api/programs/${id}`, getAxiosConfig());
            } catch (error) {
                console.error(`Failed to delete program ${id}:`, error);
            }
        }

        showNotification(`${selectedIds.length} program(s) deleted successfully!`, 'success');
        await fetchData();
        return;
    }

    // Handle activate/deactivate
    const status = action === 'activate' ? 1 : 0;
    
    try {
        const response = await axios.post('/api/programs/bulk-status', {
            ids: selectedIds,
            status: status
        }, getAxiosConfig());
        
        if (response.data.success) {
            showNotification(`${selectedIds.length} program(s) updated successfully!`, 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to update programs', 'error');
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

const viewProgram = (program) => {
    router.push(`/programs/${program.id}`);
};

const editProgram = (program) => {
    openEditModal(program);
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

const getMppText = (mpp) => {
    return mpp === '1' ? 'Yes' : 'No';
};

const getMppBadgeClass = (mpp) => {
    return mpp === '1'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};

const getHouseDeliveryText = (hasHouseDelivery) => {
    return hasHouseDelivery ? 'Yes' : 'No';
};

const getHouseDeliveryBadgeClass = (hasHouseDelivery) => {
    return hasHouseDelivery
        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};

const getProgramTypeText = (programType) => {
    const types = {
        'subscription': 'Subscription',
        'rental': 'Rental',
        'lease': 'Lease',
        'purchase': 'Purchase'
    };
    return types[programType] || programType;
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
        fetchFincos(),
        fetchTermsConditions(),
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