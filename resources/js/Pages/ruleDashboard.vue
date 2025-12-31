<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <!-- Main Content -->
        <div class="w-full p-4 lg:p-6">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                            <!-- Breadcrumb -->
                            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <router-link to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Dashboard
                                </router-link>
                                <span class="text-gray-400 dark:text-gray-600">/</span>
                                <span class="text-gray-900 dark:text-gray-300 font-medium">Overview</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <!-- Date Range Selector -->
                        <div class="relative">
                            <select 
                                v-model="dateRange"
                                @change="fetchDashboardData"
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="today">Today</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="this_week">This Week</option>
                                <option value="last_week">Last Week</option>
                                <option value="this_month">This Month</option>
                                <option value="last_month">Last Month</option>
                                <option value="this_year">This Year</option>
                                <option value="custom">Custom Range</option>
                            </select>
                        </div>
                        <!-- Refresh Button -->
                        <button 
                            @click="fetchDashboardData"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            :disabled="loading"
                        >
                            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Summary Statistics -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <!-- Total Customers -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Customers</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatNumber(dashboardData.customers.total) }}</p>
                                <div class="flex items-center mt-2">
                                    <span :class="dashboardData.customers.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" class="text-sm font-medium">
                                        {{ dashboardData.customers.change >= 0 ? '+' : '' }}{{ dashboardData.customers.change }}%
                                    </span>
                                    <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">vs previous period</span>
                                </div>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.66 0-1.293-.103-1.879-.294M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Total Orders -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Orders</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatNumber(dashboardData.orders.total) }}</p>
                                <div class="flex items-center mt-2">
                                    <span :class="dashboardData.orders.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" class="text-sm font-medium">
                                        {{ dashboardData.orders.change >= 0 ? '+' : '' }}{{ dashboardData.orders.change }}%
                                    </span>
                                    <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">vs previous period</span>
                                </div>
                            </div>
                            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Total Contracts -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Active Contracts</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatNumber(dashboardData.contracts.total) }}</p>
                                <div class="flex items-center mt-2">
                                    <span :class="dashboardData.contracts.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" class="text-sm font-medium">
                                        {{ dashboardData.contracts.change >= 0 ? '+' : '' }}{{ dashboardData.contracts.change }}%
                                    </span>
                                    <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">vs previous period</span>
                                </div>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Total Revenue -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">${{ formatCurrency(dashboardData.revenue.total) }}</p>
                                <div class="flex items-center mt-2">
                                    <span :class="dashboardData.revenue.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" class="text-sm font-medium">
                                        {{ dashboardData.revenue.change >= 0 ? '+' : '' }}{{ dashboardData.revenue.change }}%
                                    </span>
                                    <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">vs previous period</span>
                                </div>
                            </div>
                            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts and Detailed Metrics -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- Revenue Chart -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
                            <div class="flex space-x-2">
                                <button 
                                    v-for="period in ['week', 'month', 'year']"
                                    :key="period"
                                    @click="changeRevenuePeriod(period)"
                                    :class="[
                                        'px-3 py-1 rounded-lg text-sm',
                                        revenuePeriod === period 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ period.charAt(0).toUpperCase() + period.slice(1) }}
                                </button>
                            </div>
                        </div>
                        <div class="h-64">
                            <!-- Revenue Chart will be implemented with Chart.js -->
                            <div class="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                                <div class="text-center">
                                    <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    <p>Revenue chart will be displayed here</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Order Status Distribution -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Order Status Distribution</h3>
                        <div class="space-y-4">
                            <div v-for="status in orderStatuses" :key="status.id" class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 rounded-full mr-3" :class="getStatusColor(status.color)"></div>
                                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ status.name }}</span>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ status.count }}</span>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ status.percentage }}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity Section -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Recent Customers -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm lg:col-span-2">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Customers</h3>
                            <router-link to="/customers" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                                View All
                            </router-link>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                        <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">NRIC</th>
                                        <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                                        <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Orders</th>
                                        <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr v-for="customer in recentCustomers" :key="customer.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td class="py-3 px-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                    <span class="text-blue-600 dark:text-blue-400 text-xs font-medium">
                                                        {{ getInitials(customer.name) }}
                                                    </span>
                                                </div>
                                                <div class="ml-3">
                                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.name }}</p>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ customer.email }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-3 px-4">
                                            <span class="text-sm text-gray-900 dark:text-gray-300">{{ customer.nric || 'N/A' }}</span>
                                        </td>
                                        <td class="py-3 px-4">
                                            <span class="text-sm text-gray-900 dark:text-gray-300">{{ customer.phone_number || 'N/A' }}</span>
                                        </td>
                                        <td class="py-3 px-4">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                {{ customer.orders_count || 0 }}
                                            </span>
                                        </td>
                                        <td class="py-3 px-4">
                                            <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(customer.created_at) }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="space-y-6">
                        <!-- Pending Actions -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Actions</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                                    <div class="flex items-center">
                                        <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <div>
                                            <p class="text-sm font-medium text-gray-900 dark:text-white">Pending Orders</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">Require verification</p>
                                        </div>
                                    </div>
                                    <span class="text-lg font-bold text-yellow-600 dark:text-yellow-400">{{ pendingOrders }}</span>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                                    <div class="flex items-center">
                                        <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <div>
                                            <p class="text-sm font-medium text-gray-900 dark:text-white">Overdue Invoices</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">Need follow-up</p>
                                        </div>
                                    </div>
                                    <span class="text-lg font-bold text-red-600 dark:text-red-400">{{ overdueInvoices }}</span>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                                    <div class="flex items-center">
                                        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <div>
                                            <p class="text-sm font-medium text-gray-900 dark:text-white">Expiring Contracts</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">Next 30 days</p>
                                        </div>
                                    </div>
                                    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ expiringContracts }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Revenue Breakdown -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Breakdown</h3>
                            <div class="space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">Subscription Fees</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">${{ formatCurrency(revenueBreakdown.subscription) }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">Program Fees</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">${{ formatCurrency(revenueBreakdown.program) }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">Late Charges</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">${{ formatCurrency(revenueBreakdown.lateCharges) }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">GST</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">${{ formatCurrency(revenueBreakdown.gst) }}</span>
                                </div>
                                <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-gray-900 dark:text-white">Total Revenue</span>
                                        <span class="text-sm font-bold text-blue-600 dark:text-blue-400">${{ formatCurrency(revenueBreakdown.total) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Performance Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <!-- Conversion Rate -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Conversion Rate</h3>
                            <span class="text-2xl font-bold text-green-600 dark:text-green-400">{{ conversionRate }}%</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Orders to Contracts</p>
                        <div class="mt-4 flex items-center">
                            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div class="bg-green-600 dark:bg-green-500 h-2 rounded-full" :style="{ width: conversionRate + '%' }"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Average Order Value -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Avg Order Value</h3>
                            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">${{ formatCurrency(averageOrderValue) }}</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Monthly average</p>
                        <div class="mt-4">
                            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <svg class="w-4 h-4 mr-1" :class="avgOrderChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="avgOrderChange >= 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                                <span :class="avgOrderChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                                    {{ avgOrderChange >= 0 ? '+' : '' }}{{ avgOrderChange }}%
                                </span>
                                <span class="ml-2">vs last month</span>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Retention -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Retention Rate</h3>
                            <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ retentionRate }}%</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Active contracts renewal</p>
                        <div class="mt-4">
                            <div class="flex items-center">
                                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div class="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" :style="{ width: retentionRate + '%' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- System Alerts -->
                <div v-if="systemAlerts.length > 0" class="mb-8">
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Alerts</h3>
                        <div class="space-y-3">
                            <div v-for="alert in systemAlerts" :key="alert.id" :class="[
                                'p-4 rounded-lg border',
                                alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800' :
                                alert.type === 'error' ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' :
                                'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                            ]">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <svg :class="[
                                            'w-5 h-5 mr-3',
                                            alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                            alert.type === 'error' ? 'text-red-600 dark:text-red-400' :
                                            'text-blue-600 dark:text-blue-400'
                                        ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path v-if="alert.type === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.986-.833-2.756 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                            <path v-else-if="alert.type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <div>
                                            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ alert.title }}</p>
                                            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ alert.description }}</p>
                                        </div>
                                    </div>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTimeAgo(alert.timestamp) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useApi } from '@/router/useApi';

const { getAxiosConfig } = useApi();

// Reactive state
const loading = ref(false);
const dateRange = ref('this_month');
const revenuePeriod = ref('month');

// Dashboard data
const dashboardData = ref({
    customers: { total: 0, change: 0 },
    orders: { total: 0, change: 0 },
    contracts: { total: 0, change: 0 },
    revenue: { total: 0, change: 0 }
});

const recentCustomers = ref([]);
const orderStatuses = ref([]);
const pendingOrders = ref(0);
const overdueInvoices = ref(0);
const expiringContracts = ref(0);
const revenueBreakdown = ref({
    subscription: 0,
    program: 0,
    lateCharges: 0,
    gst: 0,
    total: 0
});
const systemAlerts = ref([]);

// Performance metrics
const conversionRate = ref(0);
const averageOrderValue = ref(0);
const avgOrderChange = ref(0);
const retentionRate = ref(0);

// Methods
const fetchDashboardData = async () => {
    loading.value = true;
    try {
        // Fetch dashboard summary
        const summaryResponse = await axios.get('/api/dashboard/summary', {
            params: { period: dateRange.value },
            ...getAxiosConfig()
        });

        if (summaryResponse.data.success) {
            dashboardData.value = summaryResponse.data.data;
        }

        // Fetch recent customers
        const customersResponse = await axios.get('/api/dashboard/recent-customers', getAxiosConfig());
        if (customersResponse.data.success) {
            recentCustomers.value = customersResponse.data.data;
        }

        // Fetch order status distribution
        const orderStatusResponse = await axios.get('/api/dashboard/order-status', getAxiosConfig());
        if (orderStatusResponse.data.success) {
            orderStatuses.value = orderStatusResponse.data.data;
        }

        // Fetch pending actions
        const actionsResponse = await axios.get('/api/dashboard/pending-actions', getAxiosConfig());
        if (actionsResponse.data.success) {
            const actions = actionsResponse.data.data;
            pendingOrders.value = actions.pending_orders;
            overdueInvoices.value = actions.overdue_invoices;
            expiringContracts.value = actions.expiring_contracts;
        }

        // Fetch revenue breakdown
        const revenueResponse = await axios.get('/api/dashboard/revenue-breakdown', {
            params: { period: dateRange.value },
            ...getAxiosConfig()
        });
        if (revenueResponse.data.success) {
            revenueBreakdown.value = revenueResponse.data.data;
        }

        // Fetch performance metrics
        const metricsResponse = await axios.get('/api/dashboard/performance-metrics', getAxiosConfig());
        if (metricsResponse.data.success) {
            const metrics = metricsResponse.data.data;
            conversionRate.value = metrics.conversion_rate;
            averageOrderValue.value = metrics.average_order_value;
            avgOrderChange.value = metrics.avg_order_change;
            retentionRate.value = metrics.retention_rate;
        }

        // Fetch system alerts
        const alertsResponse = await axios.get('/api/dashboard/system-alerts', getAxiosConfig());
        if (alertsResponse.data.success) {
            systemAlerts.value = alertsResponse.data.data;
        }

    } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Fallback to mock data for demonstration
        setMockData();
    } finally {
        loading.value = false;
    }
};

// Mock data for demonstration
const setMockData = () => {
    dashboardData.value = {
        customers: { total: 1256, change: 12.5 },
        orders: { total: 892, change: 8.3 },
        contracts: { total: 745, change: 15.2 },
        revenue: { total: 456789.50, change: 18.7 }
    };

    recentCustomers.value = [
        { id: 1, name: 'John Doe', email: 'john@example.com', nric: '900101-01-1234', phone_number: '012-3456789', orders_count: 3, created_at: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', nric: '910202-02-5678', phone_number: '012-9876543', orders_count: 1, created_at: '2024-01-14' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', nric: '920303-03-9012', phone_number: '013-4567890', orders_count: 5, created_at: '2024-01-13' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', nric: '930404-04-3456', phone_number: '014-1234567', orders_count: 2, created_at: '2024-01-12' },
        { id: 5, name: 'Michael Brown', email: 'michael@example.com', nric: '940505-05-7890', phone_number: '015-7654321', orders_count: 4, created_at: '2024-01-11' }
    ];

    orderStatuses.value = [
        { id: 1, name: 'Pending', count: 45, percentage: 25, color: 'yellow' },
        { id: 2, name: 'Processing', count: 67, percentage: 37, color: 'blue' },
        { id: 3, name: 'Completed', count: 120, percentage: 67, color: 'green' },
        { id: 4, name: 'Cancelled', count: 8, percentage: 4, color: 'red' }
    ];

    pendingOrders.value = 45;
    overdueInvoices.value = 23;
    expiringContracts.value = 18;

    revenueBreakdown.value = {
        subscription: 345678.90,
        program: 56789.12,
        lateCharges: 2345.67,
        gst: 12345.67,
        total: 456789.50
    };

    conversionRate.value = 85;
    averageOrderValue.value = 512.45;
    avgOrderChange.value = 8.5;
    retentionRate.value = 92;

    systemAlerts.value = [
        { id: 1, type: 'warning', title: 'System Maintenance', description: 'Scheduled maintenance this weekend', timestamp: '2024-01-15T10:00:00' },
        { id: 2, type: 'error', title: 'Payment Gateway Issue', description: 'Temporary issues with payment processing', timestamp: '2024-01-15T09:30:00' },
        { id: 3, type: 'info', title: 'New Feature Available', description: 'Bulk invoice generation now available', timestamp: '2024-01-14T14:00:00' }
    ];
};

const changeRevenuePeriod = (period) => {
    revenuePeriod.value = period;
    // In a real app, this would fetch new chart data
};

const formatNumber = (num) => {
    if (!num) return '0';
    return num.toLocaleString();
};

const formatCurrency = (amount) => {
    if (!amount) return '0.00';
    return parseFloat(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(timestamp);
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const getStatusColor = (color) => {
    const colors = {
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        blue: 'bg-blue-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500'
    };
    return colors[color] || 'bg-gray-500';
};

// Lifecycle
onMounted(() => {
    fetchDashboardData();
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
    background: #374151;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
    background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}

/* Smooth transitions */
* {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Card hover effects */
.bg-white:hover, .bg-gray-800:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .bg-gray-800:hover {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
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

/* Table row hover */
tbody tr {
    transition: background-color 0.15s ease-in-out;
}

/* Progress bar animation */
@keyframes progress {
    from {
        width: 0;
    }
}

.bg-green-600, .bg-blue-500, .bg-purple-500 {
    animation: progress 1s ease-in-out;
}
</style>