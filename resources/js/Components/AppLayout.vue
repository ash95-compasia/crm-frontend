<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <!-- Sidebar -->
        <Sidebar 
            :isOpen="sidebarOpen" 
            @toggle="toggleSidebar"
        />
        
        <!-- Main Content -->
        <div class="transition-all duration-300 ease-in-out"
             :class="[sidebarOpen ? 'ml-64' : 'ml-0']">
            <!-- Header/Navbar (optional) -->
            <header class="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                <div class="flex items-center justify-between px-6 py-4">
                    <!-- Left side: Toggle button and page title -->
                    <div class="flex items-center space-x-4">
                        <button 
                            @click="toggleSidebar"
                            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                            <i class="fas fa-bars"></i>
                        </button>
                        <h1 @click="toggleSidebar" class="text-lg font-semibold text-gray-900 dark:text-white">
                            {{ currentRouteName }}
                        </h1>
                    </div>
                    
                    <!-- Right side: User menu, notifications, etc. -->
                    <div class="flex items-center space-x-4">
                        <!-- Notifications -->
                        <button class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <i class="fas fa-bell"></i>
                            <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                        
                        <!-- User dropdown -->
                        <div class="relative">
                            <button 
                                @click="toggleUserDropdown"
                                class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <span class="text-sm font-medium text-gray-900 dark:text-white hidden md:block">
                                    {{currentUserName}}
                                </span>
                                <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
                            </button>
                            
                            <!-- Dropdown menu -->
                            <div 
                                v-if="userDropdownOpen"
                                @click.stop
                                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-40"
                            >
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i class="fas fa-user mr-2"></i> Profile
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <i class="fas fa-cog mr-2"></i> Settings
                                </a>
                                <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                <a 
                                    href="#" 
                                    @click.prevent="logout"
                                    class="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <i class="fas fa-sign-out-alt mr-2"></i> Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Page Content -->
            <main class="p-6">
                <router-view></router-view>
            </main>
        </div>
        
        <!-- Close dropdowns when clicking outside -->
        <div 
            v-if="userDropdownOpen"
            @click="closeAllDropdowns"
            class="fixed inset-0 z-30"
        ></div>
    </div>
</template>

<script>
import Sidebar from '../Components/sidebar.vue'; // Adjust the path as needed

export default {
    name: 'AppLayout',
    components: {
        Sidebar
    },
    data() {
        return {
            sidebarOpen: true,
            userDropdownOpen: false
        };
    },
    computed: {
        currentRouteName() {
            return 'Menu';
        },
        currentUserName() {
            return localStorage.getItem('user_name') || 'Dashboard';
        }

    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        toggleUserDropdown() {
            this.userDropdownOpen = !this.userDropdownOpen;
        },
        closeAllDropdowns() {
            this.userDropdownOpen = false;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('tenant_code');
            localStorage.removeItem('permissions');
            this.$router.push('/login');
            this.closeAllDropdowns();
        }
    },
    mounted() {
        // Close dropdowns when clicking outside
        document.addEventListener('click', this.closeAllDropdowns);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeAllDropdowns);
    }
};
</script>

<style scoped>
/* Smooth transitions */
* {
    transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

/* Dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>