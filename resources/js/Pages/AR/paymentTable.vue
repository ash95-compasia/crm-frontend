<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Payments Master Listing</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Payments</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Payments</div>
                        <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Payments</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Successful Payments</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ successfulPaymentsCount.toLocaleString() }}</p>
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
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Amount</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatCurrency(totalAmount) }}</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
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
                    :columns="PAYMENTS_TABLE_COLUMNS"
                    :filters="PAYMENTS_TABLE_FILTERS"
                    :default-sort="{ key: 'payment_date', order: 'desc' }"
                    storage-key="payments-master-listing-table"
                    :loading="loading"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Payment ID Column -->
                    <template #column-payment_id="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <span class="text-blue-600 dark:text-blue-400 font-medium text-sm">P#</span>
                            </div>
                            <div class="ml-4">
                                <router-link 
                                    :to="'/payment-details/' + row.id" 
                                    class="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                                >
                                    {{ value || 'N/A' }}
                                </router-link>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {{ formatDate(row.payment_date) }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Customer Column -->
                    <template #column-customer_name="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <span class="text-green-600 dark:text-green-400 text-xs font-medium">{{ getInitials(value) }}</span>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ value || 'N/A' }}
                                </div>
                                <div v-if="row.customer?.email" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {{ row.customer.email }}
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Amount Column -->
                    <template #column-amount="{ value }">
                        <div class="text-right">
                            <span class="text-sm font-semibold text-green-600 dark:text-green-400">
                                {{ formatCurrency(value) }}
                            </span>
                        </div>
                    </template>

                    <!-- Custom Payment Type Column -->
                    <template #column-payment_type="{ value }">
                        <span :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
                            value === 'card' 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' 
                                : value === 'bank_transfer'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                        ]">
                            {{ formatPaymentType(value) }}
                        </span>
                    </template>

                    <!-- Custom Status Column -->
                    <template #column-payment_status="{ value }">
                        <span :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
                            value === 'success' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                                : value === 'failed'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                        ]">
                            {{ formatPaymentStatus(value) }}
                        </span>
                    </template>

                    <!-- Custom Actions Column -->
                    <template #column-actions="{ row }">
                        <div class="flex space-x-2">
                            <button 
                                @click="viewPaymentDetails(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="View payment details"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>
                            <button 
                                v-if="row.payment_status === 'failed'"
                                @click="retryPayment(row)"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Retry this payment"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                Retry
                            </button>
                            <button 
                                v-if="row.receipt_url"
                                @click="downloadReceipt(row)"
                                class="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Download receipt"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                                Receipt
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GlobalTable from '@/Components/globalTable.vue';
import { useApi } from '@/router/useApi';

// Import table constants from a separate file
import { 
  PAYMENTS_TABLE_COLUMNS, 
  PAYMENTS_TABLE_FILTERS,
} from '@/Constants/tableColumns.js';

const { getAxiosConfig } = useApi();
const router = useRouter();

// Reactive state
const result = ref({ data: [], total: 0, from: 0, to: 0 });
const loading = ref(false);
const errorMessage = ref('');
const currencyCode = ref('SGD');
const notification = ref({ message: '', type: '' });

// If you don't have a constants file, define them here:
/*
const PAYMENTS_TABLE_COLUMNS = [
    {
        key: 'payment_id',
        label: 'Payment ID',
        sortable: true
    },
    {
        key: 'customer_name',
        label: 'Customer',
        sortable: true
    },
    {
        key: 'amount',
        label: 'Amount',
        sortable: true,
        type: 'currency'
    },
    {
        key: 'payment_type',
        label: 'Payment Type',
        sortable: true
    },
    {
        key: 'payment_status',
        label: 'Status',
        sortable: true
    },
    {
        key: 'payment_date',
        label: 'Payment Date',
        sortable: true,
        type: 'date'
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false
    }
];

const PAYMENTS_TABLE_FILTERS = [
    {
        key: 'payment_id',
        label: 'Payment ID',
        type: 'text',
        placeholder: 'Search by payment ID...'
    },
    {
        key: 'customer_name',
        label: 'Customer Name',
        type: 'text',
        placeholder: 'Search by customer name...'
    },
    {
        key: 'payment_status',
        label: 'Payment Status',
        type: 'select',
        options: [
            { value: 'success', label: 'Success' },
            { value: 'failed', label: 'Failed' },
            { value: 'pending', label: 'Pending' }
        ]
    },
    {
        key: 'payment_type',
        label: 'Payment Type',
        type: 'select',
        options: [
            { value: 'card', label: 'Card' },
            { value: 'bank_transfer', label: 'Bank Transfer' },
            { value: 'cash', label: 'Cash' }
        ]
    }
];
*/

// Computed properties
const tableData = computed(() => {
    console.log('Payments table data computed:', result.value.data);
    return (result.value.data || []).map(payment => {
        const customerName = payment.customer?.name_as_per_nric || 
                           `${payment.customer?.first_name || ''} ${payment.customer?.last_name || ''}`.trim() || 
                           'N/A';
        
        const amount = parseFloat(payment.amount) || 0;
        const paymentType = payment.payment_type || 'unknown';
        const paymentStatus = payment.payment_status || 'pending';
        
        return {
            ...payment,
            customer_name: customerName,
            amount: amount,
            payment_type: paymentType,
            payment_status: paymentStatus
        };
    });
});

const successfulPaymentsCount = computed(() => {
    return tableData.value.filter(payment => payment.payment_status === 'success').length;
});

const failedPaymentsCount = computed(() => {
    return tableData.value.filter(payment => payment.payment_status === 'failed').length;
});

const totalAmount = computed(() => {
    return tableData.value.reduce((sum, payment) => sum + (payment.amount || 0), 0);
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
    errorMessage.value = '';
    try {
        const response = await axios.get(`/api/payments?with=customer`, { 
            ...getAxiosConfig()
        });
        
        console.log("Payments API Response:", response.data);
        
        if (response.status !== 200) {
            throw new Error(response.data.message || 'Failed to fetch payments');
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
        
        console.log("Processed payments result:", result.value);
        showNotification('Payments loaded successfully');
    } catch (error) {
        console.error('Fetch payments error:', error);
        errorMessage.value = 'Failed to load payments! Please try again later.';
        showNotification(errorMessage.value, 'error');
    } finally {
        loading.value = false;
    }
};

const refreshData = async () => {
    await fetchData();
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

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US');
};

const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const formatPaymentType = (type) => {
    const typeMap = {
        'card': 'Credit Card',
        'bank_transfer': 'Bank Transfer',
        'cash': 'Cash',
        'cheque': 'Cheque',
        'online': 'Online Payment'
    };
    return typeMap[type] || type?.replace('_', ' ').toUpperCase() || 'Unknown';
};

const formatPaymentStatus = (status) => {
    const statusMap = {
        'success': 'Success',
        'failed': 'Failed',
        'pending': 'Pending',
        'refunded': 'Refunded',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status?.toUpperCase() || 'Unknown';
};

const viewPaymentDetails = (payment) => {
    localStorage.setItem('showAr', 'yes');
    router.push(`/payment-details/${payment.id}`);
};

const retryPayment = (payment) => {
    // Implement retry payment logic
    showNotification('Retrying payment...', 'success');
    // You might want to call an API endpoint here
    // Example: axios.post(`/api/payments/${payment.id}/retry`, {}, getAxiosConfig())
    // .then(() => { showNotification('Payment retry initiated', 'success'); })
    // .catch(() => { showNotification('Failed to retry payment', 'error'); });
};

const downloadReceipt = (payment) => {
    if (payment.receipt_url) {
        window.open(payment.receipt_url, '_blank');
    } else {
        showNotification('Receipt not available for this payment', 'error');
    }
};

// Watch for currency changes
watch(currencyCode, (newCurrency) => {
    console.log('Currency changed to:', newCurrency);
});

// Lifecycle
onMounted(async () => {
    console.log('Payments component mounted, fetching data...');
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