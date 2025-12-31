<template>
  <div class="p-6 dark:bg-gray-900">
    <!-- SOA Tab -->
    <div v-if="activeArTab === 'soa'">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Statement of Account</h3>
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 mb-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Invoices</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(totalDue) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(totalPaid) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Outstanding Balance</p>
            <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ formatCurrency(outstandingBalance) }}</p>
          </div>
        </div>
      </div>
      <GlobalTable
        :data="soaTransactions"
        :columns="soaTableColumns"
        :filters="soaTableFilters"
        :default-sort="{ key: 'transaction_date', order: 'asc' }"
        storage-key="customer-soa-table"
      >
        <template #column-transaction="{ value }">
          <span class="font-medium text-gray-900 dark:text-white">{{ value || 'N/A' }}</span>
        </template>
        <template #column-debit="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
        <template #column-credit="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
        <template #column-balance="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
      </GlobalTable>
    </div>
    <!-- Invoices Tab -->
    <div v-if="activeArTab === 'invoices'">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Invoices</h3>
      <GlobalTable
        :data="filteredInvoicesTableData"
        :columns="invoicesTableColumns"
        :filters="invoicesTableFilters"
        :default-sort="{ key: 'issue_date', order: 'desc' }"
        storage-key="customer-invoices-table"
      >
        <template #column-invoice_no="{ value }">
          <span class="font-medium text-gray-900 dark:text-white">{{ value || 'N/A' }}</span>
        </template>
        <template #column-total_amount="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
        <template #column-balance_amount="{ row }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(row.effective_balance) }}
            </span>
          </div>
        </template>
        <template #column-status="{ value }">
          <span :class="['px-2 py-1 rounded-full text-xs font-semibold', getStatusClass(value)]">
            {{ value || 'N/A' }}
          </span>
        </template>
      </GlobalTable>
    </div>
    <!-- Credit Notes Tab -->
    <div v-if="activeArTab === 'creditnotes'">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Credit Notes</h3>
      <GlobalTable
        :data="filteredCreditNotesTableData"
        :columns="creditNotesTableColumns"
        :filters="creditNotesTableFilters"
        :default-sort="{ key: 'issue_date', order: 'desc' }"
        storage-key="customer-credit-notes-table"
      >
        <template #column-credit_note_no="{ value }">
          <span class="font-medium text-gray-900 dark:text-white">{{ value || 'N/A' }}</span>
        </template>
        <template #column-amount="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
      </GlobalTable>
    </div>
    <!-- Payments Tab -->
    <div v-if="activeArTab === 'payments'">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Payments</h3>
      <GlobalTable
        :data="filteredPaymentsTableData"
        :columns="paymentsTableColumns"
        :filters="paymentsTableFilters"
        :default-sort="{ key: 'payment_date', order: 'desc' }"
        storage-key="customer-payments-table"
      >
        <template #column-payment_id="{ value }">
          <span class="font-medium text-gray-900 dark:text-white">{{ value || 'N/A' }}</span>
        </template>
        <template #column-amount="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
        <template #column-payment_status="{ value }">
          <span :class="['px-2 py-1 rounded-full text-xs font-semibold', getPaymentStatusClass(value)]">
            {{ value || 'N/A' }}
          </span>
        </template>
      </GlobalTable>
    </div>
    <!-- Aging Report Tab -->
    <div v-if="activeArTab === 'aging'">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Aging Report</h3>
      <GlobalTable
        :data="agingReport"
        :columns="agingTableColumns"
        :filters="agingTableFilters"
        :default-sort="{ key: 'bucket', order: 'asc' }"
        storage-key="customer-aging-table"
      >
        <template #column-amount="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
      </GlobalTable>
    </div>
    <!-- Late Charges Tab -->
    <div v-if="activeArTab === 'late-charges'">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Late Payment Charges</h3>
      <GlobalTable
        :data="filteredLateChargesTableData"
        :columns="lateChargesTableColumns"
        :filters="lateChargesTableFilters"
        :default-sort="{ key: 'generated_date', order: 'desc' }"
        storage-key="customer-late-charges-table"
      >
        <template #column-description="{ value }">
          <span class="font-medium text-gray-900 dark:text-white">{{ value || 'N/A' }}</span>
        </template>
        <template #column-charge_amount="{ value }">
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(value) }}
            </span>
          </div>
        </template>
        <template #column-status="{ value }">
          <span :class="['px-2 py-1 rounded-full text-xs font-semibold', getStatusClass(value)]">
            {{ value || 'N/A' }}
          </span>
        </template>
      </GlobalTable>
    </div>
  </div>
</template>

<script>
import GlobalTable from '@/Components/globalTable.vue';

export default {
  name: 'ARContent',
  components: { GlobalTable },
  props: {
    activeArTab: String,
    soaTransactions: Array,
    filteredInvoicesTableData: Array,
    filteredPaymentsTableData: Array,
    filteredCreditNotesTableData: Array,
    filteredLateChargesTableData: Array,
    agingReport: Array,
    soaTableColumns: Array,
    invoicesTableColumns: Array,
    paymentsTableColumns: Array,
    creditNotesTableColumns: Array,
    lateChargesTableColumns: Array,
    agingTableColumns: Array,
    soaTableFilters: Array,
    invoicesTableFilters: Array,
    paymentsTableFilters: Array,
    creditNotesTableFilters: Array,
    lateChargesTableFilters: Array,
    agingTableFilters: Array,
    totalDue: Number,
    totalPaid: Number,
    outstandingBalance: Number,
    formatCurrency: Function,
    getStatusClass: Function,
    getPaymentStatusClass: Function
  }
};
</script>