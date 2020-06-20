import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

const products = (previous, args, context, info) => {
  Product.find({}).exec()
}

const product = (previous, args, context, info) => {
  return Product.findById(args.id)
  .lean()
  .exec()
}

export default {
  Query: {
    products,
    product
  },
  Mutation: {},
  Product: {
    __resolveType(product) {}
  }
}
