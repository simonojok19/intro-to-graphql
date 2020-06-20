import { ApolloServer } from 'apollo-server'
import { loadTypeSchema } from './utils/schema'
import { merge } from 'lodash'
import config from './config'
import { connect } from './db'
import product from './types/product/product.resolvers'
import coupon from './types/coupon/coupon.resolvers'
import user from './types/user/user.resolvers'

const types = ['product', 'coupon', 'user']

export const start = async () => {
  const rootSchema = `
    type Cat {
      name: String,
      age: Int!
    }

    type Student {
      id: Int!
      name: String,
      university: String,
      course: String,
      year: Int
    }

    type Query {
      myCat: Cat,
      student: Student,
      hello: String
    }
    schema {
      query: Query
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema],
    resolvers: {
      Query: {
        myCat() {
          return { name: 'Garfiled', age: 34 }
        },
        student() {
          return {
            id: 456775,
            name: 'Ojok Simon Peter',
            university: 'Makerere University',
            course: 'Computer science',
            year: 2020
          }
        },
        hello() {
          return 'Hello'
        }
      }
    },
    context({ req }) {
      // use the authenticate function from utils to auth req, its Async!
      return { user: null }
    }
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: config.port })

  console.log(`GQL server ready at ${url}`)
}
