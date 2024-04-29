import { ExpenseForm } from "@/components.types";
import { fetchAllExpenses } from "./lib/actions";
import { ExpenseCard } from "@/components/ExpenseCard";

type ExpenseSearchResultNode = {
  node: ExpenseForm;
};

type ExpenseSearchResult = {
  edges: ExpenseSearchResultNode[];
};

const Home = async () => {
  const expenses = (await fetchAllExpenses()) as ExpenseSearchResult[];
  //console.log("expenses", expenses.mongo.expenseCollection.edges);

  if (!expenses) {
    return <h1>No expenses found, lets add one</h1>;
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="projects-grid">
        {expenses.mongo.expenseCollection.edges.map(
          (node: ExpenseSearchResultNode) => (
            <ExpenseCard key={node.node.id} expense={node.node} />
          )
        )}
      </section>
      <h1>Posts</h1>
      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
