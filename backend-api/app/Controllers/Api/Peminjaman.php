<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PeminjamanModel;

class Peminjaman extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new PeminjamanModel();
        $data  = $model->findAll();
        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    public function show($id = null)
    {
        $model = new PeminjamanModel();
        $data  = $model->find($id);
        if (!$data) {
            return $this->failNotFound('Peminjaman tidak ditemukan');
        }
        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    public function create()
    {
        $input = $this->request->getJSON(true);
        $model = new PeminjamanModel();
        if ($model->insert($input)) {
            return $this->respondCreated([
                'status'   => 201,
                'messages' => 'Peminjaman berhasil ditambahkan'
            ]);
        }
        return $this->failServerError('Gagal menambahkan peminjaman');
    }

    public function update($id = null)
    {
        $input = $this->request->getJSON(true);
        $model = new PeminjamanModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Peminjaman tidak ditemukan');
        }
        $model->update($id, $input);
        return $this->respond([
            'status'   => 200,
            'messages' => 'Peminjaman berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $model = new PeminjamanModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Peminjaman tidak ditemukan');
        }
        $model->delete($id);
        return $this->respondDeleted([
            'status'   => 200,
            'messages' => 'Peminjaman berhasil dihapus'
        ]);
    }
}