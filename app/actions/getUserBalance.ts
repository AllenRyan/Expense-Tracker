'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

async function getUserBalance(): Promise<{
    balance?: number,
    error?: string;
}> {
    const { userId } = await auth();
    if (!userId) {
        return {error: 'User not found'}

    }
    try {
        const transactions = await db.transaction.findMany({
            where: { userId }
        });
        const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
        return { balance }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
       return { error: 'Database Error'}
    }
}

export default getUserBalance;