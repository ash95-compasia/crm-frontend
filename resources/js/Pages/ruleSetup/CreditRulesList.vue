<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Sidebar -->
      <div
        v-if="isAuthenticated && !isAuthRoute"
        @mouseenter="openSidebar"
        class="fixed inset-y-0 left-0 w-6 z-50 bg-transparent hover:bg-blue-100/10 transition-all duration-200"
        title="Hover to open sidebar"
      ></div>

      <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="toggleSidebar" />

      <!-- Header -->
      <header class="mb-10 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight animate-fade-in">Credit Rules List</h1>
          <p class="text-lg text-gray-600 mt-2 font-medium animate-slide-up">View all configurations and their credit rule versions.</p>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center bg-blue-100 text-blue-800 p-4 rounded-lg animate-pulse">
        <svg class="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
        </svg>
        Loading configurations and versions...
      </div>

      <!-- Error State -->
      <div v-if="error" class="flex items-center bg-red-100 text-red-800 p-4 rounded-lg mb-6">
        <svg class="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        {{ error }}
      </div>

      <!-- Configurations Table -->
      <div v-if="!loading && configurations.length" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Configuration Name</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Number of Versions</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Active Version</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="config in configurations" :key="config.id" class="hover:bg-gray-50 transition-all duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
              <router-link
                :to="{ name: 'Rules Workspace Id', params: { id: config.id } }"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                {{ config.config_name }}
              </router-link>              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ config.versionCount || 0 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  v-if="config.activeVersion"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                 Version Number {{ config.activeVersion }}
                </span>
                <span v-else class="text-gray-500">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !configurations.length" class="bg-white rounded-2xl shadow-lg p-6 text-center">
        <p class="text-gray-600">No configurations found. Create one in the JSON Workspace.</p>
        <router-link
          to="/data-mapping"
          class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to JSON Workspace
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/Components/sidebar.vue';

export default {
  name: 'CreditRulesList',
  components: {
    Sidebar,
  },
  setup() {
    const router = useRouter();
    const configurations = ref([]);
    const loading = ref(false);
    const error = ref('');
    const showSidebar = ref(false);
    const openSidebar = () => {
      showSidebar.value = true;
      console.log('Sidebar opened via hover');
    };
    const toggleSidebar = (isOpen) => {
      showSidebar.value = isOpen;
      console.log('Sidebar is', isOpen ? 'open' : 'closed');
    };
    // Computed
    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('token');
    });

    const isAuthRoute = computed(() => {
      return ['/login', '/register'].includes(router.path);
    });
    const fetchConfigurationsAndVersions = async () => {
      loading.value = true;
      error.value = '';
      try {
        // Fetch configurations
        const configResponse = await fetch('/api/configurations', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        const configs = await configResponse.json();
        console.log('API response for configurations:', configs); // Debug
        if (!configResponse.ok) {
          throw new Error(configs.error || 'Failed to load configurations');
        }

        // Fetch version data for each configuration
        const enrichedConfigs = await Promise.all(
          configs.map(async (config) => {
            try {
              const versionResponse = await fetch(`/api/credit-rules?configId=${config.id}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
              });
              const versionData = await versionResponse.json();
              console.log(`API response for credit rules (config ${config.id}):`, versionData); // Debug
              if (!versionResponse.ok) {
                throw new Error(versionData.error || `Failed to load versions for config ${config.id}`);
              }

              const versionCount = versionData.versions?.length || 0;
              const activeVersion = versionData.versions?.find((v) => v.is_active)?.version_number || null;

              return {
                ...config,
                versionCount,
                activeVersion,
              };
            } catch (err) {
              console.error(`Error fetching versions for config ${config.id}:`, err);
              return {
                ...config,
                versionCount: 0,
                activeVersion: null,
              };
            }
          })
        );

        configurations.value = enrichedConfigs;
        console.log("configurations.value",configurations.value)
      } catch (err) {
        error.value = `Error loading data: ${err.message}`;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchConfigurationsAndVersions);

    return {
      configurations,
      loading,
      error,
      showSidebar,
      openSidebar,
      toggleSidebar,
      isAuthenticated,
      isAuthRoute,
    };
  },
};
</script>

<style scoped>
.min-h-screen {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

.bg-white {
  background-color: #ffffff;
}

.rounded-2xl {
  border-radius: 1rem;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-in-out;
}
</style>