<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BukuModel;

class Buku extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new BukuModel();
        $data  = $model->findAll();
        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    public function show($id = null)
    {
        $model = new BukuModel();
        $data  = $model->find($id);
        if (!$data) {
            return $this->failNotFound('Buku tidak ditemukan');
        }
        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    public function create()
    {
        $model = new BukuModel();
        
        $cover = null;
        $file  = $this->request->getFile('cover');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/uploads/', $newName);
            $cover = $newName;
        }

        $data = [
            'judul'        => $this->request->getPost('judul'),
            'penulis'      => $this->request->getPost('penulis'),
            'penerbit'     => $this->request->getPost('penerbit'),
            'tahun_terbit' => $this->request->getPost('tahun_terbit'),
            'stok'         => $this->request->getPost('stok'),
            'deskripsi'    => $this->request->getPost('deskripsi'),
            'id_kategori'  => $this->request->getPost('id_kategori'),
            'cover'        => $cover,
        ];

        if ($model->insert($data)) {
            return $this->respondCreated([
                'status'   => 201,
                'messages' => 'Buku berhasil ditambahkan'
            ]);
        }
        return $this->failServerError('Gagal menambahkan buku');
    }

    public function update($id = null)
    {
        $model = new BukuModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Buku tidak ditemukan');
        }

        // Cek apakah ada file upload baru
        $cover    = null;
        $file     = $this->request->getFile('cover');
        $existing = $model->find($id);

        if ($file && $file->isValid() && !$file->hasMoved()) {
            // Hapus file lama kalau ada
            if ($existing['cover'] && file_exists(ROOTPATH . 'public/uploads/' . $existing['cover'])) {
                unlink(ROOTPATH . 'public/uploads/' . $existing['cover']);
            }
            $newName = $file->getRandomName();
            $file->move(ROOTPATH . 'public/uploads/', $newName);
            $cover = $newName;
        } else {
            $cover = $existing['cover'];
        }

        // Ambil data dari raw input atau post
        $rawInput = $this->request->getRawInput();

        $data = [
            'judul'        => $this->request->getPost('judul') ?? $rawInput['judul'] ?? $existing['judul'],
            'penulis'      => $this->request->getPost('penulis') ?? $rawInput['penulis'] ?? $existing['penulis'],
            'penerbit'     => $this->request->getPost('penerbit') ?? $rawInput['penerbit'] ?? $existing['penerbit'],
            'tahun_terbit' => $this->request->getPost('tahun_terbit') ?? $rawInput['tahun_terbit'] ?? $existing['tahun_terbit'],
            'stok'         => $this->request->getPost('stok') ?? $rawInput['stok'] ?? $existing['stok'],
            'deskripsi'    => $this->request->getPost('deskripsi') ?? $rawInput['deskripsi'] ?? $existing['deskripsi'],
            'id_kategori'  => $this->request->getPost('id_kategori') ?? $rawInput['id_kategori'] ?? $existing['id_kategori'],
            'cover'        => $cover,
        ];

        $model->update($id, $data);
        return $this->respond([
            'status'   => 200,
            'messages' => 'Buku berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $model = new BukuModel();
        $existing = $model->find($id);
        if (!$existing) {
            return $this->failNotFound('Buku tidak ditemukan');
        }
        // Hapus file cover kalau ada
        if ($existing['cover'] && file_exists(ROOTPATH . 'public/uploads/' . $existing['cover'])) {
            unlink(ROOTPATH . 'public/uploads/' . $existing['cover']);
        }
        $model->delete($id);
        return $this->respondDeleted([
            'status'   => 200,
            'messages' => 'Buku berhasil dihapus'
        ]);
    }
}