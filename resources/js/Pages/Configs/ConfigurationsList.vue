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
      <header class="mb-10">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight animate-fade-in">Configurations List</h1>
        <p class="text-lg text-gray-600 mt-2 font-medium animate-slide-up">View and manage all your JSON configurations.</p>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center bg-blue-100 text-blue-800 p-4 rounded-lg animate-pulse">
        <svg class="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
        </svg>
        Loading configurations...
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
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Number of Tables</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Entity Name</th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Country</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="config in configurations" :key="config.id" class="hover:bg-gray-50 transition-all duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <router-link
                  :to="{ name: 'config-details', params: { id: config.id } }"
                  class="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {{ config.config_name }}
                </router-link>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ config.tables.length }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ config.entity_name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ config.country }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !configurations.length" class="bg-white rounded-2xl shadow-lg p-6 text-center">
        <p class="text-gray-600">No configurations found. Create one in the JSON Workspace.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/Components/sidebar.vue';
import { useApi } from '../../router/useApi';

export default {
  name: 'ConfigurationsList',
  components: {
    Sidebar,
  },
  setup() {
    const { getAxiosConfig } = useApi();
    return {
        getAxiosConfig,
    };
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
    const fetchConfigurations = async () => {
      loading.value = true;
      error.value = '';
      try {
        const response = await fetch('/api/configurations', this.getAxiosConfig());
        const data = await response.json();
        console.log('API response for configurations:', data); // Debug the response
        if (response.ok) {
          configurations.value = data;
        } else {
          error.value = data.error || 'Failed to load configurations';
        }
      } catch (err) {
        error.value = `Error loading configurations: ${err.message}`;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchConfigurations);

    return {
      configurations,
      loading,
      showSidebar,
      openSidebar,
      toggleSidebar,
      isAuthenticated,
      isAuthRoute,
      error,
    };
  },
};
</script>

<style scoped>
.json-workspace {
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