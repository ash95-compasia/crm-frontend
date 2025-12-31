<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Terms & Conditions</span>
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
                            Upload TNC
                        </button>
                        <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Documents</div>
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Documents</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total File Size</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ totalFileSize }}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Latest Update</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ latestUpdate || 'N/A' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
                    storage-key="terms-conditions-table"
                    :loading="loading"
                    :bulk-actions="bulkActions"
                    @bulk-action="handleBulkAction"
                    @refresh="fetchData"
                    @export="exportData"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Title Column with File Icon -->
                    <template #column-title="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ value || 'N/A' }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    PDF • {{ row.file_size }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Description Column -->
                    <template #column-description="{ value }">
                        <div class="text-sm text-gray-900 dark:text-gray-300">
                            {{ value ? truncateText(value, 100) : 'No description' }}
                        </div>
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
                                @click="viewFile(row)"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                title="View PDF"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>
                            <button 
                                @click="downloadFile(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Download PDF"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Download
                            </button>
                            <button 
                                @click="editTerms(row)"
                                class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Edit document"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button 
                                @click="deleteTerms(row)"
                                class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Delete document"
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
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ modalMode === 'create' ? 'Upload New Terms & Conditions' : 'Edit Terms & Conditions' }}
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
                        <form @submit.prevent="modalMode === 'create' ? createTerms() : updateTerms()" enctype="multipart/form-data">
                            <div class="space-y-4">
                                <!-- Title -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Document Title *
                                    </label>
                                    <input 
                                        type="text" 
                                        v-model="formData.title"
                                        required
                                        maxlength="255"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Enter document title"
                                        :disabled="isSubmitting"
                                    />
                                    <div v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title[0] }}</div>
                                </div>

                                <!-- Description -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea 
                                        v-model="formData.description"
                                        rows="3"
                                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Enter description (optional)"
                                        :disabled="isSubmitting"
                                    ></textarea>
                                    <div v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description[0] }}</div>
                                </div>

                                <!-- File Upload -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {{ modalMode === 'create' ? 'PDF File *' : 'Update PDF File (Optional)' }}
                                    </label>
                                    
                                    <!-- File Upload Area -->
                                    <div 
                                        @click="triggerFileInput"
                                        @dragover.prevent="dragOver = true"
                                        @dragleave="dragOver = false"
                                        @drop.prevent="handleFileDrop"
                                        :class="[
                                            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200',
                                            dragOver 
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                        ]"
                                    >
                                        <input 
                                            type="file" 
                                            ref="fileInput"
                                            @change="handleFileSelect"
                                            accept=".pdf"
                                            class="hidden"
                                            :required="modalMode === 'create'"
                                        />
                                        
                                        <div v-if="!selectedFile && !formData.file_path">
                                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                <span class="font-medium text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                                            </p>
                                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                                PDF files only (Max 5MB)
                                            </p>
                                        </div>
                                        
                                        <div v-else class="text-left">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                                    <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                    </svg>
                                                </div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                                                        {{ selectedFile ? selectedFile.name : 'Existing PDF file' }}
                                                    </div>
                                                    <div v-if="selectedFile" class="text-xs text-gray-500 dark:text-gray-400">
                                                        {{ formatFileSize(selectedFile.size) }}
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button"
                                                    @click.stop="removeFile"
                                                    class="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                                >
                                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div v-if="errors.file" class="text-red-500 text-xs mt-1">{{ errors.file[0] }}</div>
                                </div>

                                <!-- File Preview (for edit mode with existing file) -->
                                <div v-if="modalMode === 'edit' && formData.file_path && !selectedFile">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Current File
                                    </label>
                                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <div class="ml-3">
                                                <div class="text-sm text-gray-900 dark:text-gray-300">Existing PDF document</div>
                                                <div class="text-xs text-gray-500 dark:text-gray-400">Upload a new file to replace</div>
                                            </div>
                                        </div>
                                        <button 
                                            type="button"
                                            @click="viewExistingFile"
                                            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                                        >
                                            View
                                        </button>
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
                                    {{ isSubmitting ? 'Saving...' : (modalMode === 'create' ? 'Upload Document' : 'Update Document') }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- PDF Viewer Modal -->
        <div v-if="showPdfViewer" class="fixed inset-0 bg-gray-900 bg-opacity-90 z-50">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4">
                    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
                        <!-- PDF Viewer Header -->
                        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                                {{ currentPdfTitle }}
                            </h3>
                            <div class="flex items-center space-x-4">
                                <button 
                                    @click="downloadCurrentFile"
                                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                                    title="Download"
                                >
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </button>
                                <button 
                                    @click="closePdfViewer"
                                    class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <!-- PDF Viewer Content -->
                        <div class="flex-1 overflow-hidden">
                            <iframe 
                                :src="currentPdfUrl" 
                                class="w-full h-full border-0"
                                frameborder="0"
                                allowfullscreen
                            >
                                <p class="p-4 text-gray-600 dark:text-gray-400">
                                    Your browser does not support PDF viewing. 
                                    <a :href="currentPdfUrl" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank">
                                        Click here to download the PDF
                                    </a>
                                </p>
                            </iframe>
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
import axios from 'axios';
import GlobalTable from '@/Components/globalTable.vue';
import { useApi } from '@/router/useApi';

const { getAxiosConfig } = useApi();

// Reactive state
const result = ref({ data: [], total: 0, from: 0, to: 0 });
const loading = ref(false);
const notification = ref({ message: '', type: '' });
const showModal = ref(false);
const showPdfViewer = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const isSubmitting = ref(false);
const errors = ref({});
const dragOver = ref(false);
const selectedFile = ref(null);
const currentPdfUrl = ref('');
const currentPdfTitle = ref('');

// Form data
const formData = ref({
    id: null,
    title: '',
    description: '',
    file_path: ''
});

// Refs
const fileInput = ref(null);

// Table configuration
const tableColumns = computed(() => [
    {
        key: 'title',
        label: 'Document Title',
        sortable: true
    },
    {
        key: 'description',
        label: 'Description',
        sortable: false
    },
    {
        key: 'created_at',
        label: 'Uploaded',
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
        placeholder: 'Search by title or description...'
    }
];

const bulkActions = [
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

const totalFileSize = computed(() => {
    if (!tableData.value.length) return '0 KB';
    
    let totalBytes = 0;
    // Note: In a real app, you might want to calculate this from the backend
    return tableData.value.length + ' documents';
});

const latestUpdate = computed(() => {
    if (!tableData.value.length) return 'N/A';
    
    const latest = tableData.value.reduce((latest, current) => {
        return new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest;
    });
    
    return formatDate(latest.updated_at);
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
        const response = await axios.get('/api/terms-conditions', { 
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
        showNotification('Failed to load terms & conditions!', 'error');
    } finally {
        loading.value = false;
    }
};

const openCreateModal = () => {
    modalMode.value = 'create';
    resetForm();
    showModal.value = true;
};

const openEditModal = (terms) => {
    modalMode.value = 'edit';
    formData.value = {
        id: terms.id,
        title: terms.title,
        description: terms.description || '',
        file_path: terms.file_path
    };
    selectedFile.value = null;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    errors.value = {};
    dragOver.value = false;
    selectedFile.value = null;
    setTimeout(() => {
        resetForm();
    }, 300);
};

const resetForm = () => {
    formData.value = {
        id: null,
        title: '',
        description: '',
        file_path: ''
    };
    errors.value = {};
    selectedFile.value = null;
};

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (file.type !== 'application/pdf') {
            showNotification('Only PDF files are allowed', 'error');
            return;
        }
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size must be less than 5MB', 'error');
            return;
        }
        
        selectedFile.value = file;
        
        // Auto-fill title from filename if empty
        if (!formData.value.title) {
            formData.value.title = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        }
    }
};

const handleFileDrop = (event) => {
    dragOver.value = false;
    const file = event.dataTransfer.files[0];
    if (file) {
        const input = fileInput.value;
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        handleFileSelect({ target: input });
    }
};

const removeFile = () => {
    selectedFile.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const createTerms = async () => {
    isSubmitting.value = true;
    errors.value = {};

    if (!selectedFile.value) {
        showNotification('Please select a PDF file to upload', 'error');
        isSubmitting.value = false;
        return;
    }

    try {
        const formDataObj = new FormData();
        formDataObj.append('title', formData.value.title);
        formDataObj.append('description', formData.value.description || '');
        formDataObj.append('file', selectedFile.value);

        const response = await axios.post('/api/terms-conditions', formDataObj, {
            ...getAxiosConfig('multipart/form-data'),
        });
        
        if (response.data.success) {
            showNotification('Terms & Conditions uploaded successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to upload document', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const updateTerms = async () => {
    isSubmitting.value = true;
    errors.value = {};

    try {
        const formDataObj = new FormData();
        formDataObj.append('title', formData.value.title);
        formDataObj.append('description', formData.value.description || '');
        
        if (selectedFile.value) {
            formDataObj.append('file', selectedFile.value);
        }

        // Use _method=PUT for Laravel to handle PUT with FormData
        formDataObj.append('_method', 'PUT');

        const response = await axios.post(`/api/terms-conditions/${formData.value.id}`, formDataObj, {
            ...getAxiosConfig('multipart/form-data')
        });
        
        if (response.data.success) {
            showNotification('Terms & Conditions updated successfully!', 'success');
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
            showNotification(error.response?.data?.message || 'Failed to update document', 'error');
        }
    } finally {
        isSubmitting.value = false;
    }
};

const deleteTerms = async (terms) => {
    if (!confirm(`Are you sure you want to delete "${terms.title}"?`)) {
        return;
    }

    try {
        const response = await axios.delete(`/api/terms-conditions/${terms.id}`, getAxiosConfig());
        
        if (response.data.success) {
            showNotification('Terms & Conditions deleted successfully!', 'success');
            await fetchData();
        } else {
            showNotification(response.data.message, 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to delete document', 'error');
    }
};

const viewFile = async (terms) => {
    try {
        const response = await axios.get(`/api/terms-conditions/${terms.id}/view`, getAxiosConfig());
        
        if (response.data.success) {
            currentPdfUrl.value = response.data.data.url;
            currentPdfTitle.value = response.data.data.title;
            showPdfViewer.value = true;
        } else {
            showNotification('Failed to load PDF file', 'error');
        }
    } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to view document', 'error');
    }
};

const viewExistingFile = () => {
    // For edit mode, view the existing file
    if (formData.value.file_path) {
        // Construct the URL from the file path
        currentPdfUrl.value = `/storage/${formData.value.file_path}`;
        currentPdfTitle.value = formData.value.title;
        showPdfViewer.value = true;
    }
};

const downloadFile = async (terms) => {
    try {
        const response = await axios.get(
            `/api/terms-conditions/${terms.id}/download`,
            {
                ...getAxiosConfig(),
                responseType: 'blob'  // Critical: tells Axios to treat response as binary
            }
        );

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        
        // Create a temporary link and click it
        const link = document.createElement('a');
        link.href = url;
        
        // Extract filename from header or fallback to title
        const filename = terms.title ? `${terms.title}.pdf` : 'terms-conditions.pdf';
        link.setAttribute('download', filename);
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        showNotification('File downloaded successfully', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showNotification('Failed to download file', 'error');
    }
};

const downloadCurrentFile = () => {
    if (currentPdfUrl.value) {
        const link = document.createElement('a');
        link.href = currentPdfUrl.value;
        link.download = currentPdfTitle.value + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

const closePdfViewer = () => {
    showPdfViewer.value = false;
    currentPdfUrl.value = '';
    currentPdfTitle.value = '';
};

const handleBulkAction = async (action, selectedIds) => {
    if (selectedIds.length === 0) {
        showNotification('Please select at least one document', 'error');
        return;
    }

    if (action === 'delete') {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} document(s)?`)) {
            return;
        }

        for (const id of selectedIds) {
            try {
                await axios.delete(`/api/terms-conditions/${id}`, getAxiosConfig());
            } catch (error) {
                console.error(`Failed to delete document ${id}:`, error);
            }
        }

        showNotification(`${selectedIds.length} document(s) deleted successfully!`, 'success');
        await fetchData();
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

const truncateText = (text, length) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
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

// Lifecycle
onMounted(async () => {
    await fetchData();
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

/* PDF Viewer iframe styling */
iframe {
    min-height: 600px;
}

@media (max-width: 768px) {
    iframe {
        min-height: 400px;
    }
}
</style>