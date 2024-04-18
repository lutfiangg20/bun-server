/*
  Warnings:

  - The primary key for the `Carts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Carts` table. All the data in the column will be lost.
  - Added the required column `id_cart` to the `Carts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carts" (
    "id_cart" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_Carts" ("createdAt", "harga", "jenis", "laporan_id", "nama_barang", "pelanggan", "stok", "total_harga", "updatedAt") SELECT "createdAt", "harga", "jenis", "laporan_id", "nama_barang", "pelanggan", "stok", "total_harga", "updatedAt" FROM "Carts";
DROP TABLE "Carts";
ALTER TABLE "new_Carts" RENAME TO "Carts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
