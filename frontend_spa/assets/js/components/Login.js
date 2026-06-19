const Login = {
  data() {
    return {
      useremail: "",
      userpassword: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        // Nembak API Login CodeIgniter via Axios POST
        const response = await axios.post("api/login", {
          useremail: this.useremail,
          userpassword: this.userpassword,
        });

        // Cek apakah server memberikan token otentikasi
        if (response.data && response.data.access_token) {
          // Menyimpan tanda pengenal login dan token ke localStorage
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("isLoggedIn", "true");

          alert("Login Berhasil! Selamat datang Administrator.");

          // Arahkan otomatis ke halaman kelola barang
          window.location.href = "#/barang";
          // Reload sebentar agar navbar mendeteksi perubahan sesi
          window.location.reload();
        }
      } catch (error) {
        this.errorMessage = "Akses Ditolak! Email atau Password salah.";
      } finally {
        this.isLoading = false;
      }
    },
  },
  template: `
        <div class="flex justify-center items-center mt-12">
            <div class="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
                <div class="text-center mb-8">
                    <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <h2 class="text-3xl font-extrabold text-gray-800">Otentikasi Admin</h2>
                    <p class="text-gray-500 mt-2 font-medium">Silakan login untuk mengelola sistem E-Inventory</p>
                </div>

                <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-md flex items-center shadow-sm">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p class="font-bold">{{ errorMessage }}</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Email Administrator</label>
                        <input type="email" v-model="useremail" required 
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-200 bg-gray-50 text-gray-800 font-medium"
                            placeholder="Contoh: admin@email.com">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input type="password" v-model="userpassword" required 
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-200 bg-gray-50 text-gray-800 font-medium"
                            placeholder="••••••••">
                    </div>

                    <button type="submit" :disabled="isLoading" 
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition duration-200 flex justify-center items-center mt-4">
                        <span v-if="!isLoading">Masuk Aplikasi</span>
                        <span v-else class="flex items-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Memeriksa...
                        </span>
                    </button>
                </form>
            </div>
        </div>
    `,
};
