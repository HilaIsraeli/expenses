import { fetchExpenseById } from "@/app/lib/actions";
import { ExpenseForm, ExpenseInterface } from "@/components.types";
import ExpenseActions from "@/components/ExpenseActions";
import RelatedExpenses from "@/components/RelatedExpenses";

const Expense = async ({ params: { id } }: { params: { id: string } }) => {
  const expenseFull: ExpenseForm = (await fetchExpenseById(
    id
  )) as ExpenseInterface;
  const expense = expenseFull.mongo.expense;
  // console.log("expense11111111", expenseFull);
  // console.log("expense11111111", id);
  // console.log("2222", expenseFull.mongo.expense.title);

  return (
    <div className="rounded-lg shadow-lg bg-white p-6 mb-6 max-w-md mx-auto">
      <div className="flex flex-col space-y-4">
        <ExpenseActions expenseId={expense.id} />
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-gray-700">Title:</p>
          <p className="text-gray-600">{expense.title}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-gray-700">Amount:</p>
          <p className="text-gray-600">{expense.ammount}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-gray-700">Date:</p>
          <p className="text-gray-600">{String(expense.date)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-gray-700">
            Was Expense To Insurance:
          </p>
          <p className="text-gray-600">
            {expense.wasExpenseToInsurance ? "Yes" : "No"}
          </p>
        </div>
        {expense.wasExpenseToInsurance && (
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg text-gray-700">
              Insurance Company:
            </p>
            <p className="text-gray-600">{expense.insuranceCompany}</p>
          </div>
        )}
      </div>
      <RelatedExpenses expenseId={id} />
    </div>
  );
};

export default Expense;
