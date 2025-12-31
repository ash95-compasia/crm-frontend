<template>
  <div class="simple-rule-config p-4 border rounded-lg">
    <h5 class="text-base font-semibold mb-3">Simple Rule Configuration</h5>
    <div class="mb-4">
      <label class="block font-medium mb-1">Condition Logic</label>
      <select
        v-model="localConfig.conditionLogic"
        @change="emitChange"
        class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Select condition logic"
      >
        <option value="AND">AND (All conditions must pass)</option>
        <option value="OR">OR (Any condition can pass)</option>
      </select>
    </div>
    <div v-for="(condition, index) in localConfig.conditions" :key="index" class="condition-group mb-3 p-3 border rounded-lg bg-white">
      <div class="flex justify-between items-center mb-2">
        <h6 class="text-sm font-medium">Condition {{ index + 1 }}</h6>
        <button
          v-if="localConfig.conditions.length > 1"
          class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          @click="removeCondition(index)"
          title="Remove Condition"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mb-2">
        <label class="block font-medium mb-1">Select Table</label>
        <select
          v-model="condition.table"
          @change="condition.column = null; condition.operator = null; condition.value = ''; emitChange()"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Select a table to filter"
        >
          <option :value="null" disabled>Choose a table</option>
          <option v-for="table in tables" :key="table.name" :value="table.name">
            {{ table.name }}
          </option>
        </select>
      </div>
      <div v-if="condition.table" class="mb-2">
        <label class="block font-medium mb-1">Select Column</label>
        <select
          v-model="condition.column"
          @change="condition.operator = null; condition.value = ''; emitChange()"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Select a column to filter"
        >
          <option :value="null" disabled>Choose a column</option>
          <option v-for="column in getColumns(condition.table)" :key="column" :value="column">
            {{ column }}
          </option>
        </select>
      </div>
      <div v-if="condition.column" class="flex items-center gap-2">
        <div>
          <label class="block font-medium mb-1">Condition</label>
          <select
            v-model="condition.operator"
            @change="updateConditionValue(index)"
            class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Select comparison operator"
          >
            <option v-for="option in operatorOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-if="condition.operator && condition.operator !== 'EXISTS' && condition.operator !== 'NOT EXISTS'" class="flex-1">
          <label class="block font-medium mb-1">Value</label>
          <div v-if="condition.operator === 'BETWEEN' || condition.operator === 'AGE_BETWEEN'" class="flex gap-2">
            <input
              v-model="condition.value.min"
              placeholder="Min value"
              type="number"
              @input="emitChange"
              class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :title="condition.operator === 'AGE_BETWEEN' ? 'Enter minimum age' : 'Enter minimum value'"
            />
            <input
              v-model="condition.value.max"
              placeholder="Max value"
              type="number"
              @input="emitChange"
              class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :title="condition.operator === 'AGE_BETWEEN' ? 'Enter maximum age' : 'Enter maximum value'"
            />
          </div>
          <input
            v-else
            v-model="condition.value"
            :placeholder="condition.operator === 'IN' || condition.operator === 'NOT IN' ? 'Enter values (comma-separated)' : 'Enter value (e.g., 100)'"
            @input="emitChange"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :title="condition.operator === 'IN' || condition.operator === 'NOT IN' ? 'Enter comma-separated values' : 'Enter the value to compare'"
          />
        </div>
      </div>
    </div>
    <button
      class="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
      @click="addCondition"
      title="Add another condition"
    >
      <svg class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add Condition
    </button>
  </div>
</template>

<script>
export default {
  name: 'SimpleRuleConfig',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    tables: {
      type: Array,
      required: true,
    },
    getColumns: {
      type: Function,
      required: true,
    },
    operatorOptions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localConfig: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  mounted() {
    if (!this.localConfig.conditionLogic) {
      this.localConfig.conditionLogic = 'AND';
      this.$emit('update:modelValue', { ...this.localConfig });
    }
  },
  methods: {
    addCondition() {
      this.localConfig.conditions.push({
        table: null,
        column: null,
        operator: '=',
        value: '',
      });
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    removeCondition(index) {
      this.localConfig.conditions.splice(index, 1);
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    updateConditionValue(index) {
      const condition = this.localConfig.conditions[index];
      if (condition.operator === 'EXISTS' || condition.operator === 'NOT EXISTS') {
        condition.value = '';
      } else if (condition.operator === 'IN' || condition.operator === 'NOT IN') {
        condition.value = '';
      } else if (condition.operator === 'BETWEEN' || condition.operator === 'AGE_BETWEEN') {
        condition.value = { min: '', max: '' };
      } else {
        condition.value = '';
      }
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    emitChange() {
      const updatedConfig = { ...this.localConfig };
      updatedConfig.conditions = updatedConfig.conditions.map(condition => ({
        ...condition,
        value: condition.operator === 'IN' || condition.operator === 'NOT IN'
          ? condition.value.split(',').map(v => v.trim()).filter(v => v)
          : condition.operator === 'BETWEEN' || condition.operator === 'AGE_BETWEEN'
          ? { min: condition.value.min, max: condition.value.max }
          : condition.value,
      }));
      this.$emit('update:modelValue', updatedConfig);
    },
  },
};
</script>

<style scoped>
.simple-rule-config {
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 5px;
}
.condition-group {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}
</style>