'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

async function getIncomeExpense(): Promise<{
    income?: number,
    expense?: number,
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
        const amounts = transactions.map((transaction) => transaction.amount)
        const income = amounts.filter((item) => item > 0).reduce((acc,item) => acc + item,0)
        const expense = amounts.filter((item) => item < 0).reduce((acc,item) => acc + item,0)
        return { income, expense: Math.abs(expense) };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
       return { error: 'Database Error'}
    }
}

export default getIncomeExpense;