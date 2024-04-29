
import { ExpenseForm } from "@/components.types";
import { getUserQuery, createUserMutation, createExpenseMutation, getAllExpensesMutation } from "@/my-mongodb-api/grafql";
import { GraphQLClient } from "graphql-request"

const isProduction = process.env.NODE_ENV === "production";
console.log("isProduction", isProduction);

const apiUrl = isProduction ? process.env.MONGO_ATLAS_API_URL || '' :  "http://127.0.0.1:4000/graphql";
const apiKey = isProduction ? process.env.MONGO_API_KEY || '' : "TODO?";
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL || '' : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);


const makeGraphqlRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUser = async (email: string) => {
    client.setHeader('x-api-key', apiKey)
    console.log('getUser', email)
    const variables = {
        email
    }
    const x =  await makeGraphqlRequest(getUserQuery, variables)
    console.log('xxxxx', x)
    return x
}
 
export const createUser = async (name: string, email: string, avatarUrl: string, description: string) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {
        input: {name,
        email,
        avatarUrl,
        description
        }
    }
    const x = await makeGraphqlRequest(createUserMutation, variables)
    console.log('yyyy', x)
    return x
}


export const createNewExpense = async (form : ExpenseForm) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {input:{...form}}
    const x = await makeGraphqlRequest(createExpenseMutation, variables)
    console.log('createNewExpense return', x)
    return x
}

export const fetchAllExpenses = async () => {
    client.setHeader('x-api-key', apiKey)
    const x = await makeGraphqlRequest(getAllExpensesMutation)
    console.log('getExpenses', x)
    return x
}
