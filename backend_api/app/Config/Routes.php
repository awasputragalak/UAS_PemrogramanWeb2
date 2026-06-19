<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Rute Default CodeIgniter (Opsional, dibiarin aja)
$routes->get('/', 'Home::index');

// ====================================================================
// RUTE RESTFUL API UNTUK VUEJS (E-INVENTORY)
// ====================================================================

// 1. Rute Login Admin (Menggunakan Controller Auth sisaan praktikum)
$routes->post('api/login', 'Api\Auth::login'); 
$routes->options('api/login', 'Api\Auth::login');

// 2. MENGAMANKAN POST, PUT, DELETE (Wajib pakai Filter Token 'apiauth')
$routes->post('barang', 'Barang::create', ['filter' => 'apiauth']);
$routes->put('barang/(:segment)', 'Barang::update/$1', ['filter' => 'apiauth']);
$routes->delete('barang/(:segment)', 'Barang::delete/$1', ['filter' => 'apiauth']);

// 3. Opsi Preflight buat mengatasi CORS VueJS (Biar gak error 401/Network)
$routes->options('barang', 'Barang::index');
$routes->options('barang/(:segment)', 'Barang::index');

// 4. RESOURCE ROUTE (Wajib ditaruh paling bawah biar ga nabrak filter di atasnya)
// Ini otomatis ngebuka jalur GET (ambil data) biar bisa diakses VueJS tanpa Token
$routes->resource('barang');