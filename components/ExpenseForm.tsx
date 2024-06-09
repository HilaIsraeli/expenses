"use client";
import { SessionInterface } from "@/components.types";
import FormField from "./FormField";
import { FormEvent, useState } from "react";
import Button from "./Button";
import { createNewExpense } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

const ExpenseForm = ({
  type,
  session,
}: {
  type: String;
  session: SessionInterface;
}) => {
  const router = useRouter();
  const [form, setForm] = useState({
    //id: "",
    title: "",
    ammount: "",
    wasExpenseToInsurance: "",
    insuranceCompany: "",
    date: "", //current date and time
  });

  const handleFormChange = (
    key: string,
    value: string | number | Boolean | Date
  ) => {
    console.log("1111111 key", key);
    setForm({ ...form, [key]: value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    console.log("1111111 form", form);
    e.preventDefault(); //don't reload the page

    try {
      if (type === "create") {
        await createNewExpense(form);
        router.push("/");
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
      <Button title="Add" type="submit" />
    </form>
  );
};

export default ExpenseForm;
