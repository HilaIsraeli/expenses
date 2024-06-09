export const getUserQuery = `query GetUser($email: String!) {
        mongo {
          user(
            by: {email: $email}
          ) {
            id
            name
            email
            avatarUrl
            description
          }
        }
      }
      `;

      export const getExpenseByIdQuery =`query GetExpenseById($id: ID){
  mongo {
    expense(by: {id: $id}) {
      ammount
      date
      id
      insuranceCompany
      title
      wasExpenseToInsurance
    }
  }
}`;

export const getAllExpensesMutation = `query GetExpenses() {
        mongo {
          expenseCollection(last: 10) {
            edges {
              node {
                id
                title
                ammount
                wasExpenseToInsurance
                insuranceCompany
                date
              }
            }
          }
        }
      }
      `;

// export const getAllExpensesMutation =
//     `query GetExpenses() {
//         mongo {
//           expense() {
//             id
//             title
//             ammount
//             wasExpenseToInsurance
//             insuranceCompany
//             date
//           }
//         }
//       }
//       `

/*


query Mongo {
        mongo {
          user(
            by: {email: "hilaisraeli3@gmail.com",}
          ) {
            id
            name
            email
            avatarUrl
            description
            address {
              street
            }
          }
        }
      }
      */

export const createUserMutation = `	mutation CreateUser($input: UserCreateInput!) {
    mongo{
    userCreate(input: $input) {
        insertedId
            
            
            }
            }
            }`;

export const createExpenseMutation = `	mutation CreateExpense($input: ExpenseCreateInput!) {
    mongo{
    expenseCreate(input: $input) {
        insertedId
            
            
            }
            }
            }`;


/*
      mutation Mongo {
  mongo {
    userCreate(
      input: {
        name: "Hila israeli"
        email: "hilaisraeli3@gmail.com"
        avatarUrl: "http://127.0.0.1:4000/"
        description: "description"
      }
    ) {
      insertedId
    }
  }
}

      */
