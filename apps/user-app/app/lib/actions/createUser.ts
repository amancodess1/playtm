"use server"
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export async function createUser(name: string, phone: string, password: string, email: string) {
  // Validate inputs
  if (!name || !phone || !password || !email) {
    return { msg: "All fields are required", ok: false };
  }

  // Check if user exists (single query with OR condition)
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ number: phone }, { email: email }],
    },
  });

  if (existingUser) {
    return { msg: "User already exists", ok: false };
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with initial balance
    await prisma.user.create({
      data: {
        name,
        number: phone,
        email,
        password: hashedPassword,
        Balance: {
          create: {
            amount: 20000,
            locked: 0,
          },
        },
      },
    });

    return { msg: "User successfully created", ok: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { msg: "Internal server error", ok: false };
  }
}
