const Kategori = {
    template: `
    <div>
        <div class="flex justify-between items-center mb-6">
            <div>
                <div class="text-zinc-800 text-xl font-medium">Kategori</div>
                <div class="text-zinc-400 text-sm mt-0.5">Kelola genre dan kategori buku</div>
            </div>
            <button @click="tambah" class="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-700 transition">
                + Tambah Kategori
            </button>
        </div>

        <!-- Modal -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" style="min-height:100vh;">
            <div class="bg-white rounded-xl border border-zinc-200 p-6 w-full max-w-md">
                <div class="text-zinc-800 font-medium text-base mb-5">{{ formTitle }}</div>
                <div class="mb-4">
                    <label class="block text-zinc-600 text-sm mb-1">Nama Kategori</label>
                    <input type="text" v-model="formData.nama_kategori" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="Contoh: Fiksi, Teknologi">
                </div>
                <div class="mb-5">
                    <label class="block text-zinc-600 text-sm mb-1">Deskripsi</label>
                    <textarea v-model="formData.deskripsi" rows="3" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="Deskripsi singkat kategori"></textarea>
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
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">NAMA KATEGORI</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">DESKRIPSI</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="kategoriList.length === 0">
                        <td colspan="4" class="px-5 py-10 text-center text-zinc-400 text-sm">Belum ada data kategori</td>
                    </tr>
                    <tr v-for="(item, index) in kategoriList" :key="item.id" class="border-b border-zinc-50 hover:bg-zinc-50 transition">
                        <td class="px-5 py-3 text-zinc-400">{{ index + 1 }}</td>
                        <td class="px-5 py-3 text-zinc-800 font-medium">{{ item.nama_kategori }}</td>
                        <td class="px-5 py-3 text-zinc-500">{{ item.deskripsi || '-' }}</td>
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
            kategoriList: [],
            showForm: false,
            formTitle: 'Tambah Kategori',
            formData: { id: null, nama_kategori: '', deskripsi: '' }
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            axios.get(apiUrl + '/api/kategori')
                .then(res => { this.kategoriList = res.data.data; })
                .catch(err => console.log(err));
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Kategori';
            this.formData = { id: null, nama_kategori: '', deskripsi: '' };
        },
        edit(item) {
            this.showForm = true;
            this.formTitle = 'Edit Kategori';
            this.formData = { ...item };
        },
        hapus(index, id) {
            if (confirm('Yakin hapus kategori ini?')) {
                axios.delete(apiUrl + '/api/kategori/' + id)
                    .then(() => { this.kategoriList.splice(index, 1); })
                    .catch(err => console.log(err));
            }
        },
        saveData() {
            if (this.formData.id) {
                axios.put(apiUrl + '/api/kategori/' + this.formData.id, this.formData)
                    .then(() => { this.loadData(); this.showForm = false; })
                    .catch(err => console.log(err));
            } else {
                axios.post(apiUrl + '/api/kategori', this.formData)
                    .then(() => { this.loadData(); this.showForm = false; })
                    .catch(err => console.log(err));
            }
        }
    }
};