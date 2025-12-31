<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
    <div class="flex items-center mb-6">
      <i class="ri-briefcase-line text-gray-400 dark:text-gray-300 mr-2"></i>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">EMPLOYMENT INFORMATION</h2>
    </div>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="employment_company_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
          <input v-model="localEmploymentCompanyName" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="employment_company_name" />
        </div>
        <div>
          <label for="employment_office_gneral_line" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Office General Line</label>
          <input v-model="localEmploymentOfficeGneralLine" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="employment_office_gneral_line" />
        </div>
        <div class="md:col-span-2">
          <label for="salary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Net Salary/Salary Range</label>
          <input v-model="localSalary" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="salary" />
        </div>
      </div>
      <div v-if="customerLoan === 'None'">
        <label for="uploadPayslip" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload your latest one month Payslip <span class="text-red-500 dark:text-red-400">*</span></label>
        <input type="file" ref="uploadPayslip" @change="$emit('upload-payslip-f', $event.target.files[0])" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 dark:file:bg-gray-600 file:text-green-700 dark:file:text-green-300 hover:file:bg-green-100 dark:hover:file:bg-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="uploadPayslip" />
        <div v-if="payslip" class="mt-2">
          <a :href="cloudFrontUrl + payslip" target="_blank" rel="noreferrer noopener" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm">Click Here to View Payslip</a>
        </div>
      </div>
      <div class="flex justify-end">
        <button @click="handleSave" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">Save</button>
        <span v-if="sucessEmplMsd" class="ml-4 text-green-600 dark:text-green-400">{{ sucessEmplMsd }}</span>
      </div>
      <!-- Bank Info -->
      <div v-if="bnkAcc" class="mt-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Bank Name</label>
          <select v-model="localBnkName" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" >
            <option v-for="item in listBank" :key="item.id" :value="item.id" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">{{ item.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bank Account Number</label>
          <input :value="bnkAcc" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
      </div>
      <!-- Upload View Links -->
      <div v-if="uploadPayslip1 || uploadPayslip2 || uploadPayslip3 || uploadBankstatemnt1 || uploadBankstatemnt2 || uploadBankstatemnt3" class="mt-6 space-y-2">
        <a v-if="uploadPayslip1" href="javascript:;" @click="$emit('view-upload', 'upload_payslip1')" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm block">View Payslip Upload 1</a>
        <a v-if="uploadPayslip2" href="javascript:;" @click="$emit('view-upload', 'upload_payslip2')" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm block">View Payslip Upload 2</a>
        <a v-if="uploadPayslip3" href="javascript:;" @click="$emit('view-upload', 'upload_payslip3')" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm block">View Payslip Upload 3</a>
        <a v-if="uploadBankstatemnt1" href="javascript:;" @click="$emit('view-upload', 'upload_bankstatemnt1')" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm block">View Bank Statement Upload 1</a>
        <a v-if="uploadBankstatemnt2" href="javascript:;" @click="$emit('view-upload', 'upload_bankstatemnt2')" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm block">View Bank Statement Upload 2</a>
        <a v-if="uploadBankstatemnt3" href="javascript:;" @click="$emit('view-upload', 'upload_bankstatemnt3')" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm block">View Bank Statement Upload 3</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmploymentInformation',
  props: {
    employmentCompanyName: String,
    employmentOfficeGneralLine: String,
    salary: String,
    customerLoan: String,
    payslip: String,
    bnkAcc: String,
    bnkName: String,
    listBank: Array,
    uploadPayslip1: String,
    uploadPayslip2: String,
    uploadPayslip3: String,
    uploadBankstatemnt1: String,
    uploadBankstatemnt2: String,
    uploadBankstatemnt3: String,
    cloudFrontUrl: String,
    custId: String,
    sucessEmplMsd: String
  },
  data() {
    return {
      localEmploymentCompanyName: this.employmentCompanyName || '',
      localEmploymentOfficeGneralLine: this.employmentOfficeGneralLine || '',
      localSalary: this.salary || '',
      localBnkName: this.bnkName || ''
    };
  },
  watch: {
    employmentCompanyName(val) { this.localEmploymentCompanyName = val; },
    employmentOfficeGneralLine(val) { this.localEmploymentOfficeGneralLine = val; },
    salary(val) { this.localSalary = val; },
    bnkName(val) { this.localBnkName = val; }
  },
  methods: {
    handleSave() {
      const formData = new FormData();
      formData.append('net_salary', this.localSalary);
      formData.append('employment_company_name', this.localEmploymentCompanyName);
      formData.append('employment_office_gneral_line', this.localEmploymentOfficeGneralLine);
      formData.append('loan', this.customerLoan);
      this.$emit('sallary-update', formData);
    }
  },
  emits: ['upload-payslip-f', 'sallary-update', 'view-upload']
};
</script>