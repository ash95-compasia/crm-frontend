<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-4 lg:p-6">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Route Manager</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <router-link to="/dashboard" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Routes</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Routes</div>
                        <div class="text-xl font-bold text-green-600 dark:text-green-400">{{ routes.length.toLocaleString() }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Total Routes</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ routes.length.toLocaleString() }}</p>
                            </div>
                            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Components</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ availableComponents.length.toLocaleString() }}</p>
                            </div>
                            <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Protected Routes</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ protectedRoutesCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Tenants</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ tenants.length.toLocaleString() }}</p>
                            </div>
                            <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs Navigation -->
                <div class="mb-6">
                    <div class="border-b border-gray-200 dark:border-gray-700">
                        <nav class="-mb-px flex space-x-6" aria-label="Tabs">
                            <button
                                @click="activeTab = 'routes'"
                                :class="[
                                    'py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                                    activeTab === 'routes'
                                        ? 'border-green-500 text-green-600 dark:text-green-400 dark:border-green-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                ]"
                            >
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    Routes ({{ routes.length }})
                                </span>
                            </button>
                            <button
                                @click="activeTab = 'components'"
                                :class="[
                                    'py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                                    activeTab === 'components'
                                        ? 'border-green-500 text-green-600 dark:text-green-400 dark:border-green-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                ]"
                            >
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Components ({{ availableComponents.length }})
                                </span>
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Routes Tab -->
                <div v-if="activeTab === 'routes'" class="space-y-4">
                    <!-- Add Route Form (Collapsible) -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                        <button
                            @click="isRouteFormOpen = !isRouteFormOpen"
                            class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-t-lg"
                        >
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span class="font-medium text-gray-900 dark:text-white">Add New Route</span>
                            </div>
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 transform transition-transform" :class="{ 'rotate-180': isRouteFormOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        <div v-if="isRouteFormOpen" class="px-4 pb-4">
                            <form @submit.prevent="addRoute" class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Path <span class="text-red-500">*</span></label>
                                        <div class="relative">
                                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span class="text-gray-400">/</span>
                                            </div>
                                            <input 
                                                v-model="newRoute.path" 
                                                type="text" 
                                                class="pl-6 w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                :class="{ 'border-red-500': errors.path }"
                                                placeholder="new-page"
                                                required 
                                            />
                                        </div>
                                        <p v-if="errors.path" class="mt-1 text-xs text-red-500">{{ errors.path }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name <span class="text-red-500">*</span></label>
                                        <input 
                                            v-model="newRoute.name" 
                                            type="text" 
                                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            :class="{ 'border-red-500': errors.name }"
                                            placeholder="NewPage"
                                            required 
                                        />
                                        <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Component <span class="text-red-500">*</span></label>
                                        <select 
                                            v-model="newRoute.component" 
                                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            :class="{ 'border-red-500': errors.component }"
                                            required
                                        >
                                            <option value="">Select a component</option>
                                            <option v-for="comp in availableComponents" :key="comp" :value="comp">{{ comp }}</option>
                                        </select>
                                        <p v-if="errors.component" class="mt-1 text-xs text-red-500">{{ errors.component }}</p>
                                    </div>

                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tenants <span class="text-red-500">*</span></label>
                                        <div class="max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 p-2">
                                            <div v-for="tenant in tenants" :key="tenant.id" class="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <label class="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        :value="tenant.id"
                                                        v-model="newRoute.tenant_ids"
                                                        class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                                                    />
                                                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ tenant.name }}</span>
                                                    <span class="text-xs text-gray-500 dark:text-gray-400">({{ tenant.tenant_code }})</span>
                                                </label>
                                            </div>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ newRoute.tenant_ids.length }} tenant(s) selected</p>
                                        <span v-if="errors.tenant_ids" class="text-red-500 text-xs flex items-center">
                                            {{ errors.tenant_ids }}
                                        </span>
                                    </div>
                                </div>

                                <div class="flex items-center space-x-6 pt-2">
                                    <div class="flex items-center space-x-4">
                                        <label class="flex items-center space-x-2 cursor-pointer">
                                            <input 
                                                v-model="newRoute.meta.requiresAuth" 
                                                type="checkbox" 
                                                class="h-4 w-4 text-green-600 dark:text-green-400 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                                id="requiresAuth" 
                                            />
                                            <span class="text-sm text-gray-700 dark:text-gray-300">Requires Auth</span>
                                        </label>
                                        <label class="flex items-center space-x-2 cursor-pointer">
                                            <input 
                                                v-model="newRoute.meta.guest" 
                                                type="checkbox" 
                                                class="h-4 w-4 text-green-600 dark:text-green-400 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                                id="guest" 
                                            />
                                            <span class="text-sm text-gray-700 dark:text-gray-300">Guest Only</span>
                                        </label>
                                    </div>
                                    <button 
                                        type="submit" 
                                        class="ml-auto px-4 py-2 bg-green-600 dark:bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-sm"
                                        :disabled="loading"
                                    >
                                        <span v-if="loading" class="flex items-center">
                                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </span>
                                        <span v-else>Add Route</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Existing Routes Table -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between items-center">
                                <h3 class="font-medium text-gray-900 dark:text-white">Existing Routes</h3>
                                <div class="text-xs text-gray-600 dark:text-gray-400">
                                    {{ routes.length }} route(s)
                                </div>
                            </div>
                        </div>

                        <div v-if="loading && routes.length === 0" class="p-6 text-center">
                            <div class="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <svg class="animate-spin h-4 w-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span class="text-sm">Loading routes...</span>
                            </div>
                        </div>

                        <div v-else-if="routes.length" class="overflow-x-auto">
                            <div class="max-h-[400px] overflow-y-auto">
                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                                        <tr>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Path</th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Component</th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Auth</th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr v-for="route in routes" :key="route.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                            <td class="px-4 py-3 whitespace-nowrap">
                                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                                    <span class="text-gray-400">/</span>{{ route.path }}
                                                </div>
                                            </td>
                                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {{ route.name }}
                                            </td>
                                            <td class="px-4 py-3 whitespace-nowrap">
                                                <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md">
                                                    {{ route.component }}
                                                </span>
                                            </td>
                                            <td class="px-4 py-3 whitespace-nowrap">
                                                <div class="flex flex-col space-y-1">
                                                    <span 
                                                        :class="[
                                                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                                                            route.meta.requiresAuth 
                                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                                                        ]"
                                                    >
                                                        {{ route.meta.requiresAuth ? 'Auth' : 'Public' }}
                                                    </span>
                                                    <span 
                                                        v-if="route.meta.guest"
                                                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                                                    >
                                                        Guest
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-3 whitespace-nowrap text-sm">
                                                <button 
                                                    @click="deleteRoute(route.id)" 
                                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-xs"
                                                    :disabled="loading"
                                                    title="Delete route"
                                                >
                                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div v-else class="p-6 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <h3 class="mt-3 text-sm font-medium text-gray-900 dark:text-white">No routes found</h3>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Add your first route using the form above</p>
                        </div>
                    </div>
                </div>

                <!-- Components Tab -->
                <div v-if="activeTab === 'components'" class="space-y-4">
                    <!-- Add Component Form (Collapsible) -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                        <button
                            @click="isComponentFormOpen = !isComponentFormOpen"
                            class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-t-lg"
                        >
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span class="font-medium text-gray-900 dark:text-white">Add New Component</span>
                            </div>
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 transform transition-transform" :class="{ 'rotate-180': isComponentFormOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        <div v-if="isComponentFormOpen" class="px-4 pb-4">
                            <form @submit.prevent="addComponent" class="space-y-4">
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Component Name <span class="text-red-500">*</span></label>
                                    <input 
                                        v-model="newComponent.name" 
                                        type="text" 
                                        class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        :class="{ 'border-red-500': componentErrors.name }"
                                        placeholder="NewComponent"
                                        required 
                                    />
                                    <p v-if="componentErrors.name" class="mt-1 text-xs text-red-500">{{ componentErrors.name }}</p>
                                </div>

                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Vue SFC Code <span class="text-red-500">*</span></label>
                                    <div class="relative">
                                        <textarea 
                                            v-model="newComponent.code" 
                                            rows="12"
                                            class="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                                            :class="{ 'border-red-500': componentErrors.code }"
                                            placeholder="&lt;template&gt;&#10;  &lt;div&gt;Your component here&lt;/div&gt;&#10;&lt;/template&gt;&#10;&#10;&lt;script setup&gt;&#10;// Your script here&#10;&lt;/script&gt;&#10;&#10;&lt;style scoped&gt;&#10;/* Your styles here */&#10;&lt;/style&gt;"
                                            required
                                        ></textarea>
                                        <div class="absolute bottom-2 right-2">
                                            <button
                                                type="button"
                                                @click="newComponent.code = ''"
                                                class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                    <p v-if="componentErrors.code" class="mt-1 text-xs text-red-500">{{ componentErrors.code }}</p>
                                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Paste full Vue SFC code. Refresh app after adding to test.</p>
                                </div>

                                <div class="flex justify-end pt-2">
                                    <button 
                                        type="submit" 
                                        class="px-4 py-2 bg-green-600 dark:bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-sm"
                                        :disabled="loading"
                                    >
                                        <span v-if="loading" class="flex items-center">
                                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </span>
                                        <span v-else>Add Component</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Existing Components Grid -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between items-center">
                                <h3 class="font-medium text-gray-900 dark:text-white">Available Components</h3>
                                <div class="text-xs text-gray-600 dark:text-gray-400">
                                    {{ availableComponents.length }} component(s)
                                </div>
                            </div>
                        </div>

                        <div v-if="loading && availableComponents.length === 0" class="p-6 text-center">
                            <div class="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <svg class="animate-spin h-4 w-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span class="text-sm">Loading components...</span>
                            </div>
                        </div>

                        <div v-else-if="availableComponents.length" class="p-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                <div 
                                    v-for="comp in availableComponents" 
                                    :key="comp" 
                                    class="group flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <div class="flex items-center space-x-2">
                                        <svg class="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                        <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ comp }}</span>
                                    </div>
                                    <button 
                                        @click="deleteComponent(comp)" 
                                        class="opacity-0 group-hover:opacity-100 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-all duration-200 flex items-center"
                                        :disabled="loading"
                                        title="Delete component"
                                    >
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-else class="p-6 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <h3 class="mt-3 text-sm font-medium text-gray-900 dark:text-white">No components found</h3>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Add your first component using the form above</p>
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
import { useApi } from '@/router/useApi';

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const routes = ref([]);
const tenants = ref([]);
const availableComponents = ref([]);
const loading = ref(false);
const notification = ref({ message: '', type: '' });

// UI state
const activeTab = ref('routes');
const isRouteFormOpen = ref(false);
const isComponentFormOpen = ref(false);

// Forms
const newRoute = ref({
    path: '',
    name: '',
    component: '',
    meta: { requiresAuth: false, guest: false },
    tenant_ids: []
});

const newComponent = ref({
    name: '',
    code: ''
});

// Errors
const errors = ref({});
const componentErrors = ref({});

// Computed properties
const protectedRoutesCount = computed(() => {
    return routes.value.filter(route => route.meta.requiresAuth).length;
});

// Methods
const showNotification = (message, type = 'success') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 5000);
};

// Fetch data
const fetchRoutes = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/landlord/route-configs', getAxiosConfig());
        routes.value = response.data;
    } catch (error) {
        console.error('Failed to fetch routes:', error);
        showNotification('Failed to load routes', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchTenants = async () => {
    try {
        const response = await axios.get('/api/tenants', getAxiosConfig());
        tenants.value = response.data;
    } catch (error) {
        console.error('Failed to fetch tenants:', error);
        showNotification('Failed to load tenants', 'error');
    }
};

const fetchComponents = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/landlord/component-configs', getAxiosConfig());
        availableComponents.value = response.data.sort();
    } catch (error) {
        console.error('Failed to fetch components:', error);
        showNotification('Failed to load components', 'error');
    } finally {
        loading.value = false;
    }
};

// Route management
const validateForm = () => {
    errors.value = {};
    let isValid = true;
    
    if (!newRoute.value.path.trim()) {
        errors.value.path = 'Path is required';
        isValid = false;
    }
    if (!newRoute.value.name.trim()) {
        errors.value.name = 'Name is required';
        isValid = false;
    }
    if (!newRoute.value.component) {
        errors.value.component = 'Component is required';
        isValid = false;
    }
    if (newRoute.value.tenant_ids.length === 0) {
        errors.value.tenant_ids = 'Please select at least one tenant';
        isValid = false;
    }
    
    return isValid;
};

const addRoute = async () => {
    if (!validateForm()) return;
    
    loading.value = true;
    try {
        await axios.post('/api/landlord/route-configs', {
            path: newRoute.value.path,
            name: newRoute.value.name,
            component: newRoute.value.component,
            meta: newRoute.value.meta,
            tenants: newRoute.value.tenant_ids,
        }, getAxiosConfig());
        
        await fetchRoutes();
        
        // Reset form
        newRoute.value = {
            path: '',
            name: '',
            component: '',
            meta: { requiresAuth: false, guest: false },
            tenant_ids: []
        };
        errors.value = {};
        isRouteFormOpen.value = false;
        
        showNotification('Route added successfully');
    } catch (error) {
        console.error('Failed to add route:', error);
        const errMsg = error.response?.data?.message || 'Error adding route';
        showNotification(errMsg, 'error');
    } finally {
        loading.value = false;
    }
};

const deleteRoute = async (id) => {
    if (!confirm('Are you sure you want to delete this route?')) return;
    
    loading.value = true;
    try {
        await axios.delete(`/api/landlord/route-configs/${id}`, getAxiosConfig());
        await fetchRoutes();
        showNotification('Route deleted successfully');
    } catch (error) {
        console.error('Failed to delete route:', error);
        showNotification('Failed to delete route', 'error');
    } finally {
        loading.value = false;
    }
};

// Component management
const validateComponentForm = () => {
    componentErrors.value = {};
    let isValid = true;
    
    if (!newComponent.value.name.trim()) {
        componentErrors.value.name = 'Name is required';
        isValid = false;
    }
    if (!newComponent.value.code.trim()) {
        componentErrors.value.code = 'Code is required';
        isValid = false;
    } else if (!newComponent.value.code.includes('<template')) {
        componentErrors.value.code = 'Invalid Vue SFC: Must include <template> tag';
        isValid = false;
    }
    
    return isValid;
};

const addComponent = async () => {
    if (!validateComponentForm()) return;
    
    loading.value = true;
    try {
        await axios.post('/api/landlord/component-configs', {
            name: newComponent.value.name,
            code: newComponent.value.code
        }, getAxiosConfig());
        
        await fetchComponents();
        
        // Reset form
        newComponent.value = { name: '', code: '' };
        componentErrors.value = {};
        isComponentFormOpen.value = false;
        
        showNotification('Component added successfully. Refresh app to use it in routes.');
    } catch (error) {
        console.error('Failed to add component:', error);
        const errMsg = error.response?.data?.message || 'Error adding component';
        showNotification(errMsg, 'error');
    } finally {
        loading.value = false;
    }
};

const deleteComponent = async (name) => {
    if (!confirm('Are you sure you want to delete this component?')) return;
    
    loading.value = true;
    try {
        await axios.delete(`/api/landlord/component-configs/${name}`, getAxiosConfig());
        await fetchComponents();
        showNotification('Component deleted successfully');
    } catch (error) {
        console.error('Failed to delete component:', error);
        showNotification('Failed to delete component', 'error');
    } finally {
        loading.value = false;
    }
};

// Refresh data
const refreshData = async () => {
    await Promise.all([
        fetchRoutes(),
        fetchTenants(),
        fetchComponents()
    ]);
};

// Lifecycle
onMounted(async () => {
    console.log('Route Manager component mounted, fetching data...');
    await refreshData();
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

/* Professional spacing and alignment */
.container {
    max-width: 1200px;
}

/* Improved button hover effects */
button:not(:disabled) {
    transition: all 0.2s ease-in-out;
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

/* Animations */
.rotate-180 {
    transform: rotate(180deg);
}

/* Form styling */
input, select, textarea {
    font-size: 0.875rem;
}

/* Code editor styling */
.font-mono {
    font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Courier New', monospace;
    line-height: 1.5;
}

/* Compact table styling */
table {
    font-size: 0.75rem;
}

th {
    font-weight: 600;
    letter-spacing: 0.025em;
}

/* Truncate long text */
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>