const Dashboard = {
    template: `
    <div>
        <div class="mb-6">
            <div class="text-zinc-800 text-xl font-medium">Dashboard</div>
            <div class="text-zinc-400 text-sm mt-0.5">Ringkasan data sistem perpustakaan</div>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-white border border-zinc-200 rounded-xl p-5">
                <div class="text-zinc-400 text-xs tracking-widest mb-2">TOTAL BUKU</div>
                <div class="text-zinc-900 text-3xl font-medium">{{ totalBuku }}</div>
                <div class="text-zinc-400 text-xs mt-1">judul tersedia</div>
            </div>
            <div class="bg-white border border-zinc-200 rounded-xl p-5">
                <div class="text-zinc-400 text-xs tracking-widest mb-2">KATEGORI</div>
                <div class="text-zinc-900 text-3xl font-medium">{{ totalKategori }}</div>
                <div class="text-zinc-400 text-xs mt-1">genre buku</div>
            </div>
            <div class="bg-white border border-zinc-200 rounded-xl p-5">
                <div class="text-zinc-400 text-xs tracking-widest mb-2">DIPINJAM</div>
                <div class="text-zinc-900 text-3xl font-medium">{{ totalPeminjaman }}</div>
                <div class="text-zinc-400 text-xs mt-1">sedang dipinjam</div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <router-link to="/buku" class="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 transition group">
                <div class="text-zinc-800 text-sm font-medium group-hover:text-zinc-900">Kelola Buku</div>
                <div class="text-zinc-400 text-xs mt-1">Tambah, edit, hapus data buku</div>
                <div class="text-zinc-300 text-xs mt-4 group-hover:text-zinc-500 transition">Buka &rarr;</div>
            </router-link>
            <router-link to="/kategori" class="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 transition group">
                <div class="text-zinc-800 text-sm font-medium group-hover:text-zinc-900">Kelola Kategori</div>
                <div class="text-zinc-400 text-xs mt-1">Atur genre dan kategori buku</div>
                <div class="text-zinc-300 text-xs mt-4 group-hover:text-zinc-500 transition">Buka &rarr;</div>
            </router-link>
            <router-link to="/peminjaman" class="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 transition group">
                <div class="text-zinc-800 text-sm font-medium group-hover:text-zinc-900">Kelola Peminjaman</div>
                <div class="text-zinc-400 text-xs mt-1">Catat dan pantau peminjaman</div>
                <div class="text-zinc-300 text-xs mt-4 group-hover:text-zinc-500 transition">Buka &rarr;</div>
            </router-link>
        </div>
    </div>
    `,
    data() {
        return {
            totalBuku: 0,
            totalKategori: 0,
            totalPeminjaman: 0
        }
    },
    mounted() {
        this.loadStats();
    },
    methods: {
        loadStats() {
            axios.get(apiUrl + '/api/buku')
                .then(res => { this.totalBuku = res.data.data.length; })
                .catch(() => { });
            axios.get(apiUrl + '/api/kategori')
                .then(res => { this.totalKategori = res.data.data.length; })
                .catch(() => { });
            axios.get(apiUrl + '/api/peminjaman')
                .then(res => { this.totalPeminjaman = res.data.data.filter(p => p.status === 'dipinjam').length; })
                .catch(() => { });
        }
    }
};