const Peminjaman = {
    template: `
    <div>
        <div class="flex justify-between items-center mb-6">
            <div>
                <div class="text-zinc-800 text-xl font-medium">Peminjaman</div>
                <div class="text-zinc-400 text-sm mt-0.5">Catat dan pantau status peminjaman buku</div>
            </div>
            <button @click="tambah" class="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-700 transition">
                + Tambah Peminjaman
            </button>
        </div>

        <!-- Modal -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" style="min-height:100vh;">
            <div class="bg-white rounded-xl border border-zinc-200 p-6 w-full max-w-md">
                <div class="text-zinc-800 font-medium text-base mb-5">{{ formTitle }}</div>
                <div class="mb-4">
                    <label class="block text-zinc-600 text-sm mb-1">Nama Peminjam</label>
                    <input type="text" v-model="formData.nama_peminjam" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="Nama lengkap peminjam">
                </div>
                <div class="mb-4">
                    <label class="block text-zinc-600 text-sm mb-1">Buku</label>
                    <select v-model="formData.id_buku" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400">
                        <option value="">-- Pilih Buku --</option>
                        <option v-for="b in bukuList" :value="b.id">{{ b.judul }}</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-zinc-600 text-sm mb-1">Tanggal Pinjam</label>
                        <input type="date" v-model="formData.tgl_pinjam" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400">
                    </div>
                    <div>
                        <label class="block text-zinc-600 text-sm mb-1">Tanggal Kembali</label>
                        <input type="date" v-model="formData.tgl_kembali" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400">
                    </div>
                </div>
                <div class="mb-5">
                    <label class="block text-zinc-600 text-sm mb-1">Status</label>
                    <select v-model="formData.status" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400">
                        <option value="dipinjam">Dipinjam</option>
                        <option value="dikembalikan">Dikembalikan</option>
                    </select>
                </div>
                <div class="flex gap-2">
                    <button @click="saveData" class="flex-1 bg-zinc-900 text-white text-sm py-2 rounded-lg hover:bg-zinc-700 transition">Simpan</button>
                    <button @click="showForm = false" class="flex-1 bg-zinc-100 text-zinc-600 text-sm py-2 rounded-lg hover:bg-zinc-200 transition">Batal</button>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-zinc-100">
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">NO</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">NAMA PEMINJAM</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">ID BUKU</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">TGL PINJAM</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">TGL KEMBALI</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">STATUS</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="peminjamanList.length === 0">
                        <td colspan="7" class="px-5 py-10 text-center text-zinc-400 text-sm">Belum ada data peminjaman</td>
                    </tr>
                    <tr v-for="(item, index) in peminjamanList" :key="item.id" class="border-b border-zinc-50 hover:bg-zinc-50 transition">
                        <td class="px-5 py-3 text-zinc-400">{{ index + 1 }}</td>
                        <td class="px-5 py-3 text-zinc-800 font-medium">{{ item.nama_peminjam }}</td>
                        <td class="px-5 py-3 text-zinc-500">{{ item.id_buku }}</td>
                        <td class="px-5 py-3 text-zinc-500">{{ item.tgl_pinjam }}</td>
                        <td class="px-5 py-3 text-zinc-500">{{ item.tgl_kembali || '-' }}</td>
                        <td class="px-5 py-3">
                            <span :class="item.status === 'dipinjam' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'" class="text-xs px-2 py-1 rounded-md">
                                {{ item.status }}
                            </span>
                        </td>
                        <td class="px-5 py-3">
                            <button @click="edit(item)" class="text-xs text-zinc-500 hover:text-zinc-800 border border-zinc-200 px-3 py-1 rounded-md mr-1 hover:border-zinc-400 transition">Edit</button>
                            <button @click="hapus(index, item.id)" class="text-xs text-red-400 hover:text-red-600 border border-red-100 px-3 py-1 rounded-md hover:border-red-300 transition">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            peminjamanList: [],
            bukuList: [],
            showForm: false,
            formTitle: 'Tambah Peminjaman',
            formData: { id: null, nama_peminjam: '', id_buku: '', tgl_pinjam: '', tgl_kembali: '', status: 'dipinjam' }
        }
    },
    mounted() {
        this.loadData();
        this.loadBuku();
    },
    methods: {
        loadData() {
            axios.get(apiUrl + '/api/peminjaman')
                .then(res => { this.peminjamanList = res.data.data; })
                .catch(err => console.log(err));
        },
        loadBuku() {
            axios.get(apiUrl + '/api/buku')
                .then(res => { this.bukuList = res.data.data; })
                .catch(err => console.log(err));
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Peminjaman';
            this.formData = { id: null, nama_peminjam: '', id_buku: '', tgl_pinjam: '', tgl_kembali: '', status: 'dipinjam' };
        },
        edit(item) {
            this.showForm = true;
            this.formTitle = 'Edit Peminjaman';
            this.formData = { ...item };
        },
        hapus(index, id) {
            if (confirm('Yakin hapus data peminjaman ini?')) {
                axios.delete(apiUrl + '/api/peminjaman/' + id)
                    .then(() => { this.peminjamanList.splice(index, 1); })
                    .catch(err => console.log(err));
            }
        },
        saveData() {
            if (this.formData.id) {
                axios.put(apiUrl + '/api/peminjaman/' + this.formData.id, this.formData)
                    .then(() => { this.loadData(); this.showForm = false; })
                    .catch(err => console.log(err));
            } else {
                axios.post(apiUrl + '/api/peminjaman', this.formData)
                    .then(() => { this.loadData(); this.showForm = false; })
                    .catch(err => console.log(err));
            }
        }
    }
};