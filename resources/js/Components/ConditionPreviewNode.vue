<!-- src/Components/EnhancedConditionPreviewNode.vue -->
<template>
    <div class="preview-node" :class="{'ml-4': depth > 0}">
        <div v-if="isGroup(node)" class="preview-group">
            <div class="preview-group-header flex items-center gap-2 text-sm mb-2 p-2 bg-gray-50 rounded">
                <span class="font-medium text-gray-700">(</span>
                <span class="text-blue-600 font-medium">{{ node.operator }}</span>
                <span class="font-medium text-gray-700">)</span>
            </div>
            <div class="preview-group-content ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                <EnhancedConditionPreviewNode 
                    v-for="(child, index) in node.conditions" 
                    :key="index" 
                    :node="child" 
                    :depth="depth + 1" 
                    :parent-type="node.table || parentType"
                />
            </div>
        </div>
        
        <div v-else class="preview-condition flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded border">
            <span v-if="node.table && node.table !== parentType" class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                {{ formatTableName(node.table) }}
            </span>
            <span class="font-medium text-gray-900">{{ formatFieldName(node.field) }}</span>
            <span class="text-blue-600 font-medium">{{ formatOperator(node.operator) }}</span>
            <span class="text-green-600 font-medium">{{ formatValue(node.value, node.operator) }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    node: { type: Object, required: true },
    depth: { type: Number, default: 0 },
    parentType: { type: String, default: '' }
});

const isGroup = (node) => {
    return node && Array.isArray(node.conditions);
};

const formatTableName = (table) => {
    const tableNames = {
        'customer': 'Customer',
        'order': 'Order', 
        'invoice': 'Invoice',
        'contract': 'Contract'
    };
    return tableNames[table] || table;
};

const formatFieldName = (field) => {
    if (!field) return 'Unknown Field';
    return field.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

const formatOperator = (operator) => {
    const operatorMap = {
        'equals': '=',
        'not_equals': '≠',
        'contains': 'contains',
        'not_contains': 'not contains',
        'greater_than': '>',
        'less_than': '<',
        'greater_than_equal': '≥',
        'less_than_equal': '≤',
        'between': 'between',
        'not_between': 'not between',
        'in': 'in',
        'not_in': 'not in',
        'is_null': 'is null',
        'is_not_null': 'is not null',
        'last_n_days': 'in last',
        'next_n_days': 'in next'
    };
    return operatorMap[operator] || operator;
};

const formatValue = (value, operator) => {
    if (['is_null', 'is_not_null'].includes(operator)) return '';
    
    if (operator === 'between' && Array.isArray(value)) {
        return `${value[0]} and ${value[1]}`;
    }
    
    if (['last_n_days', 'next_n_days'].includes(operator)) {
        return `${value} days`;
    }
    
    if (Array.isArray(value)) {
        return value.join(', ');
    }
    
    return value;
};
</script>

<style scoped>
.preview-node {
    transition: all 0.2s ease-in-out;
}

.preview-condition {
    transition: all 0.2s ease-in-out;
}

.preview-condition:hover {
    border-color: #3b82f6;
    background-color: #f8fafc;
}

.preview-group-header {
    border-left: 3px solid #3b82f6;
}
</style>