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

// const schema = buildSubgraphSchema({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) });
// const server = new ApolloServer({
//   schema,
// });
// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context:async ({ req }) => {
//       const token = req.header("Authorization");
//       if (token) {
//         return {
//           user: jwt.verify(token, process.env.JWT_SECRET),
//         };
//       }
//       return null;
//     },
//   });
//   await server.start();
//   // await connectDB();

//   server.applyMiddleware({ app, path: "/graphql" });
// }
// startServer();


const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  
  // context: ({ req }) => {
  //   const token = req.header("Authorization");
  //   if (token) {
  //     return {
  //       user: jwt.verify(token, process.env.JWT_SECRET),
  //     };
  //   }
  //   return null;
  // },
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // context: ({ req, res }) => ({ req, res }),
});
// async function startServer() {
//   const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//     // context: ({ req, res }) => ({ req, res }),
//   });
//   await apolloServer.start();
//   console.log(resolvers.Mutation.register);
//   apolloServer.applyMiddleware({ app });
// }
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

app.use("/graphql", 
  cors<cors.CorsRequest>(),
  express.json(), 
  // expressMiddleware(server)
  // expressMiddleware(server, {
  //   context: async ({ req }) => ({ token: req.headers.token }),
  // })
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
    // context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });
// Modified server startup
await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
console.log(`🚀 Server ready at http://localhost:5050/`);
