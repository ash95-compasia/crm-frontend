// --- Ensure Vue is globally available before anything else ---
import * as Vue from 'vue';
window.Vue = Vue;

// --- Early imports ---
import '../css/app.css';
import './bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons - IMPORTANT: Add the icons from your list
import { 
    faBars, 
    faCog, 
    faHome, 
    faUsers,
    // Add more icons from your list
    faTachometerAlt,
    faFileCode,
    faList,
    faWrench,
    faPlug,
    faChartBar,
    faCheckCircle,
    faCreditCard,
    faEdit,
    faAngleRight,
    faFileInvoiceDollar,
    faShoppingBag,
    faFileContract,
    faMoneyBillWaveAlt,
    faSearch,
    faPlus,
    faFolder,
    faAngleDown,
    faSpinner,
    faExclamationCircle,
    faTrash,
    faEye,
    faLock,
    faUnlock,
    faKey,
    faDownload,
    faUpload,
    faShare,
    faHeart,
    faStar,
    faFlag,
    faTag,
    faFilter,
    faSort,
    faSync,
    faQuestionCircle,
    faInfoCircle,
    faExclamationTriangle,
    faTimesCircle,
    faMoneyBill,
    faShoppingCart,
    faBox,
    faTruck,
    faPhone,
    faMapMarkerAlt,
    faGlobe,
    faClock,
    faBook,
    faClipboard,
    faPrint,
    faCamera,
    faImage,
    faVideo,
    faMusic,
    faGamepad,
    faLaptopCode,
    faWifi,
    faBatteryFull,
    faLightbulb,
    faTools,
    faShieldAlt,
    faRocket,
    faAngleUp
} from '@fortawesome/free-solid-svg-icons';

// Add ALL icons to library
library.add(
    faBars, 
    faCog, 
    faHome, 
    faUsers,
    // All other icons
    faTachometerAlt,
    faFileCode,
    faList,
    faWrench,
    faPlug,
    faChartBar,
    faCheckCircle,
    faCreditCard,
    faEdit,
    faAngleRight,
    faFileInvoiceDollar,
    faShoppingBag,
    faFileContract,
    faMoneyBillWaveAlt,
    faSearch,
    faPlus,
    faFolder,
    faAngleDown,
    faSpinner,
    faExclamationCircle,
    faTrash,
    faEye,
    faLock,
    faUnlock,
    faKey,
    faDownload,
    faUpload,
    faShare,
    faHeart,
    faStar,
    faFlag,
    faTag,
    faFilter,
    faSort,
    faSync,
    faQuestionCircle,
    faInfoCircle,
    faExclamationTriangle,
    faTimesCircle,
    faMoneyBill,
    faShoppingCart,
    faBox,
    faTruck,
    faPhone,
    faMapMarkerAlt,
    faGlobe,
    faClock,
    faBook,
    faClipboard,
    faPrint,
    faCamera,
    faImage,
    faVideo,
    faMusic,
    faGamepad,
    faLaptopCode,
    faWifi,
    faBatteryFull,
    faLightbulb,
    faTools,
    faShieldAlt,
    faRocket,
    faAngleUp
);

// import { createPinia } from 'pinia' 
import { createApp } from 'vue';
import './echo';
import App from './App.vue';
import routerFn from './router';
import axios from 'axios';
import { loadSlim } from '@tsparticles/slim';
import Particles from '@tsparticles/vue3';

// --- Axios baseURL setup ---
axios.get('/api/base-url', {
    headers: { 'Content-Type': 'application/json' }
}).then(response => {
    axios.defaults.baseURL = response.data.base_url;
}).catch(error => {
    console.error('Failed to fetch base URL:', error);
});
// const pinia = createPinia()
// --- Expose core globals ---
window.$axios = axios;

// --- Icons & UI Components ---
import * as Heroicons from '@heroicons/vue/24/outline';
window.Heroicons = Heroicons;

// --- Particles ---
import * as TsParticlesEngine from '@tsparticles/engine';
import * as TsParticlesSlim from '@tsparticles/slim';
import * as TsParticlesVue3 from '@tsparticles/vue3';
import * as TsParticles from 'tsparticles';
window.TsParticlesEngine = TsParticlesEngine;
window.TsParticlesSlim = TsParticlesSlim;
window.TsParticlesVue3 = TsParticlesVue3;
window.TsParticles = TsParticles;

// --- Bootstrap ---
import * as Bootstrap from 'bootstrap';
import * as BootstrapVue3 from 'bootstrap-vue-3';
window.Bootstrap = Bootstrap;
window.BootstrapVue3 = BootstrapVue3;

// --- Charts & Data Utilities ---
import Chart from 'chart.js/auto';
window.Chart = Chart;
import * as FileSaver from 'file-saver';
window.FileSaver = FileSaver;
import * as HighlightJs from 'highlight.js';
window.HighlightJs = HighlightJs;
import * as JsPdf from 'jspdf';
window.JsPdf = JsPdf;
import * as JsPdfAutotable from 'jspdf-autotable';
window.JsPdfAutotable = JsPdfAutotable;
import * as JsZip from 'jszip';
window.JsZip = JsZip;
import * as Xlsx from 'xlsx';
window.Xlsx = Xlsx;

// --- UUID ---
import { v4 as UuidV4, parse as UuidParse, stringify as UuidStringify, validate as UuidValidate } from 'uuid';
window.Uuid = { v4: UuidV4, parse: UuidParse, stringify: UuidStringify, validate: UuidValidate };

// --- Vue Extensions & Plugins ---
import * as VueRouter from 'vue-router';
window.VueRouter = VueRouter;
import * as VueSelect from 'vue-select';
window.VueSelect = VueSelect;
// import * as VueSpinner from 'vue-spinner';
// window.VueSpinner = VueSpinner;
import * as Vue3SfcLoader from 'vue3-sfc-loader';
window.Vue3SfcLoader = Vue3SfcLoader;
import * as Vue3Tooltip from 'vue3-tooltip';
window.Vue3Tooltip = Vue3Tooltip;
import * as VueDraggable from 'vuedraggable';
window.VueDraggable = VueDraggable;

// --- Initialize the Vue App ---
const app = createApp(App);

// REGISTER FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

(async () => {
    const router = await routerFn();
    // app.use(pinia)
    app.use(router);
    app.use(Particles, {
        init: async (engine) => {
            await loadSlim(engine);
        },
    });
    app.config.globalProperties.$axios = axios;
    app.mount('#app');
})();