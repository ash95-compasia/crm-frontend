<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 transition-colors duration-300">
    <div class="flex items-center mb-6">
      <i class="ri-account-box-line text-gray-400 dark:text-gray-500 mr-2 text-xl"></i>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">CONTACT INFORMATION</h2>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name as per NRIC -->
        <div>
          <label for="name_as_per_nric" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Customer Name (as per IC)
          </label>
          <input
            v-model="local.name_as_per_nric"
            type="text"
            id="name_as_per_nric"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
            required
          />
        </div>

        <!-- NRIC (Readonly) -->
        <div>
          <label for="nric" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IC Number</label>
          <input
            :value="local.nric"
            type="text"
            id="nric"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 cursor-not-allowed transition-colors duration-200"
            readonly
          />
        </div>

        <!-- NRIC View Links -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NRIC View Links</label>
          <div class="flex flex-wrap gap-4 text-sm">
            <a
              href="javascript:;"
              @click="$emit('view-nric', 'front')"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors duration-200"
            >
              Click Here to View NRIC (Front)
            </a>
            <span class="text-gray-400 dark:text-gray-600">|</span>
            <a
              href="javascript:;"
              @click="$emit('view-nric', 'back')"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors duration-200"
            >
              Click Here to View NRIC (Back)
            </a>
          </div>
        </div>

        <!-- Mobile Number -->
        <div>
          <label for="phone_number" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mobile Number</label>
          <input
            v-model="local.phone_number"
            type="text"
            id="phone_number"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
            required
          />
        </div>

        <!-- Personal Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input
            v-model="local.email"
            type="email"
            id="email"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
            required
          />
        </div>

        <!-- Corporate Email -->
        <div>
          <label for="emailAddresscorporate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Corporate Email Address
          </label>
          <input
            v-model="local.emailAddresscorporate"
            type="email"
            id="emailAddresscorporate"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            placeholder="Optional"
          />
        </div>

        <!-- Gender -->
        <div>
          <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
          <select
            v-model="local.gender"
            id="gender"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
          >
            <option value="" class="text-gray-500 dark:text-gray-400">Select Gender</option>
            <option value="Male" class="text-gray-900 dark:text-gray-300">Male</option>
            <option value="Female" class="text-gray-900 dark:text-gray-300">Female</option>
            <option value="Other" class="text-gray-900 dark:text-gray-300">Other</option>
          </select>
        </div>

        <!-- Date of Birth -->
        <div>
          <label for="dob" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
          <input
            v-model="local.dob"
            type="date"
            id="dob"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 transition-colors duration-200"
          />
        </div>

        <!-- Race -->
        <div>
          <label for="race_cus" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Race</label>
          <input
            v-model="local.race_cus"
            type="text"
            id="race_cus"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            placeholder="e.g. Malay, Chinese, Indian, Others"
          />
        </div>
      </div>

      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200 shadow-sm"
        >
          Update Contact Information
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactInformation',
  props: {
    customer: {
      type: Object,
      required: true
    }
  },
  emits: ['update-information', 'view-nric'],
  data() {
    return {
      local: {
        name_as_per_nric: this.customer.name_as_per_nric || '',
        nric: this.customer.nric || '',
        phone_number: this.customer.phone_number || '',
        email: this.customer.email || '',
        emailAddresscorporate: this.customer.emailAddresscorporate || '',
        gender: this.customer.gender || '',
        dob: this.customer.dob || '',
        race_cus: this.customer.race_cus || ''
      }
    }
  },
  watch: {
    customer: {
      handler(newVal) {
        this.local = {
          name_as_per_nric: newVal.name_as_per_nric || '',
          nric: newVal.nric || '',
          phone_number: newVal.phone_number || '',
          email: newVal.email || '',
          emailAddresscorporate: newVal.emailAddresscorporate || '',
          gender: newVal.gender || '',
          dob: newVal.dob || '',
          race_cus: newVal.race_cus || ''
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submitForm() {
      const payload = {
        name_as_per_nric: this.local.name_as_per_nric,
        phone_number: this.local.phone_number,
        email: this.local.email,
        emailAddresscorporate: this.local.emailAddresscorporate,
        gender: this.local.gender,
        dob: this.local.dob,
        race_cus: this.local.race_cus
      }

      this.$emit('update-information', payload)
    }
  }
}
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Custom focus styles for better accessibility */
input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark input:focus, .dark select:focus {
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}
</style>