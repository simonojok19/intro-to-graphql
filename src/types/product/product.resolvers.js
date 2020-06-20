import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

export default {
  Query: {
    getData(_, args, context, info) {
      throw Error()
    }
  },
  Mutation: {},
  Product: {
    __resolveType(product) {}
  }
}
