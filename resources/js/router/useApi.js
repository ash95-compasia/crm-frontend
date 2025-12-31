import { useRouter } from 'vue-router'; 

export function useApi() {
    const router = useRouter();

    const getAxiosConfig = (contentType = 'application/json') => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            throw new Error('No authentication token found');
        }

        const tenantCode = localStorage.getItem('tenant_code');
        if (!tenantCode) {
            throw new Error('No tenant code found');
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'X-Tenant-Code': tenantCode,
        };

        // Only add Content-Type if it's not multipart/form-data (for file uploads)
        if (contentType && contentType !== 'multipart/form-data') {
            headers['Content-Type'] = contentType;
        }

        return {
            headers,
        };
    };

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            throw new Error('No authentication token found');
        }

        const tenantCode = localStorage.getItem('tenant_code');
        if (!tenantCode) {
            throw new Error('No tenant code found');
        }

        return {
            Authorization: `Bearer ${token}`,
            'X-Tenant-Code': tenantCode,
        };
    };

    const getFormDataConfig = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            throw new Error('No authentication token found');
        }

        const tenantCode = localStorage.getItem('tenant_code');
        if (!tenantCode) {
            throw new Error('No tenant code found');
        }

        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Tenant-Code': tenantCode,
            },
        };
    };

    const getPermissions = () => {
        const permissionsStr = localStorage.getItem('permissions');
        if (!permissionsStr) {
            return {};
        }
        try {
            return JSON.parse(permissionsStr);
        } catch (e) {
            console.error('Failed to parse permissions:', e);
            return {};
        }
    };

    return {
        getAxiosConfig,
        getHeaders,
        getFormDataConfig,
        getPermissions,
    };
}