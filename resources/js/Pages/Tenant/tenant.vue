<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Tenant Management</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Tenants</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Tenants</div>
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ tenants.length }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Tenants</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ tenants.length }}</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Tenants</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activeTenantsCount }}</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Database Connections</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ connections.length }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Currencies</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ currencies.length }}</p>
                            </div>
                            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons and Tabs -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex space-x-4">
                        <button 
                            @click="activeTab = 'tenants'"
                            :class="[
                                'px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center',
                                activeTab === 'tenants' 
                                    ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            ]"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            Tenants
                            <span class="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {{ tenants.length }}
                            </span>
                        </button>
                        <button 
                            @click="activeTab = 'connections'"
                            :class="[
                                'px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center',
                                activeTab === 'connections' 
                                    ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            ]"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                            </svg>
                            Connections
                            <span class="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {{ connections.length }}
                            </span>
                        </button>
                        <button 
                            @click="activeTab = 'currencies'"
                            :class="[
                                'px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center',
                                activeTab === 'currencies' 
                                    ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            ]"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                            Currencies
                            <span class="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {{ currencies.length }}
                            </span>
                        </button>
                    </div>
                    
                    <button 
                        @click="showCreateForm = true"
                        class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 flex items-center text-sm"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Create New
                    </button>
                </div>

                <!-- Tenants Table using GlobalTable -->
                <div v-if="activeTab === 'tenants'" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                    <GlobalTable
                        :data="tenantsTableData"
                        :columns="TENANTS_TABLE_COLUMNS"
                        :filters="TENANTS_TABLE_FILTERS"
                        :default-sort="{ key: 'name', order: 'asc' }"
                        storage-key="tenant-management-table"
                        :loading="loading"
                        class="dark:bg-gray-800"
                    >
                        <!-- Custom Tenant Name Column -->
                        <template #column-name="{ value, row }">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <span class="text-blue-600 dark:text-blue-400 font-medium">{{ getInitials(value) }}</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer" @click="viewTenant(row)">
                                        {{ value || 'N/A' }}
                                    </div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {{ row.company_email || 'No email' }}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Custom Code Column -->
                        <template #column-tenant_code="{ value }">
                            <span class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                                {{ value || 'N/A' }}
                            </span>
                        </template>

                        <!-- Custom Company Column -->
                        <template #column-company_name="{ value, row }">
                            <div>
                                <div class="text-sm text-gray-900 dark:text-white">
                                    {{ value || 'N/A' }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ row.company_contact || 'No contact' }}
                                </div>
                            </div>
                        </template>

                        <!-- Custom Created Date Column -->
                        <template #column-created_at="{ value }">
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                {{ formatDate(value) }}
                            </div>
                        </template>

                        <!-- Custom Status Column -->
                        <template #column-status="{ row }">
                            <span class="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                                Active
                            </span>
                        </template>

                        <!-- Custom Actions Column -->
                        <template #column-actions="{ row }">
                            <div class="flex space-x-2">
                                <button 
                                    @click="viewTenant(row)"
                                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="View tenant details"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View
                                </button>
                                <button 
                                    @click="editTenant(row)"
                                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Edit tenant"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                    @click="deleteTenant(row)"
                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Delete tenant"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </template>
                    </GlobalTable>
                </div>

                <!-- Connections Table using GlobalTable -->
                <div v-if="activeTab === 'connections'" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                    <GlobalTable
                        :data="connectionsTableData"
                        :columns="CONNECTIONS_TABLE_COLUMNS"
                        :filters="CONNECTIONS_TABLE_FILTERS"
                        :default-sort="{ key: 'tenant_code', order: 'asc' }"
                        storage-key="connections-management-table"
                        :loading="loading"
                        class="dark:bg-gray-800"
                    >
                        <!-- Custom Tenant Column -->
                        <template #column-tenant="{ value }">
                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                {{ value || 'N/A' }}
                            </div>
                        </template>

                        <!-- Custom Database Column -->
                        <template #column-database="{ value, row }">
                            <div>
                                <div class="text-sm text-gray-900 dark:text-white">
                                    {{ value || 'N/A' }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ row.driver }}
                                </div>
                            </div>
                        </template>

                        <!-- Custom Connection Column -->
                        <template #column-connection="{ row }">
                            <div>
                                <div class="text-sm text-gray-900 dark:text-white">
                                    {{ row.host }}:{{ row.port }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ row.username }}
                                </div>
                            </div>
                        </template>

                        <!-- Custom Status Column -->
                        <template #column-is_active="{ value }">
                            <span :class="[
                                'px-3 py-1 text-xs font-medium rounded-full',
                                value 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                            ]">
                                {{ value ? 'Active' : 'Inactive' }}
                            </span>
                        </template>

                        <!-- Custom Actions Column -->
                        <template #column-actions="{ row }">
                            <div class="flex space-x-2">
                                <button 
                                    @click="testConnection(row)"
                                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Test connection"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                    </svg>
                                    Test
                                </button>
                                <button 
                                    @click="editConnection(row)"
                                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Edit connection"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                    @click="deleteConnection(row)"
                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Delete connection"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </template>
                    </GlobalTable>
                </div>

                <!-- Currencies Table using GlobalTable -->
                <div v-if="activeTab === 'currencies'" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                    <GlobalTable
                        :data="currenciesTableData"
                        :columns="CURRENCIES_TABLE_COLUMNS"
                        :filters="CURRENCIES_TABLE_FILTERS"
                        :default-sort="{ key: 'code', order: 'asc' }"
                        storage-key="currencies-management-table"
                        :loading="loading"
                        class="dark:bg-gray-800"
                    >
                        <!-- Custom Tenant Column -->
                        <template #column-tenant="{ value }">
                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                {{ value || 'N/A' }}
                            </div>
                        </template>

                        <!-- Custom Currency Column -->
                        <template #column-name="{ value, row }">
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ value || 'N/A' }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ row.decimal_places }} decimals
                                </div>
                            </div>
                        </template>

                        <!-- Custom Code Column -->
                        <template #column-code="{ value }">
                            <span class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                                {{ value || 'N/A' }}
                            </span>
                        </template>

                        <!-- Custom Status Column -->
                        <template #column-is_default="{ value }">
                            <span :class="[
                                'px-3 py-1 text-xs font-medium rounded-full',
                                value 
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            ]">
                                {{ value ? 'Default' : 'Secondary' }}
                            </span>
                        </template>

                        <!-- Custom Actions Column -->
                        <template #column-actions="{ row }">
                            <div class="flex space-x-2">
                                <button 
                                    v-if="!row.is_default"
                                    @click="setDefaultCurrency(row)"
                                    class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Set as default currency"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    Set Default
                                </button>
                                <button 
                                    @click="editCurrency(row)"
                                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Edit currency"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                    @click="deleteCurrency(row)"
                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Delete currency"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </template>
                    </GlobalTable>
                </div>
            </div>
        </div>

        <!-- Create Tenant Modal -->
        <div v-if="showCreateForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Create New Tenant</h2>
                            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Add a new tenant with database connection and currency</p>
                        </div>
                        <button 
                            @click="showCreateForm = false"
                            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="space-y-6">
                        <!-- Tenant Information -->
                        <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                                Tenant Information
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tenant Code *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newTenant.tenant_code"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., company_abc"
                                        :disabled="isCreating"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Unique identifier for the tenant</p>
                                    <div v-if="errors['tenant.tenant_code']" class="text-red-500 text-xs mt-1">{{ errors['tenant.tenant_code'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tenant Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newTenant.name"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., Company ABC Pte Ltd"
                                        :disabled="isCreating"
                                    />
                                    <div v-if="errors['tenant.name']" class="text-red-500 text-xs mt-1">{{ errors['tenant.name'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company Name
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newTenant.company_name"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., Company ABC Pte Ltd"
                                        :disabled="isCreating"
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company Email
                                    </label>
                                    <input 
                                        type="email" 
                                        v-model="newTenant.company_email"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="contact@company.com"
                                        :disabled="isCreating"
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company Contact
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newTenant.company_contact"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="+6012 345 6789"
                                        :disabled="isCreating"
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company Address
                                    </label>
                                    <textarea 
                                        v-model="newTenant.company_address"
                                        rows="2"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="123 Street, City, Country"
                                        :disabled="isCreating"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Database Connection -->
                        <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                                </svg>
                                Database Connection
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Driver *
                                    </label>
                                    <select 
                                        v-model="newConnection.driver"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        :disabled="isCreating"
                                    >
                                        <option value="">Select Driver</option>
                                        <option value="mysql">MySQL</option>
                                        <option value="pgsql">PostgreSQL</option>
                                        <option value="sqlsrv">SQL Server</option>
                                        <option value="sqlite">SQLite</option>
                                    </select>
                                    <div v-if="errors['connection.driver']" class="text-red-500 text-xs mt-1">{{ errors['connection.driver'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Database Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newConnection.database"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., tenant_company_abc"
                                        :disabled="isCreating"
                                    />
                                    <div v-if="errors['connection.database']" class="text-red-500 text-xs mt-1">{{ errors['connection.database'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Host *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newConnection.host"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., localhost or 127.0.0.1"
                                        :disabled="isCreating"
                                    />
                                    <div v-if="errors['connection.host']" class="text-red-500 text-xs mt-1">{{ errors['connection.host'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Port *
                                    </label>
                                    <input 
                                        type="number" 
                                        v-model="newConnection.port"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., 3306"
                                        :disabled="isCreating"
                                    />
                                    <div v-if="errors['connection.port']" class="text-red-500 text-xs mt-1">{{ errors['connection.port'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Username *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newConnection.username"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Database username"
                                        :disabled="isCreating"
                                    />
                                    <div v-if="errors['connection.username']" class="text-red-500 text-xs mt-1">{{ errors['connection.username'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Password *
                                    </label>
                                    <input 
                                        type="password" 
                                        v-model="newConnection.password"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Database password"
                                        :disabled="isCreating"
                                    />
                                    <div v-if="errors['connection.password']" class="text-red-500 text-xs mt-1">{{ errors['connection.password'][0] }}</div>
                                </div>
                            </div>
                            <div class="mt-4 flex items-center">
                                <input 
                                    type="checkbox" 
                                    v-model="newConnection.is_active"
                                    id="connection-active"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    :disabled="isCreating"
                                />
                                <label for="connection-active" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Active Connection
                                </label>
                            </div>
                        </div>

                        <!-- Currency Configuration -->
                        <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                Currency Configuration
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Currency Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newCurrency.name"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., Singapore Dollar"
                                        :disabled="isCreating"
                                    />
                                    <div v-if="errors['currency.name']" class="text-red-500 text-xs mt-1">{{ errors['currency.name'][0] }}</div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Currency Code *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="newCurrency.code"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="e.g., SGD"
                                        maxlength="3"
                                        :disabled="isCreating"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">3-letter ISO currency code</p>
                                    <div v-if="errors['currency.code']" class="text-red-500 text-xs mt-1">{{ errors['currency.code'][0] }}</div>
                                </div>
                            </div>
                            <div class="mt-4 flex items-center">
                                <input 
                                    type="checkbox" 
                                    v-model="newCurrency.is_default"
                                    id="currency-default"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    :disabled="isCreating"
                                />
                                <label for="currency-default" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Set as default currency for this tenant
                                </label>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button 
                                @click="showCreateForm = false"
                                type="button"
                                :disabled="isCreating"
                                class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button 
                                @click="createTenant"
                                :disabled="isCreating"
                                :class="[
                                    'px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center',
                                    isCreating 
                                        ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                                        : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                                ]"
                            >
                                <svg v-if="isCreating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {{ isCreating ? 'Creating...' : 'Create Tenant' }}
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
                    : notification.type === 'error'
                    ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800'
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800'
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
                    v-else-if="notification.type === 'error'"
                    class="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <svg 
                    v-else
                    class="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm">{{ notification.message }}</span>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import GlobalTable from '@/Components/globalTable.vue'
import { useApi } from '@/router/useApi'

// Import table configurations
import { 
    TENANTS_TABLE_COLUMNS, 
    TENANTS_TABLE_FILTERS,
    CONNECTIONS_TABLE_COLUMNS,
    CONNECTIONS_TABLE_FILTERS,
    CURRENCIES_TABLE_COLUMNS,
    CURRENCIES_TABLE_FILTERS
} from '@/Constants/tableColumns.js'

const { getAxiosConfig } = useApi()

// Reactive state
const tenants = ref([])
const connections = ref([])
const currencies = ref([])
const activeTab = ref('tenants')
const loading = ref(false)
const isCreating = ref(false)
const showCreateForm = ref(false)
const notification = ref({ message: '', type: '' })
const errors = ref({})

// Form data
const newTenant = ref({
    tenant_code: '',
    name: '',
    company_name: '',
    company_address: '',
    company_contact: '',
    company_email: ''
})

const newConnection = ref({
    driver: 'mysql',
    host: 'localhost',
    port: 3306,
    database: '',
    username: '',
    password: '',
    is_active: true
})

const newCurrency = ref({
    name: '',
    code: '',
    symbol: '',
    decimal_places: 2,
    is_default: true
})

// Computed properties
const tenantsTableData = computed(() => {
    return tenants.value.map(tenant => ({
        ...tenant,
        status: 'active' // You can add actual status logic here
    }))
})

const connectionsTableData = computed(() => {
    return connections.value.map(connection => ({
        ...connection,
        tenant: connection.tenant?.name || 'N/A'
    }))
})

const currenciesTableData = computed(() => {
    return currencies.value.map(currency => ({
        ...currency,
        tenant: currency.tenant?.name || 'N/A'
    }))
})

const activeTenantsCount = computed(() => {
    return tenants.value.length // Add your own active status logic
})

// Methods
const showNotification = (message, type = 'success') => {
    notification.value = { message, type }
    setTimeout(() => {
        notification.value = { message: '', type: '' }
    }, 5000)
}

const getInitials = (name) => {
    if (!name) return '??'
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const fetchTenants = async () => {
    loading.value = true
    try {
        const response = await axios.get('/api/tenants', getAxiosConfig())
        if (response.data.success === false) {
            throw new Error(response.data.message)
        }
        tenants.value = response.data
        showNotification('Tenants loaded successfully')
    } catch (error) {
        console.error('Error fetching tenants:', error)
        showNotification('Failed to load tenants!', 'error')
    } finally {
        loading.value = false
    }
}

const fetchConnections = async () => {
    try {
        const response = await axios.get('/api/tenant-connections', getAxiosConfig())
        if (response.data.success === false) {
            throw new Error(response.data.message)
        }
        connections.value = response.data
    } catch (error) {
        console.error('Error fetching connections:', error)
        showNotification('Failed to load database connections!', 'error')
    }
}

const fetchCurrencies = async () => {
    try {
        const response = await axios.get('/api/currencies', getAxiosConfig())
        if (response.data.success === false) {
            throw new Error(response.data.message)
        }
        currencies.value = response.data
    } catch (error) {
        console.error('Error fetching currencies:', error)
        showNotification('Failed to load currencies!', 'error')
    }
}

const createTenant = async () => {
    // Basic validation
    if (!newTenant.value.tenant_code || !newTenant.value.name) {
        showNotification('Please fill in all required tenant fields', 'error')
        return
    }

    if (!newConnection.value.database || !newConnection.value.host) {
        showNotification('Please fill in all required database connection fields', 'error')
        return
    }

    if (!newCurrency.value.name || !newCurrency.value.code) {
        showNotification('Please fill in all required currency fields', 'error')
        return
    }

    isCreating.value = true
    errors.value = {}

    try {
        // Prepare the payload
        const payload = {
            tenant: newTenant.value,
            connection: newConnection.value,
            currency: newCurrency.value
        }

        // Call the API
        const response = await axios.post('/api/tenants/complete', payload, getAxiosConfig())
        
        if (response.data.success) {
            showNotification('Tenant created successfully!', 'success')
            
            // Refresh all data
            await Promise.all([
                fetchTenants(),
                fetchConnections(),
                fetchCurrencies()
            ])

            // Reset form and close modal
            resetForm()
            showCreateForm.value = false
        } else {
            showNotification(response.data.message, 'error')
        }
        
    } catch (error) {
        console.error('Error creating tenant:', error)
        
        if (error.response?.status === 422) {
            // Handle validation errors
            errors.value = error.response.data.errors
            showNotification('Please fix the validation errors', 'error')
        } else {
            showNotification(error.response?.data?.message || 'Failed to create tenant', 'error')
        }
    } finally {
        isCreating.value = false
    }
}

const resetForm = () => {
    newTenant.value = {
        tenant_code: '',
        name: '',
        company_name: '',
        company_address: '',
        company_contact: '',
        company_email: ''
    }
    
    newConnection.value = {
        driver: 'mysql',
        host: 'localhost',
        port: 3306,
        database: '',
        username: '',
        password: '',
        is_active: true
    }
    
    newCurrency.value = {
        name: '',
        code: '',
        symbol: '',
        decimal_places: 2,
        is_default: true
    }
    
    errors.value = {}
}

const testConnection = async (connection) => {
    try {
        showNotification('Testing database connection...', 'info')
        
        // Prepare test data
        const testData = {
            driver: connection.driver,
            host: connection.host,
            port: connection.port,
            database: connection.database,
            username: connection.username,
            password: connection.password
        }

        const response = await axios.post('/api/tenant-connections/test', testData, getAxiosConfig())
        
        if (response.data.success) {
            showNotification('Database connection successful!', 'success')
        } else {
            showNotification('Connection failed: ' + response.data.message, 'error')
        }
    } catch (error) {
        if (error.response?.data?.message) {
            showNotification('Connection failed: ' + error.response.data.message, 'error')
        } else {
            showNotification('Connection test failed', 'error')
        }
    }
}

const setDefaultCurrency = async (currency) => {
    try {
        showNotification('Setting as default currency...', 'info')
        
        const response = await axios.post(`/api/currencies/${currency.id}/set-default`, {}, getAxiosConfig())
        
        if (response.data.success) {
            showNotification('Currency set as default successfully!', 'success')
            await fetchCurrencies()
        } else {
            showNotification(response.data.message, 'error')
        }
    } catch (error) {
        console.error('Error setting default currency:', error)
        showNotification('Failed to set default currency', 'error')
    }
}

const viewTenant = (tenant) => {
    showNotification(`Viewing ${tenant.name}`, 'info')
    // Implement view functionality
}

const editTenant = (tenant) => {
    showNotification(`Editing ${tenant.name}`, 'info')
    // Implement edit functionality
}

const deleteTenant = async (tenant) => {
    if (!confirm(`Are you sure you want to delete tenant "${tenant.name}"? This action cannot be undone.`)) {
        return
    }

    try {
        showNotification('Deleting tenant...', 'info')
        
        const response = await axios.delete(`/api/tenants/${tenant.id}`, getAxiosConfig())
        
        if (response.data.success) {
            showNotification('Tenant deleted successfully!', 'success')
            await fetchTenants()
        } else {
            showNotification(response.data.message, 'error')
        }
    } catch (error) {
        console.error('Error deleting tenant:', error)
        showNotification('Failed to delete tenant', 'error')
    }
}

const editConnection = (connection) => {
    showNotification('Edit connection functionality coming soon!', 'info')
}

const deleteConnection = async (connection) => {
    if (!confirm(`Are you sure you want to delete this database connection? This action cannot be undone.`)) {
        return
    }

    try {
        showNotification('Deleting connection...', 'info')
        
        const response = await axios.delete(`/api/tenant-connections/${connection.id}`, getAxiosConfig())
        
        if (response.data.success) {
            showNotification('Connection deleted successfully!', 'success')
            await fetchConnections()
        } else {
            showNotification(response.data.message, 'error')
        }
    } catch (error) {
        console.error('Error deleting connection:', error)
        showNotification('Failed to delete connection', 'error')
    }
}

const editCurrency = (currency) => {
    showNotification('Edit currency functionality coming soon!', 'info')
}

const deleteCurrency = async (currency) => {
    if (!confirm(`Are you sure you want to delete currency "${currency.code}"? This action cannot be undone.`)) {
        return
    }

    try {
        showNotification('Deleting currency...', 'info')
        
        const response = await axios.delete(`/api/currencies/${currency.id}`, getAxiosConfig())
        
        if (response.data.success) {
            showNotification('Currency deleted successfully!', 'success')
            await fetchCurrencies()
        } else {
            showNotification(response.data.message, 'error')
        }
    } catch (error) {
        console.error('Error deleting currency:', error)
        showNotification('Failed to delete currency', 'error')
    }
}

// Lifecycle hooks
onMounted(() => {
    fetchTenants()
    fetchConnections()
    fetchCurrencies()
})
</script>

<style scoped>
/* Import the same font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
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

/* Professional spacing and alignment */
.container {
    max-width: 1200px;
}

/* Improved button hover effects */
button:not(:disabled) {
    transition: all 0.2s ease-in-out;
}

/* Better table styling */
table {
    font-size: 0.875rem;
}

th {
    font-weight: 600;
    letter-spacing: 0.025em;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.dark ::-webkit-scrollbar-track {
    background: #374151;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
    background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}
</style>