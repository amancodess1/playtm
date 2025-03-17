"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
export async function getTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    const transactions= await prisma.p2pTransfer.findMany({
        where: {
            toUserId:userId
        }
    })
    return transactions;
    
}
export async function getSentTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    const transactions= await prisma.p2pTransfer.findMany({
        where: {
            fromUserId:userId
        }
    })
    return transactions;
    
}