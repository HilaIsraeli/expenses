import ExpenseForm from "@/components/ExpenseForm";
import Modal from "@/components/Modal";
import { getCurrentUser } from "../../lib/session";
import { ExpenseInterface } from "@/components.types";
import { fetchExpenseById } from "@/app/lib/actions";

const EditExpense = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const expenseFull: ExpenseInterface = (await fetchExpenseById(
    id
  )) as ExpenseInterface;
  const expense = expenseFull.mongo.expense;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Expense</h3>
      <ExpenseForm type="edit" session={session} expense={expense} />
    </Modal>
  );
};

export default EditExpense;
