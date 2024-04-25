import { config, connector, graph, auth } from '@grafbase/sdk'

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone()

const mongo = connector.MongoDB('Mongo', {
  url: g.env('MONGO_ATLAS_API_URL'),
  apiKey: g.env('MONGO_API_KEY'),
  dataSource: g.env('MONGO_DATASOURCE'),
  database: g.env('MONGO_DATABASE'),
})


mongo
  .model('User', {
    name: g.string(),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string(),
  })
  .collection('users').auth(((rules) => {rules.private().read()}))
  
mongo.model('Post', {
  title: g.string(),
  content: g.string(),
})

mongo.model('Expense', {
  title: g.string(),
  ammount: g.string(),
  wasExpenseToInsurance: g.string(),
  insuranceCompany: g.string(),
  date: g.string(),
})

g.datasource(mongo)

// export default config({
//   graph: g,
// })

// Data Sources - https://grafbase.com/docs/connectors
//
// const pg = connector.Postgres('pg', { url: g.env('DATABASE_URL') })
// g.datasource(pg)

// Resolvers - https://grafbase.com/docs/resolvers
//
// g.query('helloWorld', {
//   returns: g.string(),
//   resolver: 'hello-world',
// })

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET'),
})

export default config({
  graph: g,
  // Authentication - https://grafbase.com/docs/auth
  auth: {
    // OpenID Connect
    // const oidc = auth.OpenIDConnect({ issuer: g.env('OIDC_ISSUER_URL') })
    providers: [jwt],
    rules: (rules) => {
      rules.private()
    },
  },
  // Caching - https://grafbase.com/docs/graphql-edge-caching
  // cache: {
  //   rules: [
  //     {
  //       types: ['Query'], // Cache everything for 60 seconds
  //       maxAge: 60,
  //       staleWhileRevalidate: 60
  //     }
  //   ]
  // }
})

