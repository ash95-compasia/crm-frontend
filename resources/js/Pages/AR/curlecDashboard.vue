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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </div>

    <!-- Sidebar -->
    <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="handleSidebarToggle" />

    <!-- Main Content -->
    <div class="w-full p-6 lg:p-8" :class="{ 'lg:ml-64': showSidebar }">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">Curlec Dashboard</h1>
          <div class="text-right">
            <div class="text-gray-600 text-sm">Embedded Content</div>
            <div class="text-2xl font-bold text-green-600 truncate max-w-xs">{{ currentUrl }}</div>
          </div>
        </div>

        <!-- Iframe Container -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden relative" style="min-height: 80vh;">
          <!-- Loading Overlay -->
          <div
            v-if="loading"
            class="absolute inset-0 bg-white flex items-center justify-center z-10 bg-opacity-95"
          >
            <div class="flex flex-col items-center justify-center space-y-4 text-gray-600">
              <svg class="animate-spin h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <div class="text-center">
                <span class="block">Loading embedded content...</span>
                <span class="text-sm text-gray-500">{{ currentUrl }}</span>
              </div>
            </div>
          </div>

          <!-- Error Overlay -->
          <div
            v-else-if="hasError"
            class="absolute inset-0 bg-white flex items-center justify-center z-10 bg-opacity-95"
          >
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
              <div class="flex items-center justify-center space-x-3 mb-4">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Failed to load content</h3>
                  <p class="text-gray-600 mt-1 text-sm">
                    {{ errorMessage }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-3 justify-center">
                <button
                  @click="retryLoad"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Retry
                </button>
                <button
                  @click="openExternalLink"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>

          <!-- Enhanced Iframe -->
          <iframe
            v-show="!loading && !hasError"
            :key="iframeKey"
            :src="proxyUrl"
            width="100%"
            height="100%"
            style="border:none; min-height:80vh;"
            :sandbox="iframeSandbox"
            @load="onIframeLoad"
            @error="onIframeError"
            ref="iframeEl"
            allow="geolocation; microphone; camera; midi; encrypted-media"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <Notification
      :message="notification.message"
      :type="notification.type"
      :visible="!!notification.message"
      @close="notification.message = ''"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Sidebar from '@/Components/sidebar.vue';
import Notification from '@/Components/Notification.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

// State
const currentUrl = ref('https://go.curlec.com/login');
const showSidebar = ref(false);
const notification = ref({ message: '', type: '' });
const loading = ref(true);
const hasError = ref(false);
const errorMessage = ref('');
const iframeKey = ref(0);
const iframeEl = ref(null);

// Computed
const isAuthenticated = computed(() => !!localStorage.getItem('token'));
const isAuthRoute = computed(() => ['/login', '/register'].includes(router.currentRoute.value.path));
const proxyUrl = computed(() => `/api/proxy?url=${encodeURIComponent(currentUrl.value)}`);
const iframeSandbox = computed(() => 
  'allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation'
);

// Methods
const openSidebar = () => (showSidebar.value = true);
const handleSidebarToggle = (isOpen) => (showSidebar.value = isOpen);

const showNotification = (message, type = 'success') => {
  notification.value = { message, type };
};

const onIframeLoad = () => {
  loading.value = false;
  hasError.value = false;
  errorMessage.value = '';
  showNotification('Content loaded successfully');
};

const onIframeError = (error) => {
  loading.value = false;
  hasError.value = true;
  errorMessage.value = 'Failed to load the embedded content. The site may be blocking iframe embedding.';
  showNotification('Failed to load content', 'error');
  console.error('Iframe error:', error);
};

const openExternalLink = () => {
  window.open(currentUrl.value, '_blank', 'noopener,noreferrer');
  showNotification(`Opened ${currentUrl.value} in new tab`);
};

const retryLoad = async () => {
  loading.value = true;
  hasError.value = false;
  errorMessage.value = '';
  iframeKey.value++;
  await nextTick();
  showNotification('Retrying to load content...');
};

const validateAndSetUrl = (url) => {
  try {
    const formatted = url.startsWith('http') ? url : `https://${url}`;
    new URL(formatted);
    return formatted;
  } catch {
    return null;
  }
};

// Watch for route changes
watch(() => route.query.url, (newUrl) => {
  if (newUrl) {
    const validatedUrl = validateAndSetUrl(newUrl);
    if (validatedUrl) {
      currentUrl.value = validatedUrl;
      retryLoad();
    }
  }
});

onMounted(async () => {
  const urlParam = route.query.url;
  if (urlParam) {
    const validatedUrl = validateAndSetUrl(urlParam);
    if (validatedUrl) {
      currentUrl.value = validatedUrl;
    } else {
      hasError.value = true;
      errorMessage.value = 'Invalid URL provided';
      loading.value = false;
      showNotification('Invalid URL!', 'error');
      return;
    }
  }

  showNotification(`Loading: ${currentUrl.value}`);

  // Test proxy connection
  try {
    await axios.get(`/api/proxy?url=${encodeURIComponent(currentUrl.value)}`, { 
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  } catch (error) {
    hasError.value = true;
    loading.value = false;
    errorMessage.value = 'Proxy service unavailable. Please check backend configuration.';
    showNotification('Proxy service unavailable', 'error');
    return;
  }

  // Set timeout for iframe load
  setTimeout(() => {
    if (loading.value) {
      hasError.value = true;
      loading.value = false;
      errorMessage.value = 'Content loading timed out. The site may be blocking embedded content.';
      showNotification('Load timeout - site may block embedding', 'error');
    }
  }, 30000);
});
</script>