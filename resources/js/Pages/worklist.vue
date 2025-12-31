<template>
    <div class="min-h-screen bg-white text-gray-900">
        <!-- Sidebar Trigger -->
        <div
            v-if="isAuthenticated && !isAuthRoute"
            @mouseenter="openSidebar"
            class="fixed top-4 left-4 z-50 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all duration-200 cursor-pointer shadow-lg"
            title="Hover to open sidebar"
        >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </div>

        <!-- Sidebar -->
        <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="handleSidebarToggle" />

        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8" :class="{ 'lg:ml-64': showSidebar }">
            <div class="max-w-7xl mx-auto">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">Worklist Management</h1>
                            <p class="text-gray-600 mt-2">Manage and generate worklists for your team</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 text-sm">Active Worklists</div>
                        <div class="text-2xl font-bold text-green-600">{{ activeWorklistsCount.toLocaleString() }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Total Worklists</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ worklists.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Pending Items</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ pendingItemsCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Completed Today</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ completedTodayCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">My Pending Tasks</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ myPendingTasksCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs Section -->
                <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-8">
                    <!-- Tab Headers -->
                    <div class="border-b border-gray-200">
                        <nav class="flex -mb-px">
                            <button
                                v-for="tab in tabs"
                                :key="tab.id"
                                @click="activeTab = tab.id"
                                :class="[
                                    'py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200',
                                    activeTab === tab.id
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                ]"
                            >
                                {{ tab.name }}
                                <span 
                                    v-if="tab.count !== null" 
                                    :class="[
                                        'ml-2 py-0.5 px-2 text-xs rounded-full',
                                        activeTab === tab.id
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    ]"
                                >
                                    {{ tab.count }}
                                </span>
                            </button>
                        </nav>
                    </div>

                    <!-- Tab Content -->
                    <div class="p-6">
                        <!-- Worklists Tab -->
                        <div v-if="activeTab === 'worklists'">
                            <div class="flex justify-between items-center mb-6">
                                <h2 class="text-xl font-semibold text-gray-900">Worklists</h2>
                                <div class="flex space-x-3">
                                    <button 
                                        @click="fetchWorklists"
                                        class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                                    >
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        Refresh
                                    </button>
                                    <button 
                                        @click="createNewWorklist"
                                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                                    >
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        New Worklist
                                    </button>
                                </div>
                            </div>

                            <!-- Worklists Table -->
                            <GlobalTable
                                :data="worklistsData"
                                :columns="worklistsColumns"
                                :filters="worklistsFilters"
                                :default-sort="{ key: 'name', order: 'asc' }"
                                storage-key="worklists-table"
                            >
                                <!-- Custom Name Column -->
                                <template #column-name="{ value, row }">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">{{ value || 'N/A' }}</div>
                                            <div class="text-xs text-gray-500 mt-1">
                                                Type: {{ formatWorklistType(row.type) }}
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <!-- Custom Status Column -->
                                <template #column-status="{ value, row }">
                                    <div class="flex items-center">
                                        <span 
                                            :class="[
                                                'px-3 py-1 text-xs font-medium rounded-full',
                                                row.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            ]"
                                        >
                                            {{ row.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                </template>

                                <!-- Custom Frequency Column -->
                                <template #column-frequency="{ value }">
                                    <div class="flex items-center text-sm text-gray-900">
                                        <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {{ formatFrequency(value) }}
                                    </div>
                                </template>

                                <!-- Custom Next Run Column -->
                                <template #column-next_run_at="{ value }">
                                    <div class="text-sm text-gray-900">
                                        {{ value ? formatDateTime(value) : 'Manual' }}
                                    </div>
                                </template>

                                <!-- Custom Items Count Column -->
                                <template #column-items_count="{ value, row }">
                                    <div class="text-center">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {{ value || 0 }}
                                        </span>
                                    </div>
                                </template>

                                <!-- Custom Actions Column -->
                                <template #column-actions="{ row }">
                                    <div class="flex space-x-2">
                                        <button 
                                            @click="viewWorklistDetails(row)"
                                            class="text-green-600 hover:text-green-800 transition-colors duration-200 flex items-center text-sm"
                                            title="View Details"
                                        >
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </button>
                                        <button 
                                            @click="generateWorklistItems(row)"
                                            class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center text-sm"
                                            title="Generate Items"
                                        >
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                            </svg>
                                            Generate
                                        </button>
                                        <button 
                                            @click="editWorklist(row)"
                                            class="text-yellow-600 hover:text-yellow-800 transition-colors duration-200 flex items-center text-sm"
                                            title="Edit Worklist"
                                        >
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                            Edit
                                        </button>
                                        <button 
                                            @click="toggleWorklistStatus(row)"
                                            :class="[
                                                'transition-colors duration-200 flex items-center text-sm',
                                                row.is_active ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                                            ]"
                                            :title="row.is_active ? 'Deactivate' : 'Activate'"
                                        >
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path v-if="row.is_active" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            {{ row.is_active ? 'Deactivate' : 'Activate' }}
                                        </button>
                                    </div>
                                </template>
                            </GlobalTable>
                        </div>

                        <!-- Worklist Generation Tab -->
                        <div v-if="activeTab === 'generation'">
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <!-- Generation Form -->
                                <div class="lg:col-span-2">
                                    <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                        {{ editingWorklist ? 'Edit Worklist' : 'Generate New Worklist' }}
                                    </h2>
                                    
                                    <form @submit.prevent="generateWorklist" class="space-y-6">
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label for="worklistName" class="block text-sm font-medium text-gray-700 mb-2">Worklist Name *</label>
                                                <input
                                                    type="text"
                                                    id="worklistName"
                                                    v-model="generationForm.name"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                                    placeholder="Enter worklist name"
                                                    required
                                                />
                                            </div>
                                            
                                            <div>
                                                <label for="worklistType" class="block text-sm font-medium text-gray-700 mb-2">Worklist Type *</label>
                                                <select
                                                    id="worklistType"
                                                    v-model="generationForm.type"
                                                    @change="onWorklistTypeChange"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                                    required
                                                >
                                                    <option value="">Select type</option>
                                                    <option value="customer">Customer</option>
                                                    <option value="order">Order</option>
                                                    <option value="invoice">Invoice</option>
                                                    <option value="contract">Contract</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label for="worklistDescription" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                            <textarea
                                                id="worklistDescription"
                                                v-model="generationForm.description"
                                                rows="3"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                                placeholder="Enter worklist description"
                                            ></textarea>
                                        </div>

                                        <!-- Enhanced Conditions Section -->
                                        <div class="border-t pt-6">
                                            <div class="flex items-center justify-between mb-4">
                                                <h3 class="text-lg font-medium text-gray-900">Advanced Conditions</h3>
                                                <div class="text-sm text-gray-500">
                                                    Build complex conditions with groups and cross-table filters
                                                </div>
                                            </div>
                                            
                                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                                <h4 class="text-sm font-medium text-blue-800 mb-2">Example Scenarios:</h4>
                                                <ul class="text-xs text-blue-700 space-y-1">
                                                    <li>• Customers with outstanding invoices > $1000 AND orders created in last 30 days</li>
                                                    <li>• Contracts expiring in next 60 days with customer age > 65</li>
                                                    <li>• Invoices with DPD > 10 days and order value > $5000</li>
                                                </ul>
                                            </div>

                                            <div class="space-y-4">
                                                <EnhancedConditionNode 
                                                    :node="generationForm.conditions" 
                                                    :all-fields="allFields" 
                                                    :depth="0" 
                                                    :is-root="true"
                                                    :parent-type="generationForm.type"
                                                    :add-condition="addCondition"
                                                    :add-group="addGroup"
                                                    :remove-node="removeCondition"
                                                    :available-tables="getAvailableTables(generationForm.type)"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label for="frequency" class="block text-sm font-medium text-gray-700 mb-2">Frequency *</label>
                                                <select
                                                    id="frequency"
                                                    v-model="generationForm.frequency"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                                    required
                                                >
                                                    <option value="daily">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="manual">Manual Only</option>
                                                </select>
                                            </div>
                                            
                                            <div v-if="generationForm.frequency === 'weekly'">
                                                <label for="dayOfWeek" class="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
                                                <select
                                                    id="dayOfWeek"
                                                    v-model="generationForm.frequency_config.day_of_week"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                                >
                                                    <option value="1">Monday</option>
                                                    <option value="2">Tuesday</option>
                                                    <option value="3">Wednesday</option>
                                                    <option value="4">Thursday</option>
                                                    <option value="5">Friday</option>
                                                    <option value="6">Saturday</option>
                                                    <option value="0">Sunday</option>
                                                </select>
                                            </div>

                                            <div v-if="generationForm.frequency === 'monthly'">
                                                <label for="dayOfMonth" class="block text-sm font-medium text-gray-700 mb-2">Day of Month</label>
                                                <select
                                                    id="dayOfMonth"
                                                    v-model="generationForm.frequency_config.day_of_month"
                                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                                >
                                                    <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Assign To *</label>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div 
                                                    v-for="member in availableUsers" 
                                                    :key="member.id"
                                                    class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        :id="`member-${member.id}`"
                                                        :value="member.id"
                                                        v-model="generationForm.assigned_users"
                                                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                    />
                                                    <label :for="`member-${member.id}`" class="ml-3 text-sm text-gray-700 flex-1">
                                                        <div class="font-medium">{{ member.name }}</div>
                                                        <div class="text-gray-500 text-xs">{{ member.role }}</div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="flex justify-end space-x-4 pt-6 border-t">
                                            <button
                                                v-if="editingWorklist"
                                                type="button"
                                                @click="cancelEdit"
                                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                @click="resetGenerationForm"
                                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                type="submit"
                                                :disabled="generatingWorklist"
                                                :class="[
                                                    'px-6 py-2 rounded-lg transition-colors duration-200 flex items-center',
                                                    generatingWorklist
                                                        ? 'bg-gray-400 cursor-not-allowed text-white'
                                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                                ]"
                                            >
                                                <svg v-if="generatingWorklist" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                                </svg>
                                                {{ editingWorklist ? 'Update Worklist' : 'Generate Worklist' }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                
                                <!-- Generation Preview -->
                                <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                    <h3 class="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                                    
                                    <div class="space-y-4">
                                        <div class="p-4 bg-white rounded-lg border border-gray-200">
                                            <h4 class="text-sm font-medium text-gray-700 mb-2">Worklist Details</h4>
                                            <div class="space-y-2 text-sm text-gray-600">
                                                <div class="flex justify-between">
                                                    <span class="font-medium">Name:</span>
                                                    <span>{{ generationForm.name || 'Not specified' }}</span>
                                                </div>
                                                <div class="flex justify-between">
                                                    <span class="font-medium">Type:</span>
                                                    <span>{{ formatWorklistType(generationForm.type) || 'Not specified' }}</span>
                                                </div>
                                                <div class="flex justify-between">
                                                    <span class="font-medium">Frequency:</span>
                                                    <span>{{ formatFrequency(generationForm.frequency) || 'Not specified' }}</span>
                                                </div>
                                                <div v-if="generationForm.frequency === 'weekly'" class="flex justify-between">
                                                    <span class="font-medium">Runs on:</span>
                                                    <span>{{ getDayName(generationForm.frequency_config.day_of_week) }}</span>
                                                </div>
                                                <div v-if="generationForm.frequency === 'monthly'" class="flex justify-between">
                                                    <span class="font-medium">Day of month:</span>
                                                    <span>{{ generationForm.frequency_config.day_of_month }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="p-4 bg-white rounded-lg border border-gray-200">
                                            <h4 class="text-sm font-medium text-gray-700 mb-2">Conditions</h4>
                                            <div class="space-y-1 max-h-60 overflow-y-auto">
                                                <EnhancedConditionPreviewNode 
                                                    :node="generationForm.conditions" 
                                                    :depth="0"
                                                    :parent-type="generationForm.type"
                                                />
                                                <div v-if="!generationForm.conditions.conditions || generationForm.conditions.conditions.length === 0" class="text-xs text-gray-400 italic">
                                                    No conditions specified
                                                </div>
                                            </div>
                                        </div>

                                        <div class="p-4 bg-white rounded-lg border border-gray-200">
                                            <h4 class="text-sm font-medium text-gray-700 mb-2">Assignment</h4>
                                            <div class="text-sm text-gray-600">
                                                <div class="flex justify-between mb-1">
                                                    <span class="font-medium">Assigned to:</span>
                                                    <span>{{ generationForm.assigned_users.length }} user(s)</span>
                                                </div>
                                                <div class="text-xs text-gray-500">
                                                    <div v-for="userId in generationForm.assigned_users" :key="userId">
                                                        • {{ getUserName(userId) }}
                                                    </div>
                                                    <div v-if="generationForm.assigned_users.length === 0" class="text-gray-400 italic">
                                                        No users assigned
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="p-4 bg-white rounded-lg border border-gray-200">
                                            <h4 class="text-sm font-medium text-gray-700 mb-2">Estimated Results</h4>
                                            <div class="text-sm text-gray-600">
                                                <div class="flex justify-between mb-1">
                                                    <span class="font-medium">Conditions:</span>
                                                    <span>{{ countConditions(generationForm.conditions) }}</span>
                                                </div>
                                                <div class="flex justify-between">
                                                    <span class="font-medium">Complexity:</span>
                                                    <span :class="getComplexityClass(generationForm.conditions)">
                                                        {{ getComplexityLevel(generationForm.conditions) }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- My Tasks Tab -->
                        <div v-if="activeTab === 'mytasks'">
                            <div class="flex justify-between items-center mb-6">
                                <h2 class="text-xl font-semibold text-gray-900">My Assigned Tasks</h2>
                                <button 
                                    @click="fetchMyTasks"
                                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                                >
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                    Refresh
                                </button>
                            </div>

                            <!-- My Tasks Table -->
                            <GlobalTable
                                :data="myTasksData"
                                :columns="myTasksColumns"
                                :filters="myTasksFilters"
                                :default-sort="{ key: 'due_date', order: 'asc' }"
                                storage-key="my-tasks-table"
                            >
                                <!-- Custom Worklist Column -->
                                <template #column-worklist_name="{ value, row }">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                        </div>
                                        <div class="ml-3">
                                            <div class="text-sm font-medium text-gray-900">{{ value }}</div>
                                            <div class="text-xs text-gray-500">{{ row.entity_type }}</div>
                                        </div>
                                    </div>
                                </template>

                                <!-- Custom Entity Column -->
                                <template #column-entity_data="{ value }">
                                    <div class="text-sm text-gray-900">
                                        {{ value?.name || value?.customer_name || 'N/A' }}
                                    </div>
                                </template>

                                <!-- Custom Status Column -->
                                <template #column-status="{ value }">
                                    <span 
                                        :class="[
                                            'px-3 py-1 text-xs font-medium rounded-full',
                                            value === 'completed' ? 'bg-green-100 text-green-800' :
                                            value === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        ]"
                                    >
                                        {{ formatStatus(value) }}
                                    </span>
                                </template>

                                <!-- Custom Due Date Column -->
                                <template #column-due_date="{ value }">
                                    <div class="text-sm" :class="isOverdue(value) ? 'text-red-600 font-medium' : 'text-gray-900'">
                                        {{ formatDateTime(value) }}
                                        <span v-if="isOverdue(value)" class="text-xs text-red-500">(Overdue)</span>
                                    </div>
                                </template>

                                <!-- Custom Actions Column -->
                                <template #column-actions="{ row }">
                                    <div class="flex space-x-2">
                                        <button 
                                            v-if="row.status === 'pending'"
                                            @click="updateTaskStatus(row, 'in_progress')"
                                            class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center text-sm"
                                        >
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Start
                                        </button>
                                        <button 
                                            v-if="row.status === 'in_progress'"
                                            @click="updateTaskStatus(row, 'completed')"
                                            class="text-green-600 hover:text-green-800 transition-colors duration-200 flex items-center text-sm"
                                        >
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Complete
                                        </button>
                                        <button 
                                            @click="viewTaskDetails(row)"
                                            class="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center text-sm"
                                        >
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </button>
                                    </div>
                                </template>
                            </GlobalTable>
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
                    ? 'bg-green-50 text-green-800 border-green-200' 
                    : 'bg-red-50 text-red-800 border-red-200'
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
import Sidebar from '@/Components/sidebar.vue';
import GlobalTable from '@/Components/globalTable.vue';
import EnhancedConditionNode from '@/Components/ConditionNode.vue';
import EnhancedConditionPreviewNode from '@/Components/ConditionPreviewNode.vue';
import { useApi } from '@/router/useApi';

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const activeTab = ref('worklists');
const worklists = ref({ data: [], total: 0, from: 0, to: 0 });
const myTasks = ref({ data: [], total: 0, from: 0, to: 0 });
const availableUsers = ref([]);
const loading = ref(false);
const generatingWorklist = ref(false);
const showSidebar = ref(false);
const editingWorklist = ref(null);
const notification = ref({ message: '', type: '' });

// Enhanced available fields by type with grouping
const allFields = {
    customer: {
        'basic': ['nric', 'first_name', 'last_name', 'email', 'phone_number', 'gender', 'dob'],
        'address': ['address', 'postalcode', 'city', 'state', 'postcode'],
        'employment': ['employment_company_name', 'employment_office_general_line'],
        'financial': ['bnk_acc', 'bnk_name'],
        'metadata': ['tenant_code', 'draf', 'program_id', 'applicationsource', 'race_cus']
    },
    order: {
        'order_info': ['orderId', 'partner_orderId', 'monthly_subscription', 'program_fee', 'gst', 'tenure'],
        'dates': ['start_contract', 'created_at'],
        'status': ['order_status_id', 'data_verification', 'call_verification', 'straight_through'],
        'references': ['customer_id', 'program_id', 'branch_id', 'nric']
    },
    invoice: {
        'invoice_info': ['invoice_no', 'total_amount', 'paid_amount', 'balance_amount', 'credits_applied'],
        'dates': ['issue_date', 'due_date'],
        'financial': ['gst_amount', 'gst', 'late_payment_charges', 'over_pay'],
        'status': ['status', 'status_desc']
    },
    contract: {
        'contract_info': ['contract_number', 'monthly_subscription', 'subscription_period', 'min_tenure'],
        'dates': ['contract_date', 'contract_end_date', 'commencement_date', 'device_collection_date'],
        'device': ['imei', 'device_cost'],
        'status': ['contract_status_id', 'completed_at', 'eInvoice_generated']
    }
};

// Tabs configuration
const tabs = computed(() => [
    { id: 'worklists', name: 'Worklists', count: worklists.value.total || 0 },
    { id: 'generation', name: 'Worklist Generation', count: null },
    { id: 'mytasks', name: 'My Tasks', count: myPendingTasksCount.value }
]);

// Enhanced Worklist generation form
const generationForm = ref({
    name: '',
    description: '',
    type: '',
    conditions: { 
        operator: 'AND', 
        conditions: [],
        table: '' // Will be set based on type
    },
    assigned_users: [],
    frequency: 'daily',
    frequency_config: {
        day_of_week: 1, // Monday
        day_of_month: 1
    },
    is_active: true
});

// Table columns for worklists
const worklistsColumns = [
    {
        key: 'name',
        label: 'Worklist Name',
        sortable: true
    },
    {
        key: 'type',
        label: 'Type',
        sortable: true
    },
    {
        key: 'frequency',
        label: 'Frequency',
        sortable: true
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true
    },
    {
        key: 'next_run_at',
        label: 'Next Run',
        sortable: true
    },
    {
        key: 'items_count',
        label: 'Items',
        sortable: true
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false
    }
];

// Table filters for worklists
const worklistsFilters = [
    {
        key: 'name',
        label: 'Worklist Name',
        type: 'text',
        placeholder: 'Search by worklist name...'
    },
    {
        key: 'type',
        label: 'Type',
        type: 'select',
        options: [
            { value: 'customer', label: 'Customer' },
            { value: 'order', label: 'Order' },
            { value: 'invoice', label: 'Invoice' },
            { value: 'contract', label: 'Contract' }
        ]
    },
    {
        key: 'frequency',
        label: 'Frequency',
        type: 'select',
        options: [
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'manual', label: 'Manual' }
        ]
    },
    {
        key: 'is_active',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' }
        ]
    }
];

// Table columns for my tasks
const myTasksColumns = [
    {
        key: 'worklist_name',
        label: 'Worklist',
        sortable: true
    },
    {
        key: 'entity_data',
        label: 'Entity',
        sortable: true
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true
    },
    {
        key: 'due_date',
        label: 'Due Date',
        sortable: true
    },
    {
        key: 'created_at',
        label: 'Assigned On',
        sortable: true
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false
    }
];

// Table filters for my tasks
const myTasksFilters = [
    {
        key: 'worklist_name',
        label: 'Worklist Name',
        type: 'text',
        placeholder: 'Search by worklist name...'
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'pending', label: 'Pending' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' }
        ]
    }
];

// Computed properties
const isAuthenticated = computed(() => !!localStorage.getItem('token'));
const isAuthRoute = computed(() => ['/login', '/register'].includes(router.currentRoute.value.path));

const worklistsData = computed(() => {
    return (worklists.value.data || []).map(worklist => ({
        ...worklist,
        items_count: worklist.items ? worklist.items.filter(item => item.status === 'pending').length : 0
    }));
});

const myTasksData = computed(() => {
    return (myTasks.value.data || []).map(task => ({
        ...task,
        worklist_name: task.worklist?.name || 'N/A'
    }));
});

const activeWorklistsCount = computed(() => {
    return worklistsData.value.filter(wl => wl.is_active).length;
});

const pendingItemsCount = computed(() => {
    return worklistsData.value.reduce((sum, wl) => sum + wl.items_count, 0);
});

const completedTodayCount = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return myTasksData.value.filter(task => 
        task.status === 'completed' && task.completed_at?.startsWith(today)
    ).length;
});

const myPendingTasksCount = computed(() => {
    return myTasksData.value.filter(task => 
        task.status === 'pending' || task.status === 'in_progress'
    ).length;
});

// Methods
const openSidebar = () => {
    showSidebar.value = true;
};

const handleSidebarToggle = (isOpen) => {
    showSidebar.value = isOpen;
};

const showNotification = (message, type = 'success') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 5000);
};

const fetchWorklists = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/worklists', getAxiosConfig());
        worklists.value = response.data;
    } catch (error) {
        console.error('Fetch worklists error:', error);
        showNotification('Failed to load worklists', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchMyTasks = async () => {
    try {
        const response = await axios.get('/api/worklists/my-worklists', getAxiosConfig());
        myTasks.value = response.data;
    } catch (error) {
        console.error('Fetch my tasks error:', error);
        showNotification('Failed to load your tasks', 'error');
    }
};

const fetchAvailableUsers = async () => {
    try {
        
        const response = await axios.get('/api/users', getAxiosConfig());
        availableUsers.value = response.data.data || [];
        console.log("users". availableUsers.value);
    } catch (error) {
        console.error('Fetch users error:', error);
        // Fallback to mock data
        availableUsers.value = [
            { id: 1, name: 'John Smith', role: 'Manager' },
            { id: 2, name: 'Sarah Johnson', role: 'Analyst' },
            { id: 3, name: 'Michael Brown', role: 'Developer' },
            { id: 4, name: 'Emily Davis', role: 'Designer' }
        ];
    }
};

const getAvailableTables = (mainType) => {
    const relationships = {
        customer: [
            { value: 'order', label: 'Order' },
            { value: 'invoice', label: 'Invoice' },
            { value: 'contract', label: 'Contract' }
        ],
        order: [
            { value: 'customer', label: 'Customer' },
            { value: 'invoice', label: 'Invoice' },
            { value: 'contract', label: 'Contract' }
        ],
        invoice: [
            { value: 'customer', label: 'Customer' },
            { value: 'order', label: 'Order' }
        ],
        contract: [
            { value: 'customer', label: 'Customer' },
            { value: 'order', label: 'Order' }
        ]
    };
    return relationships[mainType] || [];
};

const addCondition = (group) => {
    const firstFieldGroup = allFields[group.table || generationForm.value.type] ? Object.values(allFields[group.table || generationForm.value.type])[0] : [];
    group.conditions.push({
        field: firstFieldGroup?.[0] || '',
        operator: 'equals',
        value: '',
        table: group.table || generationForm.value.type
    });
};

const addGroup = (group) => {
    group.conditions.push({
        operator: 'AND',
        conditions: [],
        table: generationForm.value.type
    });
};

const removeCondition = () => {
    // For root level, we might not want to remove the main condition group
    console.log('Remove condition from root');
};

const formatWorklistType = (type) => {
    const typeMap = {
        'customer': 'Customer',
        'order': 'Order',
        'invoice': 'Invoice',
        'contract': 'Contract'
    };
    return typeMap[type] || type;
};

const formatFrequency = (frequency) => {
    const frequencyMap = {
        'daily': 'Daily',
        'weekly': 'Weekly',
        'monthly': 'Monthly',
        'manual': 'Manual'
    };
    return frequencyMap[frequency] || frequency;
};

const formatStatus = (status) => {
    const statusMap = {
        'pending': 'Pending',
        'in_progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
};

const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getDayName = (dayNumber) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber] || 'Unknown';
};

const getUserName = (userId) => {
    const user = availableUsers.value.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
};

const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
};

const createNewWorklist = () => {
    activeTab.value = 'generation';
    editingWorklist.value = null;
    resetGenerationForm();
};

const editWorklist = (worklist) => {
    activeTab.value = 'generation';
    editingWorklist.value = worklist;
    
    // Populate form with worklist data
    generationForm.value = {
        name: worklist.name,
        description: worklist.description,
        type: worklist.type,
        conditions: worklist.conditions || { operator: 'AND', conditions: [], table: worklist.type },
        assigned_users: worklist.assigned_users || [],
        frequency: worklist.frequency,
        frequency_config: worklist.frequency_config || {
            day_of_week: 1,
            day_of_month: 1
        },
        is_active: worklist.is_active
    };
};

const cancelEdit = () => {
    editingWorklist.value = null;
    resetGenerationForm();
};

const generateWorklist = async () => {
    generatingWorklist.value = true;
    
    try {
        // Validate conditions
        if (!validateConditions(generationForm.value.conditions)) {
            showNotification('Please fix the condition errors before generating', 'error');
            return;
        }

        const url = editingWorklist.value 
            ? `/api/worklists/${editingWorklist.value.id}`
            : '/api/worklists';
            
        const method = editingWorklist.value ? 'put' : 'post';
        
        const response = await axios[method](url, generationForm.value, getAxiosConfig());
        
        showNotification(
            editingWorklist.value 
                ? 'Worklist updated successfully' 
                : 'Worklist created successfully'
        );
        
        resetGenerationForm();
        fetchWorklists();
        
        // Switch back to worklists tab
        setTimeout(() => {
            activeTab.value = 'worklists';
        }, 1500);
        
    } catch (error) {
        console.error('Generate worklist error:', error);
        showNotification(
            `Failed to ${editingWorklist.value ? 'update' : 'create'} worklist: ${error.response?.data?.message || error.message}`,
            'error'
        );
    } finally {
        generatingWorklist.value = false;
    }
};

const validateConditions = (conditions) => {
    if (!conditions.conditions || conditions.conditions.length === 0) {
        return true; // No conditions is valid
    }

    for (const condition of conditions.conditions) {
        if (condition.conditions) {
            // This is a group
            if (!validateConditions(condition)) {
                return false;
            }
        } else {
            // This is a single condition
            if (!condition.field || !condition.operator) {
                return false;
            }
            if (!['is_null', 'is_not_null'].includes(condition.operator) && 
                (condition.value === undefined || condition.value === '' || 
                 (Array.isArray(condition.value) && condition.value.some(v => v === '')))) {
                return false;
            }
        }
    }
    return true;
};

const generateWorklistItems = async (worklist) => {
    try {
        await axios.post(`/api/worklists/${worklist.id}/generate`, {}, getAxiosConfig());
        showNotification('Worklist items generated successfully');
        fetchWorklists();
    } catch (error) {
        console.error('Generate items error:', error);
        showNotification('Failed to generate worklist items', 'error');
    }
};

const toggleWorklistStatus = async (worklist) => {
    try {
        await axios.put(`/api/worklists/${worklist.id}`, {
            is_active: !worklist.is_active
        }, getAxiosConfig());
        
        showNotification(
            `Worklist ${worklist.is_active ? 'deactivated' : 'activated'} successfully`
        );
        fetchWorklists();
    } catch (error) {
        console.error('Toggle status error:', error);
        showNotification('Failed to update worklist status', 'error');
    }
};

const updateTaskStatus = async (task, newStatus) => {
    try {
        await axios.put(`/api/worklists/items/${task.id}/status`, {
            status: newStatus
        }, getAxiosConfig());
        
        showNotification(`Task marked as ${formatStatus(newStatus).toLowerCase()}`);
        fetchMyTasks();
    } catch (error) {
        console.error('Update task status error:', error);
        showNotification('Failed to update task status', 'error');
    }
};

const viewWorklistDetails = (worklist) => {
    // Navigate to worklist details page
    router.push(`/worklists/${worklist.id}`);
};

const viewTaskDetails = (task) => {
    // Navigate to task details or entity page
    if (task.entity_type && task.entity_id) {
        router.push(`/${task.entity_type}s/${task.entity_id}`);
    }
};

const resetGenerationForm = () => {
    generationForm.value = {
        name: '',
        description: '',
        type: '',
        conditions: { operator: 'AND', conditions: [], table: '' },
        assigned_users: [],
        frequency: 'daily',
        frequency_config: {
            day_of_week: 1,
            day_of_month: 1
        },
        is_active: true
    };
    editingWorklist.value = null;
};

const onWorklistTypeChange = () => {
    // Set the table for the root condition group
    generationForm.value.conditions.table = generationForm.value.type;
};

// Helper methods for preview
const countConditions = (node) => {
    if (!node.conditions) return 0;
    
    let count = 0;
    for (const condition of node.conditions) {
        if (condition.conditions) {
            count += countConditions(condition);
        } else {
            count++;
        }
    }
    return count;
};

const getComplexityLevel = (conditions) => {
    const count = countConditions(conditions);
    if (count === 0) return 'None';
    if (count <= 2) return 'Simple';
    if (count <= 5) return 'Medium';
    return 'Complex';
};

const getComplexityClass = (conditions) => {
    const level = getComplexityLevel(conditions);
    switch (level) {
        case 'None': return 'text-gray-600';
        case 'Simple': return 'text-green-600';
        case 'Medium': return 'text-yellow-600';
        case 'Complex': return 'text-red-600';
        default: return 'text-gray-600';
    }
};

// Lifecycle
onMounted(async () => {
    console.log('Worklist Management component mounted');
    await fetchAvailableUsers();
    await fetchWorklists();
    await fetchMyTasks();
});

// Watch for tab changes
watch(activeTab, (newTab) => {
    if (newTab === 'mytasks') {
        fetchMyTasks();
    } else if (newTab === 'worklists') {
        fetchWorklists();
    }
});

// Watch for type change to reset conditions if needed
watch(() => generationForm.value.type, (newType) => {
    if (newType) {
        generationForm.value.conditions.table = newType;
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
}

.logo-hover {
    transition: transform 0.3s ease;
}

.logo-hover:hover {
    transform: scale(1.05);
}

/* Smooth transitions */
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

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

/* Tab transition */
.tab-content {
    transition: opacity 0.3s ease;
}

/* Condition styling */
.condition-item {
    transition: all 0.2s ease-in-out;
}

.condition-item:hover {
    background-color: #f9fafb;
}
</style>