Welcome to my Expenses app!

You can sign-in with your google account and add, edit and delete your expenses. 
You can also filter the expenses already expensed to the insurance company. 
Don't forget to visit your profile 

Enjoy! 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using mongoDB (Atlas), graphQL and Grafbase. 
Deployed to vercel: https://vercel.com/hilaisraelis-projects/expenses

## Getting Started locally
Run the mongo api:
  cd /expenses/my-mongodb-api
  run npx grafbase dev
  
Run the development server:
  cd expenses

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

I used the tutorials: 
- for project:
    https://www.youtube.com/watch?v=986hztrfaSQ&t=15958s
    related github: git@github.com:adrianhajdin/project_nextjs13_flexibble.git

- setup GraphQL with MongoDB and Grafbase:
    https://www.mongodb.com/developer/products/atlas/instant-graphql-apis-mongodb-grafbase/
    https://grafbase.com/docs/config
    https://grafbase.com/docs/resolvers

- grafbase: https://app.grafbase.com/hilaisraeli/expenses/branches/main
  
- related pathfinder (to create graphQL queries and then copy-paste them to code): http://127.0.0.1:4000/
  some queries for example:
  
        mutation CreateUser {
          mongo {
            userCreate(
              input: {
                name:"Hila israeli"
                email: "hilaisraeli3@gmail.com"
                avatarUrl: "http://127.0.0.1:4000/"
                description: "description"
              }
            ) {
              insertedId
            }
          }
        }
        
        mutation Mongo {
          mongo {
            expenseUpdate(input: {title:{set: "abcabc"}}, by: {id: "6665bd05ae06024365d4c51b"}) {
              modifiedCount
            }
          }
        }
        
        query Mongo {
          mongo {
            user(by: {email: "hilaisraeli3@gmail.com"}) {
              avatarUrl
            }
          }
        }

 

- mongo atlas (to view and manage DB) : https://account.mongodb.com/account (login with Google with my email)
  I can browse the collection by navigating to Collects -> Expenses 

- vercel: https://vercel.com/hilaisraelis-projects/expenses

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




<img width="1769" alt="image" src="https://github.com/user-attachments/assets/bdb045a2-4bff-4020-835d-c1617aad0cf8">
<img width="588" alt="image" src="https://github.com/user-attachments/assets/d81243d6-b369-4a4f-b2b6-e58abc8effbd">
<img width="348" alt="image" src="https://github.com/user-attachments/assets/731a077d-d34d-4c47-b298-014dbb07044d">


