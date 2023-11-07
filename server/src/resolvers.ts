import db from "./db/conn.js";
import { ObjectId } from "mongodb";
import { ResolverMap } from "./resolvers-types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

export const resolvers: ResolverMap = {
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    hello: () => "hi",
    async users(_, __, context) {
      let collection = await db.collection("users");
      const users = await collection.find({}).toArray();
      return users;
    },
   
    user: async (root, args, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      let collection = await db.collection("users");

      return await collection.findOne({ _id: user.id });
    },
    
    async record(_, { id }, context) {
      let collection = await db.collection("records");
      let query = { _id: new ObjectId(id) };

      return await collection.findOne(query);
    },
    async records(_, __, context) {
      let collection = await db.collection("records");
      const records = await collection.find({}).toArray();
      return records;
    },
    async sort_users(_, { page=1, limit = 5 }, context) {
      try {
        const collection = await db.collection("records");
        const startIndex = (page ) * limit;
        console.log("startIndex",startIndex);
        const endIndex = page * limit;
        const sortedUsers = await collection
          .find({})
          .skip(startIndex)
          .limit(limit)
          .toArray();
        return sortedUsers;
      } catch (error) {
        console.error("Error sorting users:", error);
        throw new Error("Failed to sort users.");
      }
    },

    async pages(_, { page, limit = 5 }, context) {
      try {
        const collection = await db.collection("records");
        const startIndex = (page - 1) * limit;
        console.log("startIndex",startIndex);

        const endIndex = page * limit;
        console.log("endIndex11",endIndex);
        const sortedUsers = await collection
          .find({})
          .skip(startIndex)
          .limit(limit)
          .toArray();
          console.log("PageUser",sortedUsers)
      // const sortedUsers = await collection.slice(startIndex, endIndex);
        return sortedUsers;
      } catch (error) {
        console.error("Error sorting users:", error);
        throw new Error("Failed to sort users.");
      }
    },
   
  },
  Mutation: {
    register: async (_,args, { req, res }) => {
      const { email, name, password } = args;
      let collection = await db.collection("users");
      let user = await collection.findOne({ email });

      if (user) throw new AuthenticationError("Email already exist");
      if (!name) throw new AuthenticationError("Please input UserName");
      if (!email && !email.includes("@")) throw new AuthenticationError("Please Input Correct Email");
      if (!password && password.length < 6 ) throw new AuthenticationError("Please Input min 6 letters and 1 number Password");
      const hashPassword = await bcrypt.hash(password, 10);
     
      const insert = await collection.insertOne({
        name,
        email,
        password: hashPassword,
      });
      if (insert.acknowledged)
        return { name, email, password, id: insert.insertedId };
      return null;
    },
    login: async (root, args, context, info) => {
      const { name, email, password } = args;
      if (!name) throw new AuthenticationError("Please input UserName");
      if (!email && !email.includes("@")) throw new AuthenticationError("Please Input Correct Email");
      if (!password) throw new AuthenticationError("Please input Password");
      let collection = await db.collection("users");
      const user = await collection.findOne({ email });

      if (!user) throw new AuthenticationError("No user with that email");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new AuthenticationError("Incorrect password");

      const token = jwt.sign(
        {
          id: user.id,
          // role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" }
      );

      return { name, email, password, token };
    },

    
    async pagenation(_, { page, limit = 5 }, context) {
      try {
        const collection = await db.collection("records");
        const startIndex = (page - 1) * limit;
        console.log("startIndex",startIndex);

        const endIndex = page * limit;
        console.log("endIndex11111",endIndex);
        const sortedUsers = await collection
          .find({})
          .skip(startIndex)
          .limit(limit)
          .toArray();
          console.log("PageUser",sortedUsers)
      // const sortedUsers = await collection.slice(startIndex, endIndex);
        return sortedUsers;
      } catch (error) {
        console.error("Error sorting users:", error);
        throw new Error("Failed to sort users.");
      }
    },
    
    async updateRecord(_, args, context) {
      const id = new ObjectId(args.id);
      let query = { _id: new ObjectId(id) };
      let collection = await db.collection("records");
      const update = await collection.updateOne(query, { $set: { ...args } });

      if (update.acknowledged) return await collection.findOne(query);

      return null;
    },

    async createRecord(_, { name, position, score, level }, context) {
      let collection = await db.collection("records");
      const insert = await collection.insertOne({
        name,
        position,
        score,
        level,
      });
      if (insert.acknowledged)
        return { name, position, score, level, id: insert.insertedId };
      return null;
    },
    async deleteRecord(_, { id }, context) {
      let collection = await db.collection("records");
      const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
    },
  },
};

export default resolvers;
