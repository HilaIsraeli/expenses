import { fetchAllExpenses, getUser } from "@/app/lib/actions";
import { getCurrentUser } from "@/app/lib/session";
import {
  ExpenseSearchResult,
  ExpenseSearchResultNode,
  UserProfile,
} from "@/components.types";
import Link from "next/link";

const RelatedExpenses = async ({ userId, expenseId }) => {
  const expenses = (await fetchAllExpenses()) as ExpenseSearchResult[];
  const user = await getCurrentUser();
  const userName = user.user.name;

  const filteredExpenses = expenses.mongo.expenseCollection.edges.filter(
    (node: ExpenseSearchResultNode) => node.node.id != expenseId
  );
  console.log("filteredExpenses", filteredExpenses.length);

  if (filteredExpenses.length === 0) {
    return <h1>No related expenses found</h1>;
  }

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold text-gray-700">More by {userName}:</p>
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        {filteredExpenses.map((node: ExpenseSearchResultNode) => (
          <div
            key={node.node.id}
            className="flex items-center justify-center p-4 bg-blue-300 shadow-lg rounded-lg"
          >
            <Link
              href={`/expense/${node?.node?.id}`}
              className="w-full text-center group relative "
            >
              <div className="text-gray-700 group-hover:text-blue-600">
                <p>{node.node.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedExpenses;
