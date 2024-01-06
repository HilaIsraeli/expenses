export const getUserQuery =
    `query GetUser($email: String!) {
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
      `

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


export const createUserMutation = 
`	mutation CreateUser($input: UserCreateInput!) {
    mongo{
    userCreate(input: $input) {
        insertedId
            
            
            }
            }
            }`   
            
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