import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type user = {
  name: string;
  username: string;
  password: string;
};

export const getUser = async () => {
  try {
    const user = await prisma.users.findMany();
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (data: user) => {
  try {
    const user = await prisma.users.create({
      data: data,
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
};
