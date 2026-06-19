const Barang = {
  data() {
    return {
      listBarang: [],
      isLoading: false,

      // State untuk Modal Box
      isModalOpen: false,
      modalTitle: "Tambah Barang Baru",
      isEdit: false,

      // State untuk Form Input
      form: {
        id_barang: "",
        nama_barang: "",
        stok: 0,
        id_kategori: "",
        id_supplier: "",
      },
    };
  },
  mounted() {
    // Otomatis load data pas halaman dibuka
    this.fetchBarang();
  },
  methods: {
    // 1. AMBIL DATA (GET)
    async fetchBarang() {
      this.isLoading = true;
      try {
        const response = await axios.get("barang");
        this.listBarang = response.data;
      } catch (error) {
        console.error("Gagal mengambil data barang:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // 2. BUKA MODAL TAMBAH
    openAddModal() {
      this.isEdit = false;
      this.modalTitle = "Tambah Barang Baru";
      this.form = {
        id_barang: "",
        nama_barang: "",
        stok: 0,
        id_kategori: "1",
        id_supplier: "1",
      }; // Default id 1
      this.isModalOpen = true;
    },

    // 3. BUKA MODAL EDIT
    openEditModal(item) {
      this.isEdit = true;
      this.modalTitle = "Ubah Detail Barang";
      this.form = {
        id_barang: item.id_barang,
        nama_barang: item.nama_barang,
        stok: item.stok,
        id_kategori: item.id_kategori || "1",
        id_supplier: item.id_supplier || "1",
      };
      this.isModalOpen = true;
    },

    // 4. TUTUP MODAL
    closeModal() {
      this.isModalOpen = false;
    },

    // 5. SIMPAN DATA (POST / PUT)
    async saveBarang() {
      try {
        if (this.isEdit) {
          // Jika mode edit, tembak PUT ke barang/(:id)
          await axios.put(`barang/${this.form.id_barang}`, {
            nama_barang: this.form.nama_barang,
            stok: this.form.stok,
            id_kategori: this.form.id_kategori,
            id_supplier: this.form.id_supplier,
          });
          alert("Data barang berhasil diperbarui!");
        } else {
          // Jika mode tambah baru, tembak POST ke barang
          await axios.post("barang", this.form);
          alert("Barang baru berhasil ditambahkan!");
        }
        this.closeModal();
        this.fetchBarang(); // Refresh tabel
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
      }
    },

    // 6. HAPUS DATA (DELETE)
    async deleteBarang(id) {
      if (
        confirm("Apakah Anda yakin ingin menghapus barang ini dari inventaris?")
      ) {
        try {
          await axios.delete(`barang/${id}`);
          alert("Barang berhasil dihapus!");
          this.fetchBarang(); // Refresh tabel
        } catch (error) {
          console.error("Gagal menghapus data:", error);
        }
      }
    },
  },
  template: `
        <div class="mt-4">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                    <h1 class="text-3xl font-extrabold text-gray-800 tracking-tight">Manajemen Stok Inventaris</h1>
                    <p class="text-gray-500 mt-1 font-medium">Halaman khusus Administrator untuk memantau dan mengelola data master barang.</p>
                </div>
                <button @click="openAddModal" 
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    Tambah Barang
                </button>
            </div>

            <div v-if="isLoading" class="text-center py-12">
                <svg class="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p class="text-gray-500 font-medium">Sinkronisasi data dengan server API...</p>
            </div>

            <div v-else-if="listBarang.length === 0" class="bg-white rounded-2xl shadow border border-gray-100 p-12 text-center">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                <h3 class="text-lg font-bold text-gray-700">Belum Ada Data Barang</h3>
                <p class="text-gray-400 mt-1 max-w-sm mx-auto">Gudang inventaris masih kosong. Klik tombol 'Tambah Barang' di atas untuk mengisi data.</p>
            </div>

            <div v-else class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-bold tracking-wider">
                                <th class="px-6 py-4">ID</th>
                                <th class="px-6 py-4">Nama Barang</th>
                                <th class="px-6 py-4">Kategori</th>
                                <th class="px-6 py-4">Stok</th>
                                <th class="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-gray-700 font-medium">
                            <tr v-for="item in listBarang" :key="item.id_barang" class="hover:bg-gray-50/70 transition">
                                <td class="px-6 py-4 text-gray-400">#{{ item.id_barang }}</td>
                                <td class="px-6 py-4 font-bold text-gray-900">{{ item.nama_barang }}</td>
                                <td class="px-6 py-4">
                                    <span class="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-lg border border-blue-100">
                                        {{ item.nama_kategori || 'Umum' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="item.stok <= 5" class="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-md font-bold border border-red-100">
                                        {{ item.stok }} (Kritis)
                                    </span>
                                    <span v-else class="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-md font-bold border border-green-100">
                                        {{ item.stok }} Pcs
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-center flex justify-center gap-3">
                                    <button @click="openEditModal(item)" 
                                        class="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition" title="Edit Data">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </button>
                                    <button @click="deleteBarang(item.id_barang)" 
                                        class="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition" title="Hapus Data">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden transform transition duration-300 scale-100">
                    <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 class="text-lg font-bold text-gray-800">{{ modalTitle }}</h3>
                        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    
                    <form @submit.prevent="saveBarang" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Barang / Produk</label>
                            <input type="text" v-model="form.nama_barang" required
                                class="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition bg-gray-50 text-sm font-medium"
                                placeholder="Masukkan nama barang...">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-1">Jumlah Stok</label>
                            <input type="number" v-model="form.stok" required min="0"
                                class="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition bg-gray-50 text-sm font-medium">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
                                <select v-model="form.id_kategori" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-medium">
                                    <option value="1">Elektronik</option>
                                    <option value="2">Bahan Baku</option>
                                    <option value="3">ATK / Logistik</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-1">Supplier</label>
                                <select v-model="form.id_supplier" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm font-medium">
                                    <option value="1">PT. Maju Mundur</option>
                                    <option value="2">CV. Sumber Berkah</option>
                                    <option value="3">Global Logistik</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                            <button type="button" @click="closeModal" 
                                class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition text-sm font-bold">
                                Batal
                            </button>
                            <button type="submit" 
                                class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition text-sm font-bold">
                                {{ isEdit ? 'Simpan Perubahan' : 'Tambah Data' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
};
