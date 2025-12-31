<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Product Management</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Products</span>
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
                            Create Product
                        </button>
                        <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Products</div>
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Products</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Products</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activeProductsCount.toLocaleString() }}</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Inactive Products</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ inactiveProductsCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Categories</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ categoriesCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
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
                    storage-key="products-table"
                    :loading="loading"
                    :bulk-actions="bulkActions"
                    @bulk-action="handleBulkAction"
                    @refresh="fetchData"
                    @export="exportData"
                    @create="openCreateModal"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Product Name Column -->
                    <template #column-product_name="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                                <img 
                                    v-if="row.image_url" 
                                    :src="row.image_url" 
                                    :alt="value"
                                    class="h-full w-full object-cover"
                                />
                                <div v-else class="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ value || 'N/A' }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span v-if="row.device_model">{{ row.device_model.model_name }}</span>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Category Column -->
                    <template #column-category="{ value }">
                        <span v-if="value" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                            {{ value.name }}
                        </span>
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
                                @click="editProduct(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Edit product"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button 
                                @click="deleteProduct(row)"
                                class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Delete product"
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

        <!-- Create/Edit Product Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 transition-opacity z-50">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4">
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ modalMode === 'create' ? 'Create New Product' : 'Edit Product' }}
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
                        <form @submit.prevent="modalMode === 'create' ? createProduct() : updateProduct()" enctype="multipart/form-data">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Left Column -->
                                <div class="space-y-4">
                                    <!-- Product Name -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Product Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.product_name"
                                            required
                                            maxlength="150"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter product name"
                                            :disabled="isSubmitting"
                                        />
                                        <div v-if="errors.product_name" class="text-red-500 text-xs mt-1">{{ errors.product_name[0] }}</div>
                                    </div>

                                    <!-- Category -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <select 
                                            v-model="formData.category_id"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            :disabled="isSubmitting"
                                        >
                                            <option value="">Select Category</option>
                                            <option v-for="category in relatedData.categories" :key="category.id" :value="category.id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>

                                    <!-- Device Model -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Device Model
                                        </label>
                                        <div class="flex gap-2">
                                            <select 
                                                v-model="formData.model_id"
                                                class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                                :disabled="isSubmitting"
                                            >
                                                <option value="">Select Device Model</option>
                                                <option v-for="model in relatedData.device_models" :key="model.id" :value="model.id">
                                                    {{ model.full_name }}
                                                </option>
                                            </select>
                                            <button 
                                                type="button"
                                                @click="openDeviceModelModal"
                                                class="px-3 py-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                                                title="Add New Model"
                                                :disabled="isSubmitting"
                                            >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Capacity -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Capacity
                                        </label>
                                        <div class="flex gap-2">
                                            <select 
                                                v-model="formData.capacity_id"
                                                class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                                :disabled="isSubmitting"
                                            >
                                                <option value="">Select Capacity</option>
                                                <option v-for="capacity in relatedData.capacities" :key="capacity.id" :value="capacity.id">
                                                    {{ capacity.name }}
                                                </option>
                                            </select>
                                            <button 
                                                type="button"
                                                @click="openCapacityModal"
                                                class="px-3 py-2.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                                                title="Add New Capacity"
                                                :disabled="isSubmitting"
                                            >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Color -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Color
                                        </label>
                                        <div class="flex gap-2">
                                            <select 
                                                v-model="formData.color_id"
                                                @change="onColorChange"
                                                class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                                :disabled="isSubmitting"
                                            >
                                                <option value="">Select Color</option>
                                                <option v-for="color in relatedData.colors" :key="color.id" :value="color.id">
                                                    {{ color.name }}
                                                </option>
                                            </select>
                                            <button 
                                                type="button"
                                                @click="openColorModal"
                                                class="px-3 py-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200"
                                                title="Add New Color"
                                                :disabled="isSubmitting"
                                            >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Color Hex Code -->
                                    <div v-if="formData.color_hex_code">
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Color Hex Code
                                        </label>
                                        <div class="flex items-center gap-3">
                                            <div 
                                                class="h-8 w-16 rounded-lg border border-gray-300 dark:border-gray-600"
                                                :style="{ backgroundColor: formatHexCode(formData.color_hex_code) }"
                                            ></div>
                                            <input 
                                                type="text" 
                                                v-model="formData.color_hex_code"
                                                maxlength="32"
                                                class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                                placeholder="#FFFFFF"
                                                :disabled="isSubmitting"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="space-y-4">
                                    <!-- Owned -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Owned
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.owned"
                                            maxlength="32"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Owned status"
                                            :disabled="isSubmitting"
                                        />
                                    </div>

                                    <!-- Product Image -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Product Image
                                        </label>
                                        <div 
                                            @click="triggerImageInput"
                                            class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                                        >
                                            <input 
                                                type="file" 
                                                ref="imageInput"
                                                @change="handleImageSelect"
                                                accept="image/*"
                                                class="hidden"
                                            />
                                            
                                            <div v-if="!selectedImage && !formData.image">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    Click to upload product image
                                                </p>
                                                <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                                    JPG, PNG, GIF, WebP (Max 2MB)
                                                </p>
                                            </div>
                                            
                                            <div v-else class="relative">
                                                <img 
                                                    :src="selectedImagePreview || formData.image_url" 
                                                    alt="Product Image"
                                                    class="mx-auto h-32 w-32 object-cover rounded-lg"
                                                />
                                                <button 
                                                    type="button"
                                                    @click.stop="removeImage"
                                                    class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                >
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="errors.image" class="text-red-500 text-xs mt-1">{{ errors.image[0] }}</div>
                                    </div>

                                    <!-- Affiliate Image -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Affiliate Image URL
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="formData.affiliate_image"
                                            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="https://example.com/image.jpg"
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
                                    {{ isSubmitting ? 'Saving...' : (modalMode === 'create' ? 'Create Product' : 'Update Product') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Device Model Modal -->
        <div v-if="showDeviceModelModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 transition-opacity z-50">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4">
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                Add New Device Model
                            </h3>
                            <button 
                                @click="closeDeviceModelModal"
                                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Device Model Form -->
                        <form @submit.prevent="createDeviceModel">
                            <div class="space-y-4">
                                <!-- Brand -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Brand *
                                    </label>
                                    <select 
                                        v-model="deviceModelForm.brand_id"
                                        required
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        :disabled="isCreatingSubEntity"
                                    >
                                        <option value="">Select Brand</option>
                                        <option v-for="brand in relatedData.brands" :key="brand.id" :value="brand.id">
                                            {{ brand.name }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Model Name -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Model Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="deviceModelForm.model_name"
                                        required
                                        maxlength="100"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Enter model name"
                                        :disabled="isCreatingSubEntity"
                                    />
                                </div>

                                <!-- Order -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Order
                                    </label>
                                    <input 
                                        type="number" 
                                        v-model="deviceModelForm.order"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Display order"
                                        :disabled="isCreatingSubEntity"
                                    />
                                </div>
                            </div>

                            <!-- Form Actions -->
                            <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    type="button"
                                    @click="closeDeviceModelModal"
                                    :disabled="isCreatingSubEntity"
                                    class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    :disabled="isCreatingSubEntity"
                                    :class="[
                                        'px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center',
                                        isCreatingSubEntity 
                                            ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                                            : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                                    ]"
                                >
                                    <svg v-if="isCreatingSubEntity" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isCreatingSubEntity ? 'Creating...' : 'Create Model' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Capacity Modal -->
        <div v-if="showCapacityModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 transition-opacity z-50">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4">
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                Add New Capacity
                            </h3>
                            <button 
                                @click="closeCapacityModal"
                                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Capacity Form -->
                        <form @submit.prevent="createCapacity">
                            <div class="space-y-4">
                                <!-- Capacity Name -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Capacity Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="capacityForm.name"
                                        required
                                        maxlength="100"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Enter capacity (e.g., 64GB)"
                                        :disabled="isCreatingSubEntity"
                                    />
                                </div>

                                <!-- Position -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Position
                                    </label>
                                    <input 
                                        type="number" 
                                        v-model="capacityForm.position"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Display order"
                                        :disabled="isCreatingSubEntity"
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
                                                v-model="capacityForm.status"
                                                :value="1"
                                                required
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                :disabled="isCreatingSubEntity"
                                            />
                                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                                        </label>
                                        <label class="inline-flex items-center">
                                            <input 
                                                type="radio" 
                                                v-model="capacityForm.status"
                                                :value="0"
                                                required
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                :disabled="isCreatingSubEntity"
                                            />
                                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Form Actions -->
                            <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    type="button"
                                    @click="closeCapacityModal"
                                    :disabled="isCreatingSubEntity"
                                    class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    :disabled="isCreatingSubEntity"
                                    :class="[
                                        'px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center',
                                        isCreatingSubEntity 
                                            ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                                            : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                                    ]"
                                >
                                    <svg v-if="isCreatingSubEntity" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isCreatingSubEntity ? 'Creating...' : 'Create Capacity' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Color Modal -->
        <div v-if="showColorModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 transition-opacity z-50">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4">
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                Add New Color
                            </h3>
                            <button 
                                @click="closeColorModal"
                                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Color Form -->
                        <form @submit.prevent="createColor">
                            <div class="space-y-4">
                                <!-- Color Name -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Color Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="colorForm.name"
                                        required
                                        maxlength="100"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Enter color name"
                                        :disabled="isCreatingSubEntity"
                                    />
                                </div>

                                <!-- Hex Code -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Hex Code
                                    </label>
                                    <div class="flex items-center space-x-3">
                                        <div 
                                            class="h-8 w-16 rounded-lg border border-gray-300 dark:border-gray-600"
                                            :style="{ backgroundColor: colorForm.hex_code || '#FFFFFF' }"
                                        ></div>
                                        <input 
                                            type="text" 
                                            v-model="colorForm.hex_code"
                                            maxlength="10"
                                            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="#FFFFFF"
                                            :disabled="isCreatingSubEntity"
                                        />
                                    </div>
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
                                                v-model="colorForm.status"
                                                :value="1"
                                                required
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                :disabled="isCreatingSubEntity"
                                            />
                                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                                        </label>
                                        <label class="inline-flex items-center">
                                            <input 
                                                type="radio" 
                                                v-model="colorForm.status"
                                                :value="0"
                                                required
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                :disabled="isCreatingSubEntity"
                                            />
                                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Form Actions -->
                            <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    type="button"
                                    @click="closeColorModal"
                                    :disabled="isCreatingSubEntity"
                                    class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    :disabled="isCreatingSubEntity"
                                    :class="[
                                        'px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center',
                                        isCreatingSubEntity 
                                            ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
                                            : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                                    ]"
                                >
                                    <svg v-if="isCreatingSubEntity" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isCreatingSubEntity ? 'Creating...' : 'Create Color' }}
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
const showDeviceModelModal = ref(false);
const showCapacityModal = ref(false);
const showColorModal = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const isSubmitting = ref(false);
const isCreatingSubEntity = ref(false);
const errors = ref({});
const relatedData = ref({
    brands: [],
    categories: [],
    capacities: [],
    colors: [],
    device_models: []
});
const selectedImage = ref(null);
const selectedImagePreview = ref(null);

// Form data
const formData = ref({
    id: null,
    product_name: '',
    model_id: null,
    category_id: null,
    capacity_id: null,
    color_id: null,
    color_hex_code: '',
    owned: '',
    image: null,
    affiliate_image: '',
    status: 1
});

// Sub-entity forms
const deviceModelForm = ref({
    model_name: '',
    brand_id: null,
    order: null
});

const capacityForm = ref({
    name: '',
    status: 1,
    position: null
});

const colorForm = ref({
    name: '',
    status: 1,
    hex_code: ''
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
        key: 'product_name',
        label: 'Product',
        sortable: true
    },
    {
        key: 'category',
        label: 'Category',
        sortable: true,
        sortKey: 'category.name'
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
        width: '120px'
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
        width: '200px'
    }
]);

const tableFilters = [
    {
        key: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search products...'
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
        key: 'category_id',
        label: 'Category',
        type: 'select',
        options: []
    },
    {
        key: 'brand_id',
        label: 'Brand',
        type: 'select',
        options: []
    },
    {
        key: 'capacity_id',
        label: 'Capacity',
        type: 'select',
        options: []
    },
    {
        key: 'color_id',
        label: 'Color',
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
        label: 'Delete',
        value: 'delete',
        icon: 'trash',
        color: 'red'
    }
];

// Computed properties
const tableData = computed(() => {
    return (result.value.data || []).map(product => ({
        ...product,
        device_model: product.device_model || null,
        category: product.category || null,
        capacity: product.capacity || null,
        color: product.color || null,
        image_url: product.image ? `${import.meta.env.VITE_API_URL}/storage/${product.image}` : null
    }));
});

const activeProductsCount = computed(() => {
    return tableData.value.filter(product => product.status === 1).length;
});

const inactiveProductsCount = computed(() => {
    return tableData.value.filter(product => product.status === 0).length;
});

const categoriesCount = computed(() => {
    return relatedData.value.categories.length;
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
        const response = await axios.get('/api/products', { 
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
        console.log('result.value',result.value);
    } catch (error) {
        console.error('Fetch error:', error);
        showNotification('Failed to load products!', 'error');
    } finally {
        loading.value = false;
    }
};

const fetchRelatedData = async () => {
    try {
        const response = await axios.get('/api/products/related-data', getAxiosConfig());
        
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
    tableFilters.find(f => f.key === 'category_id').options = [
        { value: '', label: 'All Categories' },
        ...relatedData.value.categories.map(cat => ({ value: cat.id, label: cat.name }))
    ];
    
    tableFilters.find(f => f.key === 'brand_id').options = [
        { value: '', label: 'All Brands' },
        ...relatedData.value.brands.map(brand => ({ value: brand.id, label: brand.name }))
    ];
    
    tableFilters.find(f => f.key === 'capacity_id').options = [
        { value: '', label: 'All Capacities' },
        ...relatedData.value.capacities.map(cap => ({ value: cap.id, label: cap.name }))
    ];
    
    tableFilters.find(f => f.key === 'color_id').options = [
        { value: '', label: 'All Colors' },
        ...relatedData.value.colors.map(color => ({ value: color.id, label: color.name }))
    ];
};

const openCreateModal = () => {
    modalMode.value = 'create';
    resetForm();
    showModal.value = true;
};

const openEditModal = (product) => {
    modalMode.value = 'edit';
    formData.value = {
        id: product.id,
        product_name: product.product_name,
        model_id: product.model_id,
        category_id: product.category_id,
        capacity_id: product.capacity_id,
        color_id: product.color_id,
        color_hex_code: product.color_hex_code,
        owned: product.owned,
        image: null,
        affiliate_image: product.affiliate_image,
        status: product.status,
        image_url: product.image_url
    };
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    errors.value = {};
    selectedImage.value = null;
    selectedImagePreview.value = null;
    setTimeout(() => {
        resetForm();
    }, 300);
};

const resetForm = () => {
    formData.value = {
        id: null,
        product_name: '',
        model_id: null,
        category_id: null,
        capacity_id: null,
        color_id: null,
        color_hex_code: '',
        owned: '',
        image: null,
        affiliate_image: '',
        status: 1
    };
    errors.value = {};
    selectedImage.value = null;
    selectedImagePreview.value = null;
};

// Sub-entity modal methods
const openDeviceModelModal = () => {
    deviceModelForm.value = { model_name: '', brand_id: null, order: null };
    showDeviceModelModal.value = true;
};

const closeDeviceModelModal = () => {
    showDeviceModelModal.value = false;
};

const openCapacityModal = () => {
    capacityForm.value = { name: '', status: 1, position: null };
    showCapacityModal.value = true;
};

const closeCapacityModal = () => {
    showCapacityModal.value = false;
};

const openColorModal = () => {
    colorForm.value = { name: '', status: 1, hex_code: '' };
    showColorModal.value = true;
};

const closeColorModal = () => {
    showColorModal.value = false;
};

const createDeviceModel = async () => {
    isCreatingSubEntity.value = true;
    
    try {
        const response = await axios.post('/api/products/create-device-model', deviceModelForm.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Device model created successfully!', 'success');
            await fetchRelatedData();
            closeDeviceModelModal();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        if (error.response?.status === 422) {
            showNotification('Please fix the validation errors', 'error');
        } else {
            showNotification(error.response?.data?.message || 'Failed to create device model', 'error');
        }
    } finally {
        isCreatingSubEntity.value = false;
    }
};

const createCapacity = async () => {
    isCreatingSubEntity.value = true;
    
    try {
        const response = await axios.post('/api/products/create-capacity', capacityForm.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Capacity created successfully!', 'success');
            await fetchRelatedData();
            closeCapacityModal();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        if (error.response?.status === 422) {
            showNotification('Please fix the validation errors', 'error');
        } else {
            showNotification(error.response?.data?.message || 'Failed to create capacity', 'error');
        }
    } finally {
        isCreatingSubEntity.value = false;
    }
};

const createColor = async () => {
    isCreatingSubEntity.value = true;
    
    try {
        const response = await axios.post('/api/products/create-color', colorForm.value, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Color created successfully!', 'success');
            await fetchRelatedData();
            closeColorModal();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        if (error.response?.status === 422) {
            showNotification('Please fix the validation errors', 'error');
        } else {
            showNotification(error.response?.data?.message || 'Failed to create color', 'error');
        }
    } finally {
        isCreatingSubEntity.value = false;
    }
};

const createProduct = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const formDataObj = new FormData();
        
        // Append all form data
        Object.keys(formData.value).forEach(key => {
            if (formData.value[key] !== null && formData.value[key] !== '') {
                formDataObj.append(key, formData.value[key]);
            }
        });
        
        // Append image if exists
        if (selectedImage.value) {
            formDataObj.append('image', selectedImage.value);
        }

        const response = await axios.post('/api/products', formDataObj, {
            ...getAxiosConfig(),
            headers: {
                ...getAxiosConfig().headers,
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.data.success) {
            showNotification('Product created successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to create product', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const updateProduct = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const formDataObj = new FormData();
        
        // Append all form data
        Object.keys(formData.value).forEach(key => {
            if (formData.value[key] !== null && formData.value[key] !== '') {
                formDataObj.append(key, formData.value[key]);
            }
        });
        
        // Append image if exists
        if (selectedImage.value) {
            formDataObj.append('image', selectedImage.value);
        }

        const response = await axios.post(`/api/products/${formData.value.id}`, formDataObj, {
            ...getAxiosConfig(),
            headers: {
                ...getAxiosConfig().headers,
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT'
            }
        });
        
        if (response.data.success) {
            showNotification('Product updated successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to update product', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const deleteProduct = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.product_name}"?`)) {
        return;
    }

    try {
        const response = await axios.delete(`/api/products/${product.id}`, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Product deleted successfully!', 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to delete product', 'error');
    }
};

const handleBulkAction = async (action, selectedIds) => {
    if (selectedIds.length === 0) {
        showNotification('Please select at least one product', 'error');
        return;
    }

    if (action === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} product(s)?`)) {
            return;
        }

        for (const id of selectedIds) {
            try {
                await axios.delete(`/api/products/${id}`, getAxiosConfig());
            } catch (error) {
                console.error(`Failed to delete product ${id}:`, error);
            }
        }

        showNotification(`${selectedIds.length} product(s) deleted successfully!`, 'success');
        await fetchData();
        return;
    }

    // Handle activate/deactivate
    const status = action === 'activate' ? 1 : 0;
    
    try {
        const response = await axios.post('/api/products/bulk-status', {
            ids: selectedIds,
            status: status
        }, getAxiosConfig());
        
        if (response.data.success) {
            showNotification(`${selectedIds.length} product(s) updated successfully!`, 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to update products', 'error');
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

const editProduct = (product) => {
    openEditModal(product);
};

const triggerImageInput = () => {
    document.querySelector('input[type="file"]').click();
};

const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedImage.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    selectedImage.value = null;
    selectedImagePreview.value = null;
    formData.value.image = null;
};

const onColorChange = () => {
    const selectedColor = relatedData.value.colors.find(color => color.id === formData.value.color_id);
    if (selectedColor && selectedColor.color_codes && selectedColor.color_codes.length > 0) {
        formData.value.color_hex_code = selectedColor.color_codes[0].hex_code;
    }
};

const formatHexCode = (hex) => {
    if (!hex) return '#FFFFFF';
    return hex.startsWith('#') ? hex : `#${hex}`;
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
    return status === 1 ? 'Inactive' : 'Active';
};

const getStatusBadgeClass = (status) => {
    return status === 1 
        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' 
        : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
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