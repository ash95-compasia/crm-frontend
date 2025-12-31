<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 transition-colors duration-300">
    <div class="flex items-center mb-6">
      <i class="ri-contacts-book-line text-gray-400 dark:text-gray-500 mr-2"></i>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">REFERENCES INFORMATION</h2>
    </div>
    
    <globalTable
      :data="processedReferencesList"
      :columns="REFERENCES_TABLE_COLUMNS"
      :filters="REFERENCES_TABLE_FILTERS"
      :default-sort="{ key: 'name', order: 'asc' }"
      storage-key="customer-references-table"
      class="dark:bg-gray-800"
    >
      <template #column-id="{ index }">
        <span class="text-gray-900 dark:text-gray-300">{{ index + 1 }}</span>
      </template>
      <template #column-action="{ row }">
        <button 
          class="px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded-md text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200" 
          @click="editReference(row)"
        >
          Edit
        </button>
      </template>
    </globalTable>
    
    <!-- Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Reference</h3>
          <button 
            @click="closeModal" 
            class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <form @submit.prevent="updateReference">
          <div class="space-y-4">
            <div>
              <label for="ref_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="localRefName" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
                id="ref_name" 
                required 
              />
            </div>
            <div>
              <label for="relationship" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Relationship <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="localRelationship" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
                id="relationship" 
                required
              >
                <option value="" class="text-gray-500 dark:text-gray-400">Please Select Relationship</option>
                <option 
                  v-for="item in listRelation" 
                  :key="item.id" 
                  :value="item.id"
                  class="text-gray-900 dark:text-gray-300"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="ref_number" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="localRefNumber" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
                id="ref_number" 
                maxlength="10" 
                minlength="9" 
                required 
              />
            </div>
            <div class="flex justify-end space-x-2 pt-2">
              <button 
                type="button" 
                @click="closeModal" 
                class="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import globalTable from '@/Components/globalTable.vue';
import { REFERENCES_TABLE_COLUMNS, REFERENCES_TABLE_FILTERS } from '@/Constants/tableColumns.js';

export default {
  name: 'ReferencesInformation',
  components: { globalTable },
  props: {
    referencesList: {
      type: Array,
      default: () => []
    },
    listRelation: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showModal: false,
      editingReference: null,
      localRefName: '',
      localRefNumber: '',
      localRelationship: '',
      REFERENCES_TABLE_FILTERS,
      REFERENCES_TABLE_COLUMNS
    };
  },
  computed: {
    // Process the references list to ensure proper data structure
    processedReferencesList() {
      if (!Array.isArray(this.referencesList)) {
        console.warn('referencesList is not an array:', this.referencesList);
        return []; // Return empty array to prevent errors downstream
      }
      return this.referencesList.map(ref => {
        const relation = this.listRelation.find(rel => rel.id === ref.relation_id);
        return {
          ...ref,
          id: ref.id || ref.temp_id,
          name: ref.name || '',
          contact_number: ref.contact_number || '',
          relation_name: relation ? relation.name : (ref.relation_name || ''),
          created_at: ref.created_at || ''
        };
      });
    }
  },
  methods: {
    editReference(row) {
      this.editingReference = row;
      this.localRefName = row.name;
      this.localRefNumber = row.contact_number;
      this.localRelationship = row.relation_id;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.localRefName = '';
      this.localRefNumber = '';
      this.localRelationship = '';
      this.editingReference = null;
    },
    updateReference() {
      if (!this.editingReference) return;
      
      const formData = {
        id: this.editingReference.id,
        name: this.localRefName,
        contact_number: this.localRefNumber,
        relation_id: this.localRelationship
      };
      
      console.log("Updating reference:", formData);
      this.$emit('ref-update', formData);
      this.closeModal();
    }
  },
  emits: ['ref-update']
};
</script>

<style scoped>
/* Smooth transitions for dark mode */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Modal overlay transition */
.fixed {
  transition: background-color 0.3s ease;
}

/* Better focus styles */
input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark input:focus, .dark select:focus {
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

/* Table row hover effect */
tbody tr {
  transition: background-color 0.15s ease-in-out;
}
</style>