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
                    <router-link to="/dashboard">
                        <img src="/images/compasia.png" alt="Compasia Logo" class="h-16 w-16 rounded-full object-cover logo-hover shadow-lg border border-gray-200" />
                    </router-link>
                    <div>
                        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">Credit Check Logs</h1>
                        <p class="text-gray-600 mt-1">Monitor and manage credit validation results</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-gray-600 text-sm">Total Records</div>
                    <div class="text-2xl font-bold text-green-600">{{ totalRecords.toLocaleString() }}</div>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Passed Checks</p>
                            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.passed.toLocaleString() }}</p>
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
                            <p class="text-gray-600 text-sm">Failed Checks</p>
                            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.failed.toLocaleString() }}</p>
                        </div>
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Today's Checks</p>
                            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.today.toLocaleString() }}</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
        </div>

          <!-- Filters Section -->
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
              <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-bold text-gray-900">Filters & Search</h2>
                  <button
                      @click="resetFilters"
                      class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-2 border border-gray-300"
                  >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <span>Reset Filters</span>
                  </button>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <!-- Search Bar -->
                  <div>
                      <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search by NRIC</label>
                      <div class="relative">
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                              </svg>
                          </div>
                          <input
                              id="search"
                              v-model="searchQuery"
                              type="text"
                              placeholder="Enter NRIC number..."
                              class="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-colors duration-200"
                              @keyup.enter="applyFilters"
                          />
                      </div>
                  </div>

                  <!-- Rule Filter -->
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Rule Filter</label>
                      <v-select
                          v-model="tempSelectedRules"
                          :options="ruleOptions"
                          multiple
                          :close-on-select="false"
                          label="label"
                          :reduce="rule => rule.value"
                          track-by="value"
                          placeholder="Select rules..."
                          class="custom-v-select"
                      ></v-select>
                  </div>

                  <!-- Status Filter -->
                  <div>
                      <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <div class="relative">
                          <select
                              id="status"
                              v-model="statusFilter"
                              class="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-gray-900 transition-colors duration-200"
                              @change="applyFilters"
                          >
                              <option value="all">All Status</option>
                              <option value="pass">Pass Only</option>
                              <option value="fail">Fail Only</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                          </div>
                      </div>
                  </div>

                  <!-- Filter Mode -->
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Filter Mode</label>
                      <div class="space-y-3">
                          <div class="flex items-center justify-between">
                              <span class="text-sm text-gray-600">{{ filterMode === 'any' ? 'Match Any Rules' : 'Match All Rules' }}</span>
                              <button
                                  @click="filterMode = filterMode === 'any' ? 'all' : 'any'; applyFilters()"
                                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                  :class="filterMode === 'all' ? 'bg-green-600' : 'bg-gray-200'"
                              >
                                  <span class="sr-only">Toggle filter mode</span>
                                  <span
                                      aria-hidden="true"
                                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                      :class="filterMode === 'all' ? 'translate-x-5' : 'translate-x-0'"
                                  ></span>
                              </button>
                          </div>
                          <p class="text-xs text-gray-500">
                              {{ filterMode === 'any' ? 'Show logs that match any selected rule' : 'Show logs that match all selected rules' }}
                          </p>
                      </div>
                  </div>
              </div>

              <!-- Active Filters Badges -->
              <div v-if="hasActiveFilters" class="mt-6 pt-6 border-t border-gray-200">
                  <h3 class="text-sm font-medium text-gray-700 mb-3">Active Filters</h3>
                  <div class="flex flex-wrap gap-2">
                      <span 
                          v-if="searchQuery" 
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200"
                      >
                          NRIC: {{ searchQuery }}
                          <button @click="searchQuery = ''; applyFilters()" class="ml-2 hover:text-blue-600">
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                          </button>
                      </span>
                      <span 
                          v-if="statusFilter !== 'all'" 
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200"
                      >
                          Status: {{ statusFilter === 'pass' ? 'Pass Only' : 'Fail Only' }}
                          <button @click="statusFilter = 'all'; applyFilters()" class="ml-2 hover:text-green-600">
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                          </button>
                      </span>
                      <span 
                          v-for="rule in selectedRules" 
                          :key="rule"
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200"
                      >
                          {{ getRuleLabel(rule) }}
                          <button @click="removeRule(rule)" class="ml-2 hover:text-purple-600">
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                          </button>
                      </span>
                  </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 flex justify-between items-center">
                  <div class="text-sm text-gray-600">
                      Showing {{ paginatedLogs.length }} of {{ filteredLogs.length }} records
                  </div>
                  <div class="flex space-x-4">
                      <button
                          @click="applyFilters"
                          class="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center space-x-2 shadow-sm"
                      >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                          </svg>
                          <span>Apply Filters</span>
                      </button>
                      <button
                          @click="downloadFilteredLogsAsZip"
                          :disabled="loadingZip || filteredLogs.length === 0"
                          class="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-sm"
                      >
                          <svg v-if="!loadingZip" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          <span v-if="loadingZip" class="inline-flex items-center">
                              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating ZIP...
                          </span>
                          <span v-else>Download as ZIP</span>
                      </button>
                  </div>
              </div>
          </div>

          <!-- Loading Popup -->
          <div
              v-if="loadingZip"
              class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
              <div class="bg-white rounded-lg p-6 flex items-center space-x-4 shadow-lg max-w-md border border-gray-200">
                  <svg class="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <div class="text-gray-900">
                      <div class="font-medium">Generating ZIP file...</div>
                      <div class="text-sm text-gray-600 mt-1">Please wait, don't close or refresh the page</div>
                  </div>
              </div>
          </div>

          <!-- Results Section -->
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <!-- Table Header -->
              <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div class="flex justify-between items-center">
                      <h2 class="text-lg font-semibold text-gray-900">Validation Logs</h2>
                      <div class="text-sm text-gray-600">
                          Page {{ currentPage }} of {{ totalPages }}
                      </div>
                  </div>
              </div>

              <!-- Loading State -->
              <div v-if="loading" class="p-8 text-center">
                  <div class="inline-flex items-center space-x-3 text-gray-600">
                      <svg class="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Loading validation logs...</span>
                  </div>
              </div>

          <!-- Table Content -->
          <div v-else-if="paginatedLogs.length">
          <div class="overflow-x-auto">
              <div class="max-h-[500px] overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0 z-10">
                  <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NRIC Number</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failed Rules</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="log in paginatedLogs" :key="log.id" class="hover:bg-gray-50 transition-colors duration-150">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <router-link 
                          :to="{ name: 'Customers List id', params: { id: log.id }}" 
                          class="text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                        >
                          {{ log.order_id || 'N/A' }}
                        </router-link>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {{ log.entity_no }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span 
                          :class="[
                            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                            log.result 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                          ]"
                        >
                          <svg 
                            :class="log.result ? 'text-green-500' : 'text-red-500'" 
                            class="-ml-0.5 mr-1.5 h-2 w-2" 
                            fill="currentColor" 
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          {{ log.result ? 'Pass' : 'Fail' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(log.created_at) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {{ getFailedRulesCount(log) }} rules failed
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

              <!-- Pagination Controls -->
              <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2 text-sm text-gray-600">
                              <span>Showing {{ paginatedLogs.length }} of {{ filteredLogs.length }} records</span>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">No logs found</h3>
            <p class="mt-2 text-sm text-gray-500">
              {{ hasActiveFilters ? 'Try adjusting your search or filter criteria' : 'No validation logs available' }}
            </p>
            <button 
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="mt-4 px-4 py-2 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200 border border-green-200"
            >
              Clear all filters
            </button>
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

<script>
import axios from 'axios';
import Sidebar from '@/Components/sidebar.vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { saveAs } from 'file-saver';
import { useApi } from '../../router/useApi';

export default {
  components: {
      Sidebar,
      vSelect,
  },
  data() {
    return {
      allLogs: [],
      showSidebar: false,
      loading: false,
      loadingZip: false,
      notification: { message: '', type: '' },
      searchQuery: '',
      tempSelectedRules: [],
      selectedRules: [],
      filterMode: 'any',
      statusFilter: 'all',
      currentPage: 1,
      perPage: 50,
      stats: {
          passed: 0,
          failed: 0,
          today: 0
      },
      ruleOptions: [
        { value: 'disqualified_indicator', label: 'Disqualified Indicator' },
        { value: 'litigation_traces', label: 'Litigation Traces' },
        { value: 'negative_listing', label: 'Negative Listing' },
        { value: 'search_enquiry_details', label: 'Search Enquiry Details' },
        { value: 'financial_search', label: 'Financial Search' },
        { value: 'legal_search', label: 'Legal Search' },
        { value: 'bans', label: 'Do Not Lend Listing' },
        { value: 'moneylender_transactions', label: 'MoneyLender Transactions' },
        { value: 'payment_behaviour_trend', label: 'Payment Behaviour Trend' },
        { value: 'average_6mths_payment_trend', label: 'Average 6 Months Payment Trend' },
        { value: 'cutoff', label: 'CutOff Rules' },
        { value: 'dsr', label: 'DSR Rules' },
      ],
    };
  },
    setup() {
    const { getAxiosConfig } = useApi();
    return {
        getAxiosConfig,
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    isAuthRoute() {
      return ['/login', '/register'].includes(this.$route.path);
    },
    hasActiveFilters() {
      return this.searchQuery || this.selectedRules.length > 0 || this.statusFilter !== 'all';
    },
    filteredLogs() {
      let filtered = this.allLogs;

      const query = this.searchQuery.toLowerCase().trim();
      if (query) {
        filtered = filtered.filter(log =>
          log.entity_no?.toLowerCase().includes(query)
        );
      }

      // Apply rule and status filter
      if (this.selectedRules.length > 0) {
        filtered = filtered.filter(log => {
          let results;
          try {
            results = JSON.parse(log.message).results || [];
          } catch (e) {
            console.error('Error parsing message JSON:', e, 'Log ID:', log.id);
            return false;
          }

          const ruleResults = results.reduce((acc, result) => {
            acc[result.rule_id] = result.pass;
            return acc;
          }, {});

          if (this.filterMode === 'any') {
            if (this.statusFilter === 'all') {
              return this.selectedRules.some(rule => ruleResults.hasOwnProperty(rule));
            } else {
              const expectedPass = this.statusFilter === 'pass';
              return this.selectedRules.some(rule => ruleResults[rule] === expectedPass);
            }
          }

          if (this.filterMode === 'all') {
            if (this.statusFilter === 'all') {
              return this.selectedRules.every(rule => ruleResults.hasOwnProperty(rule));
            } else {
              const expectedPass = this.statusFilter === 'pass';
              const selectedRulesMatch = this.selectedRules.every(rule => ruleResults[rule] === expectedPass);
              
              if (!selectedRulesMatch) {
                return false;
              }

              if (this.statusFilter === 'fail') {
                return results.every(result => {
                  if (this.selectedRules.includes(result.rule_id)) {
                    return !result.pass;
                  }
                  return result.pass;
                });
              }

              return selectedRulesMatch;
            }
          }

            return true;
        });
    } else if (this.statusFilter !== 'all') {
        filtered = filtered.filter(log => {
            const expectedPass = this.statusFilter === 'pass';
            return log.result === expectedPass;
        });
    }

    return filtered;
},
  paginatedLogs() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredLogs.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredLogs.length / this.perPage);
    },
    totalRecords() {
      return this.allLogs.length;
    }
  },
  methods: {
    openSidebar() {
      this.showSidebar = true;
    },
    handleSidebarToggle(isOpen) {
      this.showSidebar = isOpen;
    },
    async fetchAllLogs() {
      this.loading = true;
      try {
        const response = await axios.get('/api/logs/customerlogs/all', this.getAxiosConfig());
        this.allLogs = response.data.data || response.data || [];
        this.calculateStats();
        this.currentPage = 1;
        this.notification = { message: 'Logs loaded successfully', type: 'success' };
      } catch (error) {
        console.error('Fetch logs error:', error.response?.data || error.message);
        this.notification = { message: 'Failed to fetch logs: ' + (error.response?.data?.message || error.message), type: 'error' };
      } finally {
        this.loading = false;
      }
    },
  calculateStats() {
      const today = new Date().toDateString();
      this.stats = {
          passed: this.allLogs.filter(log => log.result).length,
          failed: this.allLogs.filter(log => !log.result).length,
          today: this.allLogs.filter(log => new Date(log.created_at).toDateString() === today).length
      };
  },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    getRuleLabel(ruleValue) {
      const rule = this.ruleOptions.find(r => r.value === ruleValue);
      return rule ? rule.label : ruleValue;
    },
    removeRule(rule) {
      this.selectedRules = this.selectedRules.filter(r => r !== rule);
      this.tempSelectedRules = this.tempSelectedRules.filter(r => r !== rule);
      this.applyFilters();
    },
    resetFilters() {
      this.searchQuery = '';
      this.tempSelectedRules = [];
      this.selectedRules = [];
      this.statusFilter = 'all';
      this.filterMode = 'any';
      this.currentPage = 1;
      this.notification = { message: 'Filters reset successfully', type: 'success' };
    },
    applyFilters() {
      this.selectedRules = [...this.tempSelectedRules];
      this.currentPage = 1;
      this.notification = { message: 'Filters applied successfully', type: 'success' };
    },
    getFailedRulesCount(log) {
      try {
        const messageData = JSON.parse(log.message);
        const results = messageData.results || [];
        return results.filter(result => !result.pass).length;
      } catch (e) {
        return 0;
      }
    },
    getOrderItemID(log) {
      if (log && log.json_input) {
        try {
          const jsonInput = JSON.parse(log.json_input);
          return jsonInput.orderItemID || null;
        } catch (e) {
          console.error('Error parsing json_input for orderItemID:', e, 'Log ID:', log.id);
          return null;
        }
      }
      return null;
    },
    getCustomerID(log) {
      if (log && log.json_input) {
        try {
          const jsonInput = JSON.parse(log.json_input);
          return jsonInput.customer_id || null;
        } catch (e) {
          console.error('Error parsing json_input for customer_id:', e, 'Log ID:', log.id);
          return null;
        }
      }
      return null;
    },
    async downloadFilteredLogsAsZip() {
      this.loadingZip = true;
      this.notification = { message: 'Generating ZIP file...', type: 'success' };

      try {
        const batchData = this.filteredLogs
          .map(log => {
            const orderItemID = this.getOrderItemID(log);
            const customerID = this.getCustomerID(log);
            if (!orderItemID || !log.entity_no || !customerID) {
              console.warn(`Skipping log ID ${log.id}:`, {
                orderItemID: orderItemID,
                entity_no: log.entity_no,
                customerID: customerID,
              });
              return null;
            }
            return {
              order_id: orderItemID,
              nric: log.entity_no,
              customer_id: customerID,
            };
          })
          .filter(item => item !== null);

        if (batchData.length === 0) {
          throw new Error('No valid logs to download.');
        }

        const response = await axios.post(
          '/api/experian-reports/batch',
          { reports: batchData },
          {
            ...this.getAxiosConfig(),
            responseType: 'blob',
            headers: {
              ...this.getAxiosConfig().headers,
              Accept: 'application/zip',
            },
          }
        );

        const blob = new Blob([response.data], { type: 'application/zip' });
        if (blob.size === 0) {
          throw new Error('Received empty ZIP file');
        }

        saveAs(blob, `credit_check_logs_${new Date().toISOString().split('T')[0]}.zip`);
        this.notification = { message: 'ZIP file downloaded successfully', type: 'success' };
      } catch (error) {
        console.error('Error generating ZIP:', error);
        let errorMessage = error.message;
        if (error.response) {
          const text = await error.response.data.text().catch(() => null);
          errorMessage = text || error.response.data?.message || error.message;
        }
        this.notification = { message: `Failed to generate ZIP: ${errorMessage}`, type: 'error' };
      } finally {
        this.loadingZip = false;
      }
    },
  },
  mounted() {
    this.fetchAllLogs();

    setInterval(() => {
      if (this.notification.message) {
        this.notification = { message: '', type: '' };
      }
    }, 5000);
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    selectedRules() {
      this.currentPage = 1;
    },
    statusFilter() {
      this.currentPage = 1;
    },
    filterMode() {
        this.currentPage = 1;
  }
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.logo-hover {
  transition: transform 0.3s ease;
}

.logo-hover:hover {
  transform: scale(1.05);
}

/* Custom v-select styles for white theme */
:deep(.custom-v-select .vs__dropdown-toggle) {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  padding: 0.75rem;
  min-height: 48px;
  transition: all 0.2s ease-in-out;
}

:deep(.custom-v-select .vs__dropdown-toggle:hover) {
  border-color: #9ca3af;
}

:deep(.custom-v-select .vs__search) {
  color: #374151;
  background: transparent;
}

:deep(.custom-v-select .vs__search::placeholder) {
  color: #9ca3af;
}

:deep(.custom-v-select .vs__selected) {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  margin: 2px;
  font-size: 0.875rem;
  color: #374151;
}

:deep(.custom-v-select .vs__dropdown-menu) {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:deep(.custom-v-select .vs__dropdown-option) {
  color: #374151;
  padding: 0.5rem 0.75rem;
}

:deep(.custom-v-select .vs__dropdown-option--highlight) {
  background: #10b981;
  color: white;
}

:deep(.custom-v-select .vs__clear) {
  fill: #6b7280;
}

:deep(.custom-v-select .vs__open-indicator) {
  fill: #6b7280;
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
</style>