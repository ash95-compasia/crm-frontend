<template>
  <div class="stats-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
    <!-- Outstanding Amount Card -->
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:p-6 card-hover">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">Outstanding Amount</p>
          <p class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {{ formatCurrency(outstandingAmount) }}
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800">
              {{ unresolvedInvoice }} unpaid invoices
            </span>
          </div>
        </div>
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex space-x-2">
        <button class="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          <span>Collect Payment</span>
        </button>
        <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Late Payments Card -->
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:p-6 card-hover">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">Late Payments</p>
          <p class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {{ latePayment }}
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              Past due date
            </span>
          </div>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex space-x-2">
        <button class="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <span>Send Reminder</span>
        </button>
        <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Unresolved Invoices Card -->
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:p-6 card-hover">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">Unresolved Invoices</p>
          <p class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {{ unresolvedInvoice }}
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              Need attention
            </span>
          </div>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex space-x-2">
        <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>View All</span>
        </button>
        <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Collections Card -->
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:p-6 card-hover">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">Collections</p>
          <p class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {{ collectionLength }}
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
              Successful payments
            </span>
          </div>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex space-x-2">
        <button class="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span>View Report</span>
        </button>
        <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCardCustomer',
  props: {
    outstandingAmount: {
      type: Number,
      default: 0
    },
    latePayment: {
      type: Number,
      default: 0
    },
    unresolvedInvoice: {
      type: Number,
      default: 0
    },
    collectionLength: {
      type: Number,
      default: 0
    },
    formatCurrency: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleCollectPayment() {
      this.$emit('collect-payment');
    },
    handleSendReminder() {
      this.$emit('send-reminder');
    },
    handleViewInvoices() {
      this.$emit('view-invoices');
    },
    handleViewReport() {
      this.$emit('view-report');
    }
  }
}
</script>

<style scoped>
.stats-section {
  font-family: 'Inter', sans-serif;
}

.card-hover {
  transition: all 0.2s ease-in-out;
  border: 1px solid #e5e7eb;
}

.card-hover:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* Responsive improvements */
@media (max-width: 1024px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-section {
    grid-template-columns: 1fr;
  }
}

/* Button hover effects */
button {
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

/* Status badge animations */
.status-badge {
  transition: all 0.2s ease-in-out;
}

.status-badge:hover {
  transform: scale(1.05);
}

/* Icon animations */
svg {
  transition: transform 0.2s ease-in-out;
}

button:hover svg {
  transform: scale(1.1);
}

/* Focus states for accessibility */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading state animation */
.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>