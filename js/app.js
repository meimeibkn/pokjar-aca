document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("cekBtn");

  btn.addEventListener("click", () => {
    const nimInput = document.getElementById("nimInput").value.trim();

    if (!nimInput) {
      alert("NIM belum diisi");
      return;
    }

    // === KONFIGURASI FINAL ===
    const SPREADSHEET_ID = "1SvU-xNrzFI9_VeOyjbpEx4oO5g9G45aR";
    const SHEET_NAME = "Database Mahasiswa";

    // Asumsi urutan kolom di 'Database Mahasiswa':
    // A = NIM
    // B = Nama
    // C = Jurusan
    // D = Fakultas
    // E = Status RPL
    // F = Status SIPAS
    // G = Semester Berjalan
    // H = Semester Mendatang
    // I = IPK Terakhir
    // J = IPS Terakhir
    // K = Total SKS Ditempuh
    // L = Total SKS Lulus

    const query = `
      select A, B, C, D, I
      where A = '${nimInput}'
      label
        A 'NIM',
        B 'Nama',
        C 'Jurusan',
        D 'Fakultas',
        I 'IPK Terakhir'
    `;

    const url =
      "https://docs.google.com/spreadsheets/d/" +
      SPREADSHEET_ID +
      "/gviz/tq?sheet=" +
      encodeURIComponent(SHEET_NAME) +
      "&tq=" +
      encodeURIComponent(query);

    fetch(url)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(
          text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
        );

        const rows = json.table.rows;

        if (!rows || rows.length === 0) {
          alert("NIM tidak ditemukan di database");
          return;
        }

        const data = rows[0].c;
const mahasiswaData = {
  nim: data[0].v,
  nama: data[1].v,
  jurusan: data[2].v,
  fakultas: data[3].v,
  ipk: data[4].v
};

// Simpan ke sessionStorage
sessionStorage.setItem(
  "pokjarMahasiswa",
  JSON.stringify(mahasiswaData)
);

// Pindah ke halaman hasil
window.location.href = "hasil.html";
      })
      .catch(err => {
        console.error(err);
        alert("Gagal membaca database");
      });
  });
});
