// src/utils/dynamicComponents.js
import axios from 'axios';
import { defineComponent, markRaw, defineAsyncComponent } from 'vue';
import { parse, compileTemplate, compileScript, compileStyle } from '@vue/compiler-sfc';

const getAxiosConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

// Base path for alias resolution (e.g., '@/Components/foo.vue' → '/resources/js/Components/foo.vue')
const ALIAS_BASE = '/resources/js';

// Vite dev server config (adjust port/host if not default 5173/localhost)
const VITE_DEV_HOST = 'http://127.0.0.1';
const VITE_DEV_PORT = 8000; // Change if your vite.config.js sets server.port

// Map of package specifiers to global window vars (unchanged)
const knownGlobals = {
    // Core
    'axios': '$axios',
    'vue': 'Vue',

    // Icons & UI
    '@fortawesome/fontawesome-free': 'FontAwesomeLibrary',
    '@fortawesome/fontawesome-svg-core': 'FontAwesomeLibrary',
    '@fortawesome/fontawesome-free/js/all': 'FontAwesomeLibrary',
    '@heroicons/vue': 'Heroicons',

    // Particles
    '@tsparticles/engine': 'TsParticlesEngine',
    '@tsparticles/slim': 'TsParticlesSlim',
    '@tsparticles/vue3': 'TsParticlesVue3',
    'tsparticles': 'TsParticles',

    // Bootstrap
    'bootstrap': 'Bootstrap',
    'bootstrap-vue-3': 'BootstrapVue3',

    // Charts & Data
    'chart.js/auto': 'Chart',
    'file-saver': 'FileSaver',
    'highlight.js': 'HighlightJs',
    'jspdf': 'JsPdf',
    'jspdf-autotable': 'JsPdfAutotable',
    'jszip': 'JsZip',
    'xlsx': 'Xlsx',

    // UUID
    'uuid': 'Uuid',

    // Vue Extensions
    'vue-router': 'VueRouter',
    'vue-select': 'VueSelect',
    'vue-spinner': 'VueSpinner',
    'vue3-sfc-loader': 'Vue3SfcLoader',
    'vue3-tooltip': 'Vue3Tooltip',
    'vuedraggable': 'VueDraggable',
};

// Expose for recursive dynamic calls
window.getComponent = null; // Set later

// Generic helper to rewrite bare imports and aliases using globals
function processScriptCode(code) {
    // Handle alias imports (e.g., '@/Components/foo.vue' → '/resources/js/Components/foo.vue')
    code = code.replace(
        /(['"])(@\/[^'"]+)['"]/g,
        (match, quote, specifier) => {
            const resolvedPath = specifier.replace('@/', ALIAS_BASE + '/');
            return `${quote}${resolvedPath}${quote}`;
        }
    );
    // Specific handling for named imports from "vue" (common in compiled templates) — PRIORITY FIRST
    code = code.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]vue['"](\s*;?)/g,
        (match, namedContent, trailing) => {
            let processed = namedContent.trim().replace(/\s+as\s+/g, ':');
            return `const { ${processed} } = window.Vue;${trailing}\n`;
        }
    );

    // Handle side-effect imports (e.g., import 'foo';) by no-op
    code = code.replace(/import\s+['"]([^'"]+)['"];?\s*/g, (match, specifier) => {
        const globalName = knownGlobals[specifier];
        if (globalName) {
            return '// Side-effect import replaced: ' + specifier + '\n';
        }
        console.warn(`Unmapped side-effect import: ${specifier}`);
        return match;
    });

    // Handle .vue imports: Rewrite to dynamic async component load
    code = code.replace(
        /import\s+(?:(\w+)\s+from\s+|(\{[^}]+\}\s+from\s+)|(\*\s+as\s+(\w+)\s+from\s+))(['"])([^'"]+\.vue)['"];?\s*/g,
        (match, defaultName, namedGroup, starPrefix, starName, quote, specifier) => {
            // Resolve specifier if aliased already
            const resolvedSpecifier = specifier.startsWith('@/') 
                ? specifier.replace('@/', ALIAS_BASE + '/')
                : specifier;
            
            if (defaultName) {
                return `const ${defaultName} = window.Vue.defineAsyncComponent(() => window.getComponent('${resolvedSpecifier}'));\n`;
            } else if (namedGroup) {
                console.warn(`Named imports from .vue not fully supported; treating as default: ${namedGroup}`);
                const firstNamed = namedGroup.trim().slice(1, -1).split(',')[0].trim().split(':')[0].trim();
                return `const ${firstNamed} = window.Vue.defineAsyncComponent(() => window.getComponent('${resolvedSpecifier}'));\n`;
            } else if (starName) {
                return `const ${starName} = window.Vue.defineAsyncComponent(() => window.getComponent('${resolvedSpecifier}'));\n`;
            }
            return match;
        }
    );

    // Universal regex for other non-.vue imports with 'from' (default, named, * as)
    return code.replace(
        /import\s+(?:(\w+)\s+from\s+|(\{[^}]+\})\s+from\s+|(\*\s+as\s+(\w+))\s+from\s+)['"](?![^'"]+\.vue)([^'"]+)['"];?\s*/g,
        (match, defaultName, namedGroup, starPrefix, starName, specifier) => {
            const globalName = knownGlobals[specifier];
            if (!globalName) {
                console.warn(`Unmapped bare import: import from '${specifier}'`);
                return match;
            }

            if (defaultName) {
                return `const ${defaultName} = window.${globalName};\n`;
            } else if (namedGroup) {
                let processed = namedGroup.trim().replace(/\s+as\s+/g, ':');
                return `const { ${processed} } = window.${globalName};\n`;
            } else if (starName) {
                return `const ${starName} = window.${globalName};\n`;
            }
            return match;
        }
    );
}

// New function to process the template block from the SFC descriptor
async function processTemplate(descriptor, nameOrPath) {
    if (!descriptor.template) {
        return null;
    }

    const hasScoped = descriptor.styles.some(s => s.scoped);
    const templateResult = compileTemplate({
        source: descriptor.template.content,
        filename: `${nameOrPath}.vue`,
        id: nameOrPath,
        scoped: hasScoped,
        ssr: false,
    });
    
    // Process template code to handle bare imports/aliases
    let templateCode = templateResult.code;
    templateCode = processScriptCode(templateCode);
    
    // Create blob and dynamic import for render module
    const templateBlob = new Blob([templateCode], { type: 'text/javascript' });
    const templateUrl = URL.createObjectURL(templateBlob);
    
    try {
        const templateModule = await import(/* @vite-ignore */ templateUrl);
        console.log("templateModule",templateModule.render);
        return templateModule.render;
    } finally {
        URL.revokeObjectURL(templateUrl);
    }
}

export const getComponent = async (nameOrPath) => {
    // Set window reference early (self-reference for recursion)
    if (!window.getComponent) window.getComponent = getComponent;

    let code;
    try {
        if (nameOrPath.startsWith('/')) {
            // Static file: Fetch raw SFC text from Vite dev server directly (avoids Laravel proxy/redirect)
            const viteBase = `${VITE_DEV_HOST}:${VITE_DEV_PORT}`;
            const fetchUrl = viteBase + nameOrPath;
            console.log('Fetching static component from:', fetchUrl); // Debug: Log URL
            const response = await fetch(fetchUrl);
            console.log('Fetch status for', nameOrPath, ':', response.status, response.statusText); // Debug: Status
            if (!response.ok) {
                // Log response text on error for diagnosis
                const errorText = await response.text();
                console.error('Error response body:', errorText.substring(0, 500)); // First 500 chars
                throw new Error(`Failed to fetch static component from ${fetchUrl}: ${response.status} ${response.statusText}`);
            }
            code = await response.text();
            console.log('Fetched static code length for', nameOrPath, ':', code.length); // Debug: Confirm SFC (expect ~1000+ chars, not 1k HTML)
        } else {
            // DB component: Axios as before (uses app baseURL)
            const { data: { code: fetchedCode } } = await axios.get(`/api/component-configs/${nameOrPath}/code`, getAxiosConfig());
            code = fetchedCode;
            console.log('Fetched DB code length for', nameOrPath, ':', code.length); // Debug
        }
    } catch (fetchError) {
        console.error(`Failed to fetch source for ${nameOrPath}:`, fetchError);
        // Fallback error component
        return defineComponent({
            template: `<div class="p-4 text-red-500 bg-red-50 rounded border border-red-200">Failed to load ${nameOrPath}: ${fetchError.message}</div>`,
        });
    }
    
    // Parse the SFC
    const { descriptor } = parse(code, { sourceMap: true });
    
    if (!descriptor.script && !descriptor.scriptSetup) {
        throw new Error('No script block found in SFC');
    }
    
    const hasScoped = descriptor.styles.some(s => s.scoped);
    const scriptOptions = {
        id: nameOrPath,
        ...(descriptor.template && hasScoped ? { templateAst: {} } : {}),
    };
    
    // Compile script to JS module code
    const scriptResult = compileScript(descriptor, scriptOptions);
    let scriptCode = scriptResult.content;
    
    // Process to handle bare imports, aliases, and .vue sub-imports
    scriptCode = processScriptCode(scriptCode);
    
    // Create blob and dynamic import for module context
    const scriptBlob = new Blob([scriptCode], { type: 'text/javascript' });
    const scriptUrl = URL.createObjectURL(scriptBlob);
    const scriptModule = await import(/* @vite-ignore */ scriptUrl);
    URL.revokeObjectURL(scriptUrl);
    const componentScript = scriptModule.default || scriptModule;
    
    // Compile and process template if present
    const renderFn = await processTemplate(descriptor, nameOrPath);
    
    // Compile and inject styles
    for (const style of descriptor.styles) {
        const styleResult = compileStyle({
            source: style.content,
            filename: `${nameOrPath}.vue`,
            id: nameOrPath,
            scoped: style.scoped,
            modules: style.module ? [{ type: 'js', content: 'export default {}' }] : undefined,
        });
        if (styleResult.code) {
            const styleEl = document.createElement('style');
            styleEl.textContent = styleResult.code;
            document.head.appendChild(styleEl);
        }
    }
    
    // Create component
    const component = defineComponent({
        ...componentScript,
        render: renderFn,
        ...(componentScript.setup ? { setup: componentScript.setup } : {}),
    });
    
    return markRaw(component);
};