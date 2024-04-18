/*
  Warnings:

  - You are about to drop the `Pengeluaran` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pengeluaran";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Pengeluarans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_barang" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "jenis" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
