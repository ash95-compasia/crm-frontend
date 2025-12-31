<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Credit Notes</h2>
    <GlobalTable
      :data="filteredCreditNotesTableData"
      :columns="creditNotesTableColumns"
      :filters="creditNotesTableFilters"
      :default-sort="{ key: 'issue_date', order: 'desc' }"
      storage-key="customer-credit-notes-table"
      class="compact-table"
    >
      <template #column-credit_note_no="{ value }">
        <span class="font-medium text-gray-900">{{ value || 'N/A' }}</span>
      </template>
      <template #column-amount="{ value }">
        <div class="text-right">
          <span class="text-sm font-medium text-gray-900">{{ formatCurrency(value) }}</span>
        </div>
      </template>
      <template #column-issue_date="{ value }">
        <span class="text-sm text-gray-900">{{ value }}</span>
      </template>
    </GlobalTable>
  </div>
</template>

<script>
import GlobalTable from '@/Components/globalTable.vue';

export default {
  name: 'CreditNotes',
  components: {
    GlobalTable
  },
  props: {
    filteredCreditNotesTableData: Array,
    creditNotesTableColumns: Array,
    creditNotesTableFilters: Array,
    formatCurrency: Function
  }
};
</script>