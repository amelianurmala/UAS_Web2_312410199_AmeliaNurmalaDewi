const Login = {
    template: `
    <div class="min-h-screen bg-zinc-100 flex">
        <!-- Kiri: branding -->
        <div class="hidden md:flex w-1/2 bg-zinc-900 flex-col justify-between p-12">
            <div>
                <div class="text-white font-medium text-lg">E-Library</div>
                <div class="text-zinc-500 text-sm mt-1">Sistem Informasi Rental Buku Digital</div>
            </div>
            <div>
                <div class="text-zinc-300 text-2xl font-medium leading-snug">"Membaca adalah jendela<br>menuju dunia tanpa batas."</div>
                <div class="text-zinc-600 text-sm mt-3">Kelola Buku dengan Mudah</div>
            </div>
            <div class="text-zinc-700 text-xs">© 2026 E-Library. All rights reserved.</div>
        </div>

        <!-- Kanan: form login -->
        <div class="flex-1 flex items-center justify-center p-8">
            <div class="w-full max-w-sm">
                <div class="mb-8">
                    <div class="text-zinc-900 text-2xl font-medium">Masuk ke panel</div>
                    <div class="text-zinc-500 text-sm mt-1">Masukkan kredensial akun administrator</div>
                </div>

                <div class="mb-4">
                    <label class="block text-zinc-700 text-sm mb-1.5">Username atau Email</label>
                    <input
                        type="text"
                        v-model="username"
                        placeholder="admin"
                        class="w-full bg-white border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400 transition"
                    >
                </div>
                <div class="mb-6">
                    <label class="block text-zinc-700 text-sm mb-1.5">Password</label>
                    <input
                        type="password"
                        v-model="password"
                        placeholder="••••••••"
                        class="w-full bg-white border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400 transition"
                    >
                </div>

                <button
                    @click="handleLogin"
                    class="w-full bg-zinc-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-zinc-700 transition">
                    Masuk
                </button>

                <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        handleLogin() {
            axios.post(apiUrl + '/api/login', {
                username: this.username,
                password: this.password
            })
                .then(response => {
                    if (response.data.status === 200) {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userToken', response.data.data.token);
                        window.location.replace('http://localhost/UAS_elibrary/frontend-spa/#/dashboard');
                    }
                })
                .catch(error => {
                    if (error.response && error.response.data.messages) {
                        this.errorMessage = error.response.data.messages;
                    } else {
                        this.errorMessage = 'Terjadi kesalahan. Coba lagi.';
                    }
                });
        }
    }
};