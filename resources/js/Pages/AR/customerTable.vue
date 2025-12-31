<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Customer Master Listing</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Customers</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Customers</div>
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Customers</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Customers</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ activeCustomersCount.toLocaleString() }}</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Outstanding</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatCurrency(totalOutstanding) }}</p>
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
                    :columns="CUSTOMERS_TABLE_COLUMNS"
                    :filters="CUSTOMERS_TABLE_FILTERS"
                    :default-sort="{ key: 'name_as_per_nric', order: 'asc' }"
                    storage-key="customer-master-listing-table"
                    :loading="loading"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Customer Name Column -->
                    <template #column-name_as_per_nric="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <span class="text-blue-600 dark:text-blue-400 font-medium">{{ getInitials(value) }}</span>
                            </div>
                            <div class="ml-4">
                                <router-link 
                                    :to="'/customer-data/' + row.id" 
                                    class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                >
                                    {{ value || 'N/A' }}
                                </router-link>
                                <div v-if="row.orders && row.orders.length > 0" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Orders: {{ row.orders.length }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Email Column -->
                    <template #column-email="{ value }">
                        <div class="flex items-center text-sm text-gray-900 dark:text-gray-300">
                            <svg class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            {{ value || 'N/A' }}
                        </div>
                    </template>

                    <!-- Custom Phone Column -->
                    <template #column-phone="{ value }">
                        <div class="flex items-center text-sm text-gray-900 dark:text-gray-300">
                            <svg class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            {{ value || 'N/A' }}
                        </div>
                    </template>

                    <!-- Custom Outstanding Amount Column -->
                    <template #column-total_outstanding="{ value }">
                        <div class="text-right">
                            <span :class="[
                                'text-sm font-semibold',
                                value > 0 
                                    ? 'text-red-600 dark:text-red-400' 
                                    : 'text-green-600 dark:text-green-400'
                            ]">
                                {{ formatCurrency(value) }}
                            </span>
                        </div>
                    </template>

                    <!-- Custom Status Column -->
                    <template #column-status="{ row }">
                        <span :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
                            row.total_outstanding > 0 
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' 
                                : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        ]">
                            {{ row.total_outstanding > 0 ? 'Active' : 'Inactive' }}
                        </span>
                    </template>

                    <!-- Custom Actions Column -->
                    <template #column-actions="{ row }">
                        <div class="flex space-x-2">
                            <button 
                                @click="viewCustomerDetails(row)"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                title="View customer details"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>
                            <button 
                                @click="generateInstantPay(row)"
                                :disabled="row.total_outstanding <= 0"
                                :class="[
                                    'flex items-center text-sm px-3 py-1.5 rounded-lg transition-colors duration-200',
                                    row.total_outstanding > 0
                                        ? 'text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                ]"
                                :title="row.total_outstanding > 0 ? 'Generate instant payment' : 'No outstanding balance'"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                Instant Pay
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
import { 
  CUSTOMERS_TABLE_COLUMNS, 
  CUSTOMERS_TABLE_FILTERS,
} from '@/Constants/tableColumns.js';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GlobalTable from '@/Components/globalTable.vue';
import { useApi } from '@/router/useApi';

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const result = ref({ data: [], total: 0, from: 0, to: 0 });
const loading = ref(false);
const errorMessage = ref('');
const currencyCode = ref('SGD');
const notification = ref({ message: '', type: '' });

// Current date for late charge calculations
const currentDate = new Date('2025-10-14');

// Late payment config (hardcoded from dummy data)
const latePaymentConfig = {
    charge_rate: 1.5, // 1.5%
    frequency_days: 7,
    grace_period_days: 0,
    min_charge_amount: 5.00
};

// Computed properties
const tableData = computed(() => {
    console.log('Table data computed:', result.value.data);
    return (result.value.data || []).map(customer => {
        const nameAsPerNric = customer.name_as_per_nric || `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'N/A';
        let totalOutstanding = 0;
        if (customer.invoices && Array.isArray(customer.invoices)) {
            totalOutstanding = customer.invoices.reduce((sum, inv) => {
                const lateCharge = computeLateCharge(inv);
                return sum + (inv.balance_amount || 0) + lateCharge - (inv.over_pay || 0);
            }, 0);
        }
        return {
            ...customer,
            name_as_per_nric: nameAsPerNric,
            total_outstanding: totalOutstanding,
            status: totalOutstanding > 0 ? 'active' : 'inactive'
        };
    });
});

const activeCustomersCount = computed(() => {
    return tableData.value.filter(customer => customer.total_outstanding > 0).length;
});

const totalOutstanding = computed(() => {
    return tableData.value.reduce((sum, customer) => sum + (customer.total_outstanding || 0), 0);
});

// Methods
const computeLateCharge = (invoice) => {
    if ((invoice.balance_amount || 0) <= 0) return 0;
    const dueDate = new Date(invoice.due_date);
    if (dueDate >= currentDate) return 0;

    const graceEnd = new Date(dueDate);
    graceEnd.setDate(graceEnd.getDate() + latePaymentConfig.grace_period_days);

    if (currentDate < graceEnd) return 0;

    const overdueDays = Math.floor((currentDate - graceEnd) / (1000 * 60 * 60 * 24));
    const periods = Math.floor(overdueDays / latePaymentConfig.frequency_days);
    if (periods <= 0) return 0;

    const baseAmount = invoice.balance_amount || 0;
    const chargePerPeriod = Math.max((baseAmount * latePaymentConfig.charge_rate / 100), latePaymentConfig.min_charge_amount);
    return periods * chargePerPeriod;
};

const showNotification = (message, type = 'success') => {
    notification.value = { message, type };
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 5000);
};

const fetchData = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
        const response = await axios.get(`/api/customers`, { 
            ...getAxiosConfig()
        });
        
        console.log("API Response:", response.data);
        
        if (response.status !== 200) {
            throw new Error(response.data.message || 'Failed to fetch data');
        }
        
        // Check if response.data is the array directly or nested in data property
        if (Array.isArray(response.data)) {
            result.value = {
                data: response.data,
                total: response.data.length,
                from: 1,
                to: response.data.length
            };
        } else if (response.data.data && Array.isArray(response.data.data)) {
            result.value = {
                data: response.data.data,
                total: response.data.total || response.data.data.length,
                from: response.data.from || 1,
                to: response.data.to || response.data.data.length
            };
        } else {
            throw new Error('Invalid data format from API');
        }
        
        console.log("Processed result:", result.value);
        showNotification('Customers loaded successfully');
    } catch (error) {
        console.error('Fetch error:', error);
        errorMessage.value = 'Failed to load the data! Please try again later.';
        showNotification(errorMessage.value, 'error');
    } finally {
        loading.value = false;
    }
};

const refreshData = async () => {
    await fetchData();
};

const exportData = async () => {
    try {
        showNotification('Preparing export...', 'success');
        // Add export logic here
        // For now, just show a success message
        setTimeout(() => {
            showNotification('Export completed successfully!', 'success');
        }, 1000);
    } catch (error) {
        showNotification('Failed to export data', 'error');
    }
};

const fetchCurrency = async () => {
    try {
        const response = await axios.get('/api/currency', getAxiosConfig());
        console.log('Currency response:', response.data);
        
        if (response.data && Array.isArray(response.data) && response.data[0]?.code) {
            currencyCode.value = response.data[0].code;
            console.log('Currency set to:', currencyCode.value);
        } else if (response.data?.currency_code) {
            currencyCode.value = response.data.currency_code;
            console.log('Currency set to:', currencyCode.value);
        } else {
            console.warn('Unexpected currency response format:', response.data);
        }
    } catch (error) {
        console.error('Failed to fetch currency:', error);
        // Use default currency
        currencyCode.value = process.env.VUE_CURRENCY || 'SGD';
    }
};

const formatCurrency = (value) => {
    if (!value && value !== 0) return '-';
    
    // Ensure we have a valid currency code
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
        // Fallback formatting
        return `${currency} ${value?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) || '0.00'}`;
    }
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const viewCustomerDetails = (customer) => {
    localStorage.setItem('showAr', 'yes');
    router.push(`/customer-data/${customer.id}`);
};

const generateInstantPay = (customer) => {
    const order_number = customer.orders?.[0]?.order_number || '';
    router.push(`/ar/instantpay/${order_number}`);
};

// Watch for currency changes to update table columns
watch(currencyCode, (newCurrency) => {
    console.log('Currency changed to:', newCurrency);
});

// Lifecycle
onMounted(async () => {
    console.log('Component mounted, fetching data...');
    await fetchCurrency();
    await fetchData();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
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

/* Professional spacing and alignment */
.container {
    max-width: 1200px;
}

/* Improved button hover effects */
button:not(:disabled) {
    transition: all 0.2s ease-in-out;
}

/* Better table styling */
table {
    font-size: 0.875rem;
}

th {
    font-weight: 600;
    letter-spacing: 0.025em;
}

/* Enhanced empty state */
.empty-state {
    opacity: 0.7;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.dark ::-webkit-scrollbar-track {
    background: #374151;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
    background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}
</style>