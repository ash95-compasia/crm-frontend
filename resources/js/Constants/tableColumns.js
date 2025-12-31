export const ORDERS_TABLE_COLUMNS = [
    {
        key: 'order_number',
        label: 'Order Number',
        sortable: true,
        searchable: true,
        width: '20%'
    },
    {
        key: 'customer',
        label: 'Customer',
        sortable: true,
        searchable: true,
        width: '20%'
    },
    {
        key: 'program',
        label: 'Program',
        sortable: true,
        searchable: true,
        width: '15%'
    },
    {
        key: 'program_fee',
        label: 'Program Fee',
        sortable: true,
		type: 'currency',
        width: '15%'
    },
    {
        key: 'monthly_subscription',
        label: 'Monthly Subscription',
        sortable: true,
        type: 'currency',
        width: '15%'
    },
    {
        key: 'tenure',
        label: 'Tenure',
        sortable: true,
        width: '10%'
    },
    {
        key: 'order_status_id',
        label: 'Status',
        sortable: true,
        width: '10%'
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        width: '10%'
    }
];

export const ORDERS_TABLE_FILTERS = [
    {
        key: 'order_number',
        label: 'Order Number',
        type: 'text',
        placeholder: 'Filter by order number...'
    },
    {
        key: 'customer_name',
        label: 'Customer Name',
        type: 'text',
        placeholder: 'Filter by customer name...'
    },
    {
        key: 'order_status_id',
        label: 'Status',
        type: 'select',
        options: [
            { value: '', label: 'All Statuses' },
            { value: '1', label: 'Active' },
            { value: '2', label: 'Pending' },
            { value: '3', label: 'Completed' },
            { value: '4', label: 'Cancelled' },
            { value: '5', label: 'Suspended' }
        ]
    },
    {
        key: 'program_id',
        label: 'Program ID',
        type: 'text',
        placeholder: 'Filter by program...'
    }
];

export const CUSTOMERS_TABLE_COLUMNS = [
	{ key: 'full_name', label: 'Customer Name', sortable: true},
	{ key: 'email', label: 'Email', sortable: true},
	{ key: 'total_outstanding', label: `Total Outstanding`, sortable: true, type: 'currency'},
	{ key: 'actions',label: 'Actions', sortable: false}
	];

export const CUSTOMERS_TABLE_FILTERS = [
	{ key: 'full_name', label: 'Customer Name', type: 'text', placeholder: 'Search by customer name...'},
	{ key: 'email', label: 'Email', type: 'text',placeholder: 'Search by email...'}
	];

export const CONTRACTS_TABLE_COLUMNS = [
	{ key: 'contract_number', label: 'Contract Number', sortable: true },
	{ key: 'contract_date', label: 'Start Date', sortable: true },
	{ key: 'contract_end_date', label: 'End Date', sortable: true },
	{ key: 'monthly_subscription', label: 'Monthly Subscription', sortable: true, type: 'currency' }
];

export const CONTRACTS_TABLE_FILTERS = [
	{ key: 'contract_number', label: 'Contract Number', type: 'text', placeholder: 'Search by contract number...' }
];

export const SOA_TABLE_COLUMNS = [
	{ key: 'transaction_date', label: 'Transaction Date', sortable: true },
	{ key: 'transaction', label: 'Transaction', sortable: true },
	{ key: 'description', label: 'Description', sortable: true },
	{ key: 'debit', label: 'Debit', sortable: true, type: 'currency' },
	{ key: 'credit', label: 'Credit', sortable: true, type: 'currency' },
	{ key: 'balance', label: 'Balance', sortable: true, type: 'currency' }
];

export const SOA_TABLE_FILTERS = [
	{ key: 'description', label: 'Description', type: 'text', placeholder: 'Search by description...' },
	{ key: 'transaction', label: 'Transaction Type', type: 'select', options: ['Invoice', 'Payment', 'Credit Note'] }
];

export const INVOICES_TABLE_COLUMNS = [
	{ key: 'invoice_no', label: 'Invoice No', sortable: true },
	{ key: 'issue_date', label: 'Issue Date', sortable: true },
	{ key: 'due_date', label: 'Due Date', sortable: true },
	{ key: 'total_amount', label: 'Total Amount', sortable: true, type: 'currency' },
	{ key: 'balance_amount', label: 'Balance Amount', sortable: true, type: 'currency' },
	{ key: 'status', label: 'Status', sortable: true }
];

export const INVOICES_TABLE_FILTERS = [
	{ key: 'invoice_no', label: 'Invoice No', type: 'text', placeholder: 'Search by invoice no...' },
	{ key: 'status', label: 'Status', type: 'select', options: ['pending', 'partial', 'paid'] }
];

export const PAYMENTS_TABLE_COLUMNS = [
	{ key: 'payment_id', label: 'Payment ID', sortable: true },
	{ key: 'payment_date', label: 'Payment Date', sortable: true },
	{ key: 'amount', label: 'Amount', sortable: true, type: 'currency' },
	{ key: 'payment_type', label: 'Payment Type', sortable: true },
	{ key: 'payment_status', label: 'Status', sortable: true }
];

export const PAYMENTS_TABLE_FILTERS = [
	{ key: 'payment_id', label: 'Payment ID', type: 'text', placeholder: 'Search by payment ID...' },
	{ key: 'payment_type', label: 'Payment Type', type: 'text', placeholder: 'Search by payment type...' }
];

export const LATE_CHARGES_TABLE_COLUMNS = [
	{ key: 'id', label: 'ID', sortable: true },
	{ key: 'description', label: 'Description', sortable: true },
	{ key: 'invoice_no', label: 'Related Invoice', sortable: true },
	{ key: 'generated_date', label: 'Generated Date', sortable: true },
	{ key: 'applied_date', label: 'Applied Date', sortable: true },
	{ key: 'charge_amount', label: 'Amount', sortable: true, type: 'currency' },
	{ key: 'status', label: 'Status', sortable: true }
];

export const LATE_CHARGES_TABLE_FILTERS = [
	{ key: 'description', label: 'Description', type: 'text', placeholder: 'Search by description...' },
	{ key: 'invoice_no', label: 'Invoice No', type: 'text', placeholder: 'Search by invoice no...' },
	{ key: 'status', label: 'Status', type: 'select', options: ['pending', 'applied'] }
];

export const CREDIT_NOTES_TABLE_COLUMNS = [
	{ key: 'credit_note_no', label: 'Credit Note No', sortable: true },
	{ key: 'issue_date', label: 'Issue Date', sortable: true },
	{ key: 'amount', label: 'Amount', sortable: true, type: 'currency' },
	{ key: 'description', label: 'Description', sortable: true }
];

export const CREDIT_NOTES_TABLE_FILTERS = [
	{ key: 'credit_note_no', label: 'Credit Note No', type: 'text', placeholder: 'Search by credit note no...' },
	{ key: 'description', label: 'Description', type: 'text', placeholder: 'Search by description...' }
];

export const AGING_TABLE_COLUMNS = [
	{ key: 'bucket', label: 'Aging Bucket', sortable: true },
	{ key: 'amount', label: 'Outstanding Amount', sortable: true, type: 'currency' }
];

export const AGING_TABLE_FILTERS = [];

export const REFERENCES_TABLE_COLUMNS = [
	{ key: 'id', label: '#', sortable: false },
	{ key: 'name', label: 'Name', sortable: true },
	{ key: 'contact_number', label: 'Contact No', sortable: true },
	{ key: 'created_at', label: 'Created Date', type: 'date', sortable: true },
	{ key: 'action', label: 'Action', sortable: false }
];
export const USERS_TABLE_COLUMNS = [
	{ key: 'name', label: 'Name', sortable: true },
	{ key: 'email', label: 'Email', sortable: true },
	{ key: 'tenants', label: 'Tenants', sortable: false },
	{ key: 'roles', label: 'Roles', sortable: false },
	{ key: 'actions', label: 'Actions', sortable: false }
];

export const USERS_TABLE_FILTERS = [
	{ key: 'name', label: 'Name', type: 'text',
		placeholder: 'Search by name...'
	},
	{
		key: 'email',
		label: 'Email',
		type: 'text',
		placeholder: 'Search by email...'
	}
];

export const ROLES_TABLE_COLUMNS = [
	{ key: 'name', label: 'Name', sortable: true },
	{ key: 'description', label: 'Description', sortable: true },
	{ key: 'tenants', label: 'Tenants', sortable: false },
	{ key: 'users', label: 'Assigned Users', sortable: false },
	{ key: 'actions', label: 'Actions', sortable: false }
];

export const ROLES_TABLE_FILTERS = [
	{
		key: 'name',
		label: 'Name',
		type: 'text',
		placeholder: 'Search by name...'
	},
	{
		key: 'description',
		label: 'Description',
		type: 'text',
		placeholder: 'Search by description...'
	}
];

export const REFERENCES_TABLE_FILTERS = [
	{ key: 'name', label: 'Name', type: 'text', placeholder: 'Search by name...' },
	{ key: 'contact_number', label: 'Contact No', type: 'text', placeholder: 'Search by contact number...' },
];

export const CHANNEL_PARTNER_TABLE = [
	{
		key: 'name',
		label: 'Partner Name',
		sortable: true
	},
	{
		key: 'tenant_code',
		label: 'Tenant',
		sortable: true
	},
	{
		key: 'address',
		label: 'Address',
		sortable: true
	},
	{
		key: 'status',
		label: 'Status',
		sortable: true
	},
	{
		key: 'created_at',
		label: 'Created',
		sortable: true
	},
	{
		key: 'actions',
		label: 'Actions',
		sortable: false
	}
];
export const TENANTS_TABLE_COLUMNS = [
    {
        key: 'name',
        label: 'Tenant',
        sortable: true,
        searchable: true,
        width: '25%'
    },
    {
        key: 'tenant_code',
        label: 'Code',
        sortable: true,
        searchable: true,
        width: '15%'
    },
    {
        key: 'company_name',
        label: 'Company',
        sortable: true,
        searchable: true,
        width: '20%'
    },
    {
        key: 'created_at',
        label: 'Created',
        sortable: true,
        width: '15%'
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
        width: '10%'
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        width: '15%'
    }
]

export const TENANTS_TABLE_FILTERS = [
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: '', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
        ]
    },
    {
        key: 'tenant_code',
        label: 'Tenant Code',
        type: 'text',
        placeholder: 'Filter by code...'
    }
]

// Connections Table Columns
export const CONNECTIONS_TABLE_COLUMNS = [
    {
        key: 'tenant',
        label: 'Tenant',
        sortable: true,
        searchable: true,
        width: '20%'
    },
    {
        key: 'database',
        label: 'Database',
        sortable: true,
        searchable: true,
        width: '20%'
    },
    {
        key: 'connection',
        label: 'Connection',
        sortable: false,
        width: '25%'
    },
    {
        key: 'is_active',
        label: 'Status',
        sortable: true,
        width: '15%'
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        width: '20%'
    }
]

export const CONNECTIONS_TABLE_FILTERS = [
    {
        key: 'is_active',
        label: 'Status',
        type: 'select',
        options: [
            { value: '', label: 'All' },
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' }
        ]
    },
    {
        key: 'driver',
        label: 'Driver',
        type: 'select',
        options: [
            { value: '', label: 'All' },
            { value: 'mysql', label: 'MySQL' },
            { value: 'pgsql', label: 'PostgreSQL' },
            { value: 'sqlsrv', label: 'SQL Server' },
            { value: 'sqlite', label: 'SQLite' }
        ]
    }
]

// Currencies Table Columns
export const CURRENCIES_TABLE_COLUMNS = [
    {
        key: 'tenant',
        label: 'Tenant',
        sortable: true,
        searchable: true,
        width: '20%'
    },
    {
        key: 'name',
        label: 'Currency',
        sortable: true,
        searchable: true,
        width: '25%'
    },
    {
        key: 'code',
        label: 'Code',
        sortable: true,
        searchable: true,
        width: '15%'
    },
    {
        key: 'is_default',
        label: 'Status',
        sortable: true,
        width: '15%'
    },
    {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        width: '25%'
    }
]

export const CURRENCIES_TABLE_FILTERS = [
    {
        key: 'is_default',
        label: 'Status',
        type: 'select',
        options: [
            { value: '', label: 'All' },
            { value: 'true', label: 'Default' },
            { value: 'false', label: 'Secondary' }
        ]
    },
    {
        key: 'code',
        label: 'Currency Code',
        type: 'text',
        placeholder: 'Filter by code...'
    }
]


export const ALL_TABLE_COLUMNS = {
	orders: ORDERS_TABLE_COLUMNS,
	customers: CUSTOMERS_TABLE_COLUMNS,
	contracts: CONTRACTS_TABLE_COLUMNS,
	soa: SOA_TABLE_COLUMNS,
	invoices: INVOICES_TABLE_COLUMNS,
	payments: PAYMENTS_TABLE_COLUMNS,
	lateCharges: LATE_CHARGES_TABLE_COLUMNS,
	creditnotes: CREDIT_NOTES_TABLE_COLUMNS,
	aging: AGING_TABLE_COLUMNS,
	references: REFERENCES_TABLE_COLUMNS,
	users: USERS_TABLE_COLUMNS,
	roles: ROLES_TABLE_COLUMNS,
	currency: CURRENCIES_TABLE_COLUMNS,
  	hannelPartner: CHANNEL_PARTNER_TABLE,
	connection: CONNECTIONS_TABLE_COLUMNS,
	tenant:  TENANTS_TABLE_COLUMNS
};

export const ALL_TABLE_FILTERS = {
	orders: ORDERS_TABLE_FILTERS,
	customers: CUSTOMERS_TABLE_FILTERS,
	contracts: CONTRACTS_TABLE_FILTERS,
	soa: SOA_TABLE_FILTERS,
	invoices: INVOICES_TABLE_FILTERS,
	payments: PAYMENTS_TABLE_FILTERS,
	lateCharges: LATE_CHARGES_TABLE_FILTERS,
	creditnotes: CREDIT_NOTES_TABLE_FILTERS,
	aging: AGING_TABLE_FILTERS,
	references: REFERENCES_TABLE_FILTERS,
	users: USERS_TABLE_FILTERS,
	roles: ROLES_TABLE_FILTERS,
	currency: CURRENCIES_TABLE_FILTERS,
	connection: CONNECTIONS_TABLE_FILTERS,
	tenant: TENANTS_TABLE_FILTERS
};
