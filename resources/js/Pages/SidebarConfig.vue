<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-4 lg:p-6">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Navigation Manager</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <router-link to="/dashboard" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Navigation</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Items</div>
                        <div class="text-xl font-bold text-green-600 dark:text-green-400">{{ allNavItems.length }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Total Items</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ allNavItems.length }}</p>
                            </div>
                            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'list']" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Top Level</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ topLevelItems.length }}</p>
                            </div>
                            <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'folder']" class="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Tenants</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ allTenants.length }}</p>
                            </div>
                            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'users']" class="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-xs font-medium">Active Items</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">{{ activeItemsCount }}</p>
                            </div>
                            <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'check-circle']" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions Bar -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 mb-4">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div class="flex-1">
                            <div class="relative">
                                <input
                                    v-model="searchQuery"
                                    type="text"
                                    placeholder="Search navigation items..."
                                    class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <font-awesome-icon :icon="['fas', 'search']" class="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-3">
                            <div class="flex items-center space-x-2">
                                <button
                                    @click="toggleFilter('topLevel')"
                                    :class="[
                                        'px-3 py-1.5 text-xs rounded-md border transition-colors',
                                        filters.topLevel
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    ]"
                                >
                                    Top Level Only
                                </button>
                                <button
                                    @click="toggleFilter('hasChildren')"
                                    :class="[
                                        'px-3 py-1.5 text-xs rounded-md border transition-colors',
                                        filters.hasChildren
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    ]"
                                >
                                    Has Children
                                </button>
                            </div>
                            
                            <button
                                @click="openAddModal"
                                class="px-4 py-2 bg-green-600 dark:bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center"
                            >
                                <font-awesome-icon :icon="['fas', 'plus']" class="w-4 h-4 mr-2" />
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="flex flex-col lg:flex-row gap-4">
                    <!-- Navigation Tree -->
                    <div class="lg:w-2/3">
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Navigation Structure</h3>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    Drag to reorder
                                </div>
                            </div>
                            
                            <div class="max-h-[calc(100vh-350px)] overflow-y-auto">
                                <div v-if="sortedItems.length === 0" class="text-center py-8">
                                    <font-awesome-icon :icon="['fas', 'search']" class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                                    <p class="text-gray-600 dark:text-gray-400">No navigation items found</p>
                                </div>
                                
                                <draggable
                                    v-else
                                    v-model="sortedItems"
                                    class="space-y-1"
                                    item-key="id"
                                    ghost-class="opacity-50"
                                    drag-class="cursor-grabbing"
                                    @end="onDragEnd"
                                >
                                    <template #item="{ element: item }">
                                        <NavigationItem
                                            :item="item"
                                            :level="0"
                                            :selected-item-id="selectedItem?.id"
                                            :all-items="filteredItems"
                                            @select="selectItem"
                                            @edit="openEditModal"
                                            @delete="deleteItem"
                                        />
                                    </template>
                                </draggable>
                            </div>
                        </div>
                    </div>

                    <!-- Details Panel -->
                    <div class="lg:w-1/3">
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 h-full">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ selectedItem ? 'Item Details' : 'Quick Add' }}
                                </h3>
                                <button
                                    v-if="selectedItem"
                                    @click="selectedItem = null"
                                    class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    Clear
                                </button>
                            </div>
                            
                            <div v-if="selectedItem" class="space-y-4">
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedItem.label }}</div>
                                </div>
                                
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Path</label>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">{{ selectedItem.path || 'No path set' }}</div>
                                </div>
                                
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                                    <div class="flex items-center space-x-2">
                                        <div v-if="selectedItem.icon" class="flex items-center space-x-2">
                                            <font-awesome-icon :icon="['fas', selectedItem.icon]" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            <span class="text-sm text-gray-600 dark:text-gray-400">{{ selectedItem.icon }}</span>
                                        </div>
                                        <span v-else class="text-sm text-gray-400 dark:text-gray-500 italic">No icon</span>
                                    </div>
                                </div>
                                
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <span :class="[
                                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                                            selectedItem.is_active
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                        ]">
                                            {{ selectedItem.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                                            {{ selectedItem.parent_id ? 'Child' : 'Parent' }}
                                        </span>
                                    </div>
                                </div>

                                <div v-if="selectedItem.tenants && selectedItem.tenants.length > 0">
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Assigned Tenants</label>
                                    <div class="space-y-1">
                                        <div
                                            v-for="tenant in selectedItem.tenants"
                                            :key="tenant.id"
                                            class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                                        >
                                            <div class="flex items-center space-x-2">
                                                <font-awesome-icon :icon="['fas', 'building']" class="w-3 h-3 text-gray-500" />
                                                <div class="text-sm">{{ tenant.name }}</div>
                                            </div>
                                            <span class="text-xs text-gray-400">{{ tenant.tenant_code }}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div v-if="selectedItem.children && selectedItem.children.length > 0">
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Children</label>
                                    <div class="space-y-1">
                                        <div
                                            v-for="child in selectedItem.children"
                                            :key="child.id"
                                            class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                                        >
                                            <div class="flex items-center space-x-2">
                                                <font-awesome-icon v-if="child.icon" :icon="['fas', child.icon]" class="w-3 h-3 text-gray-500" />
                                                <div class="text-sm">{{ child.label }}</div>
                                                <span v-if="!child.is_active" class="text-xs text-gray-400">(Inactive)</span>
                                            </div>
                                            <button
                                                @click="selectItem(child)"
                                                class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex space-x-2 pt-4">
                                    <button
                                        @click="openEditModal(selectedItem)"
                                        class="flex-1 px-3 py-2 text-sm bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                                    >
                                        Edit Item
                                    </button>
                                    <button
                                        @click="deleteItem(selectedItem.id)"
                                        class="px-3 py-2 text-sm bg-red-600 dark:bg-red-700 text-white font-medium rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            
                            <div v-else class="space-y-4">
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Label <span class="text-red-500">*</span></label>
                                    <input
                                        v-model="newItem.label"
                                        type="text"
                                        placeholder="Enter item label"
                                        class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Path</label>
                                    <input
                                        v-model="newItem.path"
                                        type="text"
                                        placeholder="/dashboard"
                                        class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                                    <div class="relative">
                                        <button
                                            @click="showIconDropdown = !showIconDropdown"
                                            type="button"
                                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left flex items-center justify-between"
                                        >
                                            <div class="flex items-center space-x-2">
                                                <font-awesome-icon v-if="newItem.icon" :icon="['fas', newItem.icon]" class="w-4 h-4" />
                                                <span :class="newItem.icon ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">
                                                    {{ newItem.icon || 'Select an icon' }}
                                                </span>
                                            </div>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" class="w-4 h-4 text-gray-400" />
                                        </button>
                                        
                                        <div
                                            v-if="showIconDropdown"
                                            class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto"
                                        >
                                            <div class="p-2">
                                                <input
                                                    v-model="iconSearch"
                                                    type="text"
                                                    placeholder="Search icons..."
                                                    class="w-full px-3 py-2 mb-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900"
                                                />
                                                <div class="grid grid-cols-4 gap-1">
                                                    <button
                                                        v-for="icon in filteredAvailableIcons"
                                                        :key="icon.name"
                                                        @click="selectIcon(icon)"
                                                        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex flex-col items-center justify-center"
                                                        :title="icon.name"
                                                    >
                                                        <font-awesome-icon :icon="['fas', icon.name]" class="w-5 h-5 mb-1 text-gray-700 dark:text-gray-300" />
                                                        <div class="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">{{ icon.label }}</div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Item</label>
                                    <select
                                        v-model="newItem.parent_id"
                                        class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">No Parent (Top Level)</option>
                                        <option v-for="item in topLevelItems" :key="item.id" :value="item.id">
                                            {{ item.label }}
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Assign to Tenants <span class="text-red-500">*</span></label>
                                    <div class="space-y-2">
                                        <div class="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="selectAllTenants"
                                                v-model="selectAllTenants"
                                                @change="toggleAllTenants"
                                                class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                                            />
                                            <label for="selectAllTenants" class="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">Select All Tenants</label>
                                        </div>
                                        <div class="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-900">
                                            <div v-for="tenant in allTenants" :key="tenant.id" class="flex items-center space-x-2 mb-2 last:mb-0">
                                                <input
                                                    type="checkbox"
                                                    :id="`tenant-${tenant.id}`"
                                                    :value="tenant.id"
                                                    v-model="newItem.tenant_ids"
                                                    class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                                                />
                                                <label :for="`tenant-${tenant.id}`" class="text-xs text-gray-700 dark:text-gray-300 cursor-pointer flex-1">
                                                    {{ tenant.name }}
                                                    <span class="text-gray-500 dark:text-gray-400 text-xs ml-1">({{ tenant.tenant_code }})</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-4">
                                    <label class="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            v-model="newItem.is_active"
                                            class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                                        />
                                        <span class="text-xs text-gray-700 dark:text-gray-300">Active</span>
                                    </label>
                                </div>
                                
                                <button
                                    @click="addItem"
                                    :disabled="!newItem.label || !newItem.tenant_ids?.length || isAdding"
                                    class="w-full px-4 py-2 bg-green-600 dark:bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="isAdding" class="flex items-center justify-center">
                                        <font-awesome-icon :icon="['fas', 'spinner']" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                        Adding...
                                    </span>
                                    <span v-else>Add Navigation Item</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Edit Navigation Item
                    </h2>
                </div>
                
                <form @submit.prevent="updateItem" class="p-6 space-y-4">
                    <div>
                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Label <span class="text-red-500">*</span></label>
                        <input
                            v-model="editingItem.label"
                            type="text"
                            required
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    
                    <div>
                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Path</label>
                        <input
                            v-model="editingItem.path"
                            type="text"
                            placeholder="/dashboard"
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    
                    <div>
                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                        <div class="relative">
                            <button
                                @click="showEditIconDropdown = !showEditIconDropdown"
                                type="button"
                                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left flex items-center justify-between"
                            >
                                <div class="flex items-center space-x-2">
                                    <font-awesome-icon v-if="editingItem.icon" :icon="['fas', editingItem.icon]" class="w-4 h-4" />
                                    <span :class="editingItem.icon ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">
                                        {{ editingItem.icon || 'Select an icon' }}
                                    </span>
                                </div>
                                <font-awesome-icon :icon="['fas', 'angle-down']" class="w-4 h-4 text-gray-400" />
                            </button>
                            
                            <div
                                v-if="showEditIconDropdown"
                                class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto"
                            >
                                <div class="p-2">
                                    <input
                                        v-model="editIconSearch"
                                        type="text"
                                        placeholder="Search icons..."
                                        class="w-full px-3 py-2 mb-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900"
                                    />
                                    <div class="grid grid-cols-4 gap-1">
                                        <button
                                            v-for="icon in filteredEditIcons"
                                            :key="icon.name"
                                            @click="selectEditIcon(icon)"
                                            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex flex-col items-center justify-center"
                                            :title="icon.name"
                                        >
                                            <font-awesome-icon :icon="['fas', icon.name]" class="w-5 h-5 mb-1 text-gray-700 dark:text-gray-300" />
                                            <div class="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">{{ icon.label }}</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Item</label>
                        <select
                            v-model="editingItem.parent_id"
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="">No Parent (Top Level)</option>
                            <option v-for="item in topLevelItems.filter(i => i.id !== editingItem.id)" :key="item.id" :value="item.id">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Assign to Tenants <span class="text-red-500">*</span></label>
                        <div class="space-y-2">
                            <div class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="selectAllTenantsEdit"
                                    v-model="selectAllTenantsEdit"
                                    @change="toggleAllTenantsEdit"
                                    class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                                />
                                <label for="selectAllTenantsEdit" class="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">Select All Tenants</label>
                            </div>
                            <div class="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-900">
                                <div v-for="tenant in allTenants" :key="tenant.id" class="flex items-center space-x-2 mb-2 last:mb-0">
                                    <input
                                        type="checkbox"
                                        :id="`edit-tenant-${tenant.id}`"
                                        :value="tenant.id"
                                        v-model="editingItem.tenant_ids"
                                        class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                                    />
                                    <label :for="`edit-tenant-${tenant.id}`" class="text-xs text-gray-700 dark:text-gray-300 cursor-pointer flex-1">
                                        {{ tenant.name }}
                                        <span class="text-gray-500 dark:text-gray-400 text-xs ml-1">({{ tenant.tenant_code }})</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                v-model="editingItem.is_active"
                                class="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                            />
                            <span class="text-xs text-gray-700 dark:text-gray-300">Active</span>
                        </label>
                    </div>
                    
                    <div class="flex space-x-2 pt-4">
                        <button
                            type="button"
                            @click="closeEditModal"
                            class="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            :disabled="isUpdating || !editingItem.tenant_ids?.length"
                            class="flex-1 px-3 py-2 text-sm bg-green-600 dark:bg-green-700 text-white font-medium rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="isUpdating" class="flex items-center justify-center">
                                <font-awesome-icon :icon="['fas', 'spinner']" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                Updating...
                            </span>
                            <span v-else>Update Item</span>
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
                <font-awesome-icon 
                    v-if="notification.type === 'success'" 
                    :icon="['fas', 'check-circle']" 
                    class="w-5 h-5 mr-2" 
                />
                <font-awesome-icon 
                    v-else 
                    :icon="['fas', 'exclamation-circle']" 
                    class="w-5 h-5 mr-2" 
                />
                <span class="text-sm">{{ notification.message }}</span>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useApi } from '@/router/useApi';
import NavigationItem from './NavigationItem.vue';
import draggable from 'vuedraggable';

// Import Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import specific icons you need
import { 
    faTachometerAlt, 
    faCog, 
    faFileCode,
    faList,
    faWrench,
    faPlug,
    faChartBar,
    faCheckCircle,
    faCreditCard,
    faEdit,
    faAngleRight,
    faFileInvoiceDollar,
    faShoppingBag,
    faFileContract,
    faMoneyBillWaveAlt,
    faSearch,
    faPlus,
    faUsers,
    faFolder,
    faAngleDown,
    faSpinner,
    faExclamationCircle,
    faDashboard,
    faHome,
    faUser,
    faCalendar,
    faBell,
    faEnvelope,
    faFile,
    faTrash,
    faEye,
    faLock,
    faUnlock,
    faKey,
    faDownload,
    faUpload,
    faShare,
    faHeart,
    faStar,
    faFlag,
    faTag,
    faFilter,
    faSort,
    faSync,
    faQuestionCircle,
    faInfoCircle,
    faExclamationTriangle,
    faTimesCircle,
    faMoneyBill,
    faShoppingCart,
    faBox,
    faTruck,
    faPhone,
    faMapMarkerAlt,
    faGlobe,
    faClock,
    faBook,
    faClipboard,
    faPrint,
    faCamera,
    faImage,
    faVideo,
    faMusic,
    faGamepad,
    faLaptopCode,
    faWifi,
    faBatteryFull,
    faLightbulb,
    faTools,
    faShieldAlt,
    faRocket,
    faAngleUp,
    faBars,
    faBuilding,
    faGripVertical
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
    faTachometerAlt, 
    faCog, 
    faFileCode,
    faList,
    faWrench,
    faPlug,
    faChartBar,
    faCheckCircle,
    faCreditCard,
    faEdit,
    faAngleRight,
    faFileInvoiceDollar,
    faShoppingBag,
    faFileContract,
    faMoneyBillWaveAlt,
    faSearch,
    faPlus,
    faUsers,
    faFolder,
    faAngleDown,
    faSpinner,
    faExclamationCircle,
    faDashboard,
    faHome,
    faUser,
    faCalendar,
    faBell,
    faEnvelope,
    faFile,
    faTrash,
    faEye,
    faLock,
    faUnlock,
    faKey,
    faDownload,
    faUpload,
    faShare,
    faHeart,
    faStar,
    faFlag,
    faTag,
    faFilter,
    faSort,
    faSync,
    faQuestionCircle,
    faInfoCircle,
    faExclamationTriangle,
    faTimesCircle,
    faMoneyBill,
    faShoppingCart,
    faBox,
    faTruck,
    faPhone,
    faMapMarkerAlt,
    faGlobe,
    faClock,
    faBook,
    faClipboard,
    faPrint,
    faCamera,
    faImage,
    faVideo,
    faMusic,
    faGamepad,
    faLaptopCode,
    faWifi,
    faBatteryFull,
    faLightbulb,
    faTools,
    faShieldAlt,
    faRocket,
    faAngleUp,
    faBars,
    faBuilding,
    faGripVertical
)

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const allNavItems = ref([]);
const allTenants = ref([]);
const selectedItem = ref(null);
const editingItem = ref({});
const showEditModal = ref(false);
const isUpdating = ref(false);
const isAdding = ref(false);
const notification = ref({ message: '', type: '' });
const searchQuery = ref('');
const filters = ref({ topLevel: false, hasChildren: false });
const newItem = ref({
    label: '',
    path: '',
    icon: '',
    parent_id: '',
    is_active: true,
    tenant_ids: []
});
const showIconDropdown = ref(false);
const showEditIconDropdown = ref(false);
const iconSearch = ref('');
const editIconSearch = ref('');
const selectAllTenants = ref(false);
const selectAllTenantsEdit = ref(false);

// Draggable sorted items - initialize with empty array
const sortedItems = ref([]);

// Available Font Awesome icons for dropdown
const availableIcons = ref([
    { name: 'fa-tachometer-alt', label: 'Dashboard' },
    { name: 'fa-cog', label: 'Settings' },
    { name: 'fa-file-code', label: 'Code' },
    { name: 'fa-list', label: 'List' },
    { name: 'fa-wrench', label: 'Wrench' },
    { name: 'fa-plug', label: 'Plug' },
    { name: 'fa-chart-bar', label: 'Chart' },
    { name: 'fa-check-circle', label: 'Check' },
    { name: 'fa-credit-card', label: 'Credit Card' },
    { name: 'fa-edit', label: 'Edit' },
    { name: 'fa-angle-right', label: 'Right Arrow' },
    { name: 'fa-file-invoice-dollar', label: 'Invoice' },
    { name: 'fa-shopping-bag', label: 'Shopping' },
    { name: 'fa-file-contract', label: 'Contract' },
    { name: 'fa-money-bill-wave-alt', label: 'Money' },
    { name: 'fa-search', label: 'Search' },
    { name: 'fa-plus', label: 'Plus' },
    { name: 'fa-users', label: 'Users' },
    { name: 'fa-user', label: 'User' },
    { name: 'fa-home', label: 'Home' },
    { name: 'fa-calendar', label: 'Calendar' },
    { name: 'fa-bell', label: 'Bell' },
    { name: 'fa-envelope', label: 'Envelope' },
    { name: 'fa-file', label: 'File' },
    { name: 'fa-folder', label: 'Folder' },
    { name: 'fa-trash', label: 'Trash' },
    { name: 'fa-eye', label: 'Eye' },
    { name: 'fa-lock', label: 'Lock' },
    { name: 'fa-unlock', label: 'Unlock' },
    { name: 'fa-key', label: 'Key' },
    { name: 'fa-download', label: 'Download' },
    { name: 'fa-upload', label: 'Upload' },
    { name: 'fa-share', label: 'Share' },
    { name: 'fa-heart', label: 'Heart' },
    { name: 'fa-star', label: 'Star' },
    { name: 'fa-flag', label: 'Flag' },
    { name: 'fa-tag', label: 'Tag' },
    { name: 'fa-filter', label: 'Filter' },
    { name: 'fa-sort', label: 'Sort' },
    { name: 'fa-sync', label: 'Refresh' },
    { name: 'fa-question-circle', label: 'Question' },
    { name: 'fa-info-circle', label: 'Info' },
    { name: 'fa-exclamation-triangle', label: 'Warning' },
    { name: 'fa-times-circle', label: 'Error' },
    { name: 'fa-money-bill', label: 'Money Bill' },
    { name: 'fa-shopping-cart', label: 'Cart' },
    { name: 'fa-box', label: 'Package' },
    { name: 'fa-truck', label: 'Truck' },
    { name: 'fa-phone', label: 'Phone' },
    { name: 'fa-map-marker-alt', label: 'Location' },
    { name: 'fa-globe', label: 'Globe' },
    { name: 'fa-clock', label: 'Clock' },
    { name: 'fa-book', label: 'Book' },
    { name: 'fa-clipboard', label: 'Clipboard' },
    { name: 'fa-print', label: 'Printer' },
    { name: 'fa-camera', label: 'Camera' },
    { name: 'fa-image', label: 'Image' },
    { name: 'fa-video', label: 'Video' },
    { name: 'fa-music', label: 'Music' },
    { name: 'fa-gamepad', label: 'Game' },
    { name: 'fa-laptop-code', label: 'Code' },
    { name: 'fa-wifi', label: 'WiFi' },
    { name: 'fa-battery-full', label: 'Battery' },
    { name: 'fa-lightbulb', label: 'Lightbulb' },
    { name: 'fa-tools', label: 'Tools' },
    { name: 'fa-shield-alt', label: 'Shield' },
    { name: 'fa-rocket', label: 'Rocket' },
    { name: 'fa-angle-up', label: 'Up Arrow' },
    { name: 'fa-bars', label: 'Menu' }
]);

// Computed properties
const filteredAvailableIcons = computed(() => {
    if (!iconSearch.value) return availableIcons.value;
    return availableIcons.value.filter(icon => 
        icon.name.toLowerCase().includes(iconSearch.value.toLowerCase()) ||
        icon.label.toLowerCase().includes(iconSearch.value.toLowerCase())
    );
});

const filteredEditIcons = computed(() => {
    if (!editIconSearch.value) return availableIcons.value;
    return availableIcons.value.filter(icon => 
        icon.name.toLowerCase().includes(editIconSearch.value.toLowerCase()) ||
        icon.label.toLowerCase().includes(editIconSearch.value.toLowerCase())
    );
});

const topLevelItems = computed(() => {
    return allNavItems.value.filter(item => !item.parent_id);
});

const activeItemsCount = computed(() => {
    return allNavItems.value.filter(item => item.is_active).length;
});

const filteredItems = computed(() => {
    let items = [...allNavItems.value];

    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        items = items.filter(item =>
            item.label.toLowerCase().includes(q) ||
            (item.path && item.path.toLowerCase().includes(q))
        );
    }

    if (filters.value.topLevel) {
        items = items.filter(item => !item.parent_id);
    }

    if (filters.value.hasChildren) {
        const parentIds = new Set(allNavItems.value.filter(i => i.parent_id).map(i => i.parent_id));
        items = items.filter(item => parentIds.has(item.id));
    }

    return items;
});

// Watch for changes to filtered items to update sortedItems
watch(() => filteredItems.value, (newItems) => {
    // Sort by order if available, otherwise maintain current order
    const sorted = [...newItems].filter(i => !i.parent_id).sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
        }
        return 0;
    });
    sortedItems.value = sorted;
}, { immediate: true });

// Methods
const showNotification = (message, type = 'success') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 5000);
};

const loadData = async () => {
    try {
        const config = getAxiosConfig();
        const [navRes, tenantRes] = await Promise.all([
            axios.get('/api/landlord/nav-items/all', config),
            axios.get('/api/tenants', config) // Updated endpoint
        ]);
        allNavItems.value = navRes.data;
        allTenants.value = tenantRes.data;
    } catch (error) {
        console.error('Failed to load data:', error);
        showNotification('Failed to load data', 'error');
    }
};

const toggleFilter = (filterName) => {
    filters.value[filterName] = !filters.value[filterName];
};

const toggleAllTenants = () => {
    if (selectAllTenants.value) {
        newItem.value.tenant_ids = allTenants.value.map(t => t.id);
    } else {
        newItem.value.tenant_ids = [];
    }
};

const toggleAllTenantsEdit = () => {
    if (selectAllTenantsEdit.value) {
        editingItem.value.tenant_ids = allTenants.value.map(t => t.id);
    } else {
        editingItem.value.tenant_ids = [];
    }
};

const selectItem = (item) => {
    selectedItem.value = item;
};

const openEditModal = (item) => {
    editingItem.value = {
        ...item,
        tenant_ids: item.tenants ? item.tenants.map(t => t.id) : []
    };
    selectAllTenantsEdit.value = editingItem.value.tenant_ids.length === allTenants.value.length;
    showEditModal.value = true;
};

const closeEditModal = () => {
    showEditModal.value = false;
    editingItem.value = {};
    showEditIconDropdown.value = false;
    editIconSearch.value = '';
    selectAllTenantsEdit.value = false;
};

const openAddModal = () => {
    newItem.value = {
        label: '',
        path: '',
        icon: '',
        parent_id: '',
        is_active: true,
        tenant_ids: []
    };
    selectAllTenants.value = false;
    showIconDropdown.value = false;
    iconSearch.value = '';
};

const updateItem = async () => {
    if (!editingItem.value.tenant_ids || editingItem.value.tenant_ids.length === 0) {
        showNotification('Please select at least one tenant', 'error');
        return;
    }

    isUpdating.value = true;
    try {
        const config = getAxiosConfig();
        const payload = {
            ...editingItem.value,
            tenant_ids: editingItem.value.tenant_ids
        };
        await axios.put(`/api/landlord/nav-items/${editingItem.value.id}`, payload, config);
        await loadData();
        showNotification('Item updated successfully');
        closeEditModal();
        if (selectedItem.value?.id === editingItem.value.id) {
            // Reload selected item
            const updatedItem = allNavItems.value.find(item => item.id === editingItem.value.id);
            if (updatedItem) {
                selectedItem.value = updatedItem;
            }
        }
    } catch (error) {
        console.error('Failed to update item:', error);
        showNotification('Failed to update item', 'error');
    } finally {
        isUpdating.value = false;
    }
};

const addItem = async () => {
    if (!newItem.value.label) {
        showNotification('Please enter a label for the item', 'error');
        return;
    }

    if (!newItem.value.tenant_ids || newItem.value.tenant_ids.length === 0) {
        showNotification('Please select at least one tenant', 'error');
        return;
    }

    isAdding.value = true;
    try {
        const config = getAxiosConfig();
        const payload = {
            ...newItem.value,
            tenant_ids: newItem.value.tenant_ids
        };
        await axios.post('/api/landlord/nav-items', payload, config);
        await loadData();
        showNotification('Item added successfully');
        
        newItem.value = {
            label: '',
            path: '',
            icon: '',
            parent_id: '',
            is_active: true,
            tenant_ids: []
        };
        selectAllTenants.value = false;
        showIconDropdown.value = false;
        iconSearch.value = '';
    } catch (error) {
        console.error('Failed to add item:', error);
        showNotification('Failed to add item', 'error');
    } finally {
        isAdding.value = false;
    }
};

const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const config = getAxiosConfig();
        await axios.delete(`/api/landlord/nav-items/${id}`, config);
        
        if (selectedItem.value?.id === id) {
            selectedItem.value = null;
        }
        
        await loadData();
        showNotification('Item deleted successfully');
    } catch (error) {
        console.error('Failed to delete item:', error);
        showNotification('Failed to delete item', 'error');
    }
};

const onDragEnd = async () => {
    try {
        const orderIds = sortedItems.value.filter(i => !i.parent_id).map(item => item.id);
        const config = getAxiosConfig();
        await axios.post('/api/landlord/nav-items/reorder', { items: orderIds }, config);
        await loadData();
        showNotification('Order updated successfully');
    } catch (error) {
        console.error('Failed to reorder items:', error);
        showNotification('Failed to update order', 'error');
    }
};

const selectIcon = (icon) => {
    newItem.value.icon = icon.name;
    showIconDropdown.value = false;
};

const selectEditIcon = (icon) => {
    editingItem.value.icon = icon.name;
    showEditIconDropdown.value = false;
};

// Watch for tenant_ids changes to update select all checkbox
watch(() => newItem.value.tenant_ids, (tenantIds) => {
    selectAllTenants.value = tenantIds?.length === allTenants.value.length;
}, { deep: true });

watch(() => editingItem.value.tenant_ids, (tenantIds) => {
    selectAllTenantsEdit.value = tenantIds?.length === allTenants.value.length;
}, { deep: true });

// Lifecycle
onMounted(async () => {
    console.log('Navigation Manager component mounted, fetching data...');
    await loadData();
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

/* Compact form styling */
input, select, textarea {
    font-size: 0.875rem;
}

/* Icon dropdown styling */
.grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

/* Drag and drop styles */
.cursor-grabbing {
    cursor: grabbing !important;
}

.sortable-ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>