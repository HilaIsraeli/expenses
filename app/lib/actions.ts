
import { ExpenseForm } from "@/components.types";
import { getUserQuery, createUserMutation, createExpenseMutation, getAllExpensesMutation, getExpenseByIdQuery, deletelExpenseByIdMutation, updateExpenseMutation, getAllExpensesMutationWithWasExpenseToInsurance, getUserByIdQuery, getUserByNameQuery } from "@/my-mongodb-api/grafql";
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
    //console.log('getUser111', email)
    const variables = {
        email
    }
    const x =  await makeGraphqlRequest(getUserQuery, variables)
    //console.log('xxxxxttt', x)
    return x
}
 


export const getUserByName = async (name: string) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {
        name
    }
    const x =  await makeGraphqlRequest(getUserByNameQuery, variables)
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


export const createNewExpense = async (form : ExpenseForm ) => {
    console.log('1111111 form', form)
    client.setHeader('x-api-key', apiKey)
    const variables = {input:{...form}}
    const x = await makeGraphqlRequest(createExpenseMutation, variables)
    console.log('createNewExpense return', x)
    return x
}


export const updateExpense = async (form : ExpenseForm, id: string ) => {
    console.log('1111111updateExpense form', form)
    client.setHeader('x-api-key', apiKey)
    const variables = {input:{...form}, id: id}
    const x = await makeGraphqlRequest(updateExpenseMutation, variables)
    console.log('updateExpense return', x)
    return x
}

export const fetchAllExpenses = async (endcursor?: string | null, wasExpenseToInsurance?: string | null) => {
    client.setHeader('x-api-key', apiKey)
    console.log('fetchAllExpenses', endcursor, wasExpenseToInsurance)

    let x;
    if (wasExpenseToInsurance) {
        const variables = { endcursor, wasExpenseToInsurance } 
        x = await makeGraphqlRequest(getAllExpensesMutationWithWasExpenseToInsurance, variables)
    }
    else {
        const variables = { endcursor } 
        x = await makeGraphqlRequest(getAllExpensesMutation, variables)   
    }

    
    console.log('getExpenses', x.mongo.expenseCollection.edges)
    return x
}

export const fetchExpenseById = async (id:string) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {
        id
    }
    const x = await makeGraphqlRequest(getExpenseByIdQuery, variables)
    console.log('getExpenseById', x)
    return x
}

export const deleteExpenseById = async (id:string) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {
        id
    }
    const x = await makeGraphqlRequest(deletelExpenseByIdMutation, variables)
    console.log('deleteExpenseById', x)
    return x
}