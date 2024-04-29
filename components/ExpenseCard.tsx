import { ExpenseForm } from "@/components.types";
import Link from "next/link";

export const ExpenseCard = ({ expense }: { expense: ExpenseForm }) => {
  return (
    <div className="rounded-lg shadow-lg bg-white p-4 mb-4">
      <div className="flex flex-col space-y-2">
        <p className="font-bold text-lg">Title:</p>
        <p>{expense.title}</p>
        <p className="font-bold text-lg">Amount:</p>
        <p>{expense.ammount}</p>
        <p className="font-bold text-lg">Date:</p>
        <p>{String(expense.date)}</p>
        <p className="font-bold text-lg">Was Expense To Insurance:</p>
        <p>{expense.wasExpenseToInsurance ? "Yes" : "No"}</p>
        {expense.wasExpenseToInsurance && (
          <>
            <p className="font-bold text-lg">Insurance Company:</p>
            <p>{expense.insuranceCompany}</p>
          </>
        )}
      </div>
    </div>
  );
};
