<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users'; // Harus persis sama nama tabel di DB
    protected $primaryKey       = 'id';
    protected $allowedFields    = ['username', 'useremail', 'userpassword'];
}