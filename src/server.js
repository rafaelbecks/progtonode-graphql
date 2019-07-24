import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import  cors from 'cors';
import models from '../data/models';
import { startDB } from './db';

require('dotenv').config()

const db = startDB();

const context = {
  models,
  db
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...context,
    ...request,
})});

const opts = {
  port: process.env.PORT,
}

server.express.use(cors());

server.start(opts, () => {
  console.log(`Server is running on http://localhost:${opts.port}`)
})