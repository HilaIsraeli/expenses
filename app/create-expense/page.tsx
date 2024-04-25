import ExpenseForm from "@/components/ExpenseForm";
import Modal from "@/components/Modal";
import { getCurrentUser } from "../lib/session";

const CreateExpense = async () => {
  const session = await getCurrentUser();

  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Expense</h3>
      <ExpenseForm type="create" session={session} />
    </Modal>
  );
};

export default CreateExpense;

//option 2:

// export default async function CreateExpense() {
//   const session = await getCurrentUser();

//   return (
//     <Modal>
//       <h3 className="modal-head-text">Create a New Expense</h3>
//       <ExpenseForm type="create" session={session} />
//     </Modal>
//   );
// }

// //export default CreateExpense;
