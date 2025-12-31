<template>
  <transition name="modal">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Modal Container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <transition name="modal-content">
            <!-- Modal Card -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <!-- Header -->
              <div class="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                      {{ mode === 'create' ? 'Add Prefix Configuration' : 'Edit Prefix Configuration' }}
                    </h2>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Configure document numbering format for {{ form.type || 'selected type' }}
                    </p>
                  </div>
                  <button
                    @click="closeModal"
                    class="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :disabled="submitting"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="max-h-[70vh] overflow-y-auto">
                <div class="px-8 py-6">
                  <!-- Help Panel (Collapsible) -->
                  <div class="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
                    <div class="px-5 py-4">
                      <div class="flex items-center justify-between cursor-pointer" @click="showHelp = !showHelp">
                        <div class="flex items-center space-x-3">
                          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Format Variables Guide</h3>
                        </div>
                        <svg 
                          class="w-5 h-5 text-gray-400 transition-transform duration-200" 
                          :class="{ 'rotate-180': showHelp }" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      <transition name="slide-down">
                        <div v-if="showHelp" class="mt-5 pt-5 border-t border-blue-100 dark:border-gray-700">
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div 
                              v-for="variable in formatVariables" 
                              :key="variable.key"
                              class="flex items-start p-3 bg-white/50 dark:bg-gray-700/30 rounded-lg hover:bg-white dark:hover:bg-gray-700/50 transition-colors"
                            >
                              <code class="text-sm font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded mr-3 min-w-[80px] text-center">
                                {{ variable.key }}
                              </code>
                              <span class="text-sm text-gray-600 dark:text-gray-300">{{ variable.description }}</span>
                            </div>
                          </div>
                          
                          <div class="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-gray-600">
                            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example Formats:</p>
                            <div class="space-y-2">
                              <div class="flex items-center text-sm">
                                <code class="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded mr-2">{prefix}{year}-{month}-{sequence}</code>
                                <span class="text-gray-500 dark:text-gray-400 mr-2">→</span>
                                <code class="text-blue-600 dark:text-blue-400">ORD-2024-12-0001</code>
                              </div>
                              <div class="flex items-center text-sm">
                                <code class="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded mr-2">{prefix}{yy}{mm}{sequence}</code>
                                <span class="text-gray-500 dark:text-gray-400 mr-2">→</span>
                                <code class="text-blue-600 dark:text-blue-400">ORD-24120001</code>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </div>

                  <!-- Form -->
                  <form @submit.prevent="$emit('save')" class="space-y-6">
                    <!-- Document Type & Status -->
                    <div class="grid grid-cols-2 gap-6">
                      <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Document Type <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <select
                            v-model="form.type"
                            required
                            class="w-full px-4 py-3 pl-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                            :class="{ 'border-red-300 dark:border-red-500': errors.type }"
                            :disabled="submitting"
                          >
                            <option value="" disabled>Select Document Type</option>
                            <option 
                              v-for="type in prefixTypes" 
                              :key="type.value" 
                              :value="type.value"
                              class="py-2"
                            >
                              {{ type.label }}
                            </option>
                          </select>
                          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                        <p v-if="errors.type" class="text-sm text-red-500 mt-1">{{ errors.type[0] }}</p>
                      </div>

                      <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Status <span class="text-red-500">*</span>
                        </label>
                        <div class="flex space-x-3">
                          <label class="flex-1">
                            <input
                              type="radio"
                              v-model="form.is_active"
                              :value="true"
                              :disabled="submitting"
                              class="peer sr-only"
                            />
                            <div class="flex items-center justify-center p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 peer-checked:border-green-500 dark:peer-checked:border-green-400 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-700 dark:peer-checked:text-green-300 cursor-pointer transition-all">
                              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Active
                            </div>
                          </label>
                          <label class="flex-1">
                            <input
                              type="radio"
                              v-model="form.is_active"
                              :value="false"
                              :disabled="submitting"
                              class="peer sr-only"
                            />
                            <div class="flex items-center justify-center p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 peer-checked:border-red-500 dark:peer-checked:border-red-400 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-700 dark:peer-checked:text-red-300 cursor-pointer transition-all">
                              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Inactive
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <!-- Prefix & Starting Number -->
                    <div class="grid grid-cols-2 gap-6">
                      <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Prefix <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            type="text"
                            v-model="form.prefix"
                            required
                            maxlength="10"
                            class="w-full px-4 py-3 pl-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                            placeholder="ORD-"
                            :disabled="submitting"
                          />
                          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                            </svg>
                          </div>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Max 10 characters, appears at the beginning
                        </p>
                      </div>

                      <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Starting Number <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            type="number"
                            v-model="form.next_number"
                            required
                            min="1"
                            class="w-full px-4 py-3 pl-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                            placeholder="1"
                            :disabled="submitting"
                          />
                          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Number to start counting from
                        </p>
                      </div>
                    </div>

                    <!-- Year & Month -->
                    <div class="grid grid-cols-2 gap-6">
                      <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Year <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <select
                            v-model="form.year"
                            required
                            class="w-full px-4 py-3 pl-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                            :disabled="submitting"
                          >
                            <option v-for="year in years" :key="year" :value="year" class="py-2">
                              {{ year }}
                            </option>
                          </select>
                          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Month <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <select
                            v-model="form.month"
                            required
                            class="w-full px-4 py-3 pl-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                            :disabled="submitting"
                          >
                            <option v-for="month in months" :key="month.value" :value="month.value" class="py-2">
                              {{ month.label }}
                            </option>
                          </select>
                          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Number Format -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Number Format <span class="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          @click="$emit('preview')"
                          class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
                          v-if="mode === 'edit'"
                        >
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview Format
                        </button>
                      </div>
                      <div class="relative">
                        <input
                          type="text"
                          v-model="form.format"
                          required
                          maxlength="100"
                          class="w-full px-4 py-3 pl-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                          placeholder="{prefix}{year}{month}{sequence}"
                          :disabled="submitting"
                        />
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        Use variables: <code class="text-blue-600 dark:text-blue-400">&#123;prefix&#125;</code>, 
                        <code class="text-blue-600 dark:text-blue-400">&#123;year&#125;</code>, 
                        <code class="text-blue-600 dark:text-blue-400">&#123;yy&#125;</code>, 
                        <code class="text-blue-600 dark:text-blue-400">&#123;month&#125;</code>, 
                        <code class="text-blue-600 dark:text-blue-400">&#123;mm&#125;</code>, 
                        <code class="text-blue-600 dark:text-blue-400">&#123;sequence&#125;</code>
                      </p>
                    </div>

                    <!-- Auto Reset Options -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Auto Reset Options
                      </label>
                      <div class="grid grid-cols-2 gap-3">
                        <label class="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            v-model="form.reset_monthly"
                            class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            :disabled="submitting"
                          />
                          <div class="ml-3">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Reset Monthly</span>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Reset to 1 each month</p>
                          </div>
                        </label>
                        <label class="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            v-model="form.reset_yearly"
                            class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            :disabled="submitting"
                          />
                          <div class="ml-3">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Reset Yearly</span>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Reset to 1 each year</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <!-- Description -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Description
                        <span class="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">(Optional)</span>
                      </label>
                      <textarea
                        v-model="form.description"
                        rows="3"
                        class="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all resize-none"
                        placeholder="Add a description for this configuration..."
                        :disabled="submitting"
                      ></textarea>
                    </div>

                    <!-- Preview -->
                    <transition name="slide-down">
                      <div v-if="showPreview && preview" class="mt-4 p-5 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-100 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-3">
                          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Preview</h4>
                          <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                            Next number
                          </span>
                        </div>
                        <code class="block text-xl font-mono text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-200 dark:border-gray-600">
                          {{ preview }}
                        </code>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Based on current settings, the next document will be numbered as above
                        </p>
                      </div>
                    </transition>
                  </form>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="closeModal"
                    :disabled="submitting"
                    class="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-900/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ submitting ? 'Saving...' : (mode === 'create' ? 'Create Configuration' : 'Update Configuration') }}
                  </button>
                </div>
              </div>
            </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  visible: boolean
  mode: 'create' | 'edit'
  form: any
  prefixTypes?: any[]
  years?: number[]
  months?: any[]
  errors: Record<string, string[]>
  preview?: string
  showPreview?: boolean
  submitting: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'save'): void
  (e: 'preview'): void
  (e: 'close'): void
}>()

const showHelp = ref(false)

const formatVariables = [
  { key: '{prefix}', description: 'The configured prefix text' },
  { key: '{year}', description: 'Full year (4 digits: 2026)' },
  { key: '{yy}', description: 'Last 2 digits of year (26)' },
  { key: '{month}', description: 'Month number (1-12)' },
  { key: '{mm}', description: 'Month with leading zero (01-12)' },
  { key: '{sequence}', description: 'Sequence number padded to 4 digits (0001)' },
  { key: '{day}', description: 'Day number (1-31)' },
  { key: '{dd}', description: 'Day with leading zero (01-31)' }
]

const closeModal = () => {
  if (!props.submitting) {
    emit('update:visible', false)
    emit('close')
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  animation: modalEnter 0.3s ease-out;
}

.modal-content-leave-active {
  animation: modalLeave 0.2s ease-in;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modalLeave {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
}
</style>