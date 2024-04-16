import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type laporan = {
  pelanggan: string;
  totalHarga: number;
  cart: [];
};

export const getLaporan = async () => {
  try {
    const laporan = await prisma.laporans.findMany({
      include: {
        cart: true,
      },
    });
    console.log(laporan);
    return laporan;
  } catch (err) {
    console.log(err);
  }
};

export const postLaporan = async (data: laporan) => {
  try {
    const laporan = await prisma.laporans.create({
      data: {
        pelanggan: data.pelanggan,
        totalHarga: data.totalHarga,
        cart: {
          create: data.cart,
        },
      },
    });

    console.log("laporan:", laporan);
  } catch (err) {
    console.log(err);
  }
};
