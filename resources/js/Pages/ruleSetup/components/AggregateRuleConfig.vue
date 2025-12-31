<template>
  <div class="aggregate-rule-config p-4 border rounded-lg">
    <h5 class="text-base font-semibold mb-3">Aggregate Rule Configuration</h5>
    <!-- Table Selection -->
    <div class="mb-4">
      <label class="block font-medium mb-1">Select Table</label>
      <select
        v-model="localConfig.table"
        @change="resetConfig"
        class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="null" disabled>-- Select a Table --</option>
        <option v-for="table in tables" :key="table.name" :value="table.name">
          {{ table.name }}
        </option>
      </select>
    </div>
    <!-- Aggregate Function Selection -->
    <div v-if="localConfig.table" class="mb-4">
      <label class="block font-medium mb-1">Aggregate Function</label>
      <select
        v-model="localConfig.aggregate"
        @change="resetAggregateConfig"
        class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="null" disabled>-- Select an Aggregate Function --</option>
        <option v-for="option in aggregateOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <!-- Aggregate Column Selection (Hidden for COUNT) -->
    <div v-if="localConfig.table && localConfig.aggregate && localConfig.aggregate !== 'COUNT'" class="mb-4">
      <label class="block font-medium mb-1">Select Aggregate Column</label>
      <select
        v-model="localConfig.aggregateColumn"
        @change="resetColumnConfig"
        class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option :value="null" disabled>-- Select a Column --</option>
        <option v-for="column in getColumns(localConfig.table)" :key="column" :value="column">
          {{ column }}
        </option>
      </select>
    </div>
    <!-- Enable WHERE Clause Toggle -->
    <div v-if="localConfig.aggregate" class="mb-4">
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="localConfig.enableWhereClause"
          @change="toggleWhereClause"
          class="mr-2"
        />
        Apply Column Filter (WHERE Clause)
      </label>
    </div>
    <!-- WHERE Clause Conditions -->
    <div v-if="localConfig.enableWhereClause && localConfig.aggregate" class="condition-group mb-3 p-3 border rounded-lg bg-white">
      <h6 class="text-sm font-medium mb-2">Column Filters (WHERE Clause)</h6>
      <div v-for="(condition, index) in localConfig.whereConditions" :key="index" class="mb-3">
        <div class="flex items-center gap-2">
          <!-- Column Selection -->
          <div class="flex-1">
            <label class="block font-medium mb-1">Condition {{ index + 1 }}</label>
            <select
              v-model="condition.column"
              @change="updateConditionValue(index)"
              class="w-[200px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Select column for filter"
            >
              <option :value="null" disabled>-- Select Column --</option>
              <option v-for="column in getColumns(localConfig.table)" :key="column" :value="column">
                {{ column }}
              </option>
            </select>
          </div>
          <!-- Operator Selection -->
          <div>
            <label class="block font-medium mb-1">Operator</label>
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
          <!-- Value Input -->
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
            :title="condition.operator === 'IN' || condition.operator === 'NOT IN' ? 'Enter comma-separated values' : 'Enter a numeric value'"
            @input="emitChange"
          />
          <!-- Remove Condition Button -->
          <button
            class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            @click="removeCondition(index)"
            :disabled="localConfig.whereConditions.length === 1"
            title="Remove condition"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Add Condition Button -->
      <button
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        @click="addCondition"
        title="Add new condition"
      >
        <svg class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Condition
      </button>
    </div>
    <!-- HAVING Clause Condition -->
    <div v-if="localConfig.aggregate" class="condition-group mb-3 p-3 border rounded-lg bg-white">
      <h6 class="text-sm font-medium mb-2">Aggregate Result Filter (HAVING Clause)</h6>
      <div class="flex items-center gap-2">
        <div>
          <label class="block font-medium mb-1">Select Condition</label>
          <select
            v-model="localConfig.havingCondition.operator"
            @change="updateHavingConditionValue"
            class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Select comparison operator for aggregate result"
          >
            <option v-for="option in operatorOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-if="localConfig.havingCondition.operator === 'BETWEEN'" class="flex gap-2">
          <input
            v-model="localConfig.havingCondition.value.min"
            placeholder="Min value"
            type="text"
            pattern="[0-9]*\.?[0-9]+"
            class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Enter minimum numeric value for aggregate result"
            @input="emitChange"
          />
          <input
            v-model="localConfig.havingCondition.value.max"
            placeholder="Max value"
            type="text"
            pattern="[0-9]*\.?[0-9]+"
            class="w-[150px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Enter maximum numeric value for aggregate result"
            @input="emitChange"
          />
        </div>
        <input
          v-else-if="localConfig.havingCondition.operator !== 'EXISTS' && localConfig.havingCondition.operator !== 'NOT EXISTS'"
          v-model="localConfig.havingCondition.value"
          :placeholder="localConfig.havingCondition.operator === 'IN' || localConfig.havingCondition.operator === 'NOT IN' ? 'Enter values (comma-separated)' : 'Enter threshold'"
          type="text"
          class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :title="localConfig.havingCondition.operator === 'IN' || localConfig.havingCondition.operator === 'NOT IN' ? 'Enter comma-separated values' : 'Enter a numeric threshold value for aggregate result'"
          @input="emitChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AggregateRuleConfig',
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
      if (!this.localConfig) {
        this.localConfig = {
          table: null,
          aggregateColumn: null,
          aggregate: null,
          enableWhereClause: false,
          whereConditions: [],
          havingCondition: { operator: '=', value: '' },
        };
        this.$emit('update:modelValue', { ...this.localConfig });
      }
      if (this.localConfig.aggregate === 'COUNT') {
        this.localConfig.aggregateColumn = '*';
      }
    },
    resetConfig() {
      this.localConfig = {
        table: this.localConfig.table,
        aggregateColumn: null,
        aggregate: null,
        enableWhereClause: false,
        whereConditions: [],
        havingCondition: { operator: '=', value: '' },
      };
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    resetAggregateConfig() {
      this.localConfig.aggregateColumn = this.localConfig.aggregate === 'COUNT' ? '*' : null;
      this.localConfig.enableWhereClause = false;
      this.localConfig.whereConditions = [];
      this.localConfig.havingCondition = { operator: '=', value: '' };
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    resetColumnConfig() {
      this.localConfig.whereConditions = [];
      this.localConfig.havingCondition = { operator: '=', value: '' };
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    toggleWhereClause() {
      if (this.localConfig.enableWhereClause) {
        this.localConfig.whereConditions = [{ column: null, operator: '=', value: '' }];
      } else {
        this.localConfig.whereConditions = [];
      }
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    addCondition() {
      this.localConfig.whereConditions.push({ column: null, operator: '=', value: '' });
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    removeCondition(index) {
      if (this.localConfig.whereConditions.length > 1) {
        this.localConfig.whereConditions.splice(index, 1);
        this.$emit('update:modelValue', { ...this.localConfig });
      }
    },
    updateConditionValue(index) {
      const condition = this.localConfig.whereConditions[index];
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
    updateHavingConditionValue() {
      if (this.localConfig.havingCondition.operator === 'BETWEEN') {
        this.localConfig.havingCondition.value = { min: '', max: '' };
      } else if (this.localConfig.havingCondition.operator === 'EXISTS' || this.localConfig.havingCondition.operator === 'NOT EXISTS') {
        this.localConfig.havingCondition.value = '';
      } else if (this.localConfig.havingCondition.operator === 'IN' || this.localConfig.havingCondition.operator === 'NOT IN') {
        this.localConfig.havingCondition.value = '';
      } else {
        this.localConfig.havingCondition.value = '';
      }
      this.$emit('update:modelValue', { ...this.localConfig });
    },
    emitChange() {
      const updatedConfig = { ...this.localConfig };
      if (updatedConfig.havingCondition.operator !== 'BETWEEN' && updatedConfig.havingCondition.operator !== 'IN' && updatedConfig.havingCondition.operator !== 'NOT IN') {
        updatedConfig.havingCondition.value = updatedConfig.havingCondition.value != null 
          ? String(updatedConfig.havingCondition.value) 
          : '';
      } else if (updatedConfig.havingCondition.operator === 'IN' || updatedConfig.havingCondition.operator === 'NOT IN') {
        updatedConfig.havingCondition.value = updatedConfig.havingCondition.value.split(',').map(v => v.trim()).filter(v => v);
      }
      updatedConfig.whereConditions = updatedConfig.whereConditions.map(condition => ({
        ...condition,
        value: condition.operator === 'BETWEEN'
          ? {
              min: condition.value.min != null ? String(condition.value.min) : '',
              max: condition.value.max != null ? String(condition.value.max) : '',
            }
          : condition.operator === 'IN' || condition.operator === 'NOT IN'
          ? condition.value.split(',').map(v => v.trim()).filter(v => v)
          : condition.value != null ? String(condition.value) : '',
      }));
      this.$emit('update:modelValue', updatedConfig);
    },
  },
};
</script>

<style scoped>
.aggregate-rule-config {
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