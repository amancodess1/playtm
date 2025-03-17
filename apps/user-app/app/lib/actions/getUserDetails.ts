"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
export async function getUserDetails() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    const userDetails= await prisma.user.findUnique({
        where: {
            id:userId
        }
    })
    return userDetails;
    
}
export async function getUserBalance(){
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    const userBalance= await prisma.balance.findUnique({
        where: {
            userId:userId
        }
    })
    return userBalance;
}