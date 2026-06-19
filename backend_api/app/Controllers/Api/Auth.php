<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class Auth extends ResourceController
{
    protected $format = 'json';

    // ========================================================
    // FUNGSI CONSTRUCT: Buat ngatasin Error CORS Preflight
    // ========================================================
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        
        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            die();
        }
    }

    // ========================================================
    // FUNGSI LOGIN: Buat ngecek email & password ke Database
    // ========================================================
    public function login()
    {
        // Tangkap data JSON dari Axios VueJS
$json = $this->request->getJSON();
if ($json) {
    $email = $json->useremail;
    $password = $json->userpassword;
} else {
    // Buat jaga-jaga kalau dites pakai form-data di Postman
    $email = $this->request->getVar('useremail');
    $password = $this->request->getVar('userpassword');
}

        $model = new UserModel();
        
        // 2. Cari user berdasarkan email
        $user = $model->where('useremail', $email)->first();

        if ($user) {
            // 3. Verifikasi password (kita izinin text polosan 'admin123' biar gampang)
            if ($password === $user['userpassword'] || password_verify($password, $user['userpassword'])) {
                
                // 4. Jika sukses, kirim token dengan nama "access_token" biar ditangkep VueJS
                return $this->respond([
                    'status'       => 200,
                    'messages'     => 'Login Berhasil',
                    'access_token' => base64_encode("TOKEN-SECRET-" . $user['username'])
                ], 200);
            }
        }
        
        return $this->failUnauthorized('Akses Ditolak! Email atau Password salah.');
    }
}