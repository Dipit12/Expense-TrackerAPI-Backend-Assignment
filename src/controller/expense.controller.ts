import { Request, Response } from "express";
import prisma from "../utils/connectToDB";

const addExpense = async (req: Request, res: Response) => {
    try {
      const user_id = (req as any).user?.id;
  
      if (!user_id) {
        return res.status(400).json({ error: "User not authenticated" });
      }
  
      const expense = await prisma.expenses.create({
        data: {
          amount: 1000,
          category_id: 2,
          date: new Date("2025-01-23T00:00:00.000Z"),
          notes: "these are notes for this expense",
          user_id: user_id, 
        },
      });
  
      res.json({ message: "Expense added successfully", expense });
    } catch (err) {
      console.error("Error adding expense", err);
      res.status(500).json({ error: "Error adding expense" });
    }
  };
  
const getAllExpenses = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  try {
    const expenses = await prisma.expenses.findMany({
      where: { user_id },
    });
    res.status(200).json(expenses);
  } catch (err) {

    console.log("Error fetching expenses", err);
    return res.status(500).json({
      msg: "Error fetching expenses",
    });
  }
};

const getSpecificExpense = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  const expense_id = parseInt(req.params.id);

  try {
    const expense = await prisma.expenses.findFirst({
      where: { ex_id: expense_id, user_id },
    });

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    return res.status(200).json(expense);
  } catch (err) {
    console.log("Error fetching the expense", err);
    return res.status(500).json({
      msg: "Error fetching the expense",
    });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  const expense_id = parseInt(req.params.id);

  try {
    const expense = await prisma.expenses.findFirst({
      where: { ex_id: expense_id, user_id },
    });

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    const { amount, category_id, date, notes } = req.body;

    const updatedExpense = await prisma.expenses.update({
      where: { ex_id: expense_id },
      data: {
        amount,
        category_id,
        date: date ? new Date(date) : undefined,
        notes,
      },
    });

    return res.status(200).json({
      msg: "Expense updated successfully",
      updatedExpense,
    });
  } catch (err) {
    console.log("Error updating expense", err);
    return res.status(500).json({
      msg: "Error updating expense",
    });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  const user_id = (req as any).user?.id;
  const expense_id = parseInt(req.params.id);

  try {
    const expense = await prisma.expenses.findFirst({
      where: { ex_id: expense_id, user_id },
    });

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    const deletedExpense = await prisma.expenses.delete({
      where: { ex_id: expense_id },
    });

    res.status(200).json({
      msg: "Expense deleted successfully",
      deletedExpense,
    });
  } catch (err) {
    console.log("Error deleting an expense", err);
    return res.status(500).json({
      msg: "Error deleting an expense",
    });
  }
};

export {
  addExpense,
  getAllExpenses,
  getSpecificExpense,
  updateExpense,
  deleteExpense,
};
