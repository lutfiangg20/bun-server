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

export const updateStok = async (
  body: [
    {
      nama_barang: string;
      stok: number;
    }
  ]
) => {
  try {
    /* const barang = await prisma.barangs.updateMany({
      where: { nama_barang: { in: [body.nama_barang] } },
      data: { stok: stok },
    }); */
    body.map(async (item: any) => {
      await prisma.barangs.update({
        where: { nama_barang: item.nama_barang },
        data: { stok: { decrement: item.stok } },
      });
    });
    console.log("success update stok");
  } catch (err) {
    console.log(err);
  }
};
