"use client";
import { useState } from "react";
import Image from "next/image";
import { deleteExpenseById } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  expenseId: string;
};

const ExpenseActions = ({ expenseId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteExpense = async () => {
    setIsDeleting(true);
    try {
      await deleteExpenseById(expenseId);
      router.push("/");
    } catch (error) {
      console.error("Error deleting expense", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-expense/${expenseId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        disabled={isDeleting}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        onClick={handleDeleteExpense}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ExpenseActions;
