<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table            = 'barang';
    protected $primaryKey       = 'id_barang';
    // Ini kolom-kolom yang diizinkan buat diisi data dari VueJS nanti
    protected $allowedFields    = ['nama_barang', 'stok', 'id_kategori', 'id_supplier'];
}