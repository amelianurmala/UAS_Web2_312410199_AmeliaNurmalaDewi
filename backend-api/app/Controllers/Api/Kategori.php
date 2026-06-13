<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class Kategori extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new KategoriModel();
        $data  = $model->findAll();
        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    public function show($id = null)
    {
        $model = new KategoriModel();
        $data  = $model->find($id);
        if (!$data) {
            return $this->failNotFound('Kategori tidak ditemukan');
        }
        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    public function create()
    {
        $input = $this->request->getJSON(true);
        $model = new KategoriModel();
        if ($model->insert($input)) {
            return $this->respondCreated([
                'status'   => 201,
                'messages' => 'Kategori berhasil ditambahkan'
            ]);
        }
        return $this->failServerError('Gagal menambahkan kategori');
    }

    public function update($id = null)
    {
        $input = $this->request->getJSON(true);
        $model = new KategoriModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Kategori tidak ditemukan');
        }
        $model->update($id, $input);
        return $this->respond([
            'status'   => 200,
            'messages' => 'Kategori berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $model = new KategoriModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Kategori tidak ditemukan');
        }
        $model->delete($id);
        return $this->respondDeleted([
            'status'   => 200,
            'messages' => 'Kategori berhasil dihapus'
        ]);
    }
}