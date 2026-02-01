document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("cekBtn");

  btn.addEventListener("click", () => {
    const nimInput = document.getElementById("nimInput").value.trim();

    if (!nimInput) {
      alert("NIM belum diisi");
      return;
    }

    // Spreadsheet ID (BUKAN yang 2PACX, tapi ID asli)
    const SPREADSHEET_ID = "PASTE_ID_DI_SINI";

    // Nama sheet HARUS PERSIS
    const SHEET_NAME = "PASTE_NAMA_SHEET_DI_SINI";

    const query = `
      select A, B, C, D, E
      where A = '${nimInput}'
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

        alert(
          "NIM ditemukan!\n\n" +
          "Nama: " + data[1].v + "\n" +
          "Jurusan: " + data[2].v + "\n" +
          "IPK Terakhir: " + data[4].v
        );
      })
      .catch(err => {
        console.error(err);
        alert("Gagal membaca database");
      });
  });
});
