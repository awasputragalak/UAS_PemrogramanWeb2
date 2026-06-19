<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BarangModel;

class Barang extends ResourceController
{
    use ResponseTrait;

    public function __construct()
    {
        // Izinkan semua domain dan method (CORS) biar VueJS lu ga error preflight
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        
        // Hentikan proses jika ini hanya request preflight OPTIONS dari browser
        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            die();
        }
    }

    // Mengambil semua data barang (Tampil di Tabel VueJS)
    public function index()
    {
        $model = new BarangModel();
        
        // Kita pakai teknik JOIN biar yang tampil nama kategorinya, bukan cuma angka ID-nya
        $data = $model->select('barang.*, kategori.nama_kategori, supplier.nama_supplier')
                      ->join('kategori', 'kategori.id_kategori = barang.id_kategori', 'left')
                      ->join('supplier', 'supplier.id_supplier = barang.id_supplier', 'left')
                      ->findAll();
        
        return $this->respond($data);
    }

   // Menambahkan data barang baru
    public function create()
    {
        $model = new BarangModel();
        
        // Tangkap data JSON dari Axios VueJS
        $json = $this->request->getJSON();
        
        if ($json) {
            $data = [
                'nama_barang' => $json->nama_barang,
                'stok'        => $json->stok,
                'id_kategori' => $json->id_kategori,
                'id_supplier' => $json->id_supplier
            ];
        } else {
            $data = [
                'nama_barang' => $this->request->getVar('nama_barang'),
                'stok'        => $this->request->getVar('stok'),
                'id_kategori' => $this->request->getVar('id_kategori'),
                'id_supplier' => $this->request->getVar('id_supplier')
            ];
        }
        
        $model->insert($data);
        return $this->respondCreated(['status' => 201, 'messages' => 'Data Barang berhasil ditambahkan']);
    }

    // Mengubah data barang
    public function update($id = null)
    {
        $model = new BarangModel();
        
        // Menangkap data JSON dari VueJS
        $json = $this->request->getJSON();
        if ($json) {
            $data = [
                'nama_barang' => $json->nama_barang,
                'stok'        => $json->stok,
                'id_kategori' => $json->id_kategori,
                'id_supplier' => $json->id_supplier
            ];
        } else {
            $data = $this->request->getRawInput();
        }

        $model->update($id, $data);
        return $this->respond(['status' => 200, 'messages' => 'Data Barang berhasil diubah']);
    }

    // Menghapus data barang
    public function delete($id = null)
    {
        $model = new BarangModel();
        $data = $model->find($id);
        
        if ($data) {
            $model->delete($id);
            return $this->respondDeleted(['status' => 200, 'messages' => 'Data Barang berhasil dihapus']);
        } else {
            return $this->failNotFound('Data tidak ditemukan');
        }
    }
}