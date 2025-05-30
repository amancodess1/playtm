"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  
  if (!from) {
    return { mess: "Unauthorized" };
  }

  const toUser = await prisma.user.findFirst({
    where: { number: to }
  });

  if (!toUser) {
    return { mess: "User not found" };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Ensure balance row is locked for consistency
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
        select: { amount: true }
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient balance");
      }

      // Perform the transfer
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        }
      });

      return { mess: "Successful" };
    });

    return result;
  } catch (error:any) {
    console.error("Transaction error:", error);
    return { mess: error.message || "Transaction failed" };
  }
}
