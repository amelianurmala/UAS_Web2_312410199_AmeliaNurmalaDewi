const DetailBuku = {
    template: `
    <div>
        <!-- Navbar publik -->
        <nav class="fixed top-0 left-0 right-0 bg-white border-b border-zinc-200 px-8 py-4 flex justify-between items-center z-40">
            <div>
                <div class="text-zinc-900 font-medium">E-Library</div>
                <div class="text-zinc-400 text-xs">Universitas Pelita Bangsa</div>
            </div>
            <div class="flex gap-3 items-center">
                <router-link to="/" class="text-zinc-500 text-sm hover:text-zinc-800 transition">
                    &larr; Kembali
                </router-link>
                <router-link to="/login" class="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-700 transition">
                    Login Admin
                </router-link>
            </div>
        </nav>

        <div class="pt-24 px-8 pb-8 max-w-4xl mx-auto">
            <!-- Loading -->
            <div v-if="loading" class="text-center py-20 text-zinc-400">Memuat data buku...</div>

            <!-- Detail Buku -->
            <div v-else-if="buku" class="flex gap-8">
                <!-- Cover -->
                <div class="flex-shrink-0">
                    <img v-if="buku.cover" :src="apiUrl + '/uploads/' + buku.cover" class="w-48 rounded-xl border border-zinc-200 shadow-sm object-cover">
                    <div v-else class="w-48 h-64 bg-zinc-100 rounded-xl border border-zinc-200 flex items-center justify-center">
                        <div class="text-zinc-300 text-sm text-center px-4">{{ buku.judul }}</div>
                    </div>
                    <!-- Status -->
                    <div class="mt-3 text-center">
                        <span :class="buku.stok > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'" class="text-xs px-3 py-1.5 rounded-lg">
                            {{ buku.stok > 0 ? 'Tersedia (' + buku.stok + ' stok)' : 'Tidak Tersedia' }}
                        </span>
                    </div>
                </div>

                <!-- Info -->
                <div class="flex-1">
                    <div class="text-zinc-800 text-2xl font-medium mb-1">{{ buku.judul }}</div>
                    <div class="text-zinc-400 text-sm mb-6">{{ buku.penulis }}</div>

                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
                            <div class="text-zinc-400 text-xs mb-1">Penerbit</div>
                            <div class="text-zinc-700 text-sm font-medium">{{ buku.penerbit || '-' }}</div>
                        </div>
                        <div class="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
                            <div class="text-zinc-400 text-xs mb-1">Tahun Terbit</div>
                            <div class="text-zinc-700 text-sm font-medium">{{ buku.tahun_terbit || '-' }}</div>
                        </div>
                        <div class="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
                            <div class="text-zinc-400 text-xs mb-1">Kategori</div>
                            <div class="text-zinc-700 text-sm font-medium">{{ namaKategori }}</div>
                        </div>
                        <div class="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
                            <div class="text-zinc-400 text-xs mb-1">Stok Tersedia</div>
                            <div class="text-zinc-700 text-sm font-medium">{{ buku.stok }} buku</div>
                        </div>
                    </div>

                    <div v-if="buku.deskripsi">
                        <div class="text-zinc-500 text-xs mb-2 tracking-widest">DESKRIPSI</div>
                        <div class="text-zinc-600 text-sm leading-relaxed">{{ buku.deskripsi }}</div>
                    </div>

                    <div class="mt-6 p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                        <div class="text-zinc-500 text-xs mb-1">Ingin meminjam buku ini?</div>
                        <div class="text-zinc-700 text-sm">Hubungi petugas perpustakaan atau datang langsung ke meja layanan.</div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-20 text-zinc-400">Buku tidak ditemukan.</div>
        </div>
    </div>
    `,
    data() {
        return {
            buku: null,
            namaKategori: '-',
            loading: true,
            apiUrl: 'http://localhost:8081'
        }
    },
    mounted() {
        const id = this.$route.params.id;
        axios.get(apiUrl + '/api/buku/' + id)
            .then(res => {
                this.buku = res.data.data;
                this.loading = false;
                if (this.buku.id_kategori) {
                    axios.get(apiUrl + '/api/kategori/' + this.buku.id_kategori)
                        .then(r => { this.namaKategori = r.data.data.nama_kategori; })
                        .catch(() => { });
                }
            })
            .catch(() => { this.loading = false; });
    }
};