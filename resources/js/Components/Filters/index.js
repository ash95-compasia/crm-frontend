import TextFilter from './TextFilter.vue'
import SelectFilter from './SelectFilter.vue'
import DateFilter from './DateFilter.vue'
import NumberFilter from './NumberFilter.vue'
import RangeFilter from './RangeFilter.vue'
import MultiSelectFilter from './MultiSelectFilter.vue'
import BooleanFilter from './BooleanFilter.vue'

export const filterComponents = {
  text: TextFilter,
  select: SelectFilter,
  date: DateFilter,
  number: NumberFilter,
  range: RangeFilter,
  multiSelect: MultiSelectFilter,
  boolean: BooleanFilter
}

export const getFilterComponent = (type) => {
  return filterComponents[type] || filterComponents.text
}

// Filter configuration helpers
export const createFilter = (config) => ({
  key: config.key,
  label: config.label,
  type: config.type || 'text',
  placeholder: config.placeholder,
  options: config.options || [],
  multiple: config.multiple || false,
  quickFilter: config.quickFilter || false,
  advanced: config.advanced || false,
  presets: config.presets || [],
  validation: config.validation,
  format: config.format,
  ...config
})

// Common filter presets
export const datePresets = {
  today: { label: 'Today', value: () => ({ start: new Date(), end: new Date() }) },
  last7Days: { label: 'Last 7 Days', value: () => ({ 
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  }) },
  thisMonth: { label: 'This Month', value: () => ({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date()
  }) }
}

// Filter factory functions
export const createTextFilter = (key, label, options = {}) => 
  createFilter({ key, label, type: 'text', ...options })

export const createSelectFilter = (key, label, options, filterOptions = {}) => 
  createFilter({ key, label, type: 'select', options, ...filterOptions })

export const createDateRangeFilter = (key, label, options = {}) => 
  createFilter({ key, label, type: 'range', ...options })

export const createBooleanFilter = (key, label, options = {}) => 
  createFilter({ 
    key, 
    label, 
    type: 'select', 
    options: [
      { label: 'All', value: '' },
      { label: 'Yes', value: true },
      { label: 'No', value: false }
    ],
    ...options 
  })