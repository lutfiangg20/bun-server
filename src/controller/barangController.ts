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

export const postBarang = async (body: data) => {
  const data: data = {
    nama_barang: body.nama_barang,
    kategori: body.kategori,
    stok: Number(body.stok),
    harga: Number(body.harga),
  };
  try {
    const barang = await prisma.barangs.create({ data: data });
    console.log(barang);
  } catch (err) {
    console.log(err);
  }
};

export const deleteBarang = async (id: number) => {
  try {
    const barang = await prisma.barangs.delete({ where: { id: id } });
    console.log(barang);
  } catch (err) {
    console.log(err);
  }
};

export const editBarang = async (id: number, body: data) => {
  const data: data = {
    nama_barang: body.nama_barang,
    kategori: body.kategori,
    stok: Number(body.stok),
    harga: Number(body.harga),
  };
  try {
    const barang = await prisma.barangs.update({
      where: { id: id },
      data: data,
    });
    console.log(barang);
  } catch (err) {
    console.log(err);
  }
};
