<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 font-sans transition-colors duration-300">
    <div class="w-full p-4 lg:p-6">
        <!-- Header Section -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{{ nameperic }}</h1>
            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
              <router-link to="/customers" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Customers
              </router-link>
              <span class="text-gray-400 dark:text-gray-600">/</span>
              <span class="text-gray-900 dark:text-gray-300 font-medium">AR Management</span>
            </div>
          </div>
          <button
            @click="goBackToCustomers"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Customers
          </button>
        </div>

        <!-- Tab Navigation -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <nav class="flex overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="setActiveTab(tab.id)"
              :class="[
                'px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap border-b-2 flex items-center gap-2',
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              <component :is="tab.icon" class="w-4 h-4" />
              <span>{{ tab.name }}</span>
              <span
                v-if="tab.count !== undefined && tab.count > 0"
                class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 min-w-[20px] text-center"
              >
                {{ tab.count }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Stats Cards -->
        <StatsCards
          :outstanding-amount="outstandingBalance"
          :unresolved-invoices="unresolvedInvoices"
          :unresolved-credit-notes="unresolvedCreditNotes"
          :total-overpayment="totalOverpayment"
          :total-late-charges="summary.total_late_charges || 0"
          :format-currency="formatCurrency"
          @view-late-charges="setSubTab('late-charges')"
          class="mb-6"
        />

        <!-- Main Content Area -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <transition name="fade" mode="out-in">
            <!-- Summary Tab -->
            <div v-if="activeTab === 'summary'" key="summary" class="p-6">
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="space-y-6">
                  <ContactInformation
                    :customer="customer"
                    @update-information="handleUpdateInformation"
                    @view-nric="toNric"
                  />
                  <CreditFacility :customer-loan="String(customer_loan)" />
                  <EmploymentInformation
                    :customer="customer"
                    :list-bank="listBank"
                    :cloud-front-url="cloudFrontURL"
                    :cust-id="cust_id"
                    :sucess-empl-msd="sucessemplmsd"
                    @upload-payslip-f="uploadPayslipF"
                    @sallary-update="handleSallaryUpdate"
                    @view-upload="toNric"
                  />
                </div>
                <div class="space-y-6">
                  <ReferencesInformation
                    :references-list="referencesList"
                    :list-relation="listRelation"
                    @edit-reference="editReference"
                    @ref-update="handleRefUpdate"
                  />
                  <CorrespondenceAddress
                    :address="customer.address"
                    :postal-code="customer.postal_code"
                    :city="customer.city"
                    :state="customer.state"
                    :list-state="listState"
                    :cust-id="cust_id"
                    @cust-update="handleCustUpdate"
                    :sucess-add-msd="sucessaddmsd"
                  />
                  <AdditionalDocuments
                    :customer="customer"
                    :cloud-front-url="cloudFrontURL"
                    :cust-id="cust_id"
                    :upload-stat="uploadstat"
                    :sucess-upload="sucessupload"
                    @submit-additional-doc="handleSubmitAdditionaldoc"
                  />
                </div>
              </div>
            </div>

            <!-- Orders Tab -->
            <div v-else-if="activeTab === 'orders'" key="orders">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div class="flex justify-between items-center">
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Customer Orders</h2>
                  <span class="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                    {{ orders.length }} order(s)
                  </span>
                </div>
              </div>
              <div class="p-4">
                <GlobalTable
                  :data="ordersTableData"
                  :columns="importedORDERS_TABLE_COLUMNS"
                  :filters="importedORDERS_TABLE_FILTERS"
                  :default-sort="{ key: 'order_number', order: 'asc' }"
                  storage-key="customer-orders-table"
                  class="dark:bg-gray-800"
                >
                  <template #column-order_number="{ value }">
                    <span class="font-medium text-gray-900 dark:text-white">{{ value || 'N/A' }}</span>
                  </template>
                  <template #column-monthly_subscription="{ value }">
                    <div class="text-right">
                      <span class="text-sm font-semibold text-gray-900 dark:text-gray-300">{{ formatCurrency(value) }}</span>
                    </div>
                  </template>
                </GlobalTable>
              </div>
            </div>

            <!-- Contracts Tab -->
            <div v-else-if="activeTab === 'contracts'" key="contracts">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div class="flex justify-between items-center">
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Customer Contracts</h2>
                  <span class="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                    {{ contracts.length }} contract(s)
                  </span>
                </div>
              </div>
              <div class="p-4">
                <GlobalTable
                  :data="contractsTableData"
                  :columns="importedCONTRACTS_TABLE_COLUMNS"
                  :filters="importedCONTRACTS_TABLE_FILTERS"
                  :default-sort="{ key: 'contract_number', order: 'asc' }"
                  storage-key="customer-contracts-table"
                  class="dark:bg-gray-800"
                >
                  <template #column-contract_number="{ value }">
                    <span class="font-medium text-gray-900 dark:text-white">{{ value || 'N/A' }}</span>
                  </template>
                  <template #column-contract_date="{ value }">
                    <span class="text-sm text-gray-900 dark:text-gray-300">{{ value ? new Date(value).toLocaleDateString() : 'N/A' }}</span>
                  </template>
                  <template #column-monthly_subscription="{ value }">
                    <div class="text-right">
                      <span class="text-sm font-semibold text-gray-900 dark:text-gray-300">{{ formatCurrency(value) }}</span>
                    </div>
                  </template>
                </GlobalTable>
              </div>
            </div>

            <!-- AR Tab -->
            <div v-else-if="activeTab === 'ar'" key="ar" class="relative">
              <div class="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">View Order:</label>
                      <select
                        v-model="selectedOrderId"
                        @change="filterARData"
                        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm min-w-[250px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                      >
                        <option value="">All Orders</option>
                        <option v-for="order in orders" :key="order.id" :value="order.id">
                          {{ order.order_number }} - {{ formatCurrency(order.monthly_subscription) }}
                        </option>
                      </select>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      Selected: {{ selectedOrder ? selectedOrder.order_number : 'All Orders' }}
                    </div>
                  </div>
                  <ARSubNavigation :active-ar-tab="activeARTab" @set-sub-tab="setSubTab" />
                </div>
              </div>
              <div class="p-6">
                <ARContent
                  :active-ar-tab="activeARTab"
                  :soa-transactions="soaTransactions"
                  :filtered-invoices-table-data="filteredInvoicesTableData"
                  :filtered-payments-table-data="filteredPaymentsTableData"
                  :filtered-credit-notes-table-data="filteredCreditNotesTableData"
                  :filtered-late-charges-table-data="filteredLateChargesTableData"
                  :aging-report="agingReport"
                  :soa-table-columns="importedSOA_TABLE_COLUMNS"
                  :invoices-table-columns="importedINVOICES_TABLE_COLUMNS"
                  :payments-table-columns="importedPAYMENTS_TABLE_COLUMNS"
                  :credit-notes-table-columns="importedCREDIT_NOTES_TABLE_COLUMNS"
                  :late-charges-table-columns="importedLATE_CHARGES_TABLE_COLUMNS"
                  :aging-table-columns="importedAGING_TABLE_COLUMNS"
                  :soa-table-filters="importedSOA_TABLE_FILTERS"
                  :invoices-table-filters="importedINVOICES_TABLE_FILTERS"
                  :payments-table-filters="importedPAYMENTS_TABLE_FILTERS"
                  :credit-notes-table-filters="importedCREDIT_NOTES_TABLE_FILTERS"
                  :late-charges-table-filters="importedLATE_CHARGES_TABLE_FILTERS"
                  :aging-table-filters="importedAGING_TABLE_FILTERS"
                  :total-due="summary.total_due || 0"
                  :total-paid="summary.total_paid || 0"
                  :outstanding-balance="outstandingBalance"
                  :format-currency="formatCurrency"
                  :compute-late-charge="computeLateCharge"
                  :get-status-class="getStatusClass"
                  :get-payment-status-class="getPaymentStatusClass"
                />
              </div>
            </div>
          </transition>
      </div>

      <Notification :notification="notification" />
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import {
  ORDERS_TABLE_COLUMNS,
  ORDERS_TABLE_FILTERS,
  CONTRACTS_TABLE_COLUMNS,
  CONTRACTS_TABLE_FILTERS,
  SOA_TABLE_COLUMNS,
  SOA_TABLE_FILTERS,
  INVOICES_TABLE_COLUMNS,
  INVOICES_TABLE_FILTERS,
  PAYMENTS_TABLE_COLUMNS,
  PAYMENTS_TABLE_FILTERS,
  CREDIT_NOTES_TABLE_COLUMNS,
  CREDIT_NOTES_TABLE_FILTERS,
  LATE_CHARGES_TABLE_COLUMNS,
  LATE_CHARGES_TABLE_FILTERS,
  AGING_TABLE_COLUMNS,
  AGING_TABLE_FILTERS
} from '../../Constants/tableColumns';

import GlobalTable from '@/Components/globalTable.vue';
import StatsCards from '@/Components/CustomersPage/StatsCards.vue';
import ContactInformation from '@/Components/CustomersPage/ContactInformation.vue';
import ReferencesInformation from '@/Components/CustomersPage/ReferencesInformation.vue';
import CreditFacility from '@/Components/CustomersPage/CreditFacility.vue';
import CorrespondenceAddress from '@/Components/CustomersPage/CorrespondenceAddress.vue';
import EmploymentInformation from '@/Components/CustomersPage/EmploymentInformation.vue';
import AdditionalDocuments from '@/Components/CustomersPage/AdditionalDocuments.vue';
import ARSubNavigation from '@/Components/CustomersPage/ARSubNavigation.vue';
import ARContent from '@/Components/CustomersPage/ARContent.vue';
import Notification from '@/Components/CustomersPage/NotificationCustomer.vue';

import axios from 'axios';
import { useApi } from '../../router/useApi';
import Swal from 'sweetalert2';

// Define SVG icons and mark them as raw to prevent reactivity warnings
const SummaryIcon = markRaw({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
});

const OrdersIcon = markRaw({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>`
});

const ContractsIcon = markRaw({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
});

const ARIcon = markRaw({
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>`
});

export default {
  name: 'CustomerARManagement',
  components: {
    GlobalTable,
    StatsCards,
    ContactInformation,
    ReferencesInformation,
    CreditFacility,
    CorrespondenceAddress,
    EmploymentInformation,
    AdditionalDocuments,
    ARSubNavigation,
    ARContent,
    Notification
  },
  setup() {
    const { getAxiosConfig } = useApi();
    return { getAxiosConfig };
  },
  data() {
    return {
      importedORDERS_TABLE_COLUMNS: ORDERS_TABLE_COLUMNS,
      importedORDERS_TABLE_FILTERS: ORDERS_TABLE_FILTERS,
      importedCONTRACTS_TABLE_COLUMNS: CONTRACTS_TABLE_COLUMNS,
      importedCONTRACTS_TABLE_FILTERS: CONTRACTS_TABLE_FILTERS,
      importedSOA_TABLE_COLUMNS: SOA_TABLE_COLUMNS,
      importedSOA_TABLE_FILTERS: SOA_TABLE_FILTERS,
      importedINVOICES_TABLE_COLUMNS: INVOICES_TABLE_COLUMNS,
      importedINVOICES_TABLE_FILTERS: INVOICES_TABLE_FILTERS,
      importedPAYMENTS_TABLE_COLUMNS: PAYMENTS_TABLE_COLUMNS,
      importedPAYMENTS_TABLE_FILTERS: PAYMENTS_TABLE_FILTERS,
      importedCREDIT_NOTES_TABLE_COLUMNS: CREDIT_NOTES_TABLE_COLUMNS,
      importedCREDIT_NOTES_TABLE_FILTERS: CREDIT_NOTES_TABLE_FILTERS,
      importedLATE_CHARGES_TABLE_COLUMNS: LATE_CHARGES_TABLE_COLUMNS,
      importedLATE_CHARGES_TABLE_FILTERS: LATE_CHARGES_TABLE_FILTERS,
      importedAGING_TABLE_COLUMNS: AGING_TABLE_COLUMNS,
      importedAGING_TABLE_FILTERS: AGING_TABLE_FILTERS,
      customer: {},
      orders: [],
      contracts: [],
      invoices: [],
      payments: [],
      creditNotes: [],
      lateCharges: [],
      refunds: [],
      agingReport: [],
      summary: {},

      selectedOrderId: '',
      activeARTab: 'soa',
      activeTab: 'summary',
      outstanding_amount: 0,
      over_payment: 0,
      unresolved_invoice: 0,
      unresolvedCreditNotes: 0,
      totalDue: 0,
      totalPaid: 0,
      totalCredits: 0,
      totalLateCharges: 0,
      totalPendingLate: 0,
      notification: { message: '', type: '' },
      currencyCode: 'SGD',
      currentDate: new Date(),
      customer_loan: 0,
      cust_id: '',
      // cloudFrontURL: process.env.VUE_APP_CLOUDFRONT_URL || '',
      uploadstat: '',
      sucessaddmsd: '',
      sucessemplmsd: '',
      sucessupload: '',
      referencesList: [],
      listRelation: [],
      listState: [],
      listBank: [],

      tabs: [
        { id: 'summary', name: 'Summary', icon: SummaryIcon },
        { id: 'orders', name: 'Orders', icon: OrdersIcon, count: 0 },
        { id: 'contracts', name: 'Contracts', icon: ContractsIcon, count: 0 },
        { id: 'ar', name: 'Accounts Receivable', icon: ARIcon }
      ]
    };
  },
  computed: {
    nameperic() {
      return this.customer.full_name || `${this.customer.first_name || ''} ${this.customer.last_name || ''}`.trim() || 'Customer';
    },
    selectedOrder() {
      return this.orders.find(o => o.id === this.selectedOrderId) || null;
    },
    totalOverpayment() {
      return Math.max(0, parseFloat(this.summary.over_pay) || 0);
    },
    outstandingBalance() {
      return parseFloat(this.summary.outstanding_balance) || 0;
    },
    unresolvedInvoices() {
      return this.invoices.filter(i => parseFloat(i.balance_amount) > 0).length;
    },
    unresolvedCreditNotes() {
      return this.creditNotes.length;
    },
    ordersTableData() {
      return this.orders.map(o => ({
        ...o,
        start_contract: o.start_contract ? new Date(o.start_contract).toLocaleDateString() : 'N/A'
      }));
    },
    contracts() {
      return this.orders.map(o => o.contract).filter(Boolean);
    },
    contractsTableData() {
      return this.contracts.map(c => ({
        ...c,
        contract_date: c.contract_date ? new Date(c.contract_date).toLocaleDateString() : 'N/A',
        contract_end_date: c.contract_end_date ? new Date(c.contract_end_date).toLocaleDateString() : 'N/A'
      }));
    },
    filteredInvoices() {
      if (!this.selectedOrderId) return this.invoices;
      return this.invoices.filter(i => i.order_id == this.selectedOrderId);
    },
    filteredPayments() {
      const invIds = this.filteredInvoices.map(i => i.id);
      return this.payments.filter(p => invIds.includes(p.ar_invoices_id));
    },
    filteredCreditNotes() {
      const invIds = this.filteredInvoices.map(i => i.id);
      return this.creditNotes.filter(c => invIds.includes(c.invoice_id));
    },
    filteredLateCharges() {
      if (!this.selectedOrderId) return this.lateCharges;
      return this.lateCharges.filter(c => c.related_order_id == this.selectedOrderId);
    },
    filteredInvoicesTableData() {
      return this.filteredInvoices.map(i => ({
        ...i,
        issue_date: i.issue_date ? new Date(i.issue_date).toLocaleDateString() : 'N/A',
        due_date: i.due_date ? new Date(i.due_date).toLocaleDateString() : 'N/A',
        effective_balance: (parseFloat(i.balance_amount) || 0) + (parseFloat(i.late_payment_charges) || 0)
      }));
    },
    filteredPaymentsTableData() {
      return this.filteredPayments.map(p => ({
        ...p,
        payment_date: p.payment_date ? new Date(p.payment_date).toLocaleDateString() : 'N/A'
      }));
    },
    filteredCreditNotesTableData() {
      return this.filteredCreditNotes.map(c => ({
        ...c,
        issue_date: c.issue_date ? new Date(c.issue_date).toLocaleDateString() : 'N/A'
      }));
    },
    filteredLateChargesTableData() {
      return this.filteredLateCharges.map(c => ({
        ...c,
        generated_date: c.generated_date ? new Date(c.generated_date).toLocaleDateString() : 'N/A',
        applied_date: c.applied_date ? new Date(c.applied_date).toLocaleDateString() : 'N/A',
        invoice_no: c.invoice_no || 'N/A'
      }));
    },
    soaTransactions() {
      const tx = [];
      this.filteredInvoices.forEach(i => tx.push({
        transaction_date: i.issue_date ? new Date(i.issue_date).toLocaleDateString() : 'N/A',
        transaction: 'Invoice',
        description: i.invoice_no,
        debit: parseFloat(i.total_amount) || 0,
        credit: 0,
        balance: 0
      }));
      this.filteredLateCharges.filter(c => c.status === 'applied').forEach(c => tx.push({
        transaction_date: c.generated_date ? new Date(c.generated_date).toLocaleDateString() : 'N/A',
        transaction: 'Late Charge',
        description: c.description || c.id,
        debit: parseFloat(c.charge_amount) || 0,
        credit: 0,
        balance: 0
      }));
      this.refunds.forEach(r => tx.push({
        transaction_date: r.refund_date ? new Date(r.refund_date).toLocaleDateString() : 'N/A',
        transaction: 'Refund',
        description: r.id || r.payment_id,
        debit: parseFloat(r.amount) || 0,
        credit: 0,
        balance: 0
      }));
      this.filteredPayments.forEach(p => tx.push({
        transaction_date: p.payment_date ? new Date(p.payment_date).toLocaleDateString() : 'N/A',
        transaction: 'Payment',
        description: p.payment_id,
        debit: 0,
        credit: parseFloat(p.amount) || 0,
        balance: 0
      }));
      this.filteredCreditNotes.forEach(c => tx.push({
        transaction_date: c.issue_date ? new Date(c.issue_date).toLocaleDateString() : 'N/A',
        transaction: 'Credit Note',
        description: c.credit_note_no,
        debit: 0,
        credit: parseFloat(c.amount) || 0,
        balance: 0
      }));

      tx.sort((a, b) => new Date(a.transaction_date) - new Date(b.transaction_date));
      let bal = 0;
      tx.forEach(t => { bal += t.debit - t.credit; t.balance = bal; });
      return tx;
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.$router.push({ query: { ...this.$route.query, tab } });
    },
    setSubTab(tab) {
      this.activeARTab = tab;
      this.$router.push({ query: { ...this.$route.query, subtab: tab } });
    },
    filterARData() { /* no-op */ },
    showNotification(message, type = 'success') {
      this.notification = { message, type };
      setTimeout(() => this.notification = { message: '', type: '' }, 5000);
    },
    formatCurrency(v) {
      const val = parseFloat(v) || 0;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(val);
    },
    computeLateCharge(i) {
      return parseFloat(i.late_payment_charges) || 0;
    },
    getStatusClass(s) {
      const map = { paid: 'bg-green-100 text-green-800', applied: 'bg-green-100 text-green-800', partial: 'bg-yellow-100 text-yellow-800', pending: 'bg-red-100 text-red-800' };
      return map[s] || 'bg-gray-100 text-gray-800';
    },
    getPaymentStatusClass(s) {
      const map = { success: 'bg-green-100 text-green-800', pending: 'bg-yellow-100 text-yellow-800' };
      return map[s] || 'bg-gray-100 text-gray-800';
    },
    uploadPayslipF() {
      // Placeholder – implement if needed
      console.warn('uploadPayslipF not implemented');
    },
    async fetchData() {
      try {
        const { data } = await axios.get(`/api/customers/${this.$route.params.id}`, this.getAxiosConfig());
        this.customer = data;
        this.cust_id = data.id;
        this.customer_loan = parseFloat(data.customer_loan) || 0;

        this.orders = data.orders || [];
        this.invoices = data.invoices || [];
        this.payments = data.payments || [];
        this.creditNotes = data.credit_notes || [];
        this.lateCharges = data.late_charges || [];
        this.refunds = data.refunds || [];
        this.agingReport = data.aging_report || [];
        this.summary = data.summary || {};
        if (this.orders.length && !this.selectedOrderId) {
          this.selectedOrderId = this.orders[0].id;
        }

        this.tabs.find(t => t.id === 'orders').count = this.orders.length;
        this.tabs.find(t => t.id === 'contracts').count = this.contracts.length;
        console.log('this.listState',this.listState)
      } catch (e) {
        console.error(e);
        this.showNotification('Failed to load customer data', 'error');
      }
    },
    async fetchReferencesAndLists() {
      try {
        const {refRes, relRes } = await Promise.all([
          axios.get(`/api/reference/list/${this.$route.params.id}`, this.getAxiosConfig()),
          axios.get(`/api/relation/list`, this.getAxiosConfig())
        ]);
        this.referencesList = refRes?.data;
        this.listRelation = relRes?.data;
      } catch (e) {
        console.error(e);
      }
    },
    async fetchCurrency() {
      try {
        const response = await axios.get('/api/currency', this.getAxiosConfig());
        this.currencyCode = response.data?.currency_code || response.data?.[0]?.code || 'SGD';
      } catch (e) {
        this.currencyCode = 'SGD';
      }
    },
    editReference(i) { this.$router.push({ name: 'EditReference', params: { id: i.id } }); },
    async handleRefUpdate() { await this.fetchReferencesAndLists(); this.showNotification('Reference updated'); },
    async handleUpdateInformation(payload) { /* implement */ },
    async handleCustUpdate(payload) { /* implement */ },
    async handleSubmitAdditionaldoc(formData) { /* implement */ },
    async handleSallaryUpdate(formData) { /* implement */ },
    toNric(type) { /* implement */ },
    goBackToCustomers() { this.$router.push('/customers'); },
    async fetchStateList() {
    try {
      const response = await axios.get(`/api/states/${this.$route.params.id}`, this.getAxiosConfig());
      this.listState = response.data || [];
    } catch (e) {
      console.error('Failed to fetch states:', e);
      this.listState = []; // Fallback empty array
    }
  },
  },

  async mounted() {
    if (!this.$route.query.tab) {
      this.$router.replace({ query: { ...this.$route.query, tab: 'summary' } });
    }
    this.activeTab = this.$route.query.tab || 'summary';
    this.activeARTab = this.$route.query.subtab || 'soa';

    await Promise.all([
      this.fetchCurrency(),
      this.fetchData(),
      this.fetchReferencesAndLists(),
      this.fetchStateList()
    ]);
  },
  watch: {
    '$route.query.tab'(v) { this.activeTab = v || 'summary'; },
    '$route.query.subtab'(v) { this.activeARTab = v || 'soa'; }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Custom scrollbar */
nav::-webkit-scrollbar {
  height: 4px;
}

nav::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.dark nav::-webkit-scrollbar-track {
  background: #374151;
}

nav::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

.dark nav::-webkit-scrollbar-thumb {
  background: #4b5563;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.dark nav::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>