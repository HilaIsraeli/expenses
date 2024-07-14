"use client";
import { SessionInterface, ExpenseInterface } from "@/components.types";
import FormField from "./FormField";
import { FormEvent, useState } from "react";
import Button from "./Button";
import { createNewExpense, updateExpense } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

const ExpenseForm = ({
  type,
  session,
  expense,
}: {
  type: String;
  session: SessionInterface;
  expense?: ExpenseInterface & { mongo?: any; id?: string };
}) => {
  const router = useRouter();
  const [form, setForm] = useState({
    id: expense?.id || "",
    mongo: expense?.mongo || "",
    title: expense?.title || "",
    ammount: expense?.ammount || "",
    wasExpenseToInsurance: expense?.wasExpenseToInsurance || "",
    insuranceCompany: expense?.insuranceCompany || "",
    date: expense?.date || "", //current date and time
  });

  const handleFormChange = (
    key: string,
    value: string | number | Boolean | Date
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault(); //don't reload the page

    try {
      if (type === "create") {
        await createNewExpense(form);
        router.push("/");
        router.refresh();
      }
      if (type === "edit") {
        console.log("1111111 form", form);
        // GraphQL update needs the 'set' key for each field:
        // mutation Mongo {
        //   mongo {
        //     expenseUpdate(input: {title:{set: "abcabc"}}, by: {id: "6665bd05ae06024365d4c51b"}) {
        //       modifiedCount
        //     }
        //   }
        // }
        const updatedForm = Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, { set: value }])
        );
        await updateExpense(updatedForm, expense?.id as string);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating new expense", error);
    }
  };

  return (
    <form className="flexStart form" onSubmit={(e) => handleFormSubmit(e)}>
      <FormField
        title={"Expense Name"}
        placeholder={""}
        state={form.title}
        setState={(value) => handleFormChange("title", value)}
      />
      <FormField
        title={"Ammount"}
        placeholder={""}
        state={form.ammount}
        setState={(value) => handleFormChange("ammount", value)}
      />
      <FormField
        title={"Did you expense this to insurance?"}
        placeholder={"yes / no"}
        state={form.wasExpenseToInsurance}
        setState={(value) => handleFormChange("wasExpenseToInsurance", value)}
      />
      <FormField
        title={"Insurance Company"}
        placeholder={""}
        state={form.insuranceCompany}
        setState={(value) => handleFormChange("insuranceCompany", value)}
      />
      <FormField
        title={"Date"}
        placeholder={String(new Date())}
        state={form.date}
        setState={(value) => handleFormChange("date", value)}
      />
      <Button title={type === "create" ? "Add" : "Edit"} type="submit" />
    </form>
  );
};

export default ExpenseForm;
