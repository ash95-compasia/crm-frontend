<template>
    <div class="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-600 to-blue-400 text-white relative">
        <!-- Particle Background -->
        <div id="tsparticles" class="absolute inset-0 z-0"></div>

        <!-- Promotional Section -->
        <div class="w-full lg:w-1/2 p-8 flex flex-col justify-between relative z-10">
            <div>
                <a target="_blank" rel="noopener noreferrer">
                    <img src="/images/compasia.png" alt="Compasia Logo" class="h-24 w-24 rounded-full object-cover logo-hover" />
                </a>
            </div>
            <div class="mt-8 lg:mt-0">
                <h1 class="text-4xl font-bold text-blue-100 leading-tight">
                  Compasia Business Suite
                </h1>
                <p class="mt-4 text-blue-100">
                    Choose your portal to access powerful business tools for customer relationship management and system administration.
                </p>
                
                <!-- Portal Stats -->
                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- CRM Stats -->
                    <div class="bg-white/20 p-4 rounded-lg">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-users mr-2 text-blue-200"></i>
                            <p class="text-lg font-semibold text-blue-100">CRM Portal</p>
                        </div>
                        <p class="text-2xl font-bold text-blue-100">10k+</p>
                        <p class="text-sm text-blue-200">Customer Records</p>
                    </div>
                    
                    <!-- Admin Stats -->
                    <div class="bg-white/20 p-4 rounded-lg">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-cogs mr-2 text-blue-200"></i>
                            <p class="text-lg font-semibold text-blue-100">Admin Portal</p>
                        </div>
                        <p class="text-2xl font-bold text-blue-100">100+</p>
                        <p class="text-sm text-blue-200">System Configurations</p>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-sm text-blue-200">
                © 2025 Compasia Business Suite. All rights reserved.
            </div>
        </div>

        <!-- Form Section -->
        <div class="w-full lg:w-1/2 flex items-center justify-center relative z-10 p-8">
            <div class="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <!-- Portal Selection Tabs -->
                <div class="flex border-b border-gray-200">
                    <button
                        @click="activePortal = 'crm'"
                        :class="[
                            'flex-1 py-2 px-4 text-center font-medium text-sm',
                            activePortal === 'crm'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-blue-500'
                        ]"
                    >
                        <i class="fas fa-users mr-2"></i>
                        CRM Portal
                    </button>
                    <button
                        @click="activePortal = 'admin'"
                        :class="[
                            'flex-1 py-2 px-4 text-center font-medium text-sm',
                            activePortal === 'admin'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-blue-500'
                        ]"
                    >
                        <i class="fas fa-cogs mr-2"></i>
                        Admin Portal
                    </button>
                </div>

                <!-- Portal Title -->
                <div>
                    <h3 class="text-2xl font-bold text-blue-600">
                        {{ activePortal === 'crm' ? 'Access CRM Dashboard' : 'Access Admin Dashboard' }}
                    </h3>
                    <p class="mt-1 text-sm text-blue-500">
                        {{ activePortal === 'crm' 
                            ? 'Sign in to manage your customer relationships' 
                            : 'Sign in to manage system configurations' }}
                    </p>
                </div>

                <div class="space-y-4">
                    <!-- Organization Selector (for CRM) -->
                    <div v-if="activePortal === 'crm'">
                        <label for="tenant_code" class="block text-sm font-medium text-blue-600">Select Organization</label>
                        <select
                            id="tenant_code"
                            v-model="form.tenant_code"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                        >
                            <option value="">Choose your organization</option>
                            <option v-for="tenant in tenants" :key="tenant.id" :value="tenant.tenant_code">
                                {{ tenant.name }} ({{ tenant.tenant_code }})
                            </option>
                        </select>
                    </div>

                    <!-- Email Input -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-blue-600">
                            {{ activePortal === 'crm' ? 'CRM Account Email' : 'Admin Email' }}
                        </label>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                            :placeholder="activePortal === 'crm' ? 'Enter your CRM email' : 'Enter admin email'"
                        />
                    </div>

                    <!-- Password Input -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-blue-600">Password</label>
                        <input
                            id="password"
                            v-model="form.password"
                            type="password"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                            :placeholder="activePortal === 'crm' ? 'Enter your CRM password' : 'Enter admin password'"
                        />
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember_me"
                                v-model="form.remember"
                                type="checkbox"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label for="remember_me" class="ml-2 block text-sm text-blue-600">Remember this device</label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                                {{ activePortal === 'crm' ? 'Forgot CRM password?' : 'Forgot admin password?' }}
                            </a>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="errors.message" class="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p class="text-sm text-red-600 flex items-center">
                            <i class="fas fa-exclamation-circle mr-2"></i>
                            {{ errors.message }}
                        </p>
                    </div>

                    <!-- Login Button -->
                    <div>
                        <button
                            type="button"
                            @click="login"
                            :disabled="activePortal === 'crm' && !form.tenant_code"
                            class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            <i :class="['fas', activePortal === 'crm' ? 'fa-sign-in-alt' : 'fa-shield-alt', 'mr-2']"></i>
                            {{ activePortal === 'crm' ? 'Access CRM' : 'Access Admin Portal' }}
                        </button>
                    </div>

                    <!-- Portal Information -->
                    <div class="p-3 bg-blue-50 rounded-md">
                        <p class="text-xs text-blue-600">
                            <i class="fas fa-info-circle mr-1"></i>
                            {{ activePortal === 'crm' 
                                ? 'CRM Portal: Manage customers, sales pipelines, and support tickets.' 
                                : 'Admin Portal: Configure system settings, manage users, and monitor performance.' }}
                        </p>
                    </div>
                </div>

                <!-- Portal Switch Note -->
                <div class="text-center text-sm text-blue-600 pt-4 border-t border-gray-200">
                    <p v-if="activePortal === 'crm'">
                        Need administrative access? 
                        <a href="#" @click.prevent="activePortal = 'admin'" class="font-medium text-blue-600 hover:text-blue-500">
                            Switch to Admin Portal
                        </a>
                    </p>
                    <p v-else>
                        Need CRM access? 
                        <a href="#" @click.prevent="activePortal = 'crm'" class="font-medium text-blue-600 hover:text-blue-500">
                            Switch to CRM Portal
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            activePortal: 'crm', // 'crm' or 'admin'
            form: {
                tenant_code: '',
                email: '',
                password: '',
                remember: false,
            },
            tenants: [],
            errors: {},
        };
    },
    async mounted() {
        await this.fetchTenants();
        this.initParticles();
    },
    watch: {
        activePortal(newPortal) {
            // Reset form when switching portals
            if (newPortal === 'admin') {
                this.form.tenant_code = '';
            }
        }
    },
    methods: {
        async fetchTenants() {
            try {
                const response = await this.$axios.get('/api/tenants');
                this.tenants = response.data;
            } catch (error) {
                console.error('Failed to fetch tenants:', error);
            }
        },
        
        initParticles() {
            const particleOptions = {
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 150,
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                    },
                    color: {
                        value: "#2563EB",
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                    },
                    size: {
                        value: 3,
                        random: true,
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#2563EB",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {
                            default: "out",
                        },
                    },
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            links: {
                                opacity: 1,
                            },
                        },
                        push: {
                            quantity: 4,
                        },
                    },
                },
                detectRetina: true,
            };

            tsParticles.load({
                id: "tsparticles",
                options: particleOptions,
            });
        },
        
    async login() {
        try {
            // Clear previous errors
            this.errors = {};
            
            // Prepare login data based on portal
            const loginData = {
                email: this.form.email,
                password: this.form.password,
                remember: this.form.remember,
                portal_type: this.activePortal, // Add portal type
            };
            
            // Add tenant_code only for CRM portal
            if (this.activePortal === 'crm') {
                if (!this.form.tenant_code) {
                    this.errors = { message: 'Please select an organization for CRM access.' };
                    return;
                }
                loginData.tenant_code = this.form.tenant_code;
            }
            
            // Use single endpoint for both portals
            const endpoint = '/api/login';
            
            const response = await this.$axios.post(endpoint, loginData);
            
            // Store authentication data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('portal', this.activePortal);
            localStorage.setItem('is_admin', response.data.is_admin || false);
            
            // Store user info
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('user_name', response.data.user_name || response.data.email);
            
            // Store tenant code only for CRM
            if (this.activePortal === 'crm' && response.data.tenant_code) {
                localStorage.setItem('tenant_code', response.data.tenant_code);
            }
            
            // Store permissions if available (for CRM)
            if (response.data.permissions) {
                localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
            }
            
            // Redirect based on portal
            if (this.activePortal === 'crm') {
                this.$router.push({ name: 'dashboard' });
            } else {
                this.$router.push({ name: 'TenantManager' });
            }
            
        } catch (error) {
            console.error('Login error:', error);
            
            // Handle error response
            if (error.response?.status === 401) {
                this.errors = { 
                    message: 'Invalid credentials. Please check your email and password.' 
                };
            } else if (error.response?.status === 403) {
                this.errors = { 
                    message: 'Access denied. You do not have permission to access this portal.' 
                };
            } else {
                this.errors = error.response?.data?.errors || { 
                    message: 'Login failed. Please try again.' 
                };
            }
        }
    },
    },
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo-hover:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

/* Tab transition */
.tab-transition {
    transition: all 0.3s ease;
}

/* Button hover effect */
button:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

/* Input focus enhancement */
input:focus, select:focus {
    border-color: #2563EB;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Portal selection animation */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.slide-in {
    animation: slideIn 0.3s ease-out forwards;
}
</style>