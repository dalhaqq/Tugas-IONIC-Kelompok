<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$pesan = [];
$username = trim($data['username']);
$query = mysqli_query($koneksi, "select * from user where username='$username' limit 1");
$jumlah = mysqli_num_rows($query);
if ($jumlah != 0) {
    $value = mysqli_fetch_object($query);
    if (password_verify($data['password'], $value->password)) {
        $pesan['username'] = $value->username;
        $pesan['token'] = time() . '_' . $value->password;
        $pesan['status_login'] = 'berhasil';
    } else {
        $pesan['status_login'] = 'gagal';
    }
} else {
    $pesan['status_login'] = 'gagal';
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
