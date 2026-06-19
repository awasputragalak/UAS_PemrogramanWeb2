const apiArtikel = "http://localhost:8080/post";

const Artikel = {
  template: `
        <div>
            <div class="header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h2 style="margin:0;">Manajemen Data Artikel</h2>
                <button id="btn-tambah" @click="tambah" style="margin:0;">+ Tambah Data</button>
            </div>

            <div class="modal" v-if="showForm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 style="margin:0;">{{ formTitle }}</h3>
                        <span class="close" @click="showForm = false">&times;</span>
                    </div>
                    <form id="form-data" @submit.prevent="saveData" style="padding: 20px;">
                        <input type="hidden" v-model="formData.id">
                        <div class="form-group">
                            <label>Judul Artikel</label>
                            <input type="text" v-model="formData.judul" placeholder="Judul" required>
                        </div>
                        <div class="form-group">
                            <label>Isi Artikel</label>
                            <textarea v-model="formData.isi" rows="6" placeholder="Isi Artikel" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select v-model="formData.status">
                                <option v-for="option in statusOptions" :value="option.value">{{ option.text }}</option>
                            </select>
                        </div>
                        <div class="modal-footer" style="text-align: right; margin-top: 20px;">
                            <button type="button" class="btn-batal" @click="showForm = false">Batal</button>
                            <button type="submit" id="btnSimpan" class="btn-simpan">Simpan Data</button>
                        </div>
                    </form>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th width="5%">ID</th>
                        <th>Judul Artikel</th>
                        <th width="15%">Status</th>
                        <th width="20%">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in artikel" :key="row.id">
                        <td class="center-text">{{ row.id }}</td>
                        <td class="fw-bold">{{ row.judul }}</td>
                        <td><span :class="row.status == 1 ? 'badge publish' : 'badge draft'">{{ statusText(row.status) }}</span></td>
                        <td class="center-text">
                            <button class="btn-edit" @click.prevent="edit(row)">Ubah</button>
                            <button class="btn-delete" @click.prevent="hapus(index, row.id)">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
  data() {
    return {
      artikel: [],
      formData: { id: null, judul: "", isi: "", status: 0 },
      showForm: false,
      formTitle: "Tambah Data",
      statusOptions: [
        { text: "Draft", value: 0 },
        { text: "Publish", value: 1 },
      ],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get(apiArtikel)
        .then((res) => {
          this.artikel = res.data.artikel || res.data;
        })
        .catch((err) => console.log(err));
    },
    tambah() {
      this.showForm = true;
      this.formTitle = "Tambah Data";
      this.formData = { id: null, judul: "", isi: "", status: 0 };
    },
    edit(data) {
      this.showForm = true;
      this.formTitle = "Ubah Data";
      this.formData = {
        id: data.id,
        judul: data.judul,
        isi: data.isi,
        status: data.status,
      };
    },
    saveData() {
      if (this.formData.id) {
        axios
          .put(apiArtikel + "/" + this.formData.id, this.formData)
          .then(() => {
            this.loadData();
            this.showForm = false;
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(apiArtikel, this.formData)
          .then(() => {
            this.loadData();
            this.showForm = false;
          })
          .catch((err) => console.log(err));
      }
    },
    hapus(index, id) {
      if (confirm("Yakin menghapus data?")) {
        axios
          .delete(apiArtikel + "/" + id)
          .then(() => {
            this.artikel.splice(index, 1);
          })
          .catch((err) => console.log(err));
      }
    },
    statusText(status) {
      return status == 1 ? "Publish" : "Draft";
    },
  },
};
