<!-- components/role-management/RoleForm.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border p-5">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold">{{ editingRole ? 'Edit Role' : 'Create Role' }}</h2>
      <button v-if="editingRole" @click="$emit('cancel')" class="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
    </div>

    <form @submit.prevent="submit">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Role Name *</label>
          <input v-model="form.name" required placeholder="e.g., Administrator" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="form.description" rows="2" placeholder="Brief description..." class="w-full px-3 py-2 border rounded-lg"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Assign to Tenants</label>
          <select v-model="form.tenant_ids" multiple class="w-full px-3 py-2 border rounded-lg" style="height: 120px;">
            <option v-for="t in allTenants" :key="t.id" :value="t.id">{{ t.name }} ({{ t.tenant_code }})</option>
          </select>
          <p class="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700">
          {{ editingRole ? 'Update Role' : 'Create Role' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useApi } from '@/router/useApi'

const props = defineProps({
  editingRole: Object,
  allTenants: Array
})
const emit = defineEmits(['save', 'cancel'])

const { getAxiosConfig } = useApi()

const form = ref({
  name: '',
  description: '',
  tenant_ids: []
})

watch(() => props.editingRole, (role) => {
  if (role) {
    form.value = {
      name: role.name,
      description: role.description || '',
      tenant_ids: role.tenants?.map(t => t.id) || []
    }
  } else {
    form.value = { name: '', description: '', tenant_ids: [] }
  }
}, { immediate: true })

const submit = async () => {
  const payload = { ...form.value }
  try {
    if (props.editingRole) {
      await axios.put(`/api/roles/${props.editingRole.id}`, payload, getAxiosConfig())
    } else {
      await axios.post('/api/roles', payload, getAxiosConfig())
    }
    emit('save')
  } catch (err) {
    alert('Failed to save role')
  }
}
</script>