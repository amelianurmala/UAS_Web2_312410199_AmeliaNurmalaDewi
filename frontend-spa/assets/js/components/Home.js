const Home = {
    template: `
    <div>
        <!-- Navbar publik -->
        <nav class="fixed top-0 left-0 right-0 bg-white border-b border-zinc-200 px-8 py-4 flex justify-between items-center z-40">
            <div>
                <div class="text-zinc-900 font-medium">E-Library</div>
                <div class="text-zinc-400 text-xs">Kelola Buku dengan Mudah</div>
            </div>
            <router-link to="/login" class="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-700 transition">
                Login Admin
            </router-link>
        </nav>

        <!-- Konten -->
        <div class="pt-20 px-8 pb-8">

            <!-- Hero -->
            <div class="bg-zinc-900 rounded-2xl p-10 mb-8 text-center">
                <div class="text-white text-3xl font-medium mb-2">Perpustakaan Digital</div>
                <div class="text-zinc-400 text-sm">Temukan dan pinjam buku favoritmu</div>
                <div class="grid grid-cols-3 gap-4 mt-8 max-w-lg mx-auto">
                    <div class="bg-zinc-800 rounded-xl p-4">
                        <div class="text-white text-2xl font-medium">{{ totalBuku }}</div>
                        <div class="text-zinc-500 text-xs mt-1">Koleksi Buku</div>
                    </div>
                    <div class="bg-zinc-800 rounded-xl p-4">
                        <div class="text-white text-2xl font-medium">{{ totalKategori }}</div>
                        <div class="text-zinc-500 text-xs mt-1">Kategori</div>
                    </div>
                    <div class="bg-zinc-800 rounded-xl p-4">
                        <div class="text-white text-2xl font-medium">{{ totalPeminjaman }}</div>
                        <div class="text-zinc-500 text-xs mt-1">Dipinjam</div>
                    </div>
                </div>
            </div>

            <!-- Koleksi Buku -->
            <div class="mb-4">
                <div class="text-zinc-800 font-medium text-lg mb-1">Koleksi Buku</div>
                <div class="text-zinc-400 text-sm">Semua koleksi buku yang tersedia di perpustakaan</div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <router-link :to="'/buku/' + buku.id" v-for="buku in bukuList" :key="buku.id" class="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-zinc-400 transition">
                    <!-- Cover -->
                    <div class="aspect-[3/4] bg-zinc-100 overflow-hidden">
                        <img v-if="buku.cover" :src="apiUrl + '/uploads/' + buku.cover" class="w-full h-full object-cover">
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <div class="text-zinc-300 text-xs text-center px-2">{{ buku.judul }}</div>
                        </div>
                    </div>
                    <!-- Info -->
                    <div class="p-3">
                        <div class="text-zinc-800 text-xs font-medium leading-tight mb-1 line-clamp-2">{{ buku.judul }}</div>
                        <div class="text-zinc-400 text-xs mb-2">{{ buku.penulis }}</div>
                        <span :class="buku.stok > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'" class="text-xs px-2 py-0.5 rounded-md">
                            {{ buku.stok > 0 ? 'Tersedia' : 'Dipinjam' }}
                        </span>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
    `,
    data() {
        return {
            bukuList: [],
            totalBuku: 0,
            totalKategori: 0,
            totalPeminjaman: 0,
            apiUrl: 'http://localhost:8081'
        }
    },
    mounted() {
        axios.get(apiUrl + '/api/buku').then(res => { this.bukuList = res.data.data; this.totalBuku = res.data.data.length; }).catch(() => { });
        axios.get(apiUrl + '/api/kategori').then(res => { this.totalKategori = res.data.data.length; }).catch(() => { });
        axios.get(apiUrl + '/api/peminjaman').then(res => { this.totalPeminjaman = res.data.data.filter(p => p.status === 'dipinjam').length; }).catch(() => { });
    }
};