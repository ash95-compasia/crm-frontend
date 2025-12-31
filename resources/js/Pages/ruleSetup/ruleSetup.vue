<template>
  <div class="rules-workspace p-6">
    <!-- Sidebar -->
    <div
      v-if="isAuthenticated && !isAuthRoute"
      @mouseenter="openSidebar"
      class="fixed inset-y-0 left-0 w-6 z-50 bg-transparent hover:bg-blue-100/10 transition-all duration-200"
      title="Hover to open sidebar"
    ></div>

    <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="handleSidebarToggle" />

    <!-- Configuration and Version Selectors -->
    <div class="mb-6 bg-white shadow-md rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold mb-2">Select Configuration</label>
          <select
            v-model="selectedConfigId"
            @change="loadRulesAndVersions"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="null" disabled>-- Select a Configuration --</option>
            <option v-for="config in configurations" :key="config.id" :value="config.id">
              {{ config.config_name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block font-bold mb-2">Select Version</label>
          <select
            v-model="selectedVersionId"
            @change="loadVersion"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="!versions.length"
          >
            <option :value="null">
              {{ versions.length ? '-- Create New Version --' : 'No versions available' }}
            </option>
            <option v-for="version in versionOptions" :key="version.id" :value="version.id">
              {{ version.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Workspace -->
    <div v-if="selectedConfigId" class="workspace-container">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- Rules List and Preview Panel -->
        <div class="lg:col-span-2">
          <div class="bg-white shadow-md rounded-lg p-6">
            <h4 class="text-lg font-semibold mb-4">
              Rules Configuration
              <span v-if="selectedVersionId">
                (Version {{ selectedVersion?.version_number }}
                <span v-if="selectedVersion?.is_active" class="text-green-600">(Active)</span>)
              </span>
              <span v-else>(New Draft)</span>
            </h4>
            <div class="rules-container">
              <!-- Rules List -->
              <draggable
                v-if="!loading && currentRules.length"
                v-model="currentRules"
                group="rules"
                handle=".drag-handle"
                @end="handleReorder"
                class="rules-list min-h-[100px]"
                item-key="id"
                animation="300"
              >
                <template #item="{ element: rule }">
                  <div
                    :class="{ 'border-2 border-blue-500': activeRuleId === rule.id }"
                    class="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer mb-3"
                    @click="setActiveRule(rule.id)"
                  >
                    <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <svg
                          class="drag-handle mr-2 h-5 w-5 text-gray-500 cursor-move"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          title="Drag to reorder"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                        <span class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                          >#{{ rule.priority }}</span
                        >
                        <h5 class="text-base font-medium mb-0">
                          {{ rule.name || `Rule ${rule.priority}` }}
                        </h5>
                        <span
                          :class="getRuleTypeBadge(rule.type)"
                          class="ml-2 px-2 py-1 rounded text-sm"
                        >
                          {{ rule.type }}
                        </span>
                      </div>
                      <button
                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        title="Delete Rule"
                        @click.stop="removeRule(rule.id)"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <!-- Flow Control Preview -->
                    <div class="text-sm text-gray-600 mt-2">
                      <p>
                        <strong>On Pass:</strong>
                        {{ rule.flowControl?.onPass === 'continue' ? 'Proceed with all rules' : rule.flowControl?.onPass === 'stop' ? 'Stop rule evaluation' : `Jump to rule #${getRuleById(rule.flowControl?.onPassRuleId)?.priority || 'N/A'}` }}
                      </p>
                      <p>
                        <strong>On Fail:</strong>
                        {{ rule.flowControl?.onFail === 'continue' ? 'Proceed with all rules' : rule.flowControl?.onFail === 'stop' ? 'Stop rule evaluation' : `Jump to rule #${getRuleById(rule.flowControl?.onFailRuleId)?.priority || 'N/A'}` }}
                      </p>
                    </div>
                  </div>
                </template>
              </draggable>

              <!-- Empty State -->
              <div v-else-if="!loading" class="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
                <p>No rules configured. Start by adding a new rule below.</p>
              </div>

              <!-- Add Rule and Apply Buttons -->
              <div class="flex flex-wrap mt-4 gap-2">
                <button
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  title="Add a new rule"
                  @click="addNewRule"
                >
                  <svg class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New Rule
                </button>
                <button
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  :disabled="saving || !currentRules.length || !hasChanges"
                  @click="applyRules"
                >
                  <svg
                    v-if="saving"
                    class="inline h-4 w-4 mr-1 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9H4m4 11H3v-5h.582m15.356-2A8.001 8.001 0 0119.418 15H20"
                    />
                  </svg>
                  Save as New Version
                </button>
                <button
                  class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 ml-auto"
                  :disabled="!selectedVersionId || !hasChanges"
                  @click="resetToCurrentVersion"
                >
                  Reset Changes
                </button>
                <button
                  v-if="selectedVersionId && !selectedVersion.is_active"
                  class="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-50"
                  :disabled="saving"
                  @click="activateVersion"
                >
                  Activate Version
                </button>
              </div>

              <!-- Rules Preview -->
              <div v-if="currentRules.length" class="preview-container mt-6 max-h-[400px] overflow-y-auto">
                <h5 class="text-base font-semibold mb-3">Rules Preview</h5>
                <div v-for="rule in currentRules" :key="rule.id" class="preview-rule mb-3">
                  <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h6 class="text-sm font-medium">
                      #{{ rule.priority }} - {{ rule.name || `Rule ${rule.priority}` }}
                    </h6>
                    <p class="text-sm"><strong>Type:</strong> {{ rule.type }}</p>
                    <p class="text-sm">
                      <strong>On Pass:</strong>
                      {{ rule.flowControl?.onPass === 'continue' ? 'Proceed with all rules' : rule.flowControl?.onPass === 'stop' ? 'Stop rule evaluation' : `Jump to rule #${getRuleById(rule.flowControl?.onPassRuleId)?.priority || 'N/A'}` }}
                    </p>
                    <p class="text-sm">
                      <strong>On Fail:</strong>
                      {{ rule.flowControl?.onFail === 'continue' ? 'Proceed with all rules' : rule.flowControl?.onFail === 'stop' ? 'Stop rule evaluation' : `Jump to rule #${getRuleById(rule.flowControl?.onFailRuleId)?.priority || 'N/A'}` }}
                    </p>
                    <p class="text-sm"><strong>SQL Preview:</strong></p>
                    <div class="bg-gray-100 p-2 rounded text-xs font-mono">
                      <code>{{ generateSQLPreview(rule) }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rule Configuration Panel -->
        <div class="lg:col-span-3">
          <div v-if="activeRule" class="bg-white shadow-md rounded-lg p-6">
            <h4 class="text-lg font-semibold mb-4">
              Configure Rule: {{ activeRule.name || 'New Rule' }}
            </h4>
            <div class="mb-4">
              <label class="block font-bold mb-2">Rule Name</label>
              <input
                v-model="activeRule.name"
                placeholder="Enter rule name (e.g., Customer Credit Check)"
                :class="{ 'border-red-500': !ruleNameValid }"
                class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="handleRuleChange"
              />
              <p v-if="!ruleNameValid" class="text-red-500 text-sm mt-1">Rule name is required</p>
            </div>

            <div class="mb-4">
              <label class="block font-bold mb-2">Rule Type</label>
              <div class="flex gap-2">
                <button
                  v-for="option in ruleTypeOptions"
                  :key="option.value"
                  :class="{
                    'bg-blue-500 text-white': activeRule.type === option.value,
                    'bg-gray-200 text-gray-700': activeRule.type !== option.value,
                  }"
                  class="px-3 py-1 rounded hover:bg-blue-400"
                  @click="activeRule.type = option.value; resetRuleConfig()"
                >
                  {{ option.text }}
                </button>
              </div>
            </div>

            <!-- Flow Control Configuration -->
            <div class="mb-4">
              <label class="block font-bold mb-2">Flow Control</label>
              <div class="grid grid-cols-1 gap-4">
                <!-- On Pass -->
                <div>
                  <label class="block text-sm font-medium mb-1">On Pass</label>
                  <select
                    v-model="activeRule.flowControl.onPass"
                    class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @change="handleRuleChange"
                  >
                    <option value="continue">Proceed with all rules</option>
                    <option value="jump">Jump to specific rule</option>
                    <option value="stop">Stop rule evaluation</option>
                  </select>
                  <div v-if="activeRule.flowControl.onPass === 'jump'" class="mt-2">
                    <select
                      v-model="activeRule.flowControl.onPassRuleId"
                      class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      @change="handleRuleChange"
                    >
                      <option :value="null" disabled>Select a rule</option>
                      <option
                        v-for="rule in currentRules.filter(r => r.id !== activeRule.id)"
                        :key="rule.id"
                        :value="rule.id"
                      >
                        #{{ rule.priority }} - {{ rule.name || `Rule ${rule.priority}` }}
                      </option>
                    </select>
                    <p
                      v-if="activeRule.flowControl.onPass === 'jump' && !activeRule.flowControl.onPassRuleId"
                      class="text-red-500 text-sm mt-1"
                    >
                      Please select a rule to jump to
                    </p>
                  </div>
                </div>
                <!-- On Fail -->
                <div>
                  <label class="block text-sm font-medium mb-1">On Fail</label>
                  <select
                    v-model="activeRule.flowControl.onFail"
                    class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @change="handleRuleChange"
                  >
                    <option value="continue">Proceed with all rules</option>
                    <option value="jump">Jump to specific rule</option>
                    <option value="stop">Stop rule evaluation</option>
                  </select>
                  <div v-if="activeRule.flowControl.onFail === 'jump'" class="mt-2">
                    <select
                      v-model="activeRule.flowControl.onFailRuleId"
                      class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      @change="handleRuleChange"
                    >
                      <option :value="null" disabled>Select a rule</option>
                      <option
                        v-for="rule in currentRules.filter(r => r.id !== activeRule.id)"
                        :key="rule.id"
                        :value="rule.id"
                      >
                        #{{ rule.priority }} - {{ rule.name || `Rule ${rule.priority}` }}
                      </option>
                    </select>
                    <p
                      v-if="activeRule.flowControl.onFail === 'jump' && !activeRule.flowControl.onFailRuleId"
                      class="text-red-500 text-sm mt-1"
                    >
                      Please select a rule to jump to
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dynamic Rule Configuration -->
            <div v-show="showConfig" class="rule-config-section">
              <SimpleRuleConfig
                v-if="activeRule.type === 'simple'"
                v-model="activeRule.config"
                :tables="availableTables"
                :get-columns="getColumnsForTable"
                :operator-options="simpleOperatorOptions"
                @update:modelValue="handleRuleChange"
              />
              <AggregateRuleConfig
                v-if="activeRule.type === 'aggregate'"
                v-model="activeRule.config"
                :tables="availableTables"
                :get-columns="getColumnsForTable"
                :operator-options="operatorOptions"
                :aggregate-options="aggregateOptions"
                @update:modelValue="handleRuleChange"
              />
              <AdvancedRuleConfig
                v-if="activeRule.type === 'advanced'"
                v-model="activeRule.config"
                :tables="availableTables"
                :get-columns="getColumnsForTable"
                :operator-options="operatorOptions"
                :aggregate-options="aggregateOptions"
                @update:modelValue="handleRuleChange"
              />
            </div>
            <button
              class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 mt-2"
              @click="showConfig = !showConfig"
            >
              {{ showConfig ? 'Hide' : 'Show' }} Configuration
            </button>
          </div>
        </div>
      </div>

      <!-- Error/Success Messages -->
      <div v-if="showError" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
        {{ error }}
        <button class="float-right text-red-700 hover:text-red-900" @click="showError = false">
          ✕
        </button>
      </div>
      <div v-if="showSuccess" class="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
        {{ successMessage }}
        <button class="float-right text-green-700 hover:text-green-900" @click="showSuccess = false">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';
import SimpleRuleConfig from './components/SimpleRuleConfig.vue';
import AggregateRuleConfig from './components/AggregateRuleConfig.vue';
import AdvancedRuleConfig from './components/AdvancedRuleConfig.vue';
import Sidebar from '@/Components/sidebar.vue';
import { useRoute } from 'vue-router';
import { useApi } from '../../router/useApi';

export default {
  components: {
    draggable,
    Sidebar,
    SimpleRuleConfig,
    AggregateRuleConfig,
    AdvancedRuleConfig,
  },
  data() {
    return {
      configurations: [],
      showSidebar: false,
      selectedConfigId: null,
      versions: [],
      selectedVersionId: null,
      selectedVersion: null,
      currentRules: [],
      activeRuleId: null,
      activeRule: null,
      loading: false,
      saving: false,
      showConfig: true,
      showError: false,
      showSuccess: false,
      error: '',
      successMessage: '',
      ruleTypeOptions: [
        { text: 'Simple', value: 'simple' },
        { text: 'Aggregate', value: 'aggregate' },
        { text: 'Advanced', value: 'advanced' },
      ],
      simpleOperatorOptions: [
        { text: '=', value: '=' },
        { text: '!=', value: '!=' },
        { text: '>', value: '>' },
        { text: '<', value: '<' },
        { text: 'EXISTS', value: 'EXISTS' },
        { text: 'NOT EXISTS', value: 'NOT EXISTS' },
        { text: 'IN', value: 'IN' },
        { text: 'NOT IN', value: 'NOT IN' },
        { text: 'AGE_BETWEEN', value: 'AGE_BETWEEN' },
        { text: 'BETWEEN', value: 'BETWEEN' },
      ],
      operatorOptions: [
        { text: '=', value: '=' },
        { text: '!=', value: '!=' },
        { text: '>', value: '>' },
        { text: '>=', value: '>=' },
        { text: '<', value: '<' },
        { text: '<=', value: '<=' },
        { text: 'BETWEEN', value: 'BETWEEN' },
        { text: 'EXISTS', value: 'EXISTS' },
        { text: 'NOT EXISTS', value: 'NOT EXISTS' },
        { text: 'IN', value: 'IN' },
        { text: 'NOT IN', value: 'NOT IN' },
        { text: 'AGE_BETWEEN', value: 'AGE_BETWEEN' },
      ],
      aggregateOptions: [
        { text: 'COUNT', value: 'COUNT' },
        { text: 'SUM', value: 'SUM' },
        { text: 'AVG', value: 'AVG' },
        { text: 'MIN', value: 'MIN' },
        { text: 'MAX', value: 'MAX' },
        { text: 'VALUE', value: 'VALUE' },

      ],
      originalRules: [],
    };
  },
  computed: {
    availableTables() {
      const config = this.configurations.find(c => c.id === this.selectedConfigId);
      return config ? config.tables : [];
    },
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    isAuthRoute() {
      return ['/login', '/register'].includes(this.$route.path);
    },
    versionOptions() {
      return this.versions.map(version => ({
        id: version.id,
        name: `Version ${version.version_number}${version.is_active ? ' (Active)' : ''}`,
      }));
    },
    ruleNameValid() {
      return this.activeRule?.name?.length > 0;
    },
    hasChanges() {
      if (!this.selectedVersionId) return true;
      return JSON.stringify(this.currentRules) !== JSON.stringify(this.originalRules);
    },
  },
  async mounted() {
    const route = useRoute();
    this.loading = true;
    try {
      const response = await this.$axios.get('/api/configurations', this.getAxiosConfig());
      this.configurations = response.data;
      const configId = route.query.configId;
      if (configId && this.configurations.some(c => c.id === configId)) {
        this.selectedConfigId = configId;
        await this.loadRulesAndVersions();
      } else if (this.configurations.length > 0) {
        this.selectedConfigId = this.configurations[0].id;
        await this.loadRulesAndVersions();
      }
    } catch (error) {
      this.showError = true;
      this.error = error.response?.data?.error || 'Failed to load configurations';
    } finally {
      this.loading = false;
    }
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
    async loadRulesAndVersions() {
      if (!this.selectedConfigId) return;
      this.loading = true;
      try {
        const response = await this.$axios.get(`/api/credit-rules?configId=${this.selectedConfigId}`, this.getAxiosConfig());
        this.versions = response.data.versions;
        this.selectedVersionId = response.data.active_version || null;
        this.currentRules = response.data.rules || [];
        // Ensure conditionLogic is set for simple rules and flowControl is initialized
        this.currentRules = this.currentRules.map(rule => ({
          ...rule,
          config: {
            ...rule.config,
            conditionLogic: rule.type === 'simple' && !rule.config.conditionLogic ? 'AND' : rule.config.conditionLogic,
          },
          flowControl: rule.flowControl || { onPass: 'continue', onFail: 'continue', onPassRuleId: null, onFailRuleId: null },
        }));
        this.originalRules = JSON.parse(JSON.stringify(this.currentRules));
        this.activeRuleId = null;
        this.activeRule = null;
        if (this.selectedVersionId) {
          await this.loadVersion();
        }
      } catch (error) {
        this.showError = true;
        this.error = error.response?.data?.error || 'Failed to load rules and versions';
      } finally {
        this.loading = false;
      }
    },
    async loadVersion() {
      if (!this.selectedVersionId) {
        this.currentRules = [];
        this.originalRules = [];
        this.selectedVersion = null;
        return;
      }
      this.loading = true;
      try {
        this.selectedVersion = this.versions.find(v => v.id === this.selectedVersionId);
        this.currentRules = [...this.selectedVersion.rules].sort((a, b) => a.priority - b.priority);
        // Ensure conditionLogic is set for simple rules and flowControl is initialized
        this.currentRules = this.currentRules.map(rule => ({
          ...rule,
          config: {
            ...rule.config,
            conditionLogic: rule.type === 'simple' && !rule.config.conditionLogic ? 'AND' : rule.config.conditionLogic,
          },
          flowControl: rule.flowControl || { onPass: 'continue', onFail: 'continue', onPassRuleId: null, onFailRuleId: null },
        }));
        this.originalRules = JSON.parse(JSON.stringify(this.currentRules));
        this.activeRuleId = null;
        this.activeRule = null;
      } catch (error) {
        this.showError = true;
        this.error = error.response?.data?.error || 'Failed to load version';
      } finally {
        this.loading = false;
      }
    },
    setActiveRule(ruleId) {
      this.activeRuleId = ruleId;
      const rule = this.currentRules.find(r => r.id === ruleId);
      // Ensure conditionLogic is set for simple rules and flowControl is initialized
      this.activeRule = {
        ...rule,
        config: {
          ...rule.config,
          conditionLogic: rule.type === 'simple' && !rule.config.conditionLogic ? 'AND' : rule.config.conditionLogic,
        },
        flowControl: rule.flowControl || { onPass: 'continue', onFail: 'continue', onPassRuleId: null, onFailRuleId: null },
      };
    },
    addNewRule() {
      const newRule = {
        id: nanoid(),
        name: '',
        type: 'simple',
        priority: this.currentRules.length ? Math.max(...this.currentRules.map(r => r.priority)) + 1 : 1,
        config: {
          conditionLogic: 'AND',
          conditions: [{ table: null, column: null, operator: '=', value: '' }],
        },
        flowControl: { onPass: 'continue', onFail: 'continue', onPassRuleId: null, onFailRuleId: null },
      };
      this.currentRules.push(newRule);
      this.setActiveRule(newRule.id);
    },
    async removeRule(ruleId) {
      this.currentRules = this.currentRules.filter(r => r.id !== ruleId);
      this.currentRules.forEach((rule, index) => {
        rule.priority = index + 1;
      });
      if (this.activeRuleId === ruleId) {
        this.activeRuleId = null;
        this.activeRule = null;
      }
      try {
        await this.$axios.delete(`/api/credit-rules/${ruleId}?configId=${this.selectedConfigId}`, this.getAxiosConfig());
        this.showSuccess = true;
        this.successMessage = 'Rule deleted successfully';
      } catch (error) {
        this.showError = true;
        this.error = error.response?.data?.error || 'Failed to delete rule';
      }
    },
    async handleReorder() {
      this.currentRules.forEach((rule, index) => {
        rule.priority = index + 1;
      });
      try {
        await this.$axios.post('/api/credit-rules/reorder', {
          rules: this.currentRules.map(r => ({ id: r.id, priority: r.priority })),
          configuration_id: this.selectedConfigId,
        }, this.getAxiosConfig());
        this.showSuccess = true;
        this.successMessage = 'Rules reordered successfully';
        this.originalRules = JSON.parse(JSON.stringify(this.currentRules));
      } catch (error) {
        this.showError = true;
        this.error = error.response?.data?.error || 'Failed to reorder rules';
      }
    },
    getOriginalTableName(customTableName) {
      const table = this.availableTables.find(t => t.name === customTableName);
      return table ? table.original_name : customTableName;
    },
    getOriginalColumnName(tableName, customColumnName) {
      const table = this.availableTables.find(t => t.name === tableName);
      if (!table) return customColumnName;
      const column = table.columns.find(c => c.custom === customColumnName);
      return column ? column.original : customColumnName;
    },
    getRuleById(ruleId) {
      return this.currentRules.find(r => r.id === ruleId);
    },
    mapRuleToNames(rule) {
      const config = JSON.parse(JSON.stringify(rule.config));
      const flowControl = JSON.parse(JSON.stringify(rule.flowControl));
      if (rule.type === 'simple') {
        config.conditions = config.conditions.map(condition => ({
          ...condition,
          table: condition.table,
          original_table: this.getOriginalTableName(condition.table),
          column: condition.column,
          original_column: this.getOriginalColumnName(condition.table, condition.column),
          value: condition.operator === 'BETWEEN' || condition.operator === 'AGE_BETWEEN'
            ? { min: String(condition.value.min), max: String(condition.value.max) }
            : condition.operator === 'IN' || condition.operator === 'NOT IN'
            ? Array.isArray(condition.value) ? condition.value.map(String) : String(condition.value).split(',')
            : String(condition.value),
        }));
        config.conditionLogic = config.conditionLogic || 'AND';
      } else if (rule.type === 'aggregate') {
        config.table = config.table;
        config.original_table = this.getOriginalTableName(config.table);
        if (config.aggregateColumn) {
          config.original_aggregateColumn = this.getOriginalColumnName(config.table, config.aggregateColumn);
        }
        if (config.enableWhereClause && config.whereConditions?.length) {
          config.whereConditions = config.whereConditions.map(condition => ({
            ...condition,
            column: condition.column,
            original_column: this.getOriginalColumnName(config.table, condition.column),
            value: condition.operator === 'BETWEEN'
              ? { min: String(condition.value.min), max: String(condition.value.max) }
              : condition.operator === 'IN' || condition.operator === 'NOT IN'
              ? Array.isArray(condition.value) ? condition.value.map(String) : String(condition.value).split(',')
              : String(condition.value),
          }));
        } else {
          config.whereConditions = [];
        }
        if (config.havingCondition) {
          config.havingCondition = {
            ...config.havingCondition,
            value: config.havingCondition.operator === 'BETWEEN'
              ? { min: String(config.havingCondition.value.min), max: String(config.havingCondition.value.max) }
              : config.havingCondition.operator === 'IN' || config.havingCondition.operator === 'NOT IN'
              ? Array.isArray(config.havingCondition.value) ? config.havingCondition.value.map(String) : String(config.havingCondition.value).split(',')
              : String(config.havingCondition.value),
          };
        }
      } else if (rule.type === 'advanced') {
        config.tables = config.tables.map(tableConfig => ({
          ...tableConfig,
          table: tableConfig.table,
          original_table: this.getOriginalTableName(tableConfig.table),
          column: tableConfig.column,
          original_column: this.getOriginalColumnName(tableConfig.table, tableConfig.column),
          conditions: tableConfig.conditions.map(condition => ({
            ...condition,
            table: tableConfig.table,
            original_table: this.getOriginalTableName(tableConfig.table),
            column: condition.column,
            original_column: this.getOriginalColumnName(tableConfig.table, condition.column),
            value: condition.operator === 'BETWEEN'
              ? { min: String(condition.value.min), max: String(condition.value.max) }
              : condition.operator === 'IN' || condition.operator === 'NOT IN'
              ? Array.isArray(condition.value) ? condition.value.map(String) : String(condition.value).split(',')
              : String(condition.value),
          })),
        }));
        if (config.finalCondition) {
          config.finalCondition = {
            ...config.finalCondition,
            value: config.finalCondition.operator === 'BETWEEN'
              ? { min: String(config.finalCondition.value.min), max: String(config.finalCondition.value.max) }
              : config.finalCondition.operator === 'IN' || config.finalCondition.operator === 'NOT IN'
              ? Array.isArray(config.finalCondition.value) ? config.finalCondition.value.map(String) : String(config.finalCondition.value).split(',')
              : String(config.finalCondition.value),
          };
        }
      }
      return { ...rule, config, flowControl };
    },
    async applyRules() {
      // Validate rules before saving
      for (const rule of this.currentRules) {
        if (rule.type === 'simple' && !rule.config.conditionLogic) {
          this.showError = true;
          this.error = `Condition logic is required for rule "${rule.name || 'Unnamed Rule'}"`;
          return;
        }
        if (rule.flowControl.onPass === 'jump' && !rule.flowControl.onPassRuleId) {
          this.showError = true;
          this.error = `A rule must be selected for "On Pass" jump in rule "${rule.name || 'Unnamed Rule'}"`;
          return;
        }
        if (rule.flowControl.onFail === 'jump' && !rule.flowControl.onFailRuleId) {
          this.showError = true;
          this.error = `A rule must be selected for "On Fail" jump in rule "${rule.name || 'Unnamed Rule'}"`;
          return;
        }
        if (
          (rule.flowControl.onPass === 'jump' && rule.flowControl.onPassRuleId === rule.id) ||
          (rule.flowControl.onFail === 'jump' && rule.flowControl.onFailRuleId === rule.id)
        ) {
          this.showError = true;
          this.error = `A rule cannot jump to itself in "${rule.name || 'Unnamed Rule'}"`;
          return;
        }
      }
      this.saving = true;
      try {
        const rulesWithNames = this.currentRules.map(rule => this.mapRuleToNames(rule));
        const response = await this.$axios.post('/api/credit-rules', {
          configuration_id: this.selectedConfigId,
          rules: rulesWithNames,
        }, this.getAxiosConfig());
        this.showSuccess = true;
        this.successMessage = 'New version created successfully';
        this.versions.push(response.data.version);
        this.selectedVersionId = response.data.version.id;
        this.originalRules = JSON.parse(JSON.stringify(this.currentRules));
        await this.loadRulesAndVersions();
      } catch (error) {
        this.showError = true;
        this.error = error.response?.data?.error || 'Failed to save rules';
      } finally {
        this.saving = false;
      }
    },
    async activateVersion() {
      try {
        await this.$axios.post('/api/credit-rules/activate-version', {
          version_id: this.selectedVersionId,
          configuration_id: this.selectedConfigId,
        }, this.getAxiosConfig());
        this.showSuccess = true;
        this.successMessage = 'Version activated successfully';
        await this.loadRulesAndVersions();
      } catch (error) {
        this.showError = true;
        this.error = error.response?.data?.error || 'Failed to activate version';
      }
    },
    resetToCurrentVersion() {
      this.currentRules = JSON.parse(JSON.stringify(this.originalRules));
      this.activeRuleId = null;
      this.activeRule = null;
    },
    handleRuleChange() {
      const index = this.currentRules.findIndex(r => r.id === this.activeRuleId);
      if (index !== -1) {
        this.currentRules[index] = { ...this.activeRule };
      }
    },
    resetRuleConfig() {
      this.activeRule.config = this.activeRule.type === 'simple'
        ? {
            conditionLogic: 'AND',
            conditions: [{ table: null, column: null, operator: '=', value: '' }],
          }
        : this.activeRule.type === 'aggregate'
        ? {
            table: null,
            original_table: null,
            aggregate: 'COUNT',
            aggregateColumn: '*',
            original_aggregateColumn: '*',
            enableWhereClause: false,
            whereConditions: [],
            havingCondition: { operator: '=', value: '' },
          }
        : {
            tables: [{
              table: null,
              original_table: null,
              column: null,
              original_column: null,
              aggregate: null,
              conditions: [{ column: null, original_column: null, operator: '=', value: '' }],
            }],
            operation: '',
            finalCondition: { operator: '=', value: '' },
          };
      this.activeRule.flowControl = { onPass: 'continue', onFail: 'continue', onPassRuleId: null, onFailRuleId: null };
      this.handleRuleChange();
    },
    getColumnsForTable(tableName) {
      const table = this.availableTables.find(t => t.name === tableName);
      return table ? table.columns.map(c => c.custom || c.original) : [];
    },
    getRuleTypeBadge(type) {
      const badges = {
        simple: 'bg-green-500 text-white',
        aggregate: 'bg-blue-400 text-white',
        advanced: 'bg-yellow-500 text-white',
      };
      return badges[type] || 'bg-gray-500 text-white';
    },
    generateSQLPreview(rule) {
      const config = this.mapRuleToNames(rule).config;
      let preview = '';
      if (rule.type === 'simple') {
        const conditions = config.conditions
          .map(c => {
            if (c.operator === 'EXISTS') {
              return `EXISTS (SELECT 1 FROM ${c.original_table} WHERE ${c.original_column} IS NOT NULL)`;
            } else if (c.operator === 'NOT EXISTS') {
              return `NOT EXISTS (SELECT 1 FROM ${c.original_table} WHERE ${c.original_column} IS NOT NULL)`;
            } else if (c.operator === 'IN' || c.operator === 'NOT IN') {
              const values = Array.isArray(c.value) ? c.value : c.value.split(',').map(v => v.trim());
              return `${c.original_table}.${c.original_column} ${c.operator} (${values.map(v => `'${v}'`).join(', ')})`;
            } else if (c.operator === 'BETWEEN') {
              return `${c.original_table}.${c.original_column} BETWEEN '${c.value.min}' AND '${c.value.max}'`;
            } else if (c.operator === 'AGE_BETWEEN') {
              return `DATEDIFF(YEAR, ${c.original_table}.${c.original_column}, GETDATE()) BETWEEN ${c.value.min} AND ${c.value.max}`;
            } else {
              return `${c.original_table}.${c.original_column} ${c.operator} '${c.value}'`;
            }
          })
          .join(` ${config.conditionLogic} `);
        preview = `SELECT * FROM ${config.conditions[0].original_table} WHERE ${conditions}`;
      } else if (rule.type === 'aggregate') {
        const { original_table, aggregate, original_aggregateColumn, enableWhereClause, whereConditions, havingCondition } = config;
        let query = `SELECT ${aggregate}(${original_aggregateColumn || '*'}) FROM ${original_table}`;
        if (enableWhereClause && whereConditions?.length) {
          const conditions = whereConditions
            .map(c => {
              if (c.operator === 'EXISTS') {
                return `EXISTS (SELECT 1 FROM ${original_table} WHERE ${c.original_column} IS NOT NULL)`;
              } else if (c.operator === 'NOT EXISTS') {
                return `NOT EXISTS (SELECT 1 FROM ${original_table} WHERE ${c.original_column} IS NOT NULL)`;
              } else if (c.operator === 'IN' || c.operator === 'NOT IN') {
                const values = Array.isArray(c.value) ? c.value : c.value.split(',').map(v => v.trim());
                return `${c.original_column} ${c.operator} (${values.map(v => `'${v}'`).join(', ')})`;
              } else if (c.operator === 'BETWEEN') {
                return `${c.original_column} BETWEEN '${c.value.min}' AND '${c.value.max}'`;
              } else {
                return `${c.original_column} ${c.operator} '${c.value}'`;
              }
            })
            .join(' AND ');
          query += ` WHERE ${conditions}`;
        }
        if (havingCondition) {
          const having = havingCondition.operator === 'EXISTS'
            ? `EXISTS (SELECT 1 FROM ${original_table} WHERE ${original_aggregateColumn || '*'} IS NOT NULL)`
            : havingCondition.operator === 'NOT EXISTS'
            ? `NOT EXISTS (SELECT 1 FROM ${original_table} WHERE ${original_aggregateColumn || '*'} IS NOT NULL)`
            : havingCondition.operator === 'IN' || havingCondition.operator === 'NOT IN'
            ? `${aggregate}(${original_aggregateColumn || '*'}) ${havingCondition.operator} (${(Array.isArray(havingCondition.value) ? havingCondition.value : havingCondition.value.split(',').map(v => v.trim())).map(v => `'${v}'`).join(', ')})`
            : havingCondition.operator === 'BETWEEN'
            ? `${aggregate}(${original_aggregateColumn || '*'}) BETWEEN '${havingCondition.value.min}' AND '${havingCondition.value.max}'`
            : `${aggregate}(${original_aggregateColumn || '*'}) ${havingCondition.operator} '${havingCondition.value}'`;
          query += ` HAVING ${having}`;
        }
        preview = query;
      } else if (rule.type === 'advanced') {
        const { tables, operation, finalCondition } = config;
        const subQueries = tables.map((tableConfig, index) => {
          let subQuery = `SELECT ${tableConfig.aggregate}(${tableConfig.original_column || '*'}) AS result_${index + 1} FROM ${tableConfig.original_table}`;
          if (tableConfig.conditions.length) {
            const conditions = tableConfig.conditions
              .map(c => {
                if (c.operator === 'EXISTS') {
                  return `EXISTS (SELECT 1 FROM ${c.original_table} WHERE ${c.original_column} IS NOT NULL)`;
                } else if (c.operator === 'NOT EXISTS') {
                  return `NOT EXISTS (SELECT 1 FROM ${c.original_table} WHERE ${c.original_column} IS NOT NULL)`;
                } else if (c.operator === 'IN' || c.operator === 'NOT IN') {
                  const values = Array.isArray(c.value) ? c.value : c.value.split(',').map(v => v.trim());
                  return `${c.original_column} ${c.operator} (${values.map(v => `'${v}'`).join(', ')})`;
                } else if (c.operator === 'BETWEEN') {
                  return `${c.original_column} BETWEEN '${c.value.min}' AND '${c.value.max}'`;
                } else {
                  return `${c.original_column} ${c.operator} '${c.value}'`;
                }
              })
              .join(' AND ');
            subQuery += ` WHERE ${conditions}`;
          }
          return `(${subQuery}) AS t${index + 1}`;
        });
        let query = `WITH ${subQueries.join(', ')} SELECT (${operation.replace(/result_(\d+)/g, 't$1.result_$1')}) AS final_result`;
        if (finalCondition) {
          const condition = finalCondition.operator === 'EXISTS'
            ? `EXISTS (SELECT 1 FROM ${tables[0].original_table} WHERE ${tables[0].original_column || '*'} IS NOT NULL)`
            : finalCondition.operator === 'NOT EXISTS'
            ? `NOT EXISTS (SELECT 1 FROM ${tables[0].original_table} WHERE ${tables[0].original_column || '*'} IS NOT NULL)`
            : finalCondition.operator === 'IN' || finalCondition.operator === 'NOT IN'
            ? `final_result ${finalCondition.operator} (${(Array.isArray(finalCondition.value) ? finalCondition.value : finalCondition.value.split(',').map(v => v.trim())).map(v => `'${v}'`).join(', ')})`
            : finalCondition.operator === 'BETWEEN'
            ? `final_result BETWEEN '${finalCondition.value.min}' AND '${finalCondition.value.max}'`
            : `final_result ${finalCondition.operator} '${finalCondition.value}'`;
          query += ` WHERE ${condition}`;
        }
        preview = query;
      } else {
        preview = 'Preview not available';
      }
      // Append flow control information
      preview += `\n-- On Pass: ${rule.flowControl?.onPass === 'continue' ? 'Proceed with all rules' : rule.flowControl?.onPass === 'stop' ? 'Stop rule evaluation' : `Jump to rule #${this.getRuleById(rule.flowControl?.onPassRuleId)?.priority || 'N/A'}`}`;
      preview += `\n-- On Fail: ${rule.flowControl?.onFail === 'continue' ? 'Proceed with all rules' : rule.flowControl?.onFail === 'stop' ? 'Stop rule evaluation' : `Jump to rule #${this.getRuleById(rule.flowControl?.onFailRuleId)?.priority || 'N/A'}`}`;
      return preview;
    },
  },
};
</script>

<style scoped>
.rules-workspace {
  padding: 20px;
}
.workspace-container {
  min-height: 400px;
}
.rules-list {
  min-height: 100px;
}
.rule-item {
  cursor: pointer;
}
.drag-handle {
  cursor: move;
}
</style>