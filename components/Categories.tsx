"use client";
import { categoryFilters } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Categories = () => {
  const router = useRouter();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleCLickOnCategory = (category: string) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    if (!isButtonDisabled) {
      newSearchParams.set(category, "true");
      setButtonDisabled(true);
    } else {
      newSearchParams.delete(category);
      setButtonDisabled(false);
    }

    const newPathName = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathName);
  };

  return (
    <ul className="flex ml-auto">
      {categoryFilters.map((category, index) => (
        <button
          key={index}
          className={`${
            isButtonDisabled
              ? " text-blue-700 rounded"
              : " text-blue-700 hover:text-blue-700 rounded"
          }`}
          onClick={() => handleCLickOnCategory(category)}
        >
          {isButtonDisabled
            ? "All Expenses"
            : "Show Expensed To Insurance Only"}
        </button>
      ))}
    </ul>
  );
};

export default Categories;
