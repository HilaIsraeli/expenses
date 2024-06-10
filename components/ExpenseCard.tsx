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
    <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white my-8 mx-4">
      <Link
        href={`/expense/${id}`}
        className="group relative w-full h-full text-lg font-bold text-blue-500"
      >
        <p className="w-full text-center">{expense.title}</p>
      </Link>
    </div>
  );
};
