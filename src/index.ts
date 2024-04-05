import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { PrismaClient } from "@prisma/client";
import { postBarang, getBarang } from "./controller/barangController";
import { getKategori, postKategori } from "./controller/kategoriController";
import { getPelanggan, postPelanggan } from "./controller/pelangganController";
import { getUser, postUser } from "./controller/userController";
import { getLaporan, postLaporan } from "./controller/laporanController";

const prisma = new PrismaClient();

type barang = {
  nama_barang: string;
  kategori: string;
  stok: number;
  harga: number;
};

const app = new Elysia({ prefix: "/api" })
  .use(
    jwt({
      name: "jwt",
      secret: "mbak ilil",
      exp: "1d",
    })
  )
  .get("/", () => "Hello Elysia")
  .post(
    "/registrasi",
    (req: { body: { name: string; username: string; password: string } }) => {
      postUser(req.body);
      return "registrasi sukses";
    }
  )
  .get("/barang", () => {
    return getBarang();
  })
  .post("/barang", (req: { body: barang }) => {
    postBarang(req.body);
    return { message: "success" };
  })
  .get("/kategori", () => {
    return getKategori();
  })
  .post("/kategori", (req: { body: { nama_kategori: string } }) => {
    postKategori(req.body);
    return { message: "success" };
  })
  .get("/pelanggan", () => {
    return getPelanggan();
  })
  .post("/pelanggan", (req: { body: { nama: string } }) => {
    postPelanggan(req.body);
    return { message: "success" };
  })
  .get("/user", () => {
    return getUser();
  })
  .post(
    "/user",
    (req: { body: { name: string; username: string; password: string } }) => {
      postUser(req.body);
      return { message: "success" };
    }
  )
  .get("/laporan", () => {
    return getLaporan();
  })
  .post(
    "/laporan",
    (req: { body: { pelanggan: string; totalHarga: number; cart: [] } }) => {
      postLaporan(req.body);
      return { message: "success" };
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
