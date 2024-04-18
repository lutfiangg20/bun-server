import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type pengeluaran = {
  nama_barang: string;
  harga: number;
  jumlah: number;
  total_harga: number;
  kategori: string;
};

export const getPengeluaran = async () => {
  try {
    const pengeluaran = await prisma.pengeluarans.findMany();
    return pengeluaran;
  } catch (err) {
    console.log(err);
  }
};
export const postPengeluaran = async (body: pengeluaran) => {
  const data = {
    nama_barang: body.nama_barang,
    kategori: body.kategori,
    harga: Number(body.harga),
    jumlah: Number(body.jumlah),
    total_harga: Number(body.total_harga),
  };
  try {
    const pengeluaran = await prisma.pengeluarans.create({
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};
