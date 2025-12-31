<template>
  <div class="container mx-auto p-6 font-inter flex flex-col md:flex-row gap-6 h-screen">
    <!-- Sidebar -->
    <div
      v-if="isAuthenticated && !isAuthRoute"
      @mouseenter="openSidebar"
      class="fixed inset-y-0 left-0 w-6 z-50 bg-transparent hover:bg-blue-100/10 transition-all duration-200"
      title="Hover to open sidebar"
    ></div>

    <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="handleSidebarToggle" />

    <!-- Main Content -->
    <div class="container mx-auto p-6 flex flex-col lg:flex-row gap-6 transition-all duration-300" :class="showSidebar ? 'lg:ml-64' : 'lg:ml-0'">
 <!-- Left Column: Experian Report PDF -->
    <div v-if="log && log.endpoint_id !== 'config_default_version_eligibility'" class="w-full md:w-1/2 flex flex-col">
      <h4 class="text-md font-semibold text-gray-800 mb-4">Experian Report</h4>
      <div v-if="loadingPdf" class="text-center text-gray-500">Loading PDF...</div>
      <div v-else-if="pdfUrl" class="flex-1 border rounded-lg overflow-auto">
        <iframe :src="pdfUrl" width="100%" height="100%" frameborder="0"></iframe>
      </div>
      <div v-else class="text-center text-gray-500">Click "Load Experian Report" to view the PDF</div>
    </div>

      <!-- Right Column: Log Details and Rule Results -->
     <div class="w-full md:w-1/2 flex flex-col overflow-y-auto">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <!-- Header Section -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                {{ log && log.endpoint_id === 'config_default_version_eligibility' 
                    ? 'Eligibility Check Details' 
                    : 'Credit Check Details' }}
              </h1>
              <p class="text-gray-600 mt-1">Detailed log information and rule analysis</p>
            </div>
            <router-link 
              :to="log && log.endpoint_id === 'config_default_version_eligibility' ? '/eligibility-list' : '/customer-List'" 
              class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mt-4 sm:mt-0 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to List</span>
            </router-link>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading log details...</p>
          </div>

          <!-- Content -->
          <div v-else-if="log" class="space-y-6">
            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3">
          <button 
            v-if="log.endpoint_id !== 'config_default_version_eligibility'"
            @click="generatePDF" 
            class="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
          >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Generate PDF</span>
          </button>
          <button 
            v-if="log.endpoint_id !== 'config_default_version_eligibility'"
            @click="fetchExperianReport" 
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Load Experian Report
          </button>

              <button 
                v-if="log.endpoint_id === 'config_default_version_eligibility'"
                @click="generateExcel" 
                class="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Generate Excel</span>
              </button>
            </div>

            <!-- Log Details Card -->
            <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Log Information
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Endpoint ID</label>
                  <p class="p-3 bg-white rounded-lg border border-gray-200 text-sm font-mono">{{ log.endpoint_id }}</p>
                </div>
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Order Number</label>
                  <p class="p-3 bg-white rounded-lg border border-gray-200">{{ log.order_id || 'N/A' }}</p>
                </div>
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Overall Result</label>
                  <p class="p-3 rounded-lg border font-medium" :class="log.result ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'">
                    <span class="flex items-center">
                      <svg v-if="log.result" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <svg v-else class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                      {{ log.result ? 'Pass' : 'Fail' }}
                    </span>
                  </p>
                </div>
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">NRIC Number</label>
                  <p class="p-3 bg-white rounded-lg border border-gray-200 font-mono">{{ log.entity_no }}</p>
                </div>
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700">Created At</label>
                  <p class="p-3 bg-white rounded-lg border border-gray-200 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(log.created_at) }}
                  </p>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="parsedMessage.error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <label class="block text-sm font-medium text-red-800 mb-2">Error Message</label>
                <p class="text-red-700 text-sm">{{ parsedMessage.error }}</p>
              </div>
            </div>

            <!-- Rule Results Section -->
            <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Rule Results Analysis
              </h4>
              
              <div v-if="parsedMessage.results && parsedMessage.results.length" class="space-y-4">
                <div 
                  v-for="result in parsedMessage.results" 
                  :key="result.rule_id" 
                  class="border rounded-lg transition-all duration-200 hover:shadow-sm"
                  :class="result.pass ? 'border-green-200 bg-green-25' : 'border-red-200 bg-red-25'"
                >
                  <div class="p-4 border-b" :class="result.pass ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="result.pass ? 'bg-green-100' : 'bg-red-100'">
                            <svg v-if="result.pass" class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            <svg v-else class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h5 class="font-semibold text-gray-900">{{ result.rule_name }}</h5>
                          <p class="text-sm text-gray-600">Rule ID: {{ result.rule_id }}</p>
                        </div>
                      </div>
                      <span class="px-3 py-1 rounded-full text-xs font-medium" :class="result.pass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                        {{ result.pass ? 'PASSED' : 'FAILED' }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="p-4 space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <p class="text-sm text-gray-900 bg-white p-3 rounded border">{{ result.message }}</p>
                    </div>
                    
                    <!-- Condition Details Table -->
                    <div v-if="result.condition_details">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Condition Details</label>
                      <div class="overflow-hidden rounded-lg border border-gray-200">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-100">
                            <tr>
                              <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Parameter</th>
                              <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Value</th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(value, key) in flattenConditionDetails(result.condition_details)" :key="key">
                              <td class="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{{ key }}</td>
                              <td class="px-4 py-3 text-sm text-gray-800 break-words max-w-xs">{{ formatValue(value, key) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div v-else class="text-center py-4 text-gray-500 text-sm">
                      No condition details available for this rule
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>No rule results available for analysis</p>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Log Not Found</h3>
            <p class="text-gray-600">The requested validation log could not be found.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="notification.message"
        :class="[
          'fixed bottom-4 right-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          notification.type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
        ]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg v-if="notification.type === 'success'" class="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ notification.type === 'success' ? 'Success' : 'Error' }}
              </p>
              <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/Components/sidebar.vue';
import { generateJsonInputPdf } from "./generateJsonInputPdf";
import * as XLSX from 'xlsx';
import { useApi } from '../../router/useApi';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      log: null,
      parsedMessage: { error: null, results: [] },
      showSidebar: false,
      loading: false,
      loadingPdf: false,
      pdfUrl: null,
      notification: { message: '', type: '' },
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
    orderItemID() {
      if (this.log && this.log.json_input) {
        try {
          const jsonInput = JSON.parse(this.log.json_input);
          return jsonInput.orderItemID || null;
        } catch (e) {
          console.error('Error parsing json_input:', e);
          return null;
        }
      }
      return null;
    },
    customerID() {
      if (this.log && this.log.json_input) {
        try {
          const jsonInput = JSON.parse(this.log.json_input);
          return jsonInput.customer_id || null;
        } catch (e) {
          console.error('Error parsing json_input:', e);
          return null;
        }
      }
      return null;
    },
  },
  methods: {
    generatePDF() {
      if (!this.log || !this.log.json_input) {
        this.showNotification("No JSON input found", "error");
        return;
      }
      generateJsonInputPdf(this.log.json_input, this.log.id);
      this.showNotification("PDF generation started", "success");
    },
    generateExcel() {
      if (!this.log || !this.log.json_input) {
        this.showNotification('No JSON input found', 'error');
        return;
      }

      try {
        const jsonInput = JSON.parse(this.log.json_input);
        const worksheetData = this.prepareExcelData(jsonInput);
        const worksheet = XLSX.utils.json_to_sheet(worksheetData.data, { header: worksheetData.headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Log Details');

        // Auto-size columns based on content
        const colWidths = worksheetData.headers.map(header => ({
          wch: Math.max(header.length, 15) // Minimum width of 15
        }));
        worksheet['!cols'] = colWidths;

        XLSX.writeFile(workbook, `log-details-${this.log.id}.xlsx`);
        this.showNotification('Excel file generated successfully', 'success');
      } catch (error) {
        console.error('Generate Excel error:', error);
        this.showNotification('Failed to generate Excel file: ' + error.message, 'error');
      }
    },
    showNotification(message, type) {
      this.notification = { message, type };
      setTimeout(() => {
        this.notification = { message: '', type: '' };
      }, 4000);
    },
    prepareExcelData(json) {
      const headers = [];
      const data = [];

      // Define fields for array-based keys with proper nesting
      const arrayFields = {
        'cpfcontributions.history': [
          'date.value',
          'month.value',
          'amount.value',
          'employer.value'
        ],
        'noahistory.noas': [
          'rent.value',
          'trade.value',
          'amount.value',
          'category.value',
          'interest.value',
          'employment.value',
          'taxclearance.value',
          'yearofassessment.value'
        ],
        'hdbownership': [
          'source',
          'noofowners.value',
          'lastupdated',
          'classification',
          'monthlyloaninstalment.value'
        ]
      };

      // Helper function to collect headers for non-array fields
      function collectHeaders(obj, prefix = '') {
        for (const [key, value] of Object.entries(obj)) {
          const newKey = prefix ? `${prefix}.${key}` : key;
          
          // Skip array fields that we'll handle separately
          if (arrayFields[newKey] && Array.isArray(value)) {
            continue;
          }
          
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            collectHeaders(value, newKey);
          } else {
            headers.push(newKey);
          }
        }
      }

      // Collect headers for non-array fields
      collectHeaders(json);

      // Add headers for array fields
      Object.keys(arrayFields).forEach(arrayKey => {
        arrayFields[arrayKey].forEach(field => {
          headers.push(`${arrayKey}.${field}`);
        });
      });

      // Determine the number of rows based on the largest array
      const arraySizes = {
        'cpfcontributions.history': (json.cpfcontributions?.history || []).length,
        'noahistory.noas': (json.noahistory?.noas || []).length,
        'hdbownership': (json.hdbownership || []).length
      };
      const maxRows = Math.max(...Object.values(arraySizes), 1);

      // Prepare data rows
      for (let i = 0; i < maxRows; i++) {
        const row = {};

        // Populate non-array fields
        function populateNonArrayFields(obj, prefix = '') {
          for (const [key, value] of Object.entries(obj)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            // Skip array fields that we'll handle separately
            if (arrayFields[newKey] && Array.isArray(value)) {
              continue;
            }
            
            if (value && typeof value === 'object' && !Array.isArray(value)) {
              populateNonArrayFields(value, newKey);
            } else {
              row[newKey] = Array.isArray(value) ? value.join(', ') : (value === null || value === undefined ? 'N/A' : String(value));
            }
          }
        }
        populateNonArrayFields(json);

        // Populate array fields
        Object.keys(arrayFields).forEach(arrayKey => {
          const fields = arrayFields[arrayKey];
          const arrayPath = arrayKey.split('.');
          let arrayData = json;
          
          // Navigate to the array using the path
          for (const pathPart of arrayPath) {
            arrayData = arrayData[pathPart] || [];
          }
          
          // Ensure arrayData is actually an array
          if (!Array.isArray(arrayData)) {
            arrayData = [arrayData];
          }
          
          const entry = arrayData[i] || {};
          
          fields.forEach(field => {
            const fieldPath = field.split('.');
            let value = entry;
            
            // Navigate to the field value using the path
            for (const pathPart of fieldPath) {
              value = value && typeof value === 'object' ? value[pathPart] : undefined;
            }
            
            const fullKey = `${arrayKey}.${field}`;
            row[fullKey] = value === null || value === undefined ? 'N/A' : String(value);
          });
        });

        data.push(row);
      }

      // Remove duplicate headers and sort them
      const uniqueHeaders = [...new Set(headers)].sort();
      
      return { headers: uniqueHeaders, data };
    },
    async fetchExperianReport() {
      if (!this.orderItemID) {
        this.notification = { message: 'No order item ID found in json_input', type: 'error' };
        return;
      }
      if (!this.log.entity_no) {
        this.notification = { message: 'No NRIC found', type: 'error' };
        return;
      }

      this.loadingPdf = true;
      try {
          const response = await axios.get(`/api/experian-report/${this.orderItemID}?nric=${this.log.entity_no}&customer_id=${this.customerID}`,
           {          
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Tenant-Code': `${localStorage.getItem('tenant_code')}`,
            Accept: 'application/pdf',
          },
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        if (blob.size === 0) {
          throw new Error('Received empty PDF file');
        }
        // Revoke previous URL if exists to avoid memory leak
        if (this.pdfUrl) {
          window.URL.revokeObjectURL(this.pdfUrl);
        }
        this.pdfUrl = window.URL.createObjectURL(blob);
        this.notification = { message: 'Experian report loaded successfully', type: 'success' };
      } catch (error) {
        let errorMessage = error.message;
        if (error.response) {
          const text = await error.response.data.text().catch(() => null);
          errorMessage = text || error.response.data?.message || error.message;
        }
        console.error('Fetch Experian report error:', errorMessage);
        this.notification = { message: `Failed to fetch Experian report: ${errorMessage}`, type: 'error' };
      } finally {
        this.loadingPdf = false;
      }
    },
    openSidebar() {
      this.showSidebar = true;
      console.log('Sidebar opened via hover');
    },
    handleSidebarToggle(isOpen) {
      this.showSidebar = isOpen;
      console.log('Sidebar is', isOpen ? 'open' : 'closed');
    },
    async fetchLog() {
      this.loading = true;
      try {
        const response = await axios.get(`/api/logs/customerlogs/${this.$route.params.id}`, this.getAxiosConfig());
        this.log = response.data;
        try {
          this.parsedMessage = JSON.parse(this.log.message);
          if (!Array.isArray(this.parsedMessage.results)) {
            this.parsedMessage.results = [];
          }
        } catch (e) {
          this.parsedMessage = { error: 'Failed to parse message: ' + e.message, results: [] };
          this.notification = { message: 'Invalid message format in log', type: 'error' };
        }
        this.notification = { message: 'Log loaded successfully', type: 'success' };
      } catch (error) {
        console.error('Fetch log error:', error.response?.data || error.message);
        this.notification = { message: 'Failed to fetch log: ' + (error.response?.data?.message || error.message), type: 'error' };
      } finally {
        this.loading = false;
      }
    },
    flattenConditionDetails(details) {
      const flattened = {};
      function flatten(obj, prefix = '') {
        for (const [key, value] of Object.entries(obj)) {
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            flatten(value, newKey);
          } else {
            flattened[newKey] = value;
          }
        }
      }
      if (details && typeof details === 'object') {
        flatten(details);
      }
      return flattened;
    },
    formatValue(value, key) {
      if (Array.isArray(value)) {
        if (key === 'noahistory.noas') {
          return value
            .map((item, index) => {
              if (typeof item === 'object' && item !== null) {
                const fields = [
                  `rent: ${item.rent?.value ?? 'N/A'}`,
                  `trade: ${item.trade?.value ?? 'N/A'}`,
                  `amount: ${item.amount?.value ?? 'N/A'}`,
                  `category: ${item.category?.value ?? 'N/A'}`,
                  `interest: ${item.interest?.value ?? 'N/A'}`,
                  `employment: ${item.employment?.value ?? 'N/A'}`,
                  `taxclearance: ${item.taxclearance?.value ?? 'N/A'}`,
                  `yearofassessment: ${item.yearofassessment?.value ?? 'N/A'}`
                ];
                return `Item ${index + 1}: ${fields.join(', ')}`;
              }
              return String(item);
            })
            .join('\n');
        }
        return value
          .map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              const summary = Object.entries(item)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ');
              return `Item ${index + 1}: ${summary}`;
            }
            return String(item);
          })
          .join('\n');
      }
      if (value === null || value === undefined) {
        return 'N/A';
      }
      return String(value);
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
  },
  mounted() {
    this.fetchLog();
    setInterval(() => {
      if (this.notification.message) {
        this.notification = { message: '', type: '' };
      }
    }, 3000);
  },
  beforeDestroy() {
    if (this.pdfUrl) {
      window.URL.revokeObjectURL(this.pdfUrl);
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

.bg-green-25 {
  background-color: rgba(240, 253, 244, 0.5);
}

.bg-red-25 {
  background-color: rgba(254, 242, 242, 0.5);
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #e5e7eb;
  text-align: left;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
}

td {
  background-color: #ffffff;
  white-space: pre-wrap;
  word-wrap: break-word;
}

* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>