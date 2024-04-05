import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type data = {
  nama_barang: string;
  kategori: string;
  stok: number;
  harga: number;
};

export const getBarang = async () => {
  try {
    const barang = await prisma.barangs.findMany();
    console.log(barang);
    return barang;
  } catch (err) {
    console.log(err);
  }
};

export const postBarang = async (data: data) => {
  try {
    const barang = await prisma.barangs.create({ data: data });
    console.log(barang);
  } catch (err) {
    console.log(err);
  }
};
