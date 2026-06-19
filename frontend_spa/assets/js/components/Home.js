const Home = {
  template: `
        <div class="bg-white rounded-2xl shadow-xl p-10 mt-8 text-center border border-gray-100">
            <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
                Selamat Datang di <span class="text-blue-600">E-Inventory</span>
            </h1>
            <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Sistem Manajemen Inventaris Barang Modern, Terpusat, dan Responsif berbasis Single Page Application (SPA).
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-blue-50 p-8 rounded-xl border border-blue-100 transform hover:scale-105 transition duration-300">
                    <div class="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <h3 class="text-blue-800 font-bold text-2xl">Manajemen Barang</h3>
                    <p class="text-blue-600 mt-2 font-medium">Kelola stok real-time</p>
                </div>
                
                <div class="bg-green-50 p-8 rounded-xl border border-green-100 transform hover:scale-105 transition duration-300">
                    <div class="bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                    </div>
                    <h3 class="text-green-800 font-bold text-2xl">Kategori Produk</h3>
                    <p class="text-green-600 mt-2 font-medium">Klasifikasi data rapi</p>
                </div>

                <div class="bg-purple-50 p-8 rounded-xl border border-purple-100 transform hover:scale-105 transition duration-300">
                    <div class="bg-purple-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h3 class="text-purple-800 font-bold text-2xl">Data Supplier</h3>
                    <p class="text-purple-600 mt-2 font-medium">Mitra terpercaya</p>
                </div>
            </div>
        </div>
    `,
};
