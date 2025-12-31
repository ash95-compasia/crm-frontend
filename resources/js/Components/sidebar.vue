<template>
  <div class="relative">
    <!-- Sidebar -->
    <div
      v-show="isAuthenticated && !isAuthRoute && isVisible"
      class="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 flex flex-col"
      :class="[isOpen ? 'translate-x-0' : '-translate-x-full']"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <img src="/images/compasia.png" alt="Logo" class="h-10 w-10 rounded-lg object-cover" />
          <div>
            <span class="text-lg font-bold text-gray-900 dark:text-white block">CRM Platform</span>
          </div>
        </div>
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle dark/light mode"
        >
          <i :class="[darkMode ? 'fas fa-sun text-yellow-500' : 'fas fa-moon text-gray-600']"></i>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="px-4 py-3">
        <div class="relative">
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
          />
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-2 space-y-0.5 overflow-y-auto py-2">
        <!-- Loading State -->
        <div v-if="loading" class="px-3 py-4 text-center">
          <i class="fas fa-spinner fa-spin text-blue-500"></i>
          <span class="ml-2 text-sm text-gray-500">Loading menu...</span>
        </div>

        <!-- Navigation Items -->
        <div v-else>
          <div v-for="module in filteredNavItems" :key="module.label" class="space-y-0.5">
            <!-- Module with Submodules -->
            <div v-if="module.submodules && module.submodules.length > 0">
              <div
                @click="toggleModule(module.label)"
                class="group flex items-center px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                <i
                  :class="['fas', module.icon || 'fa-circle', 'mr-3 w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200']"
                ></i>
                <span class="font-medium flex-1 text-sm">{{ module.label }}</span>
                <i
                  :class="['fas', module.isOpen ? 'fa-chevron-down' : 'fa-chevron-right', 'ml-auto w-3 h-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform duration-200', module.isOpen ? 'rotate-180' : '']"
                ></i>
              </div>

              <!-- Submodules -->
              <div v-if="module.isOpen" class="ml-7 space-y-0.5 mt-0.5">
                <router-link
                  v-for="submodule in module.submodules"
                  :key="submodule.path"
                  :to="submodule.path"
                  class="group flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 rounded-md transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                  active-class="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
                  @click="closeSidebar"
                >
                  <i
                    :class="['fas', submodule.icon || 'fa-circle', 'mr-3 w-2 h-2 flex-shrink-0 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400']"
                  ></i>
                  <span class="font-normal text-xs flex-1">{{ submodule.label }}</span>
                </router-link>
              </div>
            </div>

            <!-- Single Link (No Submodules) -->
            <router-link
              v-else-if="module.path"
              :to="module.path"
              class="group flex items-center px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800"
              active-class="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
              @click="handleAction(module.path)"
            >
              <i
                :class="['fas', module.icon || 'fa-circle', 'mr-3 w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200']"
              ></i>
              <span class="font-medium flex-1 text-sm">{{ module.label }}</span>
            </router-link>

            <!-- Fallback -->
            <div
              v-else
              class="group flex items-center px-3 py-2.5 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
            >
              <i :class="['fas', module.icon || 'fa-circle', 'mr-3 w-4 h-4 flex-shrink-0']"></i>
              <span class="font-medium flex-1 text-sm">{{ module.label }}</span>
            </div>
          </div>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200">
          <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
            <span class="text-white font-bold text-xs">U</span>
          </div>
          <div class="ml-3">
            <span class="text-sm font-medium text-gray-900 dark:text-white block">{{currentUserName}}</span>
          </div>
        </div>
      </div>

      <!-- Logout Section -->
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div
          @click="logout"
          class="group flex items-center px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
        >
          <i class="fas fa-sign-out-alt mr-3 w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200"></i>
          <span class="font-medium flex-1 text-sm">Logout</span>
        </div>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="isAuthenticated && isOpen && !isAuthRoute && isVisible"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
      :class="[isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none']"
    ></div>
  </div>
</template>

<script>
import axios from 'axios';
import { useApi } from '../router/useApi';

export default {
  name: 'Sidebar',
  props: {
    isVisible: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: false },
  },
  data() {
    return {
      navItems: [],
      loading: true,
      searchQuery: '',
      darkMode: false,
    };
  },
  setup() {
    const { getAxiosConfig } = useApi();
    return { getAxiosConfig };
  },
  async mounted() {
    await this.fetchNavItems();
    this.initializeDarkMode();
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    isAuthRoute() {
      return ['/login', '/register'].includes(this.$route.path);
    },
      currentUserName() {
            return localStorage.getItem('user_name') || 'Dashboard';
        },

    filteredNavItems() {
      if (!this.searchQuery.trim() || !this.navItems.length) return this.navItems;
      const query = this.searchQuery.toLowerCase();
      return this.navItems.filter(item => {
        if (item.label.toLowerCase().includes(query)) return true;
        if (item.submodules?.length) {
          return item.submodules.some(sub => sub.label.toLowerCase().includes(query));
        }
        return false;
      });
    },
  },
  watch: {
    // Open parent module of the selected route automatically
    '$route.path': {
      immediate: true,
      handler(newPath) {
        this.navItems = this.navItems.map(module => {
          if (module.submodules?.some(sub => sub.path === newPath)) {
            return { ...module, isOpen: true };
          }
          return module;
        });
      },
    },
  },
  methods: {
    async fetchNavItems() {
      try {
        const config = this.getAxiosConfig();
        const response = await axios.get('/api/landlord/nav-items', config);
        this.navItems = Array.isArray(response.data) ? response.data : [];
        this.navItems = this.navItems.map(item => ({ ...item, isOpen: false }));
        console.log("this.navItems",this.navItems)
      } catch (error) {
        console.error('Failed to fetch nav items:', error);
        this.navItems = [
          { label: 'Tenant', icon: 'fa-home', path: '/tenant', submodules: [] },
          {
            label: 'Application Manager',
            icon: 'fa-cog',
            path: null,
            isOpen: false,
            submodules: [
              { label: 'User managment', path: '/user-managment', icon: 'fa-file-code' },
              { label: 'Sidebar Manager', path: '/sidebar-config', icon: 'fa-list' },
              { label: 'Route Manager', path: '/routes', icon: 'fa-list' },
            ],
          },
        ];
      } finally {
        this.loading = false;
      }
    },
    closeSidebar() {
      setTimeout(() => this.$emit('toggle', false), 500);
    },
    logout() {
      ['token', 'tenant_code', 'permissions'].forEach(k => localStorage.removeItem(k));
        this.$nextTick(() => {
          this.$router.push('/login');
        });
        this.$emit('toggle', false);
    },
    toggleModule(moduleLabel) {
      this.navItems = this.navItems.map(item => ({
        ...item,
        isOpen: item.label === moduleLabel ? !item.isOpen : item.isOpen,
      }));
    },
    handleAction(path) {
      if (path === '/logout') this.logout();
      else this.closeSidebar();
    },

    // DARK MODE
    initializeDarkMode() {
      const savedTheme = localStorage.getItem('theme');
      let prefersDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode = prefersDark;
      document.documentElement.classList.toggle('dark', prefersDark);
      if (!savedTheme) localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.documentElement.classList.toggle('dark', this.darkMode);
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    },
  },
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

/* Smooth transitions */
* { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease; }

/* Custom scrollbar */
nav::-webkit-scrollbar { width: 6px; }
nav::-webkit-scrollbar-track { background: transparent; }
nav::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 3px; }
.dark nav::-webkit-scrollbar-thumb { background: #4a5568; }

/* Animations */
@keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
.router-link-active { animation: slideIn 0.2s ease-out forwards; }

@keyframes slideInSidebar { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideOutSidebar { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-100%); opacity: 0; } }
.translate-x-0 { animation: slideInSidebar 0.3s ease-out forwards; }
.-translate-x-full { animation: slideOutSidebar 0.3s ease-out forwards; }

.rotate-180 { transform: rotate(180deg); }
</style>
