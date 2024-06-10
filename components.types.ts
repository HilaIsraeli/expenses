import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
};

export interface ExpenseInterface {
    title: string;
    description: string;
    id: string;
    ammount: string | number,
    wasExpenseToInsurance: string | Boolean,
    insuranceCompany: string,
    date: string | Date,
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}


export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
      edges: { node: ExpenseInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ExpenseForm {
  id: string,
  title: string,
  ammount: string | number,
  wasExpenseToInsurance: string | Boolean,
  insuranceCompany: string,
  date: string | Date,
}


export type ExpenseSearchResultNode = {
  node: ExpenseForm;
};

export type ExpenseSearchResult = {
  edges: ExpenseSearchResultNode[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
};