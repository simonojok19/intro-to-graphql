import { ApolloServer } from 'apollo-server'
import { loadTypeSchema } from './utils/schema'
import { merge } from 'lodash'
import config from './config'
import { connect } from './db'
import product from './types/product/product.resolvers'
import coupon from './types/coupon/coupon.resolvers'
import user from './types/user/user.resolvers'
import { Query } from 'mongoose'

const types = ['product', 'coupon', 'user']

export const start = async () => {
  const rootSchema = `
    type Cat {
      name: String
      age: Int!
      ower: Owner
    }

    type Owner {
      name: String
      cat: Cat
    }

    type Query {
      cat(name: String!): Cat!
      owner(name: String!): Owner!
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
        cat(first, args, context, info) {
          console.log('In Query.cat()')
          return {}
        },
        owner(first, args, context, info) {
          console.log('In Query.owner()')
          return {}
        },
        Cat: {
          name(previous, args, constext, info) {
            console.log('In Query.Cat.name()')
            return 'Donie'
          },
          age(previous, args, context, info) {
            console.log('In Query.Cat.age()')
            return 2
          },
          owner(previous, args, constex, info) {
            console.log('In Query.Cat.owner()')
            return {}
          }
        },
        Owner: {
          name(previous, args, context, info) {
            console.log('In Query.Owner.name()')
            return 'Simon Ojok'
          },
          cat(previous, args, context, infor) {
            console.log('In Query.Owner.cat()')
            return {}
          }
        }
      }
    },
    context({ req }) {
      // use the authenticate function from utils to auth req, its Async!
      return { user: null }
    }
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: 4500 })

  console.log(`GQL server ready at ${url}`)
}
