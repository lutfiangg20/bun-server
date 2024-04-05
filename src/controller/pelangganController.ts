import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type pelanggan = {
  nama: string;
};

export const getPelanggan = async () => {
  try {
    const pelanggan = await prisma.pelanggans.findMany();
    console.log(pelanggan);
    return pelanggan;
  } catch (err) {
    console.log(err);
  }
};

export const postPelanggan = async (data: pelanggan) => {
  try {
    const pelanggan = await prisma.pelanggans.create({
      data: data,
    });
    console.log(pelanggan);
  } catch (err) {
    console.log(err);
  }
};
