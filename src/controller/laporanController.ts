import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type laporan = {
  pelanggan: string;
  totalHarga: number;
};

export const getLaporan = async () => {
  try {
    const laporan = await prisma.laporans.findMany();
    console.log(laporan);
    return laporan;
  } catch (err) {
    console.log(err);
  }
};

export const postLaporan = async (data: laporan) => {
  try {
    const laporan = await prisma.laporans.create({
      data: data,
    });

    console.log(laporan);
  } catch (err) {
    console.log(err);
  }
};
