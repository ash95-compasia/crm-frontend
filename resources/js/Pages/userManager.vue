<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">User & Role Management</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">User Management</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Users</div>
                        <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ users.length.toLocaleString() }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ users.length.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Roles</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ roles.length.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Assignments</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activeAssignmentsCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Tenants</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ allTenants.length.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs Navigation -->
                <div class="mb-8">
                    <div class="border-b border-gray-200 dark:border-gray-700">
                        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                @click="activeTab = 'users'"
                                :class="[
                                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                                    activeTab === 'users'
                                        ? 'border-green-500 text-green-600 dark:text-green-400 dark:border-green-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                ]"
                            >
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    Users ({{ users.length }})
                                </span>
                            </button>
                            <button
                                @click="activeTab = 'roles'"
                                :class="[
                                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                                    activeTab === 'roles'
                                        ? 'border-green-500 text-green-600 dark:text-green-400 dark:border-green-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                ]"
                            >
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                    Roles ({{ roles.length }})
                                </span>
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Users Tab -->
                <div v-if="activeTab === 'users'" class="fade-in">
                    <!-- Users Table -->
                    <GlobalTable
                        :data="tableData"
                        :columns="USERS_TABLE_COLUMNS"
                        :filters="USERS_TABLE_FILTERS"
                        :default-sort="{ key: 'name', order: 'asc' }"
                        storage-key="users-management-table"
                        :loading="loading"
                        class="dark:bg-gray-800"
                    >
                        <!-- Custom Name Column -->
                        <template #column-name="{ value, row }">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <span class="text-blue-600 dark:text-blue-400 font-medium">{{ getInitials(value) }}</span>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                                        {{ value || 'N/A' }}
                                    </div>
                                    <div v-if="row.email" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {{ row.email }}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Custom Email Column -->
                        <template #column-email="{ value }">
                            <div class="flex items-center text-sm text-gray-900 dark:text-gray-300">
                                <svg class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                {{ value || 'N/A' }}
                            </div>
                        </template>

                        <!-- Custom Tenants Column -->
                        <template #column-tenants="{ value }">
                            <div class="flex flex-wrap gap-1 max-w-xs">
                                <span 
                                    v-for="tenant in value" 
                                    :key="tenant.id"
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                                >
                                    {{ tenant.name }}
                                </span>
                                <span v-if="value.length === 0" class="text-sm text-gray-400 dark:text-gray-500 italic">None</span>
                            </div>
                        </template>

                        <!-- Custom Roles Column -->
                        <template #column-roles="{ value }">
                            <div class="flex flex-wrap gap-1 max-w-xs">
                                <span 
                                    v-for="role in value" 
                                    :key="role.id"
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800"
                                >
                                    {{ role.name }}
                                </span>
                                <span v-if="value.length === 0" class="text-sm text-gray-400 dark:text-gray-500 italic">None</span>
                            </div>
                        </template>

                        <!-- Custom Actions Column -->
                        <template #column-actions="{ row }">
                            <div class="flex space-x-2">
                                <button 
                                    @click="openUserModal(row)"
                                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Edit user"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                    @click="deleteUser(row)"
                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Delete user"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </template>
                    </GlobalTable>

                    <!-- Add User Button -->
                    <div class="mt-6 flex justify-end">
                        <button
                            @click="openUserModal()"
                            class="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm flex items-center justify-center dark:bg-green-700 dark:hover:bg-green-600"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add New User
                        </button>
                    </div>
                </div>

                <!-- Roles Tab -->
                <div v-else class="fade-in">
                    <!-- Roles Table -->
                    <GlobalTable
                        :data="rolesTableData"
                        :columns="ROLES_TABLE_COLUMNS"
                        :filters="ROLES_TABLE_FILTERS"
                        :default-sort="{ key: 'name', order: 'asc' }"
                        storage-key="roles-management-table"
                        :loading="loading"
                        class="dark:bg-gray-800"
                    >
                        <!-- Custom Name Column -->
                        <template #column-name="{ value }">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                                        {{ value || 'N/A' }}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Custom Description Column -->
                        <template #column-description="{ value }">
                            <div class="text-sm text-gray-900 dark:text-gray-300 max-w-xs truncate">
                                {{ value || 'No description' }}
                            </div>
                        </template>

                        <!-- Custom Tenants Column -->
                        <template #column-tenants="{ value }">
                            <div class="flex flex-wrap gap-1 max-w-xs">
                                <span 
                                    v-for="tenant in value" 
                                    :key="tenant.id"
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                                >
                                    {{ tenant.name }}
                                </span>
                                <span v-if="value.length === 0" class="text-sm text-gray-400 dark:text-gray-500 italic">None</span>
                            </div>
                        </template>

                        <!-- Custom Users Column -->
                        <template #column-users="{ value }">
                            <div class="text-sm text-gray-900 dark:text-gray-300">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                                    {{ value.length }} users
                                </span>
                            </div>
                        </template>

                        <!-- Custom Actions Column -->
                        <template #column-actions="{ row }">
                            <div class="flex space-x-2">
                                <button 
                                    @click="openRoleModal(row)"
                                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Edit role"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Edit
                                </button>
                                <button 
                                    @click="assignUsersToRole(row)"
                                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Assign users"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                    </svg>
                                    Assign Users
                                </button>
                                <button 
                                    @click="deleteRole(row)"
                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                    title="Delete role"
                                >
                                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </template>
                    </GlobalTable>

                    <!-- Role Assignment Section -->
                    <div v-if="selectedRoleForAssignment" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 mt-6">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Assign Users to {{ selectedRoleForAssignment.name }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Select users to assign this role</p>
                            </div>
                            <button 
                                @click="selectedRoleForAssignment = null" 
                                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Close"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <div class="mb-4 flex items-center justify-between">
                            <div class="text-sm text-gray-600 dark:text-gray-400">
                                {{ currentRoleUsers.length }} of {{ users.length }} users selected
                            </div>
                            <div class="flex space-x-2">
                                <button 
                                    @click="selectAllUsers"
                                    class="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Select All
                                </button>
                                <button 
                                    @click="deselectAllUsers"
                                    class="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Deselect All
                                </button>
                            </div>
                        </div>
                        
                        <div class="space-y-3 max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                            <div 
                                v-for="user in users" 
                                :key="user.id" 
                                class="flex items-center justify-between py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                        <span class="text-blue-600 dark:text-blue-400 text-sm font-medium">{{ getInitials(user.name) }}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-700 dark:text-gray-300 font-medium block">{{ user.name }}</span>
                                        <span class="text-gray-500 dark:text-gray-400 text-sm block">{{ user.email }}</span>
                                    </div>
                                </div>
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        :checked="hasUserInRole(user.id)" 
                                        @change="toggleUserInRole(user.id)"
                                        class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500 dark:focus:ring-green-400 h-4 w-4 bg-white dark:bg-gray-700"
                                    />
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Assign</span>
                                </label>
                            </div>
                        </div>
                        <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                            <button
                                @click="selectedRoleForAssignment = null"
                                class="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 border border-gray-300 dark:border-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                @click="saveRoleUsers"
                                class="px-5 py-2.5 bg-green-600 dark:bg-green-700 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 transition-colors duration-200 shadow-sm flex items-center"
                            >
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Save Assignments
                            </button>
                        </div>
                    </div>

                    <!-- Add Role Button -->
                    <div class="mt-6 flex justify-end">
                        <button
                            @click="openRoleModal()"
                            class="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm flex items-center justify-center dark:bg-green-700 dark:hover:bg-green-600"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add New Role
                        </button>
                    </div>
                </div>
        </div>

        <!-- User Modal -->
        <div v-if="showUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ editingUser ? 'Edit User' : 'Add New User' }}
                    </h2>
                </div>
                
                <form @submit.prevent="saveUser" class="p-6 space-y-6">
                    <div class="space-y-4">
                        <div>
                            <label for="userName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name <span class="text-red-500">*</span></label>
                            <input
                                id="userName"
                                v-model="userForm.name"
                                type="text"
                                required
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter user name"
                            />
                        </div>
                        <div>
                            <label for="userEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email <span class="text-red-500">*</span></label>
                            <input
                                id="userEmail"
                                v-model="userForm.email"
                                type="email"
                                required
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <label for="userPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password 
                                <span v-if="!editingUser" class="text-red-500">*</span>
                                <span v-else class="text-gray-500 dark:text-gray-400 text-xs">(Leave blank to keep current password)</span>
                            </label>
                            <input
                                id="userPassword"
                                v-model="userForm.password"
                                type="password"
                                :required="!editingUser"
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter password"
                            />
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tenants <span class="text-red-500">*</span></label>
                            <select 
                                v-model="userForm.tenant_ids" 
                                multiple
                                required
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]"
                                :class="{ 'border-red-500': userForm.tenant_ids.length === 0 && formSubmitted }"
                            >
                                <option v-for="tenant in allTenants" :key="tenant.id" :value="tenant.id">
                                    {{ tenant.name }} ({{ tenant.tenant_code }})
                                </option>
                            </select>
                            <span v-if="userForm.tenant_ids.length === 0 && formSubmitted" class="text-red-500 text-sm flex items-center">
                                Please select at least one tenant
                            </span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-3 pt-4">
                        <button
                            type="button"
                            @click="closeUserModal"
                            class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="flex-1 px-4 py-3 bg-green-600 dark:bg-green-700 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 transition-colors duration-200 shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {{ editingUser ? 'Update User' : 'Create User' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Role Modal -->
        <div v-if="showRoleModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ editingRole ? 'Edit Role' : 'Add New Role' }}
                    </h2>
                </div>
                
                <form @submit.prevent="saveRole" class="p-6 space-y-6">
                    <div class="space-y-4">
                        <div>
                            <label for="roleName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name <span class="text-red-500">*</span></label>
                            <input
                                id="roleName"
                                v-model="roleForm.name"
                                type="text"
                                required
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter role name"
                            />
                        </div>
                        <div>
                            <label for="roleDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                id="roleDescription"
                                v-model="roleForm.description"
                                rows="3"
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter role description"
                            ></textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tenants <span class="text-red-500">*</span></label>
                            <select 
                                v-model="roleForm.tenant_ids" 
                                multiple
                                required
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]"
                                :class="{ 'border-red-500': roleForm.tenant_ids.length === 0 && formSubmitted }"
                            >
                                <option v-for="tenant in allTenants" :key="tenant.id" :value="tenant.id">
                                    {{ tenant.name }} ({{ tenant.tenant_code }})
                                </option>
                            </select>
                            <span v-if="roleForm.tenant_ids.length === 0 && formSubmitted" class="text-red-500 text-sm flex items-center">
                                Please select at least one tenant
                            </span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-3 pt-4">
                        <button
                            type="button"
                            @click="closeRoleModal"
                            class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="flex-1 px-4 py-3 bg-green-600 dark:bg-green-700 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 transition-colors duration-200 shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {{ editingRole ? 'Update Role' : 'Create Role' }}
                        </button>
                    </div>
                </form>
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
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GlobalTable from '@/Components/globalTable.vue';
import { useApi } from '@/router/useApi';

// Import table constants from a separate file
import { 
  USERS_TABLE_COLUMNS, 
  USERS_TABLE_FILTERS,
  ROLES_TABLE_COLUMNS,
  ROLES_TABLE_FILTERS,
} from '@/Constants/tableColumns.js';

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const users = ref([]);
const roles = ref([]);
const allTenants = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const notification = ref({ message: '', type: '' });

// UI state
const activeTab = ref('users');
const showUserModal = ref(false);
const showRoleModal = ref(false);
const editingUser = ref(null);
const editingRole = ref(null);
const selectedRoleForAssignment = ref(null);
const currentRoleUsers = ref([]);
const isSubmitting = ref(false);
const formSubmitted = ref(false);

// Forms
const userForm = ref({
    name: '',
    email: '',
    password: '',
    tenant_ids: []
});

const roleForm = ref({
    name: '',
    description: '',
    tenant_ids: []
});

// Computed properties
const tableData = computed(() => {
    return users.value.map(user => ({
        ...user,
        tenants: user.tenants || [],
        roles: user.roles || []
    }));
});

const rolesTableData = computed(() => {
    return roles.value.map(role => ({
        ...role,
        tenants: role.tenants || [],
        users: role.users || []
    }));
});

const activeAssignmentsCount = computed(() => {
    return users.value.reduce((acc, user) => acc + (user.roles?.length || 0), 0);
});

// Methods
const showNotification = (message, type = 'success') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 5000);
};

const fetchAllTenants = async () => {
    try {
        const response = await axios.get('/api/landlord/tenants', getAxiosConfig());
        allTenants.value = response.data;
    } catch (error) {
        console.error('Failed to fetch tenants:', error);
        showNotification('Failed to fetch tenants', 'error');
    }
};

const fetchUsers = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/landlord/users', getAxiosConfig());
        users.value = response.data.map(user => ({
            ...user,
            tenants: user.tenants || [],
            roles: user.roles || []
        }));
    } catch (error) {
        console.error('Failed to fetch users:', error);
        showNotification('Failed to fetch users', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchRoles = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/landlord/roles', getAxiosConfig());
        roles.value = response.data.map(role => ({
            ...role,
            tenants: role.tenants || [],
            users: role.users || []
        }));
    } catch (error) {
        console.error('Failed to fetch roles:', error);
        showNotification('Failed to fetch roles', 'error');
    } finally {
        loading.value = false;
    }
};

const refreshData = async () => {
    await Promise.all([
        fetchUsers(),
        fetchRoles()
    ]);
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const openUserModal = (user = null) => {
    editingUser.value = user;
    formSubmitted.value = false;
    if (user) {
        userForm.value = {
            name: user.name,
            email: user.email,
            password: '',
            tenant_ids: user.tenants?.map(t => t.id) || []
        };
    } else {
        userForm.value = {
            name: '',
            email: '',
            password: '',
            tenant_ids: []
        };
    }
    showUserModal.value = true;
};

const closeUserModal = () => {
    showUserModal.value = false;
    editingUser.value = null;
    formSubmitted.value = false;
    userForm.value = {
        name: '',
        email: '',
        password: '',
        tenant_ids: []
    };
};

const saveUser = async () => {
    formSubmitted.value = true;
    
    if (userForm.value.tenant_ids.length === 0) {
        showNotification('Please select at least one tenant', 'error');
        return;
    }
    
    isSubmitting.value = true;
    try {
        const payload = {
            name: userForm.value.name,
            email: userForm.value.email,
            tenant_ids: userForm.value.tenant_ids
        };
        
        if (userForm.value.password) {
            payload.password = userForm.value.password;
        }
        
        if (editingUser.value) {
            await axios.put(`/api/users/${editingUser.value.id}`, payload, getAxiosConfig());
            showNotification('User updated successfully');
        } else {
            await axios.post('/api/users', payload, getAxiosConfig());
            showNotification('User created successfully');
        }
        
        await fetchUsers();
        closeUserModal();
    } catch (error) {
        console.error('Failed to save user:', error);
        showNotification('Failed to save user', 'error');
    } finally {
        isSubmitting.value = false;
    }
};

const deleteUser = async (user) => {
    if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
        try {
            await axios.delete(`/api/users/${user.id}`, getAxiosConfig());
            await fetchUsers();
            showNotification('User deleted successfully');
        } catch (error) {
            console.error('Failed to delete user:', error);
            showNotification('Failed to delete user', 'error');
        }
    }
};

const openRoleModal = (role = null) => {
    editingRole.value = role;
    formSubmitted.value = false;
    if (role) {
        roleForm.value = {
            name: role.name,
            description: role.description || '',
            tenant_ids: role.tenants?.map(t => t.id) || []
        };
    } else {
        roleForm.value = {
            name: '',
            description: '',
            tenant_ids: []
        };
    }
    showRoleModal.value = true;
};

const closeRoleModal = () => {
    showRoleModal.value = false;
    editingRole.value = null;
    formSubmitted.value = false;
    roleForm.value = {
        name: '',
        description: '',
        tenant_ids: []
    };
};

const saveRole = async () => {
    formSubmitted.value = true;
    
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
            await axios.put(`/api/roles/${editingRole.value.id}`, payload, getAxiosConfig());
            showNotification('Role updated successfully');
        } else {
            await axios.post('/api/roles', payload, getAxiosConfig());
            showNotification('Role created successfully');
        }
        
        await fetchRoles();
        closeRoleModal();
    } catch (error) {
        console.error('Failed to save role:', error);
        showNotification('Failed to save role', 'error');
    } finally {
        isSubmitting.value = false;
    }
};

const deleteRole = async (role) => {
    if (confirm(`Are you sure you want to delete role "${role.name}"?`)) {
        try {
            await axios.delete(`/api/roles/${role.id}`, getAxiosConfig());
            await fetchRoles();
            if (selectedRoleForAssignment.value?.id === role.id) {
                selectedRoleForAssignment.value = null;
            }
            showNotification('Role deleted successfully');
        } catch (error) {
            console.error('Failed to delete role:', error);
            showNotification('Failed to delete role', 'error');
        }
    }
};

const assignUsersToRole = (role) => {
    selectedRoleForAssignment.value = role;
    fetchRoleUsers(role.id);
};

const fetchRoleUsers = async (roleId) => {
    try {
        const response = await axios.get(`/api/roles/${roleId}/users`, getAxiosConfig());
        currentRoleUsers.value = response.data.map(u => u.id);
    } catch (error) {
        console.error('Failed to fetch role users:', error);
        currentRoleUsers.value = [];
        showNotification('Failed to fetch role users', 'error');
    }
};

const toggleUserInRole = (userId) => {
    const idx = currentRoleUsers.value.indexOf(userId);
    if (idx > -1) {
        currentRoleUsers.value.splice(idx, 1);
    } else {
        currentRoleUsers.value.push(userId);
    }
};

const hasUserInRole = (userId) => {
    return currentRoleUsers.value.includes(userId);
};

const selectAllUsers = () => {
    currentRoleUsers.value = users.value.map(user => user.id);
};

const deselectAllUsers = () => {
    currentRoleUsers.value = [];
};

const saveRoleUsers = async () => {
    if (!selectedRoleForAssignment.value) {
        showNotification('Please select a role', 'error');
        return;
    }
    try {
        await axios.put(
            `/api/roles/${selectedRoleForAssignment.value.id}/users`, 
            { user_ids: currentRoleUsers.value }, 
            getAxiosConfig()
        );
        await fetchRoles();
        await fetchUsers();
        showNotification('User assignments saved successfully');
        selectedRoleForAssignment.value = null;
    } catch (error) {
        console.error('Failed to save role users:', error);
        showNotification('Failed to save user assignments', 'error');
    }
};

// Watch for selected role changes
watch(selectedRoleForAssignment, (newVal) => {
    if (newVal) {
        fetchRoleUsers(newVal.id);
    } else {
        currentRoleUsers.value = [];
    }
});

// Lifecycle
onMounted(async () => {
    console.log('User Role Management component mounted, fetching data...');
    await Promise.all([
        fetchAllTenants(),
        fetchUsers(),
        fetchRoles()
    ]);
});
</script>

<style scoped>
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

/* Enhanced empty state */
.empty-state {
    opacity: 0.7;
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

/* Fade in animation for tab content */
.fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>