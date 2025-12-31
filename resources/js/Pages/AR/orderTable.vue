<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Orders Master Listing</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Orders</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Orders</div>
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Orders</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Orders</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activeOrdersCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatCurrency(totalRevenue) }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Currency</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ currencyCode }}</p>
                            </div>
                            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Global Table Component -->
                <GlobalTable
                    :data="tableData"
                    :columns="ORDERS_TABLE_COLUMNS"
                    :filters="ORDERS_TABLE_FILTERS"
                    :default-sort="{ key: 'order_number', order: 'desc' }"
                    storage-key="orders-master-listing-table"
                    :loading="loading"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Order Number Column -->
                    <template #column-order_number="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <span class="text-blue-600 dark:text-blue-400 font-medium text-sm">#{{ getOrderNumberSuffix(value) }}</span>
                            </div>
                            <div class="ml-4">
                                <router-link 
                                    :to="'/order-details/' + row.id" 
                                    class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                >
                                    {{ value || 'N/A' }}
                                </router-link>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {{ formatDate(row.start_contract) }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Customer Column -->
                    <template #column-customer="{ row }">
                        <div class="flex items-center text-sm text-gray-900 dark:text-gray-300">
                            <div class="flex-shrink-0 h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                                <span class="text-green-600 dark:text-green-400 text-xs font-medium">{{ getCustomerInitials(row) }}</span>
                            </div>
                            <div>
                                <div>{{ getCustomerName(row) || 'N/A' }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ row.customer?.id_number || 'No ID' }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Program Column -->
                    <template #column-program="{ row }">
                        <div>
                            <div class="text-sm font-medium text-gray-900 dark:text-white">{{ row.program_id || 'N/A' }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                {{ row.sku || 'No SKU' }}
                            </div>
                        </div>
                    </template>
                     <template #column-program_fee="{ value }">
                        <div class="text-right">
                            <span class="text-sm font-semibold text-gray-900 dark:text-gray-300">
                                {{ formatCurrency(value) }}
                            </span>
                        </div>
                    </template>
                    <!-- Custom Amount Column -->
                    <template #column-monthly_subscription="{ value }">
                        <div class="text-right">
                            <span class="text-sm font-semibold text-gray-900 dark:text-gray-300">
                                {{ formatCurrency(value) }}
                            </span>
                        </div>
                    </template>

                    <!-- Custom Tenure Column -->
                    <template #column-tenure="{ value }">
                        <div class="text-center">
                            <span class="text-sm text-gray-900 dark:text-gray-300">
                                {{ value || 0 }} months
                            </span>
                        </div>
                    </template>

                    <!-- Custom Status Column -->
                    <template #column-order_status_id="{ value }">
                        <span :class="getStatusBadgeClass(value)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ getStatusText(value) }}
                        </span>
                    </template>

                    <!-- Custom Actions Column -->
                    <template #column-actions="{ row }">
                        <div class="flex space-x-2">
                            <button 
                                @click="viewOrderDetails(row)"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                title="View order details"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>
                            <button 
                                @click="generateContract(row)"
                                :disabled="!row.customer"
                                :class="[
                                    'flex items-center text-sm px-3 py-1.5 rounded-lg transition-colors duration-200',
                                    row.customer
                                        ? 'text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                ]"
                                :title="row.customer ? 'Generate contract from order' : 'Customer data missing'"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Contract
                            </button>
                        </div>
                    </template>
                </GlobalTable>
            </div>
        </div>

        <!-- Notifications -->
        <div 
            v-if="notification.message" 
            :class="[
                'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 z-50 border',
                notification.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800'
            ]"
        >
            <div class="flex items-center">
                <svg 
                    v-if="notification.type === 'success'" 
                    class="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg 
                    v-else 
                    class="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="text-sm">{{ notification.message }}</span>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GlobalTable from '@/Components/globalTable.vue';
import { useApi } from '@/router/useApi';
import { ORDERS_TABLE_COLUMNS, ORDERS_TABLE_FILTERS } from '@/Constants/tableColumns.js';

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const result = ref({ data: [], total: 0, from: 0, to: 0 });
const loading = ref(false);
const currencyCode = ref('SGD');
const notification = ref({ message: '', type: '' });

// Computed properties
const tableData = computed(() => {
    console.log('API Response data:', result.value.data);
    
    if (!result.value.data || !Array.isArray(result.value.data)) {
        console.log('No data array found');
        return [];
    }
    
    return result.value.data.map(order => {
        // Debug customer data
        console.log('Order customer data:', order.customer);
        
        return {
            ...order,
            monthly_subscription: parseFloat(order.monthly_subscription) || 0,
            tenure: parseFloat(order.tenure) || 0,
            program_fee: parseFloat(order.program_fee) || 0,
            tax: parseFloat(order.tax) || 0
        };
    });
});

const activeOrdersCount = computed(() => {
    return tableData.value.filter(order => [1, 2, 3].includes(order.order_status_id)).length;
});

const totalRevenue = computed(() => {
    return tableData.value.reduce((sum, order) => {
        const monthlySub = parseFloat(order.monthly_subscription) || 0;
        const tenure = parseFloat(order.tenure) || 0;
        const programFee = parseFloat(order.program_fee) || 0;
        return sum + (monthlySub * tenure) + programFee;
    }, 0);
});

const totalMonthly = computed(() => {
    return tableData.value.reduce((sum, order) => sum + (parseFloat(order.monthly_subscription) || 0), 0);
});

const averageSubscription = computed(() => {
    const validOrders = tableData.value.filter(order => parseFloat(order.monthly_subscription) > 0);
    return validOrders.length > 0 ? totalMonthly.value / validOrders.length : 0;
});

// Methods
const showNotification = (message, type = 'success') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 5000);
};

const fetchData = async () => {
    loading.value = true;
    try {
        const response = await axios.get(`/api/orders`, { 
            ...getAxiosConfig(),
            params: {
                with: 'customer'  // Make sure we're loading customer relationship
            }
        });
                
        if (response.data.success && response.data.data) {
            // Handle paginated response
            if (response.data.data.data && Array.isArray(response.data.data.data)) {
                result.value = {
                    data: response.data.data.data,
                    total: response.data.data.total || response.data.data.data.length,
                    from: response.data.data.from || 1,
                    to: response.data.data.to || response.data.data.data.length
                };
            } else if (Array.isArray(response.data.data)) {
                // Non-paginated array response
                result.value = {
                    data: response.data.data,
                    total: response.data.data.length,
                    from: 1,
                    to: response.data.data.length
                };
            }
        } else if (Array.isArray(response.data)) {
            // Direct array response (fallback)
            result.value = {
                data: response.data,
                total: response.data.length,
                from: 1,
                to: response.data.length
            };
        } else {
            console.warn('Unexpected response format:', response.data);
            result.value = {
                data: [],
                total: 0,
                from: 0,
                to: 0
            };
        }
        
        console.log('Processed result:', result.value);
        showNotification(`${result.value.total} orders loaded successfully`);
    } catch (error) {
        console.error('Fetch error:', error);
        showNotification('Failed to load orders! ' + error.message, 'error');
    } finally {
        loading.value = false;
    }
};

const fetchCurrency = async () => {
    try {
        const response = await axios.get('/api/currencies', getAxiosConfig());
        if (response.data && Array.isArray(response.data) && response.data[0]?.code) {
            currencyCode.value = response.data[0].code;
        } else if (response.data?.data && Array.isArray(response.data.data) && response.data.data[0]?.code) {
            currencyCode.value = response.data.data[0].code;
        }
    } catch (error) {
        console.warn('Failed to fetch currency, using default:', error);
        currencyCode.value = process.env.VUE_APP_CURRENCY || 'SGD';
    }
};

const formatCurrency = (value) => {
    if (!value && value !== 0) return '-';
    const currency = currencyCode.value || 'SGD';
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    } catch (error) {
        console.warn('Currency formatting error:', error);
        return `${currency} ${parseFloat(value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) || '0.00'}`;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.warn('Date formatting error:', error);
        return 'Invalid Date';
    }
};

const getCustomerName = (order) => {
    if (!order.customer) {
        console.log('No customer data for order:', order.id);
        return 'Customer Not Loaded';
    }
    
    return order.customer.name_as_per_nric || 
           `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim() || 
           'Unnamed Customer';
};

const getCustomerInitials = (order) => {
    const name = getCustomerName(order);
    if (!name || name === 'Customer Not Loaded' || name === 'Unnamed Customer') return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const getOrderNumberSuffix = (orderNumber) => {
    if (!orderNumber) return 'N/A';
    // Extract last 4 characters or the whole string if shorter
    return orderNumber.slice(-4);
};

const getStatusText = (statusId) => {
    const statusMap = {
        1: 'Active',
        2: 'Pending',
        3: 'Completed',
        4: 'Cancelled',
        5: 'Suspended',
        6: 'Draft',
        7: 'Processing',
        8: 'On Hold',
        9: 'Refunded'
    };
    return statusMap[statusId] || `Status ${statusId}`;
};

const getStatusBadgeClass = (statusId) => {
    const classMap = {
        1: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
        2: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
        3: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
        4: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
        5: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400',
        6: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400',
        7: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400',
        8: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400',
        9: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400'
    };
    return classMap[statusId] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
};

const viewOrderDetails = (order) => {
    router.push(`/order-details/${order.id}`);
};

const generateContract = (order) => {
    if (order.customer) {
        router.push(`/contracts/create?orderId=${order.id}`);
    } else {
        showNotification('Cannot generate contract: Customer data is missing', 'error');
    }
};

const refreshData = async () => {
    await fetchData();
};

// Lifecycle
onMounted(async () => {
    console.log('Orders component mounted');
    await fetchCurrency();
    await fetchData();
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
    background: #374151;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
    background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}

/* Smooth transitions */
* {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

tbody tr {
    transition: background-color 0.15s ease-in-out;
}

/* Loading animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

.font-inter {
    font-family: 'Inter', sans-serif;
}

.logo-hover {
    transition: transform 0.3s ease;
}

.logo-hover:hover {
    transform: scale(1.05);
}

/* Empty state styling */
.empty-state {
    opacity: 0.7;
}

/* Improved table row hover */
tbody tr:hover {
    @apply bg-gray-50 dark:bg-gray-700/50;
}

/* Status badge animations */
.badge-enter-active, .badge-leave-active {
    transition: all 0.3s ease;
}

.badge-enter-from, .badge-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>