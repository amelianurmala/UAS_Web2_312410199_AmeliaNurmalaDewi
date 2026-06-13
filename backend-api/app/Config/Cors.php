<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    public array $default = [
        // Ubah dari '*' menjadi link spesifik jika ingin lebih aman, 
        // tapi untuk sekarang kita pakai '*' agar tidak diblokir sama sekali.
        'allowedOrigins' => ['https://amelianurmala.github.io'], 
        'allowedOriginsPatterns' => [],
        'supportsCredentials' => true, // Ubah ke true agar token bisa terbaca
        'allowedHeaders' => ['*'], // Izinkan semua header agar tidak ada yang terblokir
        'exposedHeaders' => [],
        'allowedMethods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'maxAge' => 7200,
    ];
}