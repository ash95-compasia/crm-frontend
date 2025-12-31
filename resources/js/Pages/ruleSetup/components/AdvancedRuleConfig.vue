<template>
  <div class="advanced-rule-config p-4 border rounded-lg">
    <h5 class="text-base font-semibold mb-3">Advanced Rule Configuration</h5>
    <!-- Table Configurations -->
    <div v-for="(tableConfig, index) in localConfig.tables" :key="index" class="table-group mb-4 p-3 border rounded-lg bg-white">
      <div class="flex justify-between items-center mb-2">
        <h6 class="text-sm font-medium">Table {{ index + 1 }} (result_{{ index + 1 }})</h6>
        <button
          class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          @click="removeTable(index)"
          title="Remove Table"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Table Selection -->
      <div class="mb-2">
        <label class="block font-medium mb-1">Select Table</label>
        <select
          v-model="tableConfig.table"
          @change="resetTableConfig(index)"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Select a table"
        >
          <option :value="null" disabled>Choose a table</option>
          <option v-for="table in tables" :key="table.name" :value="table.name">
            {{ table.name }}
          </option>
        </select>
      </div>
      <!-- Aggregate Function Selection -->
      <div v-if="tableConfig.table" class="mb-2">
        <label class="block font-medium mb-1">Aggregate Function</label>
        <select
          v-model="tableConfig.aggregate"
          @change="updateAggregate(index)"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Select aggregate function"
        >
          <option :value="null" disabled>Choose an aggregate function</option>
          <option v-for="option in aggregateOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <!-- Column Selection (for non-COUNT aggregates) -->
      <div v-if="tableConfig.aggregate && tableConfig.aggregate !== 'COUNT'" class="mb-2">
        <label class="block font-medium mb-1">Select Column</label>
        <select
          v-model="tableConfig.column"
          @change="emitChange"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Select a column"
        >
          <option :value="null" disabled>Choose a column</option>
          <option v-for="column in getColumns(tableConfig.table)" :key="column" :value="column">
            {{ column }}
          </option>
        </select>
      </div>
      <!-- Display COUNT(*) for COUNT aggregate -->
      <div v-if="tableConfig.aggregate === 'COUNT'" class="mb-2">
        <label class="block font-medium mb-1">Column</label>
        <input
          type="text"
          value="Count(*)"
          readonly
          class="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          title="Count(*) is used for COUNT aggregate"
        />
      </div>
      <!-- WHERE Clause Conditions -->
      <div v-if="tableConfig.aggregate" class="condition-group mb-3 p-3 border rounded-lg bg-white">
        <h6 class="text-sm font-medium mb-2">WHERE Conditions</h6>
        <div v-for="(condition, condIndex) in tableConfig.conditions" :key="condIndex" class="mb-3">
          <div class="flex items-center gap-2">
            <div>
              <label class="block font-medium mb-1">Column</label>
              <select
                v-model="condition.column"
                @change="updateConditionValue(index, condIndex)"
                class="w-[200px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Select column for filter"
              >
                <option :value="null" disabled>-- Select Column --</option>
                <option v-for="column in getColumns(tableConfig.table)" :key="column" :value="column">
                  {{ column }}
                </option>
              </select>
            </div>
            <div>
              <label class="block font-medium mb-1">Operator</label>
              <select
                v-model="condition.operator"
                @change="updateConditionValue(index, condIndex)"
                class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Select comparison operator"
              >
                <option v-for="option in operatorOptions" :key="option.value" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div v-if="condition.operator === 'BETWEEN'" class="flex gap-2">
              <input
                v-model="condition.value.min"
                placeholder="Min value"
                type="text"
                pattern="[0-9]*\.?[0-9]+"
                class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Enter minimum numeric value"
                @input="emitChange"
              />
              <input
                v-model="condition.value.max"
                placeholder="Max value"
                type="text"
                pattern="[0-9]*\.?[0-9]+"
                class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Enter maximum numeric value"
                @input="emitChange"
              />
            </div>
            <input
              v-else-if="condition.operator !== 'EXISTS' && condition.operator !== 'NOT EXISTS'"
              v-model="condition.value"
              :placeholder="condition.operator === 'IN' || condition.operator === 'NOT IN' ? 'Enter values (comma-separated)' : 'Enter value'"
              type="text"
              class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :title="condition.operator === 'IN' || condition.operator === 'NOT IN' ? 'Enter comma-separated values' : 'Enter a value'"
              @input="emitChange"
            />
            <button
              class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              @click="removeCondition(index, condIndex)"
              title="Remove condition"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="addCondition(index)"
          title="Add new condition"
        >
          <svg class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Condition
        </button>
      </div>
    </div>
    <!-- Add Table Button -->
    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      @click="addTable"
      title="Add new table"
    >
      <svg class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add Table
    </button>
    <!-- Operation Input -->
    <div v-if="localConfig.tables.length > 0" class="mb-4">
      <label class="block font-medium mb-1">Operation (e.g., result_1 + result_2)</label>
      <input
        v-model="localConfig.operation"
        placeholder="Enter operation (e.g., result_1 + result_2)"
        class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Enter operation using result_1, result_2, etc."
        @input="emitChange"
      />
    </div>
    <!-- Final Condition -->
    <div v-if="localConfig.tables.length > 0" class="condition-group mb-3 p-3 border rounded-lg bg-white">
      <h6 class="text-sm font-medium mb-2">Final Condition</h6>
      <div class="flex items-center gap-2">
        <div>
          <label class="block font-medium mb-1">Operator</label>
          <select
            v-model="localConfig.finalCondition.operator"
            @change="updateFinalConditionValue"
            class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Select comparison operator for final result"
          >
            <option v-for="option in operatorOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-if="localConfig.finalCondition.operator === 'BETWEEN'" class="flex gap-2">
          <input
            v-model="localConfig.finalCondition.value.min"
            placeholder="Min value"
            type="text"
            pattern="[0-9]*\.?[0-9]+"
            class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Enter minimum numeric value for final result"
            @input="emitChange"
          />
          <input
            v-model="localConfig.finalCondition.value.max"
            placeholder="Max value"
            type="text"
            pattern="[0-9]*\.?[0-9]+"
            class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Enter maximum numeric value for final result"
            @input="emitChange"
          />
        </div>
        <input
          v-else-if="localConfig.finalCondition.operator !== 'EXISTS' && localConfig.finalCondition.operator !== 'NOT EXISTS'"
          v-model="localConfig.finalCondition.value"
          :placeholder="localConfig.finalCondition.operator === 'IN' || localConfig.finalCondition.operator === 'NOT IN' ? 'Enter values (comma-separated)' : 'Enter threshold'"
          type="text"
          class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :title="localConfig.finalCondition.operator === 'IN' || localConfig.finalCondition.operator === 'NOT IN' ? 'Enter comma-separated values' : 'Enter a numeric threshold value for final result'"
          @input="emitChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvancedRuleConfig',
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
    aggregateOptions: {
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
    this.initializeConfig();
  },
  methods: {
    initializeConfig() {
      if (!this.localConfig || !this.localConfig.tables) {
        this.localConfig = {
          tables: [{
            table: null,
            column: null,
            aggregate: null,
            conditions: [{ column: null, operator: '=', value: '' }],
          }],
          operation: '',
          finalCondition: { operator: '=', value: '' },
        };
        this.$emit('update:modelValue', { ...this.localConfig });
      }
    },
    addTable() {
      this.localConfig.tables.push({
        table: null,
        column: null,
        aggregate: null,
        conditions: [{ column: null, operator: '=', value: '' }],
      });
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    removeTable(index) {
      if (this.localConfig.tables.length > 1) {
        this.localConfig.tables.splice(index, 1);
        this.localConfig.operation = this.updateOperationString(this.localConfig.operation);
        this.$emit('update:modelValue', { ...this.localConfig });
      }
    },
    addCondition(tableIndex) {
      this.localConfig.tables[tableIndex].conditions.push({ column: null, operator: '=', value: '' });
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    removeCondition(tableIndex, condIndex) {
      if (this.localConfig.tables[tableIndex].conditions.length > 1) {
        this.localConfig.tables[tableIndex].conditions.splice(condIndex, 1);
        this.$emit('update:modelValue', { ...this.localConfig });
      }
    },
    resetTableConfig(index) {
      this.localConfig.tables[index] = {
        table: this.localConfig.tables[index].table,
        column: null,
        aggregate: null,
        conditions: [{ column: null, operator: '=', value: '' }],
      };
      this.localConfig.operation = this.updateOperationString(this.localConfig.operation);
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    updateAggregate(index) {
      const tableConfig = this.localConfig.tables[index];
      if (tableConfig.aggregate === 'COUNT') {
        tableConfig.column = null;
      }
      tableConfig.conditions = [{ column: null, operator: '=', value: '' }];
      this.localConfig.operation = this.updateOperationString(this.localConfig.operation);
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    updateOperationString(operation) {
      const tableCount = this.localConfig.tables.length;
      const validResults = Array.from({ length: tableCount }, (_, i) => `result_${i + 1}`);
      const regex = /result_\d+/g;
      let newOperation = operation;
      if (operation) {
        const matches = operation.match(regex) || [];
        matches.forEach(match => {
          if (!validResults.includes(match)) {
            newOperation = newOperation.replace(match, validResults[0] || '');
          }
        });
      }
      return newOperation;
    },
    updateConditionValue(tableIndex, condIndex) {
      const condition = this.localConfig.tables[tableIndex].conditions[condIndex];
      if (condition.operator === 'BETWEEN') {
        condition.value = { min: '', max: '' };
      } else if (condition.operator === 'EXISTS' || condition.operator === 'NOT EXISTS') {
        condition.value = '';
      } else if (condition.operator === 'IN' || condition.operator === 'NOT IN') {
        condition.value = '';
      } else {
        condition.value = '';
      }
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    updateFinalConditionValue() {
      if (this.localConfig.finalCondition.operator === 'BETWEEN') {
        this.localConfig.finalCondition.value = { min: '', max: '' };
      } else if (this.localConfig.finalCondition.operator === 'EXISTS' || this.localConfig.finalCondition.operator === 'NOT EXISTS') {
        this.localConfig.finalCondition.value = '';
      } else if (this.localConfig.finalCondition.operator === 'IN' || this.localConfig.finalCondition.operator === 'NOT IN') {
        this.localConfig.finalCondition.value = '';
      } else {
        this.localConfig.finalCondition.value = '';
      }
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    emitChange() {
      const updatedConfig = JSON.parse(JSON.stringify(this.localConfig));
      updatedConfig.tables = updatedConfig.tables.map(tableConfig => ({
        ...tableConfig,
        conditions: tableConfig.conditions.map(condition => ({
          ...condition,
          value: condition.operator === 'BETWEEN'
            ? {
                min: condition.value.min != null ? String(condition.value.min) : '',
                max: condition.value.max != null ? String(condition.value.max) : '',
              }
            : condition.operator === 'IN' || condition.operator === 'NOT IN'
            ? typeof condition.value === 'string' ? condition.value.split(',').map(v => v.trim()).filter(v => v) : condition.value
            : condition.value != null ? String(condition.value) : '',
        })),
      }));
      if (updatedConfig.finalCondition.operator === 'BETWEEN') {
        updatedConfig.finalCondition.value = {
          min: updatedConfig.finalCondition.value.min != null ? String(updatedConfig.finalCondition.value.min) : '',
          max: updatedConfig.finalCondition.value.max != null ? String(updatedConfig.finalCondition.value.max) : '',
        };
      } else if (updatedConfig.finalCondition.operator === 'IN' || updatedConfig.finalCondition.operator === 'NOT IN') {
        updatedConfig.finalCondition.value = typeof updatedConfig.finalCondition.value === 'string'
          ? updatedConfig.finalCondition.value.split(',').map(v => v.trim()).filter(v => v)
          : updatedConfig.finalCondition.value;
      } else if (updatedConfig.finalCondition.operator !== 'EXISTS' && updatedConfig.finalCondition.operator !== 'NOT EXISTS') {
        updatedConfig.finalCondition.value = updatedConfig.finalCondition.value != null
          ? String(updatedConfig.finalCondition.value)
          : '';
      }
      this.$emit('update:modelValue', updatedConfig);
    },
  },
};
</script>

<style scoped>
.advanced-rule-config {
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 5px;
}
.table-group,
.condition-group {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}
</style>