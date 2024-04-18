/*
  Warnings:

  - Added the required column `pelanggan` to the `Carts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "laporan_id" INTEGER NOT NULL,
    "pelanggan" TEXT NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "jenis" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Carts_laporan_id_fkey" FOREIGN KEY ("laporan_id") REFERENCES "Laporans" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Carts" ("createdAt", "harga", "id", "jenis", "laporan_id", "nama_barang", "stok", "total_harga", "updatedAt") SELECT "createdAt", "harga", "id", "jenis", "laporan_id", "nama_barang", "stok", "total_harga", "updatedAt" FROM "Carts";
DROP TABLE "Carts";
ALTER TABLE "new_Carts" RENAME TO "Carts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
