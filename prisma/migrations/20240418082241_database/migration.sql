/*
  Warnings:

  - You are about to drop the column `jenis` on the `Pengeluarans` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pengeluarans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_barang" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL DEFAULT kat,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pengeluarans" ("createdAt", "harga", "id", "jumlah", "nama_barang", "total_harga", "updatedAt") SELECT "createdAt", "harga", "id", "jumlah", "nama_barang", "total_harga", "updatedAt" FROM "Pengeluarans";
DROP TABLE "Pengeluarans";
ALTER TABLE "new_Pengeluarans" RENAME TO "Pengeluarans";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
