const Buku = {
    template: `
    <div>
        <div class="flex justify-between items-center mb-6">
            <div>
                <div class="text-zinc-800 text-xl font-medium">Buku</div>
                <div class="text-zinc-400 text-sm mt-0.5">Kelola koleksi buku perpustakaan</div>
            </div>
            <button @click="tambah" class="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-700 transition">
                + Tambah Buku
            </button>
        </div>

        <!-- Modal -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl border border-zinc-200 p-6 w-full max-w-lg max-h-screen overflow-y-auto">
                <div class="text-zinc-800 font-medium text-base mb-5">{{ formTitle }}</div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="col-span-2">
                        <label class="block text-zinc-600 text-sm mb-1">Judul</label>
                        <input type="text" v-model="formData.judul" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="Judul buku">
                    </div>
                    <div>
                        <label class="block text-zinc-600 text-sm mb-1">Penulis</label>
                        <input type="text" v-model="formData.penulis" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="Nama penulis">
                    </div>
                    <div>
                        <label class="block text-zinc-600 text-sm mb-1">Penerbit</label>
                        <input type="text" v-model="formData.penerbit" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="Nama penerbit">
                    </div>
                    <div>
                        <label class="block text-zinc-600 text-sm mb-1">Tahun Terbit</label>
                        <input type="number" v-model="formData.tahun_terbit" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="2024">
                    </div>
                    <div>
                        <label class="block text-zinc-600 text-sm mb-1">Stok</label>
                        <input type="number" v-model="formData.stok" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="0">
                    </div>
                    <div class="col-span-2">
                        <label class="block text-zinc-600 text-sm mb-1">Kategori</label>
                        <select v-model="formData.id_kategori" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400">
                            <option value="">-- Pilih Kategori --</option>
                            <option v-for="k in kategoriList" :value="k.id">{{ k.nama_kategori }}</option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label class="block text-zinc-600 text-sm mb-1">Cover Buku</label>
                        <input type="file" accept="image/*" @change="onFileChange" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400">
                        <div v-if="previewUrl" class="mt-2">
                            <img :src="previewUrl" class="h-32 rounded-lg object-cover border border-zinc-200">
                        </div>
                        <div v-else-if="formData.cover" class="mt-2">
                            <img :src="apiUrl + '/uploads/' + formData.cover" class="h-32 rounded-lg object-cover border border-zinc-200">
                        </div>
                    </div>
                    <div class="col-span-2">
                        <label class="block text-zinc-600 text-sm mb-1">Deskripsi</label>
                        <textarea v-model="formData.deskripsi" rows="3" class="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" placeholder="Deskripsi singkat buku"></textarea>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button @click="saveData" class="flex-1 bg-zinc-900 text-white text-sm py-2 rounded-lg hover:bg-zinc-700 transition">Simpan</button>
                    <button @click="closeForm" class="flex-1 bg-zinc-100 text-zinc-600 text-sm py-2 rounded-lg hover:bg-zinc-200 transition">Batal</button>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-zinc-100">
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">NO</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">COVER</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">JUDUL</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">PENULIS</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">PENERBIT</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">STOK</th>
                        <th class="px-5 py-3 text-left text-xs text-zinc-400 font-medium tracking-wider">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="bukuList.length === 0">
                        <td colspan="7" class="px-5 py-10 text-center text-zinc-400 text-sm">Belum ada data buku</td>
                    </tr>
                    <tr v-for="(item, index) in bukuList" :key="item.id" class="border-b border-zinc-50 hover:bg-zinc-50 transition">
                        <td class="px-5 py-3 text-zinc-400">{{ index + 1 }}</td>
                        <td class="px-5 py-3">
                            <img v-if="item.cover" :src="apiUrl + '/uploads/' + item.cover" class="h-12 w-9 object-cover rounded border border-zinc-200">
                            <div v-else class="h-12 w-9 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center text-zinc-300 text-xs">N/A</div>
                        </td>
                        <td class="px-5 py-3 text-zinc-800 font-medium">{{ item.judul }}</td>
                        <td class="px-5 py-3 text-zinc-500">{{ item.penulis }}</td>
                        <td class="px-5 py-3 text-zinc-500">{{ item.penerbit || '-' }}</td>
                        <td class="px-5 py-3">
                            <span :class="item.stok > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'" class="text-xs px-2 py-1 rounded-md">
                                {{ item.stok }}
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
            bukuList: [],
            kategoriList: [],
            showForm: false,
            formTitle: 'Tambah Buku',
            previewUrl: null,
            coverFile: null,
            apiUrl: 'http://localhost:8081',
            formData: { id: null, judul: '', penulis: '', penerbit: '', tahun_terbit: '', stok: 0, deskripsi: '', id_kategori: '', cover: '' }
        }
    },
    mounted() {
        this.loadData();
        this.loadKategori();
    },
    methods: {
        loadData() {
            axios.get(apiUrl + '/api/buku')
                .then(res => { this.bukuList = res.data.data; })
                .catch(err => console.log(err));
        },
        loadKategori() {
            axios.get(apiUrl + '/api/kategori')
                .then(res => { this.kategoriList = res.data.data; })
                .catch(err => console.log(err));
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Buku';
            this.previewUrl = null;
            this.coverFile = null;
            this.formData = { id: null, judul: '', penulis: '', penerbit: '', tahun_terbit: '', stok: 0, deskripsi: '', id_kategori: '', cover: '' };
        },
        edit(item) {
            this.showForm = true;
            this.formTitle = 'Edit Buku';
            this.previewUrl = null;
            this.coverFile = null;
            this.formData = { ...item };
        },
        closeForm() {
            this.showForm = false;
            this.previewUrl = null;
            this.coverFile = null;
        },
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.coverFile = file;
                this.previewUrl = URL.createObjectURL(file);
            }
        },
        hapus(index, id) {
            if (confirm('Yakin hapus buku ini?')) {
                axios.delete(apiUrl + '/api/buku/' + id)
                    .then(() => { this.bukuList.splice(index, 1); })
                    .catch(err => console.log(err));
            }
        },
        saveData() {
            const formData = new FormData();
            formData.append('judul', this.formData.judul);
            formData.append('penulis', this.formData.penulis);
            formData.append('penerbit', this.formData.penerbit || '');
            formData.append('tahun_terbit', this.formData.tahun_terbit || '');
            formData.append('stok', this.formData.stok || 0);
            formData.append('deskripsi', this.formData.deskripsi || '');
            formData.append('id_kategori', this.formData.id_kategori || '');
            if (this.coverFile) {
                formData.append('cover', this.coverFile);
            }

            if (this.formData.id) {
                formData.append('_method', 'PUT');
                axios.post(apiUrl + '/api/buku/' + this.formData.id, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then(() => { this.loadData(); this.closeForm(); })
                    .catch(err => console.log(err));
            } else {
                axios.post(apiUrl + '/api/buku', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then(() => { this.loadData(); this.closeForm(); })
                    .catch(err => console.log(err));
            }
        }
    }
};