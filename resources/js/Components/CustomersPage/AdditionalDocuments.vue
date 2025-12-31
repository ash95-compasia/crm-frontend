<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
    <div class="flex items-center mb-6">
      <i class="ri-briefcase-line text-gray-400 dark:text-gray-300 mr-2"></i>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">ADDITIONAL DOCUMENTS</h2>
    </div>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="n in 5" :key="n">
          <label :for="`uploadAdditonalDoc${n}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Documents Upload {{ n }} <span class="text-red-500 dark:text-red-400">*</span></label>
          <input 
            :ref="`uploadAdditonalDoc${n}`" 
            @change="handleUpload(n, $event)" 
            type="file" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibid file:bg-green-50 dark:file:bg-gray-600 file:text-green-700 dark:file:text-green-300 hover:file:bg-green-100 dark:hover:file:bg-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            :id="`uploadAdditonalDoc${n}`" 
          />
          <div v-if="getAdditionalDoc(n)" class="mt-2">
            <label class="text-sm text-gray-600 dark:text-gray-400">Additional Document {{ n }}:</label>
            <a 
              :href="cloudFrontUrl + getAdditionalDoc(n)" 
              target="_blank" 
              rel="noreferrer noopener" 
              class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm"
            >
              Click Here to View Additional Doc
            </a>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button @click="handleSubmit" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">Save</button>
        <span v-if="uploadStat === 'success'" class="ml-4 text-green-600 dark:text-green-400">{{ sucessUpload }}</span>
        <span v-else-if="sucessUpload" class="ml-4 text-red-600 dark:text-red-400">{{ sucessUpload }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalDocuments',
  props: {
    additionalDoc: String,
    additionalDoc1: String,
    additionalDoc2: String,
    additionalDoc3: String,
    additionalDoc4: String,
    cloudFrontUrl: String,
    custId: String,
    uploadStat: String,
    sucessUpload: String
  },
  data() {
    return {
      uploadAdditonalDoc_: null,
      uploadAdditonalDoc1_: null,
      uploadAdditonalDoc2_: null,
      uploadAdditonalDoc3_: null,
      uploadAdditonalDoc4_: null
    };
  },
  methods: {
    handleUpload(n, event) {
      const file = event.target.files[0];
      this.$emit('upload-additional-doc', n, file);
    },
    getAdditionalDoc(n) {
      const docs = [this.additionalDoc, this.additionalDoc1, this.additionalDoc2, this.additionalDoc3, this.additionalDoc4];
      return docs[n - 1] || null;
    },
    handleSubmit() {
      const formData = new FormData();
      formData.append('uploadAdditonalDoc', this.uploadAdditonalDoc_ || '');
      formData.append('uploadAdditonalDoc1', this.uploadAdditonalDoc1_ || '');
      formData.append('uploadAdditonalDoc2', this.uploadAdditonalDoc2_ || '');
      formData.append('uploadAdditonalDoc3', this.uploadAdditonalDoc3_ || '');
      formData.append('uploadAdditonalDoc4', this.uploadAdditonalDoc4_ || '');
      this.$emit('submit-additional-doc', formData);
    }
  },
  emits: ['upload-additional-doc', 'submit-additional-doc']
};
</script>