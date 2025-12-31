import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import AppLayout from '../Components/AppLayout.vue';
import { componentsMap } from './componentsMap';

let router = null;

// Safe JSON parser to handle malformed, empty, or invalid meta strings
function safeJsonParse(str, fallback = {}) {
  if (!str || typeof str !== 'string') return fallback;
  // Handle common empty cases
  if (str.trim() === '' || str.trim() === '[]' || str.trim() === '{}') {
    return fallback;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    console.warn('Failed to parse route meta JSON:', str, e);
    return fallback;
  }
}

export default async function createDynamicRouter() {
  if (router) return router;

  let apiRoutes = [];

  // Fetch dynamic routes from API
  try {
    const tenant_code = localStorage.getItem('tenant_code');
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/landlord/route-configs', {
      headers: { 
        Authorization: `Bearer ${token}`, 
        'X-Tenant-Code': tenant_code 
      }
    });
    apiRoutes = res.data || [];
  } catch (err) {
    console.error('Failed to fetch route configs:', err);
    apiRoutes = [];
  }

  // Base routes: login (guest) and authenticated layout
  const routes = [
    { 
      path: '/login', 
      name: 'login', 
      component: componentsMap['Login'] || (() => import('../Components/Login.vue')), 
      meta: { guest: true } 
    },
    { 
      path: '/logout',
      name: 'logout',
      component: { template: '<div></div>' }, // Dummy component, handled in Sidebar
      meta: { guest: true }
    },
    { 
      path: '/', 
      component: AppLayout, 
      meta: { requiresAuth: true }, 
      children: [] 
    }
  ];

  const layoutRoute = routes.find(r => r.component === AppLayout);

  // Add dynamic routes only if they belong inside the authenticated layout
  apiRoutes.forEach(r => {
    // Skip routes that should NOT be children of AppLayout
    if (
      r.path === '/login' || 
      r.path === '/logout' || 
      r.path.includes(':pathMatch') || 
      r.path === '/:pathMatch(.*)*'
    ) {
      return;
    }

    // Safely parse meta
    const parsedMeta = safeJsonParse(r.meta, {});

    // Determine if this route requires auth (default: yes for layout children)
    const requiresAuth = parsedMeta.requiresAuth !== false && parsedMeta.guest !== true;

    const routeConfig = {
      path: r.path,
      name: r.name,
      component: componentsMap[r.component] || (() => import('../Pages/Error/Error404.vue')),
      meta: {
        requiresAuth,
        title: r.name,
        ...parsedMeta
      }
    };

    // Handle root path '/' → map to empty path '' for default child route
    if (r.path === '/' || r.path === '') {
      layoutRoute.children.push({ ...routeConfig, path: '' });
    } else {
      layoutRoute.children.push(routeConfig);
    }
  });

  // Always add 404 catch-all as last child
  layoutRoute.children.push({
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../Pages/Error/Error404.vue'),
    meta: { requiresAuth: false } // 404 should be accessible even if unauth
  });

  // Create router instance
  router = createRouter({
    history: createWebHistory(),
    routes
  });

  // Navigation guard
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    // If route requires auth and no token → go to login
    if (to.meta.requiresAuth && !token) {
      return next({ name: 'login' });
    }

    // If route is guest-only (like login) and user is authenticated → redirect to dashboard or home
    if (to.meta.guest && token) {
      return next({ path: '/dashboard' }); // or '/' 
    }

    // Otherwise proceed
    next();
  });

  return router;
}