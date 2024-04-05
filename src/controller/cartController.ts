import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type laporan = {
  pelanggan: string;
  totalHarga: number;
};

type cart = {
  laporan_id: number;
  nama_barang: string;
  harga: number;
  stok: number;
  total_harga: number;
  jenis: string;
};

export const getCart = async () => {
  try {
    const cart = await prisma.carts.findMany();
    console.log(cart);
    return cart;
  } catch (err) {
    console.log(err);
  }
};

export const postCart = async (data: cart) => {
  try {
    const cart = await prisma.carts.create({
      data: data,
    });
    console.log(cart);
  } catch (err) {
    console.log(err);
  }
};
