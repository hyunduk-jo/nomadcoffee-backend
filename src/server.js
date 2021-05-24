import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';
import cors from 'cors';
import { resolvers, typeDefs } from './schema';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express()

app.use(morgan('dev'));
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))