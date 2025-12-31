<!-- NavigationItem.vue -->
<template>
    <div class="relative">
        <div
            :draggable="true"
            @dragstart="onDragStart"
            @dragend="onDragEnd"
            @dragover="onDragOver"
            @drop="onDrop"
            :class="[
                'p-3 border rounded-lg mb-1 cursor-move hover:shadow-sm transition-all duration-200',
                isSelected
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
        >
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="flex items-center space-x-2">
                        <font-awesome-icon 
                            v-if="item.icon" 
                            :icon="['fas', item.icon]" 
                            class="w-4 h-4 text-gray-500 dark:text-gray-400" 
                        />
                        <font-awesome-icon 
                            v-else 
                            :icon="['fas', 'bars']" 
                            class="w-4 h-4 text-gray-400 dark:text-gray-600" 
                        />
                        
                        <div>
                            <div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.label }}</div>
                            <div v-if="item.path" class="text-xs text-gray-500 dark:text-gray-400">{{ item.path }}</div>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-1">
                        <span v-if="!item.is_active" class="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
                            Inactive
                        </span>
                        <span v-if="item.children && item.children.length > 0" class="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                            {{ item.children.length }} children
                        </span>
                    </div>
                </div>
                
                <div class="flex items-center space-x-1">
                    <button
                        @click.stop="emit('edit', item)"
                        class="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                        title="Edit"
                    >
                        <font-awesome-icon :icon="['fas', 'edit']" class="w-4 h-4" />
                    </button>
                    <button
                        @click.stop="emit('select', item)"
                        class="p-1 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400"
                        title="Select"
                    >
                        <font-awesome-icon :icon="['fas', 'eye']" class="w-4 h-4" />
                    </button>
                    <button
                        @click.stop="emit('delete', item.id)"
                        class="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete"
                    >
                        <font-awesome-icon :icon="['fas', 'trash']" class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Children -->
        <div v-if="item.children && item.children.length > 0" class="ml-6 border-l border-gray-200 dark:border-gray-700 pl-3">
            <NavigationItem
                v-for="child in item.children"
                :key="child.id"
                :item="child"
                :level="level + 1"
                :selected-item-id="selectedItemId"
                :all-items="allItems"
                @select="emit('select', $event)"
                @edit="emit('edit', $event)"
                @delete="emit('delete', $event)"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    item: Object,
    level: {
        type: Number,
        default: 0
    },
    selectedItemId: [String, Number],
    allItems: Array
});

const emit = defineEmits(['select', 'edit', 'delete']);

const isSelected = computed(() => {
    return props.selectedItemId === props.item.id;
});

const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', props.item.id);
};

const onDragEnd = () => {
    // Optional: Add visual feedback
};

const onDragOver = (event) => {
    event.preventDefault();
};

const onDrop = (event) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    console.log(`Dropped ${draggedId} on ${props.item.id}`);
};
</script>