import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import type { LoginInput, RegisterInput } from "./auth.schema";


export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { phone: data.phone },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === data.email) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    throw new Error("PHONE_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });
  return user;
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordMatches = await bcrypt.compare(
    data.password,
    user.password,
  );

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}