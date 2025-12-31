<template>
  <div class="container mx-auto p-6 font-inter">
    <!-- Sidebar -->
    <div
      v-if="isAuthenticated && !isAuthRoute"
      @mouseenter="openSidebar"
      class="fixed inset-y-0 left-0 w-6 z-50 bg-transparent hover:bg-blue-100/10 transition-all duration-200"
      title="Hover to open sidebar"
    ></div>

    <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="handleSidebarToggle" />

    <h1 class="text-3xl font-bold text-gray-800 mb-6">Endpoint Manager</h1>

    <!-- Configuration and Version Selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Configuration</label>
        <select v-model="selectedConfiguration" @change="fetchVersions" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="" disabled>Select a configuration</option>
          <option v-for="config in configurations" :value="config.id" :key="config.id">{{ config.config_name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Version</label>
        <select v-model="selectedVersion" @change="fetchEndpointConfig" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" :disabled="!selectedConfiguration">
          <option value="" disabled>Select a version</option>
          <option v-for="version in versions" :value="version.id" :key="version.id">Version {{ version.version_number }} {{ version.is_active ? '(Active)' : '' }}</option>
        </select>
      </div>
    </div>

    <!-- Endpoint Details -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="endpoint" class="border rounded-lg p-4 bg-white shadow-sm">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-800">Version Endpoint: {{ selectedVersion ? `Version ${versions.find(v => v.id === selectedVersion)?.version_number}` : '' }}</h3>
        <button @click="toggleCollapse('endpoint')" class="text-blue-500 hover:text-blue-700">
          {{ collapsed.endpoint ? 'Expand' : 'Collapse' }}
        </button>
      </div>

      <div v-if="!collapsed.endpoint" class="mt-4 space-y-4">
        <!-- Endpoint URL -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Endpoint URL</label>
          <div class="flex items-center space-x-2">
            <input :value="generateUrl()" readonly class="w-full p-2 border rounded-lg bg-gray-100" />
            <button @click="copyUrl()" class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">Copy</button>
          </div>
        </div>

        <!-- Configuration Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Auth Type</label>
            <p class="p-2 bg-gray-100 rounded-lg">{{ endpoint.auth_type }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Headers</label>
            <pre class="p-2 bg-gray-100 rounded-lg overflow-auto" v-html="highlightJson(endpoint.headers || {})"></pre>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Expected Input</label>
          <pre class="p-2 bg-gray-100 rounded-lg overflow-auto" v-html="highlightJson(endpoint.expected_input || { json: 'string' })"></pre>
        </div>

        <!-- Edit Configuration -->
        <button @click="editConfig()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Edit Configuration</button>
        <div v-if="editingEndpoint" class="mt-4 p-4 border rounded-lg bg-gray-50">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Auth Type</label>
              <select v-model="editForm.auth_type" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="none">None</option>
                <option value="api_key">API Key</option>
                <option value="oauth">OAuth</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Headers (JSON)</label>
              <textarea v-model="editForm.headers" class="w-full p-2 border rounded-lg h-24" placeholder='{"Content-Type": "application/json"}'></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Expected Input (JSON)</label>
              <textarea v-model="editForm.expected_input" class="w-full p-2 border rounded-lg h-24" placeholder='{"json": "string"}'></textarea>
            </div>
            <div class="flex space-x-2">
              <button @click="updateConfig()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Save</button>
              <button @click="editingEndpoint = false" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        </div>

        <!-- Test Endpoint -->
        <h4 class="text-md font-semibold text-gray-800 mt-4">Test Endpoint (All Rules)</h4>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">JSON Input</label>
            <textarea v-model="testJson" class="w-full p-2 border rounded-lg h-24" :placeholder="JSON.stringify(endpoint.expected_input || { json: 'string' }, null, 2)"></textarea>
          </div>
          <button @click="testEndpoint()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" :disabled="testing">
            {{ testing ? 'Testing...' : 'Test Endpoint' }}
          </button>
          <div v-if="testResult.overall !== undefined" class="border p-4 rounded-lg bg-gray-50">
            <h5 class="text-sm font-semibold text-gray-800">Overall Result</h5>
            <p><strong>Pass:</strong> {{ testResult.overall ? 'Yes' : 'No' }}</p>
          </div>
          <div v-if="testResult.results" class="space-y-2">
            <div v-for="result in testResult.results" :key="result.rule_id" class="border p-4 rounded-lg bg-gray-50">
              <h5 class="text-sm font-semibold text-gray-800">Rule: {{ result.rule_name }} (ID: {{ result.rule_id }})</h5>
              <p><strong>Pass:</strong> {{ result.pass ? 'Yes' : 'No' }}</p>
              <p><strong>Message:</strong> {{ result.message }}</p>
              <pre class="p-2 bg-gray-100 rounded-lg overflow-auto" v-html="highlightJson(result.condition_details)"></pre>
            </div>
          </div>
          <div v-if="testResult.error" class="text-red-500">
            {{ testResult.error }}
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500 text-center">No endpoint found for the selected version.</p>

    <!-- Notifications -->
    <div v-if="notification.message" :class="['fixed bottom-4 right-4 p-4 rounded-lg shadow-lg', notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white']">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/lib/languages/json';
import 'highlight.js/styles/vs2015.css';
import Sidebar from '@/Components/sidebar.vue';
import { useApi } from '../../router/useApi';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      configurations: [],
      selectedConfiguration: null,
      showDropdown: false,
      showSidebar: false,
      versions: [],
      selectedVersion: null,
      endpoint: null,
      baseUrl: '',
      editingEndpoint: false,
      editForm: {
        auth_type: 'none',
        headers: '{}',
        expected_input: '{"json": "string"}',
      },
      testJson: '',
      testResult: { overall: undefined, results: null, error: null }, // Initialize overall as undefined
      testing: false,
      rules: [],
      collapsed: { endpoint: false },
      loading: false,
      notification: { message: '', type: '' },
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    isAuthRoute() {
      return ['/login', '/register'].includes(this.$route.path);
    },
    isButtonDisabled() {
      return !this.file || this.isUploading;
    },
  },
      setup() {
        const { getAxiosConfig } = useApi();
        return {
            getAxiosConfig,
        };
    },
  methods: {
    openSidebar() {
      this.showSidebar = true;
      console.log('Sidebar opened via hover');
    },
    handleSidebarToggle(isOpen) {
      this.showSidebar = isOpen;
      console.log('Sidebar is', isOpen ? 'open' : 'closed');
    },

    async fetchConfigurations() {
      this.loading = true;
      try {
        const response = await axios.get('/api/configurations', this.getAxiosConfig());
        this.configurations = response.data;
        console.log('Fetched configurations:', this.configurations);
        if (this.configurations.length) {
          this.selectedConfiguration = this.configurations[0].id; // Select the id of the first configuration
          console.log('Selected configuration:', this.selectedConfiguration);
          await this.fetchVersions();
        } else {
          this.notification = { message: 'No configurations available', type: 'error' };
        }
      } catch (error) {
        console.error('Fetch configurations error:', error.response?.data || error.message);
        this.notification = { message: 'Failed to fetch configurations: ' + (error.response?.data?.message || error.message), type: 'error' };
      } finally {
        this.loading = false;
      }
    },
    async fetchVersions() {
      if (!this.selectedConfiguration) {
        console.warn('No configuration selected, skipping fetchVersions');
        return;
      }
      this.loading = true;
      try {
        console.log('Fetching versions for configuration:', this.selectedConfiguration);
        const response = await axios.get(`/api/configurations/${this.selectedConfiguration}/versions`, this.getAxiosConfig());
        this.versions = response.data;
        console.log('Fetched versions:', this.versions);
        this.selectedVersion = null;
        this.endpoint = null;
        this.rules = [];
        this.notification = { message: 'Versions loaded successfully', type: 'success' };
      } catch (error) {
        console.error('Fetch versions error:', error.response?.data || error.message);
        this.notification = { message: 'Failed to fetch versions: ' + (error.response?.data?.message || error.message), type: 'error' };
      } finally {
        this.loading = false;
      }
    },
    async fetchEndpointConfig() {
      if (!this.selectedVersion) {
        console.warn('No version selected, skipping fetchEndpointConfig');
        return;
      }
      this.loading = true;
      try {
        console.log('Fetching endpoint config for version:', this.selectedVersion);
        const [endpointResponse, versionResponse] = await Promise.all([
          axios.get(`/api/versions/${this.selectedVersion}/endpoint`, this.getAxiosConfig()),
          axios.get(`/api/versions/${this.selectedVersion}`, this.getAxiosConfig()),
        ]);
        this.endpoint = endpointResponse.data;
        this.rules = versionResponse.data.rules || [];
        console.log('Fetched endpoint:', this.endpoint, 'Rules:', this.rules);
        this.notification = { message: 'Endpoint and version loaded successfully', type: 'success' };
      } catch (error) {
        console.error('Fetch endpoint config error:', error.response?.data || error.message);
        this.notification = { message: 'Failed to fetch endpoint or version: ' + (error.response?.data?.message || error.message), type: 'error' };
      } finally {
        this.loading = false;
      }
    },
    getRuleName(ruleId) {
      const rule = this.rules.find(r => r.id === ruleId);
      return rule ? rule.name : ruleId;
    },
    generateUrl() {
      return this.selectedVersion ? `${this.baseUrl}/api/validate/${this.selectedConfiguration}/${this.selectedVersion}` : '';
    },
    copyUrl() {
      navigator.clipboard.writeText(this.generateUrl()).then(() => {
        this.notification = { message: 'URL copied to clipboard', type: 'success' };
      }).catch(() => {
        this.notification = { message: 'Failed to copy URL', type: 'error' };
      });
    },
    editConfig() {
      this.editingEndpoint = true;
      this.editForm = {
        auth_type: this.endpoint.auth_type,
        headers: JSON.stringify(this.endpoint.headers || {}, null, 2),
        expected_input: JSON.stringify(this.endpoint.expected_input || { json: 'string' }, null, 2),
      };
    },
    async updateConfig() {
      this.loading = true;
      try {
        let headers, expected_input;
        try {
          headers = JSON.parse(this.editForm.headers);
          expected_input = JSON.parse(this.editForm.expected_input);
        } catch (e) {
          this.notification = { message: 'Invalid JSON format in headers or expected input', type: 'error' };
          return;
        }

        const payload = {
          auth_type: this.editForm.auth_type,
          headers,
          expected_input,
        };
        console.log('Sending update payload:', payload);

        const response = await axios.put(
          `/api/versions/${this.selectedVersion}/endpoint`,
          payload,
          this.getAxiosConfig()
        );

        if (response.status === 200) {
          this.endpoint.auth_type = this.editForm.auth_type;
          this.endpoint.headers = headers;
          this.endpoint.expected_input = expected_input;
          this.editingEndpoint = false;
          this.notification = { message: 'Configuration updated successfully', type: 'success' };
        }
      } catch (error) {
        console.error('Update config error:', error.response?.data || error.message);
        this.notification = { message: 'Failed to update configuration: ' + (error.response?.data?.message || error.message), type: 'error' };
      } finally {
        this.loading = false;
      }
    },
    async testEndpoint() {
      this.testing = true;
      this.testResult = { overall: undefined, results: null, error: null };
      try {
        const payload = {
          json: this.testJson || JSON.stringify(this.endpoint.expected_input || { json: 'string' }, null, 2),
        };
        console.log('Test endpoint payload:', payload, 'URL:', this.generateUrl());

        const response = await axios.post(
          this.generateUrl(),
          payload,
          this.getAxiosConfig()
        );
        this.testResult = {
          overall: response.data.overall,
          results: response.data.results,
          error: response.data.error || null
        };
        this.notification = { message: 'Test completed successfully', type: 'success' };
      } catch (error) {
        console.error('Test endpoint error:', error.response?.data || error.message);
        this.testResult = {
          overall: false,
          results: error.response?.data?.results || null,
          error: error.response?.data?.error || 'CORS error or network issue: ' + error.message
        };
        this.notification = { message: 'Test failed: ' + (error.response?.data?.error || 'CORS error or network issue'), type: 'error' };
      } finally {
        this.testing = false;
      }
    },
    highlightJson(data) {
      return hljs.highlight(JSON.stringify(data, null, 2), { language: 'json' }).value;
    },
    toggleCollapse(key) {
      this.$set(this.collapsed, key, !this.collapsed[key]);
    },
  },
  async mounted() {
    try {
      const response = await axios.get('/api/base-url', this.getAxiosConfig());
      this.baseUrl = response.data.base_url;
      console.log('Base URL:', this.baseUrl);
      await this.fetchConfigurations(); // Fetch configurations dynamically
    } catch (error) {
      console.error('Base URL fetch error:', error.response?.data || error.message);
      this.notification = { message: 'Failed to fetch base URL: ' + (error.response?.data?.message || error.message), type: 'error' };
      this.$router.push('/login');
    }
    // Auto-dismiss notifications after 3 seconds
    setInterval(() => {
      if (this.notification.message) {
        this.notification = { message: '', type: '' };
      }
    }, 3000);
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

pre {
  white-space: pre-wrap;
  font-size: 0.875rem;
}
</style>