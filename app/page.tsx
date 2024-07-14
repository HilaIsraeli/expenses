import {
  ExpenseSearchResult,
  ExpenseSearchResultNode,
} from "@/components.types";
import { fetchAllExpenses } from "./lib/actions";
import { ExpenseCard } from "@/components/ExpenseCard";
import LoadMore from "@/components/LoadMore";
import Categories from "@/components/Categories";

type Props = {
  searchParams: SearchParams;
};

type SearchParams = {
  endcursor?: string | null;
  wasExpenseToInsurance?: string | null;
};

const Home = async ({
  searchParams: { endcursor, wasExpenseToInsurance },
}: Props) => {
  const expensesFull = (await fetchAllExpenses(
    endcursor,
    wasExpenseToInsurance
  )) as ExpenseSearchResult[];
  const expenses = expensesFull.mongo.expenseCollection;
  // console.log("expenses1111", expenses.mongo.expenseCollection.edges);
  // console.log("expenses1111", expenses);

  if (!expenses) {
    return <h1>No expenses found, lets add one</h1>;
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {expenses.edges.map((node: ExpenseSearchResultNode) => (
          // eslint-disable-next-line react/jsx-key
          <ExpenseCard id={node.node.id} expense={node.node} />
        ))}
      </section>
      <h1>Posts</h1>
      <LoadMore
        endCursor={expenses?.pageInfo?.endCursor}
        hasNextPage={expenses?.pageInfo?.hasNextPage}
      />
    </section>
  );
};

export default Home;
