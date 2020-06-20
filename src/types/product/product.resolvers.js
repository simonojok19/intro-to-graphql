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
  Product.findById(args.id).exec()
}

const newProduct = (previous, args, context, info) => {
  return Product.create({ ...args.input, context.user._id })
}

const updateProduct = (previous, args, context, info) => {
  return Product.findOneAndUpdate();
}

const removeProduct = (previous, args, context, info) => {

}

export default {
  Query: {
    products,
    product
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    __resolveType(product) {},
    createdBy(product, args, context, info) {
      return User.findById(product);
    }
  }
}
