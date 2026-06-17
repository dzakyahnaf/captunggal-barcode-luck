/**
 * ============================================================
 * REROLL PEMENANG — Jalankan dari Google Apps Script Editor
 * ============================================================
 * 
 * Cara pakai:
 * 1. Buka Google Sheet → Extensions → Apps Script
 * 2. Buat file baru, paste kode ini
 * 3. Jalankan fungsi `rerollWinners` dari toolbar
 * 4. Cek sheet — kolom Status & Kode Pemenang akan terupdate
 * 
 * KONFIGURASI: Ubah nilai di bawah sesuai kebutuhan
 */

// ====== KONFIGURASI ======
var WIN_RATE_PERCENT = 5;    // Peluang menang per orang (5%)
// Atau jika ingin jumlah pemenang tetap, gunakan fungsi `rerollFixedWinners` di bawah
var FIXED_WINNER_COUNT = 25; // Jumlah pemenang tetap (untuk fungsi rerollFixedWinners)
// ==========================

/**
 * OPSI 1: Reroll dengan peluang 5% per orang (jumlah pemenang bervariasi)
 * Diperkirakan ~25 pemenang dari 496 peserta
 */
function rerollWinners() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    SpreadsheetApp.getUi().alert("Sheet kosong atau hanya ada header.");
    return;
  }
  
  // Kolom: A=Tanggal, B=ID, C=IP, D=Nama, E=Telepon, F=Instagram, G=Status, H=Kode Pemenang, I=Urutan
  var dataRange = sheet.getRange(2, 1, lastRow - 1, 9); // Skip header
  var values = dataRange.getValues();
  
  var winnerCount = 0;
  var totalRows = values.length;
  
  for (var i = 0; i < totalRows; i++) {
    var roll = Math.random() * 100;
    var won = roll < WIN_RATE_PERCENT;
    
    var rowIndex = i + 2; // +2 karena skip header (baris 1) dan 0-indexed
    
    if (won) {
      var code = generateCode();
      sheet.getRange(rowIndex, 7).setValue("Menang");     // Kolom G = Status
      sheet.getRange(rowIndex, 8).setValue(code);          // Kolom H = Kode Pemenang
      winnerCount++;
    } else {
      sheet.getRange(rowIndex, 7).setValue("Kalah");
      sheet.getRange(rowIndex, 8).setValue("-");
    }
  }
  
  SpreadsheetApp.getUi().alert(
    "Reroll Selesai!\n\n" +
    "Total peserta: " + totalRows + "\n" +
    "Pemenang: " + winnerCount + "\n" +
    "Win rate aktual: " + (winnerCount / totalRows * 100).toFixed(1) + "%"
  );
}

/**
 * OPSI 2: Pilih jumlah pemenang TETAP secara acak (direkomendasikan)
 * Menggunakan Fisher-Yates shuffle untuk memilih pemenang secara fair
 */
function rerollFixedWinners() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    SpreadsheetApp.getUi().alert("Sheet kosong atau hanya ada header.");
    return;
  }
  
  var totalRows = lastRow - 1; // Tanpa header
  var winnerCount = Math.min(FIXED_WINNER_COUNT, totalRows);
  
  // Buat array index [0, 1, 2, ..., totalRows-1]
  var indices = [];
  for (var i = 0; i < totalRows; i++) {
    indices.push(i);
  }
  
  // Fisher-Yates shuffle — pilih winnerCount pemenang secara acak & fair
  for (var i = totalRows - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }
  
  // Ambil N index pertama sebagai pemenang
  var winnerIndices = {};
  for (var i = 0; i < winnerCount; i++) {
    winnerIndices[indices[i]] = true;
  }
  
  // Update sheet
  for (var i = 0; i < totalRows; i++) {
    var rowIndex = i + 2;
    
    if (winnerIndices[i]) {
      var code = generateCode();
      sheet.getRange(rowIndex, 7).setValue("Menang");
      sheet.getRange(rowIndex, 8).setValue(code);
    } else {
      sheet.getRange(rowIndex, 7).setValue("Kalah");
      sheet.getRange(rowIndex, 8).setValue("-");
    }
  }
  
  SpreadsheetApp.getUi().alert(
    "Reroll (Fixed) Selesai!\n\n" +
    "Total peserta: " + totalRows + "\n" +
    "Pemenang dipilih: " + winnerCount + " orang"
  );
}

/**
 * Generate kode unik 8 karakter (A-Z, 2-9, tanpa karakter mirip)
 */
function generateCode() {
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var code = "";
  for (var i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
