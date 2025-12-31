<template>
    <div class="condition-group" :class="{'ml-6': depth > 0}">
        <div class="space-y-3">
            <div 
                v-for="(child, index) in node.conditions" 
                :key="index"
                class="condition-item"
            >
                <div class="single-condition flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                    <!-- Table Selection (for child conditions) -->
                    <div v-if="depth > 0" class="w-32">
                        <label class="block text-xs font-medium text-gray-700 mb-1">Table</label>
                        <select 
                            v-model="child.table" 
                            @change="onTableChange(child, index)"
                            class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                        >
                            <option value="">Select table</option>
                            <option v-for="table in availableTables" :key="table.value" :value="table.value">
                                {{ table.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Field Selection -->
                    <div class="flex-1">
                        <label class="block text-xs font-medium text-gray-700 mb-1">Field</label>
                        <select 
                            v-model="child.field" 
                            class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                        >
                            <option value="">Select field</option>
                            <optgroup v-for="(fieldGroup, groupName) in getFieldGroups(child.table || parentType)" 
                                     :key="groupName" :label="groupName">
                                <option v-for="field in fieldGroup" :key="field" :value="field">
                                    {{ formatFieldName(field) }}
                                </option>
                            </optgroup>
                        </select>
                    </div>

                    <!-- Operator Selection -->
                    <div class="w-32">
                        <label class="block text-xs font-medium text-gray-700 mb-1">Operator</label>
                        <select 
                            v-model="child.operator" 
                            @change="onOperatorChange(child)"
                            class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                        >
                            <option v-for="op in getOperatorsForField(child.field, child.table || parentType)" 
                                   :key="op.value" :value="op.value">
                                {{ op.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Value Input -->
                    <div class="flex-1">
                        <label class="block text-xs font-medium text-gray-700 mb-1">Value</label>
                        <div v-if="child.operator === 'between'" class="flex gap-2">
                            <input 
                                v-model="child.value[0]" 
                                :type="getInputType(child.field, child.table || parentType)"
                                class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                                :placeholder="getPlaceholder(child.field, 'start')"
                            >
                            <input 
                                v-model="child.value[1]" 
                                :type="getInputType(child.field, child.table || parentType)"
                                class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                                :placeholder="getPlaceholder(child.field, 'end')"
                            >
                        </div>
                        <div v-else-if="child.operator === 'in' || child.operator === 'not_in'">
                            <input 
                                :value="child.value.join(', ')" 
                                @input="updateListValue(child, $event.target.value)"
                                type="text"
                                class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                                placeholder="Comma-separated values"
                            >
                        </div>
                        <div v-else-if="isDateField(child.field, child.table || parentType)" class="flex gap-2">
                            <select 
                                v-if="['last_n_days', 'next_n_days'].includes(child.operator)"
                                v-model="child.value"
                                class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                            >
                                <option v-for="n in 30" :key="n" :value="n">{{ n }} days</option>
                            </select>
                            <input 
                                v-else
                                v-model="child.value" 
                                type="date"
                                class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                            >
                        </div>
                        <input 
                            v-else-if="!['is_null', 'is_not_null'].includes(child.operator)"
                            v-model="child.value" 
                            :type="getInputType(child.field, child.table || parentType)"
                            class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-green-500"
                            :placeholder="getPlaceholder(child.field)"
                        >
                        <div v-else class="text-xs text-gray-500 italic py-1">
                            No value needed
                        </div>
                    </div>

                    <!-- Remove Button -->
                    <button 
                        @click="removeChildNode(index)" 
                        class="mt-6 text-red-600 hover:text-red-800 transition-colors"
                        title="Remove Condition"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div v-if="node.conditions.length === 0" class="text-sm text-gray-500 italic p-2">
                No conditions added yet
            </div>
        </div>

        <!-- Add Condition/Cross-Table Condition Buttons -->
        <div class="flex gap-2 mt-3">
            <button 
                @click="addCondition(node)" 
                class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
                + Add Condition
            </button>
            <button 
                v-if="isRoot"
                @click="addCrossTableCondition(node)" 
                class="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
                + Add Related Table Condition
            </button>
        </div>
    </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
    node: { type: Object, required: true },
    allFields: { type: Object, required: true },
    depth: { type: Number, default: 0 },
    isRoot: { type: Boolean, default: false },
    parentType: { type: String, default: '' },
    addCondition: { type: Function, required: true },
    removeNode: { type: Function, required: false },
    availableTables: { type: Array, default: () => [] }
});

// Hardcoded fields by table to match backend
const allTableFields = {
    customer: {
        basic: ['nric', 'first_name', 'last_name', 'email', 'phone_number', 'gender', 'dob'],
        address: ['address', 'postalcode', 'city', 'state', 'postcode'],
        employment: ['employment_company_name', 'employment_office_gneral_line'],
        financial: ['bnk_acc', 'bnk_name'],
        metadata: ['tenant_code', 'draf', 'program_id', 'applicationsource']
    },
    order: {
        order_info: ['orderId', 'partner_orderId', 'monthly_subscription', 'program_fee', 'gst'],
        dates: ['start_contract', 'created_at'],
        status: ['order_status_id', 'data_verification', 'call_verification'],
        references: ['customer_id', 'program_id', 'branch_id']
    },
    invoice: {
        invoice_info: ['invoice_no', 'total_amount', 'paid_amount', 'balance_amount'],
        dates: ['issue_date', 'due_date'],
        financial: ['gst_amount', 'gst', 'late_payment_charges'],
        status: ['status', 'status_desc']
    },
    contract: {
        contract_info: ['contract_number', 'monthly_subscription', 'subscription_period'],
        dates: ['contract_date', 'contract_end_date', 'commencement_date'],
        device: ['imei', 'device_cost'],
        status: ['contract_status_id']
    }
};

// Available operators by field type
const operators = {
    text: [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'not_contains', label: 'Not Contains' },
        { value: 'is_null', label: 'Is Empty' },
        { value: 'is_not_null', label: 'Is Not Empty' }
    ],
    number: [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not Equals' },
        { value: 'greater_than', label: 'Greater Than' },
        { value: 'less_than', label: 'Less Than' },
        { value: 'greater_than_equal', label: 'Greater Than or Equal' },
        { value: 'less_than_equal', label: 'Less Than or Equal' },
        { value: 'between', label: 'Between' },
        { value: 'not_between', label: 'Not Between' },
        { value: 'is_null', label: 'Is Null' },
        { value: 'is_not_null', label: 'Is Not Null' }
    ],
    date: [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not Equals' },
        { value: 'greater_than', label: 'After' },
        { value: 'less_than', label: 'Before' },
        { value: 'greater_than_equal', label: 'On or After' },
        { value: 'less_than_equal', label: 'On or Before' },
        { value: 'between', label: 'Between' },
        { value: 'not_between', label: 'Not Between' },
        { value: 'last_n_days', label: 'Last N Days' },
        { value: 'next_n_days', label: 'Next N Days' },
        { value: 'is_null', label: 'Is Null' },
        { value: 'is_not_null', label: 'Is Not Null' }
    ],
    default: [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'not_contains', label: 'Not Contains' },
        { value: 'greater_than', label: 'Greater Than' },
        { value: 'less_than', label: 'Less Than' },
        { value: 'between', label: 'Between' },
        { value: 'in', label: 'In List' },
        { value: 'not_in', label: 'Not In List' },
        { value: 'is_null', label: 'Is Null' },
        { value: 'is_not_null', label: 'Is Not Null' }
    ]
};

// Table relationships
const tableRelationships = {
    customer: [
        { value: 'order', label: 'Order' },
        { value: 'invoice', label: 'Invoice' },
        { value: 'contract', label: 'Contract' }
    ],
    order: [
        { value: 'customer', label: 'Customer' },
        { value: 'invoice', label: 'Invoice' },
        { value: 'contract', label: 'Contract' }
    ],
    invoice: [
        { value: 'customer', label: 'Customer' },
        { value: 'order', label: 'Order' }
    ],
    contract: [
        { value: 'customer', label: 'Customer' },
        { value: 'order', label: 'Order' }
    ]
};

// Date fields by table
const dateFields = {
    customer: ['dob', 'created_at', 'updated_at'],
    order: ['start_contract', 'created_at', 'updated_at'],
    invoice: ['issue_date', 'due_date', 'created_at', 'updated_at'],
    contract: ['contract_date', 'contract_end_date', 'commencement_date', 'device_collection_date', 'created_at', 'updated_at']
};

// Number fields by table
const numberFields = {
    customer: ['postalcode', 'postcode'],
    order: ['monthly_subscription', 'program_fee', 'gst', 'tenure'],
    invoice: ['total_amount', 'paid_amount', 'balance_amount', 'gst_amount', 'gst', 'late_payment_charges'],
    contract: ['monthly_subscription', 'device_cost', 'subscription_period', 'min_tenure']
};

const getFieldGroups = (tableType) => {
    return props.allFields[tableType] || allTableFields[tableType] || {};
};

const getOperatorsForField = (field, tableType) => {
    if (!field) return operators.default;
    
    if (isDateField(field, tableType)) return operators.date;
    if (isNumberField(field, tableType)) return operators.number;
    if (isTextField(field, tableType)) return operators.text;
    
    return operators.default;
};

const isDateField = (field, tableType) => {
    return dateFields[tableType]?.includes(field) || field.includes('_date') || field.includes('_at');
};

const isNumberField = (field, tableType) => {
    return numberFields[tableType]?.includes(field) || 
           field.includes('amount') || 
           field.includes('fee') || 
           field.includes('cost') ||
           field.includes('subscription');
};

const isTextField = (field, tableType) => {
    return field.includes('name') || 
           field.includes('email') || 
           field.includes('phone') ||
           field.includes('address') ||
           field.includes('description');
};

const getInputType = (field, tableType) => {
    if (isDateField(field, tableType)) return 'date';
    if (isNumberField(field, tableType)) return 'number';
    return 'text';
};

const getPlaceholder = (field, position = '') => {
    if (position === 'start') return 'Start value';
    if (position === 'end') return 'End value';
    
    if (field.includes('email')) return 'email@example.com';
    if (field.includes('phone')) return 'Phone number';
    if (field.includes('amount') || field.includes('fee')) return '0.00';
    return 'Enter value';
};

const formatFieldName = (field) => {
    return field.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

const onTableChange = (child, index) => {
    // Reset field and operator when table changes
    child.field = '';
    child.operator = 'equals';
    child.value = '';
};

const onOperatorChange = (child) => {
    // Initialize value based on operator
    if (child.operator === 'between') {
        child.value = ['', ''];
    } else if (['in', 'not_in'].includes(child.operator)) {
        child.value = [];
    } else if (['is_null', 'is_not_null'].includes(child.operator)) {
        child.value = null;
    } else {
        child.value = '';
    }
};

const updateListValue = (child, input) => {
    child.value = input.split(',').map(v => v.trim()).filter(v => v);
};

const removeChildNode = (index) => {
    props.node.conditions.splice(index, 1);
};

const addCrossTableCondition = (group) => {
    const availableTables = props.availableTables;
    if (availableTables.length > 0) {
        group.conditions.push({
            table: availableTables[0].value,
            field: '',
            operator: 'equals',
            value: ''
        });
    }
};

// Watch for operator changes to handle value type
watch(
    () => props.node?.conditions,
    (newConditions) => {
        newConditions?.forEach(condition => {
            if (condition.operator === 'between' && !Array.isArray(condition.value)) {
                condition.value = ['', ''];
            } else if (['in', 'not_in'].includes(condition.operator) && !Array.isArray(condition.value)) {
                condition.value = [];
            } else if (['is_null', 'is_not_null'].includes(condition.operator) && condition.value !== null) {
                condition.value = null;
            }
        });
    },
    { deep: true }
);
</script>

<style scoped>
.condition-group {
    transition: all 0.2s ease-in-out;
}

.single-condition {
    transition: all 0.2s ease-in-out;
}

.single-condition:hover {
    border-color: #3b82f6;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
</style>
