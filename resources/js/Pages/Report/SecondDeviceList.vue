<template>
    <div class="min-h-screen bg-white text-gray-900">
        <!-- Sidebar Trigger -->
        <div
            v-if="isAuthenticated && !isAuthRoute"
            @mouseenter="openSidebar"
            class="fixed top-4 left-4 z-50 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all duration-200 cursor-pointer shadow-lg"
            title="Hover to open sidebar"
        >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </div>

        <!-- Sidebar -->
        <Sidebar :isVisible="showSidebar" :isOpen="showSidebar" @toggle="handleSidebarToggle" />

        <!-- Main Content -->
        <div class="w-full p-6 lg:p-8" :class="{ 'lg:ml-64': showSidebar }">
            <div class="max-w-7xl mx-auto">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <router-link to="/dashboard">
                            <img src="/images/compasia.png" alt="Compasia Logo" class="h-16 w-16 rounded-full object-cover logo-hover shadow-lg border border-gray-200" />
                        </router-link>
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">Second Device Eligibility</h1>
                            <p class="text-gray-600 mt-1">Monitor and manage second device eligibility results</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-600 text-sm">Total Records</div>
                        <div class="text-2xl font-bold text-green-600">{{ logs.length.toLocaleString() }}</div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Total Logs</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ logs.length.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Eligible</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ passedCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Not Eligible</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">{{ failedCount.toLocaleString() }}</p>
                            </div>
                            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Global Table Component -->
                <globalTable
                    :data="logs"
                    :columns="tableColumns"
                    :filters="tableFilters"
                    :default-sort="{ key: 'created_at', order: 'desc' }"
                    storage-key="second-device-eligibility-table"
                >
                    <!-- Custom NRIC Column -->
                    <template #column-entity_no="{ value, row }">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span class="text-green-600 font-medium">{{ getInitials(value) }}</span>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ value || 'N/A' }}</div>
                                <div v-if="row.customer" class="text-sm text-gray-500">{{ row.customer.name || 'Unknown Customer' }}</div>
                            </div>
                        </div>
                    </template>

                    <!-- Custom Result Column -->
                    <template #column-result="{ value }">
                        <span 
                            :class="[
                                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                                value 
                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                    : 'bg-red-100 text-red-800 border-red-200'
                            ]"
                        >
                            <span 
                                :class="[
                                    'w-2 h-2 rounded-full mr-2',
                                    value ? 'bg-green-500' : 'bg-red-500'
                                ]"
                            ></span>
                            {{ value ? 'Eligible' : 'Not Eligible' }}
                        </span>
                    </template>

                    <!-- Custom Created At Column -->
                    <template #column-created_at="{ value }">
                        {{ formatDate(value) }}
                    </template>

                    <!-- Custom Actions Column -->
                    <template #column-actions="{ row }">
                        <button 
                            @click="openDetails(row)" 
                            class="text-green-600 hover:text-green-800 transition-colors duration-200 flex items-center"
                        >
                            <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                        </button>
                    </template>
                </globalTable>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="selectedLog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeDetails">
            <div class="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" @click.stop>
                <!-- Modal Header -->
                <div class="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">Eligibility Details</h2>
                        <p class="text-gray-600 mt-1">NRIC: {{ selectedLog.entity_no || 'N/A' }}</p>
                    </div>
                    <button 
                        @click="closeDetails" 
                        class="text-gray-400 hover:text-gray-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                    >
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="flex-1 overflow-y-auto p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <!-- Left Column -->
                        <div class="lg:col-span-2 space-y-6">
                            <!-- Customer Info -->
                            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 class="text-lg font-medium text-gray-800 flex items-center">
                                        <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Customer Information
                                    </h3>
                                </div>
                                <div class="p-4">
                                    <div v-if="selectedLog.customer" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <div class="flex">
                                                <span class="text-sm font-medium text-gray-500 w-32">Name:</span>
                                                <span class="text-sm text-gray-900">{{ selectedLog.customer.name || 'N/A' }}</span>
                                            </div>
                                            <div class="flex">
                                                <span class="text-sm font-medium text-gray-500 w-32">NRIC/FIN:</span>
                                                <span class="text-sm text-gray-900">{{ selectedLog.customer.nric_fin || 'N/A' }}</span>
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <div class="flex">
                                                <span class="text-sm font-medium text-gray-500 w-32">Created:</span>
                                                <span class="text-sm text-gray-900">{{ formatDate(selectedLog.created_at) }}</span>
                                            </div>
                                            <div class="flex">
                                                <span class="text-sm font-medium text-gray-500 w-32">Result:</span>
                                                <span :class="[
                                                    'text-sm font-medium',
                                                    selectedLog.result ? 'text-green-600' : 'text-red-600'
                                                ]">
                                                    {{ selectedLog.result ? 'Eligible' : 'Not Eligible' }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="text-gray-500 text-center py-4">No customer information available.</div>
                                </div>
                            </div>

                            <!-- Eligibility Result -->
                            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 class="text-lg font-medium text-gray-800 flex items-center">
                                        <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Eligibility Result
                                    </h3>
                                </div>
                                <div class="p-4">
                                    <div v-if="selectedLog.data" class="space-y-4">
                                        <div class="flex items-center">
                                            <span class="text-sm font-medium text-gray-500 w-40">Eligible:</span>
                                            <span :class="[
                                                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
                                                selectedLog.data.is_eligible ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                                            ]">
                                                <span :class="[
                                                    'w-2 h-2 rounded-full mr-2',
                                                    selectedLog.data.is_eligible ? 'bg-green-500' : 'bg-red-500'
                                                ]"></span>
                                                {{ selectedLog.data.is_eligible ? 'Yes' : 'No' }}
                                            </span>
                                        </div>
                                        <div class="flex">
                                            <span class="text-sm font-medium text-gray-500 w-40">Reason:</span>
                                            <span class="text-sm text-gray-900 flex-1">{{ selectedLog.data.reason || 'N/A' }}</span>
                                        </div>
                                    </div>
                                    <div v-else class="text-gray-500 text-center py-4">No eligibility data available.</div>
                                </div>
                            </div>

                            <!-- Analysis Details -->
                            <div v-if="selectedLog.data && selectedLog.data.details" class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 class="text-lg font-medium text-gray-800 flex items-center">
                                        <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Analysis Details
                                    </h3>
                                </div>
                                <div class="p-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div v-if="selectedLog.data.details.dpd_list" class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">DPD List:</span>
                                            <div class="flex flex-wrap gap-1">
                                                <span 
                                                    v-for="(dpd, index) in selectedLog.data.details.dpd_list" 
                                                    :key="index"
                                                    class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                                                >
                                                    {{ dpd }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Spike Count:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.spike_count || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Spike Category:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.spike_category || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Spike Risk:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.spike_risk || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Recent DPD:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.recent_dpd || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Recent Category:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.recent_category || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Recent Risk:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.recent_risk || 'N/A' }}</span>
                                        </div>
                                        <div v-if="selectedLog.data.details.recent_months_analyzed" class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Recent Months Analyzed:</span>
                                            <div class="flex flex-wrap gap-1">
                                                <span 
                                                    v-for="(month, index) in selectedLog.data.details.recent_months_analyzed" 
                                                    :key="index"
                                                    class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                                                >
                                                    {{ month }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Eligibility Criteria:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.eligibility_criteria || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Rule 1 (DPD Spike Count):</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.rule_1_dpd_spike_count || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Rule 2 (Recency Delinquency):</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.data.details.rule_2_recency_delinquency || 'N/A' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="space-y-6">
                            <!-- Additional Analysis -->
                            <div v-if="selectedLog.analysis_details" class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 class="text-lg font-medium text-gray-800 flex items-center">
                                        <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Additional Analysis
                                    </h3>
                                </div>
                                <div class="p-4">
                                    <div class="space-y-4">
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Total Invoices:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.total_invoices || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Monthly Invoices Used:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.monthly_invoices_used || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Analysis Period:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.analysis_period || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">DPD Sequence Calculation:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.dpd_sequence_calculation || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Behavioural Analysis Applied:</span>
                                            <span :class="[
                                                'inline-flex items-center px-2 py-1 rounded text-xs font-medium border',
                                                selectedLog.analysis_details.behavioural_analysis_applied ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'
                                            ]">
                                                {{ selectedLog.analysis_details.behavioural_analysis_applied ? 'Yes' : 'No' }}
                                            </span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Suggested Cutoff Applied:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.suggested_cutoff_applied || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Rule 1 Description:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.rule_1 || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Rule 2 Description:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.rule_2 || 'N/A' }}</span>
                                        </div>
                                        <div class="space-y-2">
                                            <span class="text-sm font-medium text-gray-500">Risk Assessment Based On:</span>
                                            <span class="text-sm text-gray-900 block">{{ selectedLog.analysis_details.risk_assessment_based_on || 'N/A' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notifications -->
        <div 
            v-if="notification.message" 
            :class="[
                'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 z-50 border',
                notification.type === 'success' 
                    ? 'bg-green-50 text-green-800 border-green-200' 
                    : 'bg-red-50 text-red-800 border-red-200'
            ]"
        >
            <div class="flex items-center">
                <svg 
                    v-if="notification.type === 'success'" 
                    class="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg 
                    v-else 
                    class="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="text-sm">{{ notification.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/Components/sidebar.vue';
import globalTable from '@/Components/globalTable.vue';
import { useApi } from '../../router/useApi';

export default {
    components: {
        Sidebar,
        globalTable
    },
    data() {
        return {
            logs: [],
            selectedLog: null,
            showSidebar: false,
            loading: false,
            notification: { message: '', type: '' },
            tableColumns: [
                {
                    key: 'entity_no',
                    label: 'NRIC Number',
                    sortable: true
                },
                {
                    key: 'result',
                    label: 'Result',
                    sortable: true
                },
                {
                    key: 'created_at',
                    label: 'Created At',
                    sortable: true,
                    type: 'date'
                },
                {
                    key: 'actions',
                    label: 'Actions',
                    sortable: false
                }
            ],
            tableFilters: [
                {
                    key: 'entity_no',
                    label: 'NRIC Number',
                    type: 'text',
                    placeholder: 'Search by NRIC...'
                },
                {
                    key: 'result',
                    label: 'Eligibility Status',
                    type: 'select',
                    options: [
                        { value: 'true', label: 'Eligible' },
                        { value: 'false', label: 'Not Eligible' }
                    ]
                }
            ]
        };
    },
    computed: {
        isAuthenticated() {
            return !!localStorage.getItem('token');
        },
        isAuthRoute() {
            return ['/login', '/register'].includes(this.$route.path);
        },
        passedCount() {
            return this.logs.filter(log => log.result).length;
        },
        failedCount() {
            return this.logs.filter(log => !log.result).length;
        }
    },
    setup() {
        const { getAxiosConfig } = useApi();
        return {
            getAxiosConfig,
        };
    },
    methods: {
        openSidebar() {
            this.showSidebar = true;
        },
        handleSidebarToggle(isOpen) {
            this.showSidebar = isOpen;
        },
        async fetchLogs() {
            this.loading = true;
            try {
                const response = await axios.get('/api/logs/secondDevicelogs', this.getAxiosConfig());
                this.logs = response.data.map(log => {
                    try {
                        const parsed = JSON.parse(log.message);
                        return {
                            ...log,
                            ...parsed,
                            data: parsed.data,
                            customer: parsed.customer,
                            analysis_details: parsed.analysis_details,
                        };
                    } catch (e) {
                        console.error('Parse error for log', log.id, e);
                        return log;
                    }
                });
                this.notification = { message: 'Logs loaded successfully', type: 'success' };
            } catch (error) {
                console.error('Fetch logs error:', error.response?.data || error.message);
                this.notification = { message: 'Failed to fetch logs: ' + (error.response?.data?.message || error.message), type: 'error' };
            } finally {
                this.loading = false;
            }
        },
        openDetails(log) {
            this.selectedLog = { ...log };
            console.log('selectedLog', this.selectedLog);
        },
        closeDetails() {
            this.selectedLog = null;
        },
        formatDate(date) {
            return new Date(date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        },
        getInitials(nric) {
            if (!nric) return '?';
            return nric.substring(0, 2).toUpperCase();
        }
    },
    mounted() {
        this.fetchLogs();
        setInterval(() => {
            if (this.notification.message) {
                this.notification = { message: '', type: '' };
            }
        }, 5000);
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
}

.logo-hover {
    transition: transform 0.3s ease;
}

.logo-hover:hover {
    transform: scale(1.05);
}

/* Smooth transitions */
tbody tr {
    transition: background-color 0.15s ease-in-out;
}

/* Loading animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Professional spacing and alignment */
.container {
    max-width: 1200px;
}

/* Improved button hover effects */
button:not(:disabled) {
    transition: all 0.2s ease-in-out;
}

/* Better table styling */
table {
    font-size: 0.875rem;
}

th {
    font-weight: 600;
    letter-spacing: 0.025em;
}

/* Enhanced empty state */
.empty-state {
    opacity: 0.7;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>