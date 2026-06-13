<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// API Auth
$routes->get('api/login', 'Api\Auth::login');
$routes->post('api/login', 'Api\Auth::login');
$routes->options('api/login', function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
});

// API Buku
$routes->get('api/buku', 'Api\Buku::index');
$routes->get('api/buku/(:num)', 'Api\Buku::show/$1');
$routes->post('api/buku', 'Api\Buku::create', ['filter' => 'apiauth']);
$routes->put('api/buku/(:num)', 'Api\Buku::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/buku/(:num)', 'Api\Buku::delete/$1', ['filter' => 'apiauth']);

// API Kategori
$routes->get('api/kategori', 'Api\Kategori::index');
$routes->get('api/kategori/(:num)', 'Api\Kategori::show/$1');
$routes->post('api/kategori', 'Api\Kategori::create', ['filter' => 'apiauth']);
$routes->put('api/kategori/(:num)', 'Api\Kategori::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/kategori/(:num)', 'Api\Kategori::delete/$1', ['filter' => 'apiauth']);

// API Peminjaman
$routes->get('api/peminjaman', 'Api\Peminjaman::index');
$routes->get('api/peminjaman/(:num)', 'Api\Peminjaman::show/$1');
$routes->post('api/peminjaman', 'Api\Peminjaman::create', ['filter' => 'apiauth']);
$routes->put('api/peminjaman/(:num)', 'Api\Peminjaman::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/peminjaman/(:num)', 'Api\Peminjaman::delete/$1', ['filter' => 'apiauth']);

// OPTIONS untuk CORS
$routes->options('api/buku', 'Api\Buku::index');
$routes->options('api/buku/(:num)', 'Api\Buku::index');
$routes->options('api/kategori', 'Api\Kategori::index');
$routes->options('api/kategori/(:num)', 'Api\Kategori::index');
$routes->options('api/peminjaman', 'Api\Peminjaman::index');
$routes->options('api/peminjaman/(:num)', 'Api\Peminjaman::index');

$routes->setAutoRoute(true);