// Mengambil data dari data.json lalu menampilkannya di halaman.
// Untuk mengubah isi website, cukup edit data.json (tidak perlu ubah file ini).

function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

fetch("data.json")
  .then(function (respon) {
    if (!respon.ok) {
      throw new Error("data.json tidak ditemukan");
    }
    return respon.json();
  })
  .then(function (data) {
    document.title = data.judul;
    document.getElementById("judul").textContent = data.judul;
    document.getElementById("subjudul").textContent = data.subjudul;
    document.getElementById("tentang").textContent = data.tentang;
    document.getElementById("email").textContent = data.kontak.email;
    document.getElementById("whatsapp").textContent = data.kontak.whatsapp;
    document.getElementById("footer").textContent = data.footer;

    var wadah = document.getElementById("daftar-produk");
    wadah.innerHTML = "";

    data.produk.forEach(function (item) {
      var kartu = document.createElement("div");
      kartu.className = "kartu";

      var nama = document.createElement("h3");
      nama.textContent = item.nama;

      var harga = document.createElement("p");
      harga.className = "harga";
      harga.textContent = formatRupiah(item.harga);

      var deskripsi = document.createElement("p");
      deskripsi.textContent = item.deskripsi;

      kartu.appendChild(nama);
      kartu.appendChild(harga);
      kartu.appendChild(deskripsi);
      wadah.appendChild(kartu);
    });
  })
  .catch(function (error) {
    document.getElementById("judul").textContent = "Gagal memuat data";
    document.getElementById("subjudul").textContent = error.message;
  });
