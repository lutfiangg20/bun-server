import { Cookie, Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { postBarang, getBarang } from "./controller/barangController";
import { getKategori, postKategori } from "./controller/kategoriController";
import { getPelanggan, postPelanggan } from "./controller/pelangganController";
import { getUser, postUser, signIn } from "./controller/userController";
import { getLaporan, postLaporan } from "./controller/laporanController";
import jwt from "@elysiajs/jwt";

const prisma = new PrismaClient();

type barang = {
  nama_barang: string;
  kategori: string;
  stok: number;
  harga: number;
};

type user = {
  username: string;
  password: string;
};

const app = new Elysia({ prefix: "/api" })
  .use(jwt({ name: "jwt", secret: "rahasia-dong" }))

  .get("/", () => "Hello Elysia")

  .post("/sign", async ({ jwt, cookie: { auth }, body }) => {
    const check = await signIn(body);
    if (check) {
      auth.set({
        value: await jwt.sign(check),
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      return auth.value;
    }
  })

  .get("/signout", async ({ cookie: { auth }, jwt }) => {
    auth.remove();
    return "you're logged out";
  })

  .get("/barang", async ({ jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);
    console.log("profile", profile);

    if (!profile) {
      throw new Error("Unauthorized");
    }

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
    (req: { body: { pelanggan: string; totalHarga: number } }) => {
      postLaporan(req.body);
      return { message: "success" };
    }
  )

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
