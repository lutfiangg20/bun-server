-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pengeluarans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_barang" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pengeluarans" ("createdAt", "harga", "id", "jumlah", "kategori", "nama_barang", "total_harga", "updatedAt") SELECT "createdAt", "harga", "id", "jumlah", "kategori", "nama_barang", "total_harga", "updatedAt" FROM "Pengeluarans";
DROP TABLE "Pengeluarans";
ALTER TABLE "new_Pengeluarans" RENAME TO "Pengeluarans";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
