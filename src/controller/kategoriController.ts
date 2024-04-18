import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type kategori = {
  nama_kategori: string;
};

export const getKategori = async () => {
  try {
    const kategori = await prisma.kategoris.findMany();
    console.log(kategori);
    return kategori;
  } catch (err) {
    console.log(err);
  }
};

export const postKategori = async (data: kategori) => {
  try {
    const kategori = await prisma.kategoris.create({
      data: data,
    });
    console.log(kategori);
  } catch (err) {
    console.log(err);
  }
};

export const deleteKategori = async (id: number) => {
  try {
    const kategori = await prisma.kategoris.delete({
      where: {
        id: id,
      },
    });
    console.log(kategori);
  } catch (err) {
    console.log(err);
  }
};
