<template>
    <div class="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-green-600 to-green-400 text-white relative">
        <!-- Particle Background -->
        <div id="tsparticles" class="absolute inset-0 z-0"></div>

        <!-- Promotional Section -->
        <div class="w-full lg:w-1/2 p-8 flex flex-col justify-between relative z-10">
            <div>
                <a target="_blank" rel="noopener noreferrer">
                    <img src="/images/compasia.png" alt="Compasia Logo" class="h-24 w-24 rounded-full object-cover logo-hover" />
                </a>
            </div>
            <div class="mt-8 lg:mt-0">
                <h1 class="text-4xl font-bold text-green-100 leading-tight">
                    Low-Code Platform Solution
                </h1>
                <p class="mt-4 text-green-100">
                    Transform JSON into dynamic tables, set custom rules, and generate API endpoints for seamless third-party integration.
                </p>
                <div class="mt-8 flex space-x-4">
                    <div class="flex-1 bg-white/20 p-4 rounded-lg">
                        <p class="text-2xl font-bold text-green-100">10k+</p>
                        <p class="text-sm text-green-200">JSON Tables Created</p>
                    </div>
                    <div class="flex-1 bg-white/20 p-4 rounded-lg">
                        <p class="text-2xl font-bold text-green-100">5k+</p>
                        <p class="text-sm text-green-200">Rules Automated</p>
                    </div>
                    <div class="flex-1 bg-white/20 p-4 rounded-lg">
                        <p class="text-2xl font-bold text-green-100">2k+</p>
                        <p class="text-sm text-green-200">API Endpoints</p>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-sm text-green-200">
                © 2025 Compasia. All rights reserved.
            </div>
        </div>

        <!-- Form Section -->
        <div class="w-full lg:w-1/2 flex items-center justify-center relative z-10 p-8">
            <div class="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <h3 class="text-2xl font-bold text-green-600">Create Your Account</h3>
                    <p class="mt-1 text-sm text-green-500">Join Compasia to start building with ease</p>
                </div>

                <div class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-green-600">Full Name</label>
                        <input
                            id="name"
                            v-model="form.name"
                            type="text"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-green-600">Email address</label>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-green-600">Password</label>
                        <input
                            id="password"
                            v-model="form.password"
                            type="password"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-green-600">Confirm Password</label>
                        <input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div class="flex items-center">
                        <input
                            id="terms"
                            v-model="form.terms"
                            type="checkbox"
                            required
                            class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label for="terms" class="ml-2 block text-sm text-green-600">
                            I agree to Compasia's <a href="#" class="font-medium text-green-600 hover:text-green-500">Terms of Service</a>
                        </label>
                    </div>

                    <div>
                        <button
                            type="button"
                            @click="register"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                <div class="text-center text-sm text-green-600">
                    Already have an account? <router-link to="/login" class="font-medium text-green-600 hover:text-green-500">Sign in</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                terms: false,
            },
            errors: {},
        };
    },
    mounted() {
        const particleOptions = {
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 150,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: "#00A86B", // Compasia-inspired green
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.5,
                    random: true,
                },
                size: {
                    value: 3,
                    random: true,
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#00A86B",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out",
                    },
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 1,
                        },
                    },
                    push: {
                        quantity: 4,
                    },
                },
            },
            detectRetina: true,
        };

        tsParticles.load({
            id: "tsparticles",
            options: particleOptions,
        });
    },
    methods: {
        async register() {
            try {
                const response = await this.$axios.post('api/register', this.form);
                localStorage.setItem('token', response.data.token);
                this.$router.push({ name: 'JsonTableViewer' });
            } catch (error) {
                this.errors = error.response?.data?.errors || { message: 'Registration failed' };
            }
        },
    },
};
</script>

<style scoped>
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}

.btn-primary {
    transition: transform 0.2s ease, background-color 0.2s ease;
    background: linear-gradient(to right, #00A86B, #34C759); /* Compasia green gradient */
}

.btn-primary:hover {
    transform: scale(1.05);
}

.input-focus {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-focus:focus {
    border-color: #00A86B; /* Compasia green */
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.3);
}

.text-light-green {
    color: rgba(52, 199, 89, 0.9); /* Softer green for text */
}

.text-light-green-faded {
    color: rgba(52, 199, 89, 0.7);
}
</style>