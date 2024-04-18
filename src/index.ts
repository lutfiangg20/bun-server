import { Cookie, Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import {
  postBarang,
  getBarang,
  deleteBarang,
  editBarang,
} from "./controller/barangController";
import {
  deleteKategori,
  getKategori,
  postKategori,
} from "./controller/kategoriController";
import {
  deletePelanggan,
  getPelanggan,
  postPelanggan,
} from "./controller/pelangganController";
import { getUser, postUser, signIn } from "./controller/userController";
import { getLaporan, postLaporan } from "./controller/laporanController";
import jwt from "@elysiajs/jwt";
import cors from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";

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

const api = new Elysia({ prefix: "/api" })
  .use(cors({ credentials: true }))
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

      return { token: auth.value };
    }
  })

  .get("/signout", async ({ cookie: { auth }, jwt }) => {
    auth.remove();
    return "you're logged out";
  })

  .get("/barang", async ({ jwt, headers: { authorization } }) => {
    const profile = await jwt.verify(authorization);
    if (!profile) {
      throw new Error("Unauthorized");
    }
    return getBarang();
  })

  .post("/barang", (req: { body: barang }) => {
    postBarang(req.body);
    return { message: "success" };
  })

  .delete("/barang/:id", (req: { params: { id: number } }) => {
    const id = Number(req.params.id);
    return deleteBarang(id);
  })

  .put("/barang/:id", (req: { params: { id: number }; body: barang }) => {
    const id = Number(req.params.id);
    const body = req.body;
    return editBarang(id, body);
  })

  .get("/kategori", () => {
    return getKategori();
  })

  .post("/kategori", (req: { body: { nama_kategori: string } }) => {
    postKategori(req.body);
    return { message: "success" };
  })

  .delete("/kategori/:id", (req: { params: { id: number } }) => {
    deleteKategori(Number(req.params.id));
    return { message: "success" };
  })

  .get("/pelanggan", () => {
    return getPelanggan();
  })

  .post("/pelanggan", (req: { body: { nama: string } }) => {
    postPelanggan(req.body);
    return { message: "success" };
  })

  .delete("/pelanggan/:id", (req: { params: { id: number } }) => {
    deletePelanggan(Number(req.params.id));
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
  `🦊 Elysia is running at ${api.server?.hostname}:${api.server?.port}`
);
