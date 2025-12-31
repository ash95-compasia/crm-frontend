<template>
  <div class="json-workspace min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
    <!-- Sidebar hover activator -->
    <div
      v-if="isAuthenticated && !isAuthRoute"
      @mouseenter="openSidebar"
      class="fixed inset-y-0 left-0 w-6 z-50 bg-transparent hover:bg-blue-100/10 transition-all duration-200"
      title="Hover to open sidebar"
    ></div>

    <!-- Sidebar -->
    <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="toggleSidebar" />

    <!-- Main Content -->
    <div :class="['flex-1 transition-all duration-300 p-8', showSidebar ? 'ml-72' : 'ml-0']">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <header class="mb-10">
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight animate-fade-in">
            JSON Workspace
          </h1>
          <p class="text-lg text-gray-600 mt-2 font-medium animate-slide-up">
            Craft, visualize, and manage your JSON data effortlessly.
          </p>
        </header>

        <!-- Sections -->
        <div class="space-y-6">
          <!-- Configuration -->
          <section class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <button
              @click="isConfigSectionOpen = !isConfigSectionOpen"
              class="w-full p-5 flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200"
            >
              <h2 class="text-xl font-semibold text-gray-800">Configuration Hub</h2>
              <svg
                :class="['h-6 w-6 transform transition-transform duration-200', isConfigSectionOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="section-slide">
              <div v-show="isConfigSectionOpen" class="p-6">
                <ConfigurationManagement
                  v-model:configName="configName"
                  v-model:selectedConfigId="selectedConfigId"
                  :configurations="configurations"
                  :loading="loading"
                  :selectedTables="selectedTables"
                  @save="saveConfiguration"
                  @load="loadConfiguration"
                />
              </div>
            </transition>
          </section>

          <!-- Entity Section -->
          <section class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <button
              @click="isEntitySectionOpen = !isEntitySectionOpen"
              class="w-full p-5 flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200"
            >
              <h2 class="text-xl font-semibold text-gray-800">Entity Details</h2>
              <svg
                :class="['h-6 w-6 transform transition-transform duration-200', isEntitySectionOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="section-slide">
              <div v-show="isEntitySectionOpen" class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="entityName" class="block text-sm font-medium text-gray-700 mb-2">Entity Name</label>
                  <input
                    id="entityName"
                    v-model="entityName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
                    placeholder="Enter entity name"
                  />
                </div>
                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    id="country"
                    v-model="country"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </transition>
          </section>

          <!-- JSON Input -->
          <section class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <button
              @click="isJsonSectionOpen = !isJsonSectionOpen"
              class="w-full p-5 flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200"
            >
              <h2 class="text-xl font-semibold text-gray-800">JSON Editor</h2>
              <svg
                :class="['h-6 w-6 transform transition-transform duration-200', isJsonSectionOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="section-slide">
              <div v-show="isJsonSectionOpen" class="p-6">
                <JsonInput
                  v-model:jsonInputs="jsonInputs"
                  :loading="loading"
                  :jsonInputStates="jsonInputStates"
                  @parse="parseJson"
                  @clear="clear"
                  @add-json="addJsonInput"
                  @remove-json="removeJsonInput"
                />
              </div>
            </transition>
          </section>

          <!-- Loading/Error -->
          <div v-if="loading || error" class="flex gap-4 mb-6">
            <div v-if="loading" class="flex-1 bg-blue-100 text-blue-800 p-4 rounded-lg flex items-center animate-pulse">
              <svg class="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8z" />
              </svg>
              Processing JSON...
            </div>
            <div v-if="error" class="flex-1 bg-red-100 text-red-800 p-4 rounded-lg flex items-center">
              <svg class="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd" />
              </svg>
              {{ error }}
            </div>
          </div>

          <!-- Table Workspace -->
          <section class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <button
              @click="isTableSectionOpen = !isTableSectionOpen"
              class="w-full p-5 flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200"
            >
              <h2 class="text-xl font-semibold text-gray-800">Table Workspace</h2>
              <svg
                :class="['h-6 w-6 transform transition-transform duration-200', isTableSectionOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="section-slide">
              <div v-show="isTableSectionOpen" class="p-6">
                <TableWorkspace
                  v-model:availableTables="availableTables"
                  v-model:dropZoneTables="dropZoneTables"
                  :normalizedData="normalizedData"
                  :loading="loading"
                  @update-table="updateSelectedTable"
                  @remove-table="removeFromDropZone"
                />
              </div>
            </transition>
          </section>

          <!-- Preview -->
          <section class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <button
              @click="isPreviewSectionOpen = !isPreviewSectionOpen"
              class="w-full p-5 flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200"
            >
              <h2 class="text-xl font-semibold text-gray-800">Data Preview</h2>
              <svg
                :class="['h-6 w-6 transform transition-transform duration-200', isPreviewSectionOpen ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="section-slide">
              <div v-show="isPreviewSectionOpen" class="p-6">
                <PreviewSection
                  :selectedTables="selectedTables"
                  :normalizedData="normalizedData"
                  @copy="copyTableToClipboard"
                  @remove="removeTable"
                />
              </div>
            </transition>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '@/Components/sidebar.vue';
import ConfigurationManagement from './ConfigurationManagement.vue';
import JsonInput from './JsonInput.vue';
import TableWorkspace from './TableWorkspace.vue';
import PreviewSection from './PreviewSection.vue';
import { useApi } from '../../router/useApi';

const route = useRoute();
const { getAxiosConfig } = useApi();

// --- Reactive State ---
const showSidebar = ref(false);
const isEntitySectionOpen = ref(true);
const isConfigSectionOpen = ref(true);
const isJsonSectionOpen = ref(true);
const isTableSectionOpen = ref(true);
const isPreviewSectionOpen = ref(true);

const entityName = ref('');
const country = ref('');
const configName = ref('');
const selectedConfigId = ref(null);
const configurations = ref([]);
const jsonInputs = ref([{ id: Date.now(), value: '' }]);
const jsonInputStates = ref({});
const availableTables = ref([]);
const dropZoneTables = ref([]);
const selectedTables = ref([]);
const normalizedData = ref({});
const loading = ref(false);
const error = ref('');

// --- Computed ---
const isAuthenticated = computed(() => !!localStorage.getItem('token'));
const isAuthRoute = computed(() => ['/login', '/register'].includes(route.path));

// --- Methods ---
function openSidebar() {
  showSidebar.value = true;
}

function toggleSidebar(isOpen) {
  showSidebar.value = isOpen;
}

function addJsonInput() {
  jsonInputs.value.push({ id: Date.now(), value: '' });
}

function removeJsonInput(id) {
  if (jsonInputs.value.length > 1) {
    jsonInputs.value = jsonInputs.value.filter(i => i.id !== id);
  }
}

async function parseJson() {
  if (!entityName.value || !country.value) {
    error.value = 'Please fill in both Entity Name and Country fields';
    return;
  }
  loading.value = true;
  error.value = '';

  try {
    const response = await fetch('/api/data-mapping', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsons: jsonInputs.value.map(i => i.value),
        entity_name: entityName.value,
        country: country.value,
      }),
    });

    const data = await response.json();
    if (response.ok && data.results?.[0]?.structure) {
      const structure = data.results[0].structure;
      availableTables.value = Object.keys(structure).map(name => ({
        name,
        customName: '',
        columns: Object.keys(structure[name][0] || {})
          .filter(k => !['id', 'parent_id', 'index'].includes(k))
          .map(k => ({ key: k, custom: '' })),
      }));
      normalizedData.value = structure;
    } else {
      error.value = data.error || 'Failed to parse JSON';
    }
  } catch (err) {
    error.value = `Error parsing JSON: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

async function saveConfiguration() {
  if (!entityName.value || !country.value) {
    error.value = 'Please fill in both Entity Name and Country fields';
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const response = await fetch('/api/save-config', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        config_name: configName.value,
        entity_name: entityName.value,
        country: country.value,
        jsons: jsonInputs.value.map(i => i.value),
        tables: dropZoneTables.value.map(t => ({
          name: t.customName || t.name,
          original_name: t.name,
          columns: t.columns.map(c => ({ original: c.key, custom: c.custom })),
        })),
      }),
    });

    const data = await response.json();
    if (response.ok) await loadAllConfiguration();
    else error.value = data.error || 'Failed to save configuration';
  } catch (err) {
    error.value = `Error saving configuration: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

async function loadAllConfiguration() {
  loading.value = true;
  error.value = '';
  try {
    const response = await fetch('/api/configurations', getAxiosConfig());
    const data = await response.json();

    if (response.ok && Array.isArray(data)) {
      configurations.value = data.map(item => ({
        value: item.id,
        text: item.config_name || item.name || 'Unnamed Configuration',
      }));
    } else {
      error.value = data.error || 'Failed to load configurations';
    }
  } catch (err) {
    error.value = `Error loading configurations: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

async function loadConfiguration() {
  if (!selectedConfigId.value) {
    error.value = 'Please select a configuration to load';
    return;
  }
  loading.value = true;
  error.value = '';
  try {
    const response = await fetch(`/api/configuration/${selectedConfigId.value}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (response.ok) {
      entityName.value = data.entity_name || '';
      country.value = data.country || '';
      jsonInputs.value = data.original_json
        ? [{ id: Date.now(), value: JSON.stringify(data.original_json, null, 2) }]
        : [{ id: Date.now(), value: '' }];
      dropZoneTables.value = data.tables || [];
      selectedTables.value = data.tables || [];
      normalizedData.value = data.results?.[0]?.structure || {};
    } else {
      error.value = data.error || 'Failed to load configuration';
    }
  } catch (err) {
    error.value = `Error loading configuration: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

function clear() {
  entityName.value = '';
  country.value = '';
  jsonInputs.value = [{ id: Date.now(), value: '' }];
  availableTables.value = [];
  dropZoneTables.value = [];
  selectedTables.value = [];
  normalizedData.value = {};
  error.value = '';
  configName.value = '';
  selectedConfigId.value = null;
}

function updateSelectedTable() {
  selectedTables.value = dropZoneTables.value.map(t => ({
    name: t.name,
    customName: t.customName,
    columns: t.columns,
  }));
}

function removeFromDropZone(table) {
  dropZoneTables.value = dropZoneTables.value.filter(t => t.name !== table.name);
  updateSelectedTable();
}

function removeTable(index) {
  dropZoneTables.value.splice(index, 1);
  updateSelectedTable();
}

async function copyTableToClipboard(table) {
  const text = JSON.stringify(normalizedData.value[table.name], null, 2);
  await navigator.clipboard.writeText(text);
}

onMounted(loadAllConfiguration);
</script>

<style scoped>
/* same styles — your existing CSS is clean and fine */
</style>
