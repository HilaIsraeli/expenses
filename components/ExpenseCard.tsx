import { ExpenseForm } from "@/components.types";
import Link from "next/link";

export const ExpenseCard = ({
  id,
  expense,
}: {
  id: string;
  expense: ExpenseForm;
}) => {
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/expense/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        {/* <div className="hidden group-hover:flex profile_card-title"> */}
        <p className="w-full">{expense.title}</p>
        {/* </div> */}
      </Link>
      {/* <p className="font-bold text-lg">Amount:</p>
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
        )} */}
      {/* </div> */}
    </div>
  );
};
