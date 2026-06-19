// Inisialisasi Vue & Vue Router
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// =========================================================================
// 1. KONFIGURASI AXIOS & INTERCEPTORS (Syarat Wajib UAS)
// =========================================================================

// Arahkan Base URL ke mesin CodeIgniter lu
axios.defaults.baseURL =
  "http://localhost/UAS_WEB2_312410426/backend_api/public/";

// Request Interceptor: Menyuntikkan token dari localStorage secara otomatis ke dalam header setiap request [cite: 46]
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Menangkap error 401 Unauthorized secara global, memunculkan alert, dan menendang kembali ke form login [cite: 48]
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert(
        "Sesi habis atau Anda tidak memiliki akses. Silakan login kembali!",
      );
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      window.location.href = "#/login";
    }
    return Promise.reject(error);
  },
);

// =========================================================================
// 2. KONFIGURASI VUE ROUTER & NAVIGATION GUARDS (Syarat Wajib UAS)
// =========================================================================

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  // Memasang properti meta: { requiresAuth: true } pada rute panel admin [cite: 43]
  { path: "/barang", component: Barang, meta: { requiresAuth: true } },
];

// Menggunakan Vue Router untuk perpindahan halaman tanpa memuat ulang browser [cite: 40]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation Guard: Mencegat pengguna ilegal yang belum login agar terlempar secara otomatis ke halaman login [cite: 44]
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert("Akses Ditolak! Anda harus login terlebih dahulu.");
    next("/login");
  } else {
    next();
  }
});

// =========================================================================
// 3. INISIALISASI APLIKASI VUE & NAVBAR TAILWIND
// =========================================================================

const app = createApp({
  data() {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    // Pantau terus rute, kalau pindah halaman, cek lagi status loginnya
    $route() {
      this.checkAuth();
    },
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    },
    logout() {
      if (confirm("Apakah Anda yakin ingin keluar aplikasi?")) {
        // Menyediakan tombol Logout dinamis yang otomatis menghapus seluruh sesi token di penyimpanan lokal [cite: 35]
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        this.isLoggedIn = false;
        router.push("/login");
      }
    },
  },
  // Template Utama dengan UI TailwindCSS
  template: `
        <div>
            <nav class="bg-primary text-white shadow-md">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center space-x-3">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            <span class="font-bold text-xl tracking-wider">E-Inventory</span>
                        </div>
                        <div class="flex space-x-4">
                            <router-link to="/" class="hover:bg-secondary px-3 py-2 rounded-md transition font-medium">Beranda</router-link>
                            <router-link v-if="!isLoggedIn" to="/login" class="hover:bg-secondary px-3 py-2 rounded-md transition font-medium">Login</router-link>
                            <router-link v-if="isLoggedIn" to="/barang" class="hover:bg-secondary px-3 py-2 rounded-md transition font-medium">Kelola Barang</router-link>
                            <button v-if="isLoggedIn" @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition font-bold shadow">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <router-view></router-view>
            </main>
        </div>
    `,
});

// Pasang Router ke Aplikasi dan Mount ke HTML
app.use(router);
app.mount("#app");
