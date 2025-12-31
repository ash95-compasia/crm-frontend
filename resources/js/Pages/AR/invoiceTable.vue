<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Invoices Master Listing</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Invoices</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 dark:text-gray-400 text-sm">Total Invoices</div>
                        <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ result.total?.toLocaleString() || '0' }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Invoices</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ result.total?.toLocaleString() || '0' }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Outstanding Invoices</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ outstandingInvoicesCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
                    :columns="INVOICES_TABLE_COLUMNS"
                    :filters="INVOICES_TABLE_FILTERS"
                    :default-sort="{ key: 'issue_date', order: 'desc' }"
                    storage-key="invoices-master-listing-table"
                    :loading="loading"
                    class="dark:bg-gray-800"
                >
                    <!-- Custom Invoice Number Column -->
                    <template #column-invoice_no="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <span class="text-blue-600 dark:text-blue-400 font-medium text-sm">INV</span>
                            </div>
                            <div class="ml-4">
                                <router-link 
                                    :to="'/invoice-details/' + row.id" 
                                    class="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                                >
                                    {{ value || 'N/A' }}
                                </router-link>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {{ formatDate(row.issue_date) }}
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

                    <!-- Custom Total Amount Column -->
                    <template #column-total_amount="{ value }">
                        <div class="text-right">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                {{ formatCurrency(value) }}
                            </span>
                        </div>
                    </template>

                    <!-- Custom Balance Amount Column -->
                    <template #column-balance_amount="{ value }">
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

                    <!-- Custom Due Date Column -->
                    <template #column-due_date="{ value, row }">
                        <div class="flex flex-col">
                            <span class="text-sm text-gray-900 dark:text-gray-300">
                                {{ formatDate(value) }}
                            </span>
                            <span v-if="isOverdue(row)" class="text-xs text-red-500 dark:text-red-400 mt-1">
                                Overdue
                            </span>
                        </div>
                    </template>

                    <!-- Custom Status Column -->
                    <template #column-status="{ row }">
                        <span :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
                            row.balance_amount <= 0 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                                : row.balance_amount < row.total_amount
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                                : isOverdue(row)
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                        ]">
                            {{ getStatusText(row) }}
                        </span>
                    </template>

                    <!-- Custom Actions Column -->
                    <template #column-actions="{ row }">
                        <div class="flex space-x-2">
                            <button 
                                @click="viewInvoiceDetails(row)"
                                class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg"
                                title="View invoice details"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>
                            <button 
                                v-if="row.balance_amount > 0"
                                @click="generatePayment(row)"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center text-sm px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                                title="Generate payment for this invoice"
                            >
                                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                Pay
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

// Import table constants from a separate file (create this file)
// You can create /Constants/tableColumns.js or define them here
import { 
  INVOICES_TABLE_COLUMNS, 
  INVOICES_TABLE_FILTERS,
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
const INVOICES_TABLE_COLUMNS = [
    {
        key: 'invoice_no',
        label: 'Invoice Number',
        sortable: true
    },
    {
        key: 'customer_name',
        label: 'Customer',
        sortable: true
    },
    {
        key: 'total_amount',
        label: 'Total Amount',
        sortable: true,
        type: 'currency'
    },
    {
        key: 'balance_amount',
        label: 'Balance Due',
        sortable: true,
        type: 'currency'
    },
    {
        key: 'due_date',
        label: 'Due Date',
        sortable: true,
        type: 'date'
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false
    }
];

const INVOICES_TABLE_FILTERS = [
    {
        key: 'invoice_no',
        label: 'Invoice Number',
        type: 'text',
        placeholder: 'Search by invoice number...'
    },
    {
        key: 'customer_name',
        label: 'Customer Name',
        type: 'text',
        placeholder: 'Search by customer name...'
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'paid', label: 'Paid' },
            { value: 'unpaid', label: 'Unpaid' },
            { value: 'overdue', label: 'Overdue' },
            { value: 'partial', label: 'Partially Paid' }
        ]
    }
];
*/

// Computed properties
const tableData = computed(() => {
    console.log('Invoice table data computed:', result.value.data);
    return (result.value.data || []).map(invoice => {
        const customerName = invoice.customer?.name_as_per_nric || 
                           `${invoice.customer?.first_name || ''} ${invoice.customer?.last_name || ''}`.trim() || 
                           'N/A';
        
        const totalAmount = parseFloat(invoice.total_amount) || 0;
        const balanceAmount = parseFloat(invoice.balance_amount) || 0;
        const paidAmount = parseFloat(invoice.paid_amount) || 0;
        
        return {
            ...invoice,
            customer_name: customerName,
            total_amount: totalAmount,
            balance_amount: balanceAmount,
            paid_amount: paidAmount,
            status: getInvoiceStatus(invoice)
        };
    });
});

const outstandingInvoicesCount = computed(() => {
    return tableData.value.filter(invoice => invoice.balance_amount > 0).length;
});

const totalOutstanding = computed(() => {
    return tableData.value.reduce((sum, invoice) => sum + (invoice.balance_amount || 0), 0);
});

const totalOverdue = computed(() => {
    return tableData.value.filter(invoice => isOverdue(invoice))
        .reduce((sum, invoice) => sum + (invoice.balance_amount || 0), 0);
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
        const response = await axios.get(`/api/invoices?with=customer`, { 
            ...getAxiosConfig()
        });
        
        console.log("Invoices API Response:", response.data);
        
        if (response.status !== 200) {
            throw new Error(response.data.message || 'Failed to fetch invoices');
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
        
        console.log("Processed invoices result:", result.value);
        showNotification('Invoices loaded successfully');
    } catch (error) {
        console.error('Fetch invoices error:', error);
        errorMessage.value = 'Failed to load invoices! Please try again later.';
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

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const getInvoiceStatus = (invoice) => {
    const balanceAmount = parseFloat(invoice.balance_amount) || 0;
    const totalAmount = parseFloat(invoice.total_amount) || 0;
    
    if (balanceAmount <= 0) return 'paid';
    if (balanceAmount === totalAmount) return 'unpaid';
    if (balanceAmount > 0 && balanceAmount < totalAmount) return 'partial';
    return 'unpaid';
};

const getStatusText = (row) => {
    const balanceAmount = parseFloat(row.balance_amount) || 0;
    const totalAmount = parseFloat(row.total_amount) || 0;
    
    if (balanceAmount <= 0) return 'Paid';
    if (balanceAmount === totalAmount) return 'Unpaid';
    if (balanceAmount > 0 && balanceAmount < totalAmount) return 'Partially Paid';
    return 'Unpaid';
};

const isOverdue = (invoice) => {
    if (!invoice.due_date || invoice.balance_amount <= 0) return false;
    const dueDate = new Date(invoice.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    return dueDate < today;
};

const viewInvoiceDetails = (invoice) => {
    localStorage.setItem('showAr', 'yes');
    router.push(`/invoice-details/${invoice.id}`);
};

const generatePayment = (invoice) => {
    router.push(`/payment/create?invoiceId=${invoice.id}`);
};

// Watch for currency changes to update table columns
watch(currencyCode, (newCurrency) => {
    console.log('Currency changed to:', newCurrency);
});

// Lifecycle
onMounted(async () => {
    console.log('Invoice component mounted, fetching data...');
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