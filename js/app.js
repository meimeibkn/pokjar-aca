// === LINK CSV GOOGLE SHEETS (RAW) ===
const RAW_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSH8qdOOgYTTzUpMKZx_5E6b_qCKxRZbz1M1-bs7ZGJYKDRvyZTFO14jrzK5woIzA/pub?gid=743569536&single=true&output=csv";

// === CORS PROXY (LEBIH STABIL) ===
const CSV_MAHASISWA =
  "https://api.allorigins.win/raw?url=" + encodeURIComponent(RAW_CSV);



// === FUNGSI BACA CSV ===
async function fetchCSV(url) {
  const response = await fetch(url);
  const text = await response.text();

  return text
    .trim()
    .split("\n")
    .map(row =>
      row
        .split(",")
        .map(cell => cell.replace(/^"|"$/g, "").trim())
    );
}


// === EVENT KLIK TOMBOL ===
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("cekBtn");

  btn.addEventListener("click", async () => {
    const nimInput = document.getElementById("nimInput").value.trim();

    if (!nimInput) {
      alert("NIM belum diisi");
      return;
    }

    const data = await fetchCSV(CSV_MAHASISWA);

    const header = data[0];
    const rows = data.slice(1);

   const nimIndex = header.findIndex(
  h => h.toLowerCase().trim() === "nim"
);


 const mahasiswa = rows.find(
  row => row[nimIndex] && row[nimIndex].trim() === nimInput
);


    if (!mahasiswa) {
      alert("NIM tidak ditemukan di database");
      return;
    }

    alert(
      "NIM ditemukan!\n\n" +
      "Nama: " + mahasiswa[header.indexOf("Nama")] + "\n" +
      "Jurusan: " + mahasiswa[header.indexOf("Jurusan")] + "\n" +
      "IPK Terakhir: " + mahasiswa[header.indexOf("IPK Terakhir")]
    );
  });
});
