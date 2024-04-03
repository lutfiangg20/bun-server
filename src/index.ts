import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { postBarang, getBarang } from "./handler";
const prisma = new PrismaClient();

type data = {
  nama_barang: string;
  kategori: string;
  stok: number;
  harga: number;
};

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello Elysia")
  .get("/barang", () => {
    return getBarang();
  })
  .post("/barang", (req: { body: data }) => {
    postBarang(req.body);
    return req.body;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
