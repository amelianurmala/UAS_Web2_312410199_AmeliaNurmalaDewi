const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = 'http://localhost:8081';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            localStorage.clear();
            window.location.replace('http://localhost/UAS_elibrary/frontend-spa/#/');
        }
        return Promise.reject(error);
    }
);

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/buku', component: Buku, meta: { requiresAuth: true } },
    { path: '/kategori', component: Kategori, meta: { requiresAuth: true } },
    { path: '/peminjaman', component: Peminjaman, meta: { requiresAuth: true } },
    { path: '/buku/:id', component: DetailBuku },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        alert('Akses Ditolak! Anda harus login terlebih dahulu.');
        next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
        next('/dashboard');
    } else {
        next();
    }
});

const app = createApp({
    data() {
        return { isLoggedIn: false }
    },
    mounted() {
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        this.$router.afterEach(() => {
            this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        });
    },
    methods: {
        logout() {
            if (confirm('Yakin ingin keluar?')) {
                localStorage.clear();
                this.isLoggedIn = false;
                this.$router.push('/');
            }
        }
    }
});

app.use(router);
app.mount('#app');