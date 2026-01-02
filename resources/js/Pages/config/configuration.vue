<!-- src/views/SystemConfiguration.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Main Container -->
    <div class="w-full p-6 lg:p-10">
        <!-- Header -->
        <div class="mb-10">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">System Configuration</h1>
          <nav class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-3">
            <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Dashboard</router-link>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="font-medium text-gray-900 dark:text-gray-300">Configuration</span>
          </nav>
        </div>

        <!-- Tabs -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-10">
          <nav class="flex space-x-12 overflow-x-auto scrollbar-thin">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-5 px-2 border-b-4 font-semibold text-base flex items-center space-x-3 whitespace-nowrap transition-all duration-200"
              :class="[
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              ]"
            >
              <component :is="tab.icon" class="w-6 h-6" />
              <span>{{ tab.name }}</span>
              <span v-if="tab.badge" class="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {{ tab.badge }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Late Payment Configuration -->
        <LatePaymentTab
          v-if="activeTab === 'late_payment'"
          :config="latePaymentConfig"
          :loading="loading"
          :submitting="isSubmitting"
          :errors="errors"
          @save="saveLatePaymentConfig"
          @reset="resetLatePaymentForm"
        />

        <!-- Tax Configuration -->
        <TaxTab
          v-if="activeTab === 'tax'"
          :tax-configs="taxConfigs"
          :tax-types="taxTypes"
          :active-taxes="activeTaxes"
          :stats="taxStats"
          :loading="loading"
          v-model:selected-ids="selectedTaxIds"
          @open-modal="openTaxModal"
          @delete="deleteTaxConfig"
          @bulk-activate="() => bulkUpdateTaxStatus(true)"
          @bulk-deactivate="() => bulkUpdateTaxStatus(false)"
          @bulk-delete="bulkDeleteTax"
        />

        <!-- Prefix Configuration -->
        <PrefixTab
          v-if="activeTab === 'prefix'"
          :configs="filteredPrefixConfigs"
          :filters="prefixFilters"
          :prefix-types="prefixTypes"
          :years="availableYears"
          :months="months"
          :stats="prefixStats"
          :next-numbers="nextNumberMap"
          :loading="loading"
          @open-modal="openPrefixModal"
          @refresh="refreshPrefixConfigs"
          @filter="filterPrefixConfigs"
          @increment="incrementPrefixNumber"
          @test="testPrefixNumber"
          @duplicate="duplicatePrefixConfig"
          @delete="deletePrefixConfig"
        />

        <!-- Status Configuration -->
        <StatusTab
          v-if="activeTab === 'status'"
          :configs="statusConfigs"
          :types="statusTypes"
          :stats="statusStats"
          :loading="loading"
          v-model:selected-ids="selectedStatusIds"
          @open-modal="openStatusModal"
          @delete="deleteStatusConfig"
          @bulk-activate="() => bulkUpdateStatusStatus(true)"
          @bulk-deactivate="() => bulkUpdateStatusStatus(false)"
          @bulk-delete="bulkDeleteStatus"
          @filter="filterStatusConfigs"
        />

        <!-- Modals -->
        <TaxModal
          v-model:visible="showTaxModal"
          :mode="taxModalMode"
          :form="taxForm"
          :tax-types="taxTypes"
          :errors="errors"
          :submitting="isSubmitting"
          @save="saveTaxConfig"
        />

        <PrefixModal
          v-model:visible="showPrefixModal"
          :mode="prefixModalMode"
          :form="prefixForm"
          :prefix-types="prefixTypes"
          :years="availableYears"
          :months="months"
          :errors="prefixErrors"
          :preview="generatedNumberPreview"
          :show-preview="showPrefixPreview"
          :submitting="isSubmitting"
          @save="savePrefixConfig"
          @preview="testPrefixNumberPreview"
        />

        <StatusModal
          v-model:visible="showStatusModal"
          :mode="statusModalMode"
          :form="statusForm"
          :status-types="statusTypes"
          :errors="errors"
          :submitting="isSubmitting"
          @save="saveStatusConfig"
        />

        <!-- Notification -->
        <NotificationToast
          v-if="notification.message"
          :message="notification.message"
          :type="notification.type"
          @close="notification = { message: '', type: 'success' }"
        />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import axios from 'axios'
import { useApi } from '../../router/useApi' // Adjust path as needed

const { getAxiosConfig } = useApi()

// Async Components
const LatePaymentTab = defineAsyncComponent(() => import('./components/LatePaymentTab.vue'))
const TaxTab = defineAsyncComponent(() => import('./components/TaxTab.vue'))
const PrefixTab = defineAsyncComponent(() => import('./components/PrefixTab.vue'))
const StatusTab = defineAsyncComponent(() => import('./components/StatusTab.vue'))

const TaxModal = defineAsyncComponent(() => import('./components/TaxModal.vue'))
const PrefixModal = defineAsyncComponent(() => import('./components/PrefixModal.vue'))
const StatusModal = defineAsyncComponent(() => import('./components/StatusModal.vue'))

const NotificationToast = defineAsyncComponent(() => import('./components/NotificationToast.vue'))

// State
const loading = ref(false)
const isSubmitting = ref(false)
const activeTab = ref<any>("late_payment")
const notification = ref<{ message: string; type: 'success' | 'error' }>({ message: '', type: 'success' })
const errors = ref<Record<string, string[]>>({})
const prefixErrors = ref<Record<string, string[]>>({})

// Late Payment
const latePaymentConfig = ref({
  frequency_days: 30,
  grace_period_days: 7,
  min_charge_amount: 10.00,
  is_active: true
})

// Tax
const taxConfigs = ref<any[]>([])
const taxTypes = ref<any[]>([])
const taxForm = ref({ id: null, type: '', percentage: 0, is_active: true })
const selectedTaxIds = ref<number[]>([])
const showTaxModal = ref(false)
const taxModalMode = ref<'create' | 'edit'>('create')

// Prefix
const prefixConfigs = ref<any[]>([])
const prefixTypes = ref([
  { value: 'order', label: 'Order Number' },
  { value: 'invoice', label: 'Invoice Number' },
  { value: 'contract', label: 'Contract Number' },
  { value: 'payment', label: 'Payment Number' },
  { value: 'credit_note', label: 'Credit Note Number' }
])
const prefixForm = ref({
  id: null,
  type: '',
  prefix: '',
  next_number: 1,
  format: '{prefix}{year}{month}{sequence}',
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  reset_monthly: true,
  reset_yearly: true,
  is_active: true,
  description: ''
})
const generatedNumberPreview = ref('')
const showPrefixPreview = ref(false)
const prefixFilters = ref({ type: '', year: '', month: '', is_active: '' })
const showPrefixModal = ref(false)
const prefixModalMode = ref<'create' | 'edit'>('create')

// Status
const statusConfigs = ref<any[]>([])
const statusTypes = ref<any[]>([])
const statusStats = ref<any>({})
const statusForm = ref({
  id: null,
  name: '',
  type: '',
  color: 'blue',
  description: '',
  is_active: true,
  is_default: false,
  order: 0
})
const selectedStatusIds = ref<number[]>([])
const showStatusModal = ref(false)
const statusModalMode = ref<'create' | 'edit'>('create')
const statusFilters = ref({ type: '', is_active: '' })

// Tabs
const tabs = computed(() => [
  { id: 'late_payment', name: 'Late Payment', icon: 'ClockIcon' },
  {
    id: 'tax',
    name: 'Tax Configuration',
    icon: 'CurrencyDollarIcon',
    badge: taxConfigs.value.filter(t => t.is_active).length
  },
  { id: 'prefix', name: 'Prefix Configuration', icon: 'HashtagIcon' },
  {
    id: 'status',
    name: 'Status Configuration',
    icon: 'TagIcon',
    badge: statusConfigs.value.filter(s => s.is_active).length
  }
])

// Computed Properties (Tax)
const activeTaxes = computed(() => taxConfigs.value.filter(t => t.is_active))
const taxStats = computed(() => ({
  total: taxConfigs.value.length,
  active: activeTaxes.value.length,
  inactive: taxConfigs.value.length - activeTaxes.value.length,
  average: taxConfigs.value.length
    ? (taxConfigs.value.reduce((a, t) => a + parseFloat(t.percentage), 0) / taxConfigs.value.length).toFixed(2)
    : '0.00'
}))

// Computed Properties (Prefix)
const filteredPrefixConfigs = computed(() => {
  let list = prefixConfigs.value
  if (prefixFilters.value.type) list = list.filter(c => c.type === prefixFilters.value.type)
  if (prefixFilters.value.year) list = list.filter(c => c.year === Number(prefixFilters.value.year))
  if (prefixFilters.value.month) list = list.filter(c => c.month === Number(prefixFilters.value.month))
  if (prefixFilters.value.is_active !== '') list = list.filter(c => c.is_active === (prefixFilters.value.is_active === 'true'))
  return list
})

const availableYears = computed(() => {
  const years = new Set(prefixConfigs.value.map(c => c.year))
  const current = new Date().getFullYear()
  years.add(current)
  years.add(current + 1)
  return Array.from(years).sort((a, b) => b - a)
})

const prefixStats = computed(() => ({
  total: prefixConfigs.value.length,
  active: prefixConfigs.value.filter(c => c.is_active).length,
  monthlyReset: prefixConfigs.value.filter(c => c.reset_monthly).length,
  yearlyReset: prefixConfigs.value.filter(c => c.reset_yearly).length,
  noReset: prefixConfigs.value.filter(c => !c.reset_monthly && !c.reset_yearly).length
}))

const nextNumberMap = computed(() => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const map = {}
  prefixTypes.value.forEach(type => {
    const config = prefixConfigs.value.find(
      c => c.type === type.value && c.year === currentYear && c.month === currentMonth && c.is_active
    )
    map[type.value] = config ? config.next_number : 'N/A'
  })
  console.log("mapp",prefixTypes.value)
  return map
})

const months = ref([
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
])

// Methods
const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  notification.value = { message, type }
  setTimeout(() => (notification.value = { message: '', type: 'success' }), 5000)
}

// Late Payment
const fetchConfigurations = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/configurations', getAxiosConfig())
    if (response.data.success) {
      latePaymentConfig.value = response.data.data.late_payment_config || latePaymentConfig.value
      taxConfigs.value = response.data.data.tax_configs || []
    }
  } catch (error) {
    showNotification('Failed to fetch configurations', 'error')
  } finally {
    loading.value = false
  }
}

const saveLatePaymentConfig = async () => {
  isSubmitting.value = true
  errors.value = {}
  try {
    const response = await axios.post('/api/configurations/late-payment', latePaymentConfig.value, getAxiosConfig())
    if (response.data.success) {
      showNotification('Late payment configuration saved successfully!', 'success')
      latePaymentConfig.value = response.data.data
    } else {
      showNotification(response.data.message, 'error')
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors
      showNotification('Please fix the validation errors', 'error')
    } else {
      showNotification(error.response?.data?.message || 'Failed to save configuration', 'error')
    }
  } finally {
    isSubmitting.value = false
  }
}

const resetLatePaymentForm = () => {
  fetchConfigurations()
  errors.value = {}
}

// Tax
const fetchTaxTypes = async () => {
  try {
    const response = await axios.get('/api/configurations/tax-types', getAxiosConfig())
    if (response.data.success) taxTypes.value = response.data.data
  } catch (error) {
    showNotification('Failed to fetch tax types', 'error')
  }
}

const openTaxModal = (mode: 'create' | 'edit', tax = null) => {
  taxModalMode.value = mode
  if (mode === 'edit' && tax) {
    taxForm.value = { ...tax }
  } else {
    taxForm.value = { id: null, type: '', percentage: 0, is_active: true }
  }
  showTaxModal.value = true
}

const saveTaxConfig = async () => {
  isSubmitting.value = true
  errors.value = {}
  try {
    const response = await axios.post('/api/configurations/tax', taxForm.value, getAxiosConfig())
    if (response.data.success) {
      showNotification('Tax configuration saved successfully!', 'success')
      showTaxModal.value = false
      fetchConfigurations()
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors
      showNotification('Please fix the validation errors', 'error')
    } else {
      showNotification(error.response?.data?.message || 'Failed to save tax configuration', 'error')
    }
  } finally {
    isSubmitting.value = false
  }
}

const deleteTaxConfig = async (tax: any) => {
  if (!confirm(`Are you sure you want to delete the tax configuration for "${tax.type}"?`)) return
  try {
    const response = await axios.delete(`/api/configurations/tax/${tax.id}`, getAxiosConfig())
    if (response.data.success) {
      showNotification('Tax configuration deleted successfully!', 'success')
      fetchConfigurations()
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Failed to delete tax configuration', 'error')
  }
}

const bulkUpdateTaxStatus = async (status: boolean) => {
  if (selectedTaxIds.value.length === 0) {
    showNotification('Please select at least one tax configuration', 'error')
    return
  }
  if (!confirm(`Are you sure you want to ${status ? 'activate' : 'deactivate'} ${selectedTaxIds.value.length} tax configuration(s)?`)) return
  try {
    const response = await axios.post(
      '/api/configurations/tax/bulk-status',
      { ids: selectedTaxIds.value, is_active: status },
      getAxiosConfig()
    )
    if (response.data.success) {
      showNotification(`${selectedTaxIds.value.length} tax configuration(s) ${status ? 'activated' : 'deactivated'} successfully!`, 'success')
      selectedTaxIds.value = []
      fetchConfigurations()
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Failed to update tax configurations', 'error')
  }
}

const bulkDeleteTax = async () => {
  if (selectedTaxIds.value.length === 0) {
    showNotification('Please select at least one tax configuration', 'error')
    return
  }
  if (!confirm(`Are you sure you want to delete ${selectedTaxIds.value.length} tax configuration(s)? This action cannot be undone.`)) return
  try {
    const response = await axios.post(
      '/api/configurations/tax/bulk-delete',
      { ids: selectedTaxIds.value },
      getAxiosConfig()
    )
    if (response.data.success) {
      showNotification(`${selectedTaxIds.value.length} tax configuration(s) deleted successfully!`, 'success')
      selectedTaxIds.value = []
      fetchConfigurations()
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Failed to delete tax configurations', 'error')
  }
}

// Prefix
const refreshPrefixConfigs = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/prefix-configurations', getAxiosConfig())
    if (response.data.success) {
      prefixConfigs.value = response.data.data
    }
  } catch (error) {
    showNotification('Failed to fetch prefix configurations', 'error')
  } finally {
    loading.value = false
  }
}

const openPrefixModal = (mode: 'create' | 'edit', config = null) => {
  prefixModalMode.value = mode
  showPrefixPreview.value = false
  if (mode === 'edit' && config) {
    prefixForm.value = { ...config }
  } else {
    prefixForm.value = {
      id: null,
      type: '',
      prefix: '',
      next_number: 1,
      format: '{prefix}{year}{month}{sequence}',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      reset_monthly: true,
      reset_yearly: true,
      is_active: true,
      description: ''
    }
  }
  showPrefixModal.value = true
}

const savePrefixConfig = async () => {
  isSubmitting.value = true
  prefixErrors.value = {}
  try {
    const url = prefixForm.value.id ? `/api/prefix-configurations/${prefixForm.value.id}` : '/api/prefix-configurations'
    const method = prefixForm.value.id ? 'put' : 'post'
    const response = await axios[method](url, prefixForm.value, getAxiosConfig())
    if (response.data.success) {
      showNotification('Prefix configuration saved successfully!', 'success')
      showPrefixModal.value = false
      refreshPrefixConfigs()
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      prefixErrors.value = error.response.data.errors
      showNotification('Please fix the validation errors', 'error')
    } else {
      showNotification(error.response?.data?.message || 'Failed to save prefix configuration', 'error')
    }
  } finally {
    isSubmitting.value = false
  }
}

const incrementPrefixNumber = async (config: any) => {
  if (!confirm(`Increment the next number for ${getPrefixTypeLabel(config.type)}?`)) return
  try {
    const updated = { ...config, next_number: config.next_number + 1 }
    const response = await axios.put(`/api/prefix-configurations/${config.id}`, updated, getAxiosConfig())
    if (response.data.success) {
      showNotification('Next number incremented successfully!', 'success')
      refreshPrefixConfigs()
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Failed to increment number', 'error')
  }
}

const testPrefixNumber = async (config: any) => {
  try {
    const response = await axios.post(
      '/api/prefix-configurations/generate-test',
      {
        type: config.type,
        prefix: config.prefix,
        format: config.format,
        sequence: config.next_number
      },
      getAxiosConfig()
    )
    if (response.data.success) {
      const generated = response.data.data.generated_number
      showNotification(`Test number generated: ${generated}`, 'success')
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Failed to generate test number', 'error')
  }
}

const testPrefixNumberPreview = async () => {
  try {
    const response = await axios.post(
      '/api/prefix-configurations/generate-test',
      {
        type: prefixForm.value.type,
        prefix: prefixForm.value.prefix,
        format: prefixForm.value.format,
        sequence: prefixForm.value.next_number
      },
      getAxiosConfig()
    )
    if (response.data.success) {
      generatedNumberPreview.value = response.data.data.generated_number
      showPrefixPreview.value = true
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Failed to generate preview', 'error')
  }
}

const duplicatePrefixConfig = (config: any) => {
  const newConfig = {
    ...config,
    id: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    next_number: 1,
    description: `Copy of ${config.description || config.type} config`
  }
  openPrefixModal('create', newConfig)
}

const deletePrefixConfig = async (config: any) => {
  if (!confirm(`Are you sure you want to delete the prefix configuration for "${getPrefixTypeLabel(config.type)}"?`)) return
  try {
    const response = await axios.delete(`/api/prefix-configurations/${config.id}`, getAxiosConfig())
    if (response.data.success) {
      showNotification('Prefix configuration deleted successfully!', 'success')
      refreshPrefixConfigs()
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Failed to delete prefix configuration', 'error')
  }
}

const getPrefixTypeLabel = (type: string) => {
  const found = prefixTypes.value.find(t => t.value === type)
  return found ? found.label : type
}

const filterPrefixConfigs = () => {
  // handled by computed
}

// Status
const fetchStatusConfigs = async () => {
  try {
    const [configsRes, typesRes, statsRes] = await Promise.all([
      axios.get('/api/configurations/statuses', getAxiosConfig()),
      axios.get('/api/configurations/statuses/types', getAxiosConfig()),
      axios.get('/api/configurations/statuses/stats', getAxiosConfig())
    ])

    if (configsRes.data.success) statusConfigs.value = configsRes.data.data
    if (typesRes.data.success) {
      statusTypes.value = Object.entries(typesRes.data.data).map(([value, label]) => ({ value, label }))
    }
    if (statsRes.data.success) statusStats.value = statsRes.data.data
  } catch (error) {
    showNotification('Failed to load statuses', 'error')
  }
}

const openStatusModal = (mode: 'create' | 'edit', status = null) => {
  statusModalMode.value = mode
  if (mode === 'edit' && status) {
    statusForm.value = { ...status }
  } else {
    statusForm.value = {
      id: null,
      name: '',
      type: '',
      color: 'blue',
      description: '',
      is_active: true,
      is_default: false,
      order: 0
    }
  }
  showStatusModal.value = true
}

const saveStatusConfig = async () => {
  isSubmitting.value = true
  errors.value = {}
  try {
    const url = statusForm.value.id ? `/api/configurations/statuses/${statusForm.value.id}` : '/api/configurations/statuses'
    const method = statusForm.value.id ? 'put' : 'post'
    const response = await axios[method](url, statusForm.value, getAxiosConfig())
    if (response.data.success) {
      showNotification('Status saved successfully!', 'success')
      showStatusModal.value = false
      fetchStatusConfigs()
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors
      showNotification('Please fix validation errors', 'error')
    } else {
      showNotification(error.response?.data?.message || 'Failed to save status', 'error')
    }
  } finally {
    isSubmitting.value = false
  }
}

const deleteStatusConfig = async (status: any) => {
  if (!confirm(`Delete status "${status.name}"?`)) return
  try {
    const response = await axios.delete(`/api/configurations/statuses/${status.id}`, getAxiosConfig())
    if (response.data.success) {
      showNotification('Status deleted successfully', 'success')
      fetchStatusConfigs()
    }
  } catch (error: any) {
    showNotification(error.response?.data?.message || 'Cannot delete status in use', 'error')
  }
}

const bulkUpdateStatusStatus = async (active: boolean) => {
  if (!selectedStatusIds.value.length) return showNotification('Select at least one status', 'error')
  if (!confirm(`Set ${selectedStatusIds.value.length} status(es) to ${active ? 'active' : 'inactive'}?`)) return
  try {
    const response = await axios.post(
      '/api/configurations/statuses/bulk-update',
      {
        ids: selectedStatusIds.value,
        field: 'is_active',
        value: active
      },
      getAxiosConfig()
    )
    if (response.data.success) {
      showNotification('Statuses updated', 'success')
      selectedStatusIds.value = []
      fetchStatusConfigs()
    }
  } catch (error: any) {
    showNotification('Failed to update statuses', 'error')
  }
}

const bulkDeleteStatus = async () => {
  if (!selectedStatusIds.value.length) return showNotification('Select at least one status', 'error')
  if (!confirm(`Delete ${selectedStatusIds.value.length} status(es)? This cannot be undone.`)) return
  try {
    const response = await axios.post(
      '/api/configurations/statuses/bulk-delete',
      { ids: selectedStatusIds.value },
      getAxiosConfig()
    )
    if (response.data.success) {
      showNotification('Statuses deleted', 'success')
      selectedStatusIds.value = []
      fetchStatusConfigs()
    }
  } catch (error: any) {
    showNotification('Some statuses could not be deleted', 'error')
  }
}

const filterStatusConfigs = () => {
  // handled by computed in StatusTab
}

// Watchers
watch([() => prefixForm.value.prefix, () => prefixForm.value.format, () => prefixForm.value.year, () => prefixForm.value.month, () => prefixForm.value.next_number], () => {
  if (showPrefixPreview.value) testPrefixNumberPreview()
})

watch(selectedTaxIds, (newVal) => {
  // Optional: handle select all logic if you have it in TaxTab
})

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchConfigurations(),
    fetchTaxTypes(),
    refreshPrefixConfigs(),
    fetchStatusConfigs()
  ])
})
</script>