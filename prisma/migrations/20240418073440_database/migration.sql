-- CreateTable
CREATE TABLE "Pengeluaran" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_barang" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "jenis" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
