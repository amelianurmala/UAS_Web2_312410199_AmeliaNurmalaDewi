<?php

namespace App\Models;

use CodeIgniter\Model;

class PeminjamanModel extends Model
{
    protected $table      = 'peminjaman';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'nama_peminjam',
        'id_buku',
        'tgl_pinjam',
        'tgl_kembali',
        'status'
    ];
}