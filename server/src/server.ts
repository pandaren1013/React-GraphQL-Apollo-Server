import express, { json } from "express";
import cors from "cors";
import gql from "graphql-tag";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import resolvers from "./resolvers.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import http from 'http';
import jwt from "jsonwebtoken";

import { fileURLToPath } from 'url';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

interface MyContext {
  token?: string;
}
//highlight-start
const typeDefs = gql(
  readFileSync(resolve(__dirname, "..", "schema.graphql"), {
    encoding: "utf-8",
  })
);
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  
});

await server.start();

app.use("/graphql", 
  cors<cors.CorsRequest>(),
  express.json(), 
 
  expressMiddleware(server, {
    context:async ({ req }) => {
      const token = req.header("Authorization");
      if (token) {
        return {
          user: jwt.verify(token, process.env.JWT_SECRET),
        };
      }
      return null;
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
console.log(`🚀 Server ready at http://localhost:5050/`);
