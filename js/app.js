// === OPEN SHEET API (NO CORS, NO PROXY) ===
const DATA_MAHASISWA =
  "https://opensheet.elk.sh/2PACX-1vSH8qdOOgYTTzUpMKZx_5E6b_qCKxRZbz1M1-bs7ZGJYKDRvyZTFO14jrzK5woIzA/Sheet1";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("cekBtn");

  btn.addEventListener("click", async () => {
    const nimInput = document.getElementById("nimInput").value.trim();

    if (!nimInput) {
      alert("NIM belum diisi");
      return;
    }

    try {
      const response = await fetch(DATA_MAHASISWA);
      const data = await response.json();

      const mahasiswa = data.find(
        m => m.NIM && m.NIM.toString().trim() === nimInput
      );

      if (!mahasiswa) {
        alert("NIM tidak ditemukan di database");
        return;
      }

      alert(
        "NIM ditemukan!\n\n" +
        "Nama: " + mahasiswa.Nama + "\n" +
        "Jurusan: " + mahasiswa.Jurusan + "\n" +
        "IPK Terakhir: " + mahasiswa["IPK Terakhir"]
      );

    } catch (err) {
      console.error(err);
      alert("Gagal membaca database");
    }
  });
});
