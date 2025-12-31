<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div 
            v-for="card in cards"
            :key="card.key"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
        >
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <p class="text-gray-600 dark:text-gray-400 text-sm">{{ card.label }}</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        <span v-if="card.type === 'currency'">
                            {{ formatCurrency(card.value) }}
                        </span>
                        <span v-else-if="card.type === 'number'">
                            {{ formatNumber(card.value) }}
                        </span>
                        <span v-else>
                            {{ card.value }}
                        </span>
                    </p>
                    <p v-if="card.subtitle" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {{ card.subtitle }}
                    </p>
                    <div v-if="card.buttons && card.buttons.length > 0" class="flex space-x-2 mt-2">
                        <button
                            v-for="btn in card.buttons"
                            :key="btn.key || btn.label"
                            @click="$emit('button-click', { cardKey: card.key, button: btn })"
                            class="text-xs px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white transition-colors"
                        >
                            {{ btn.label }}
                        </button>
                    </div>
                </div>
                <div 
                    :class="[
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        card.iconBackground || 'bg-gray-100 dark:bg-gray-700'
                    ]"
                >
                    <component 
                        v-if="card.icon" 
                        :is="card.icon"
                        :class="[
                            'w-6 h-6',
                            card.iconColor || 'text-gray-600 dark:text-gray-300'
                        ]"
                    />
                    <span 
                        v-else-if="card.initials"
                        :class="[
                            'text-sm font-medium',
                            card.iconColor || 'text-gray-600 dark:text-gray-300'
                        ]"
                    >
                        {{ card.initials }}
                    </span>
                    <svg 
                        v-else
                        :class="[
                            'w-6 h-6',
                            card.iconColor || 'text-gray-600 dark:text-gray-300'
                        ]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    cards: {
        type: Array,
        required: true,
        validator: (value) => {
            return value.every(card => 
                card.key && 
                card.label && 
                card.value !== undefined
            );
        }
    },
    currencyCode: {
        type: String,
        default: 'SGD'
    }
});

const emit = defineEmits(['button-click']);

const formatCurrency = (value) => {
    if (!value && value !== 0) return '-';
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: props.currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    } catch (error) {
        return `${props.currencyCode} ${value?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) || '0.00'}`;
    }
};

const formatNumber = (value) => {
    if (!value && value !== 0) return '0';
    return value.toLocaleString();
};
</script>

<style scoped>
/* Smooth transitions for dark mode */
* {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>