import db from "./db/conn.js";
import { ObjectId } from "mongodb";
import User from "./model/User";
import { ResolverMap } from "./resolvers-types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import User from './models/User';
import  UserInputError  from "@apollo/server";

// import {validateRegisterInput, validateLoginInput} from './utils/validator';


const resolvers = {
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
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

    async sort_users(_, { page = 1, limit = 5, sortBy = "name" }, context) {
      try {
        const collection = await db.collection("records");
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const sortField = sortBy === "name" ? "name" : sortBy === "age" ? "age" : "createdAt"; // Assuming "createdAt" field exists
    
        const sortedUsers = await collection.find({})
          .sort({ [sortField]: 1 })
          .skip(startIndex)
          .limit(limit)
          .toArray();
          
        return sortedUsers;
      } catch (error) {
        console.error("Error sorting users:", error);
        throw new Error("Failed to sort users.");
      }
    }
    // async sort_users(_,  { page = 1, limit = 3, sortBy = "name" },context) {
    //   let collection = await db.collection("records");
    //   // const sort_users = await collection.find({}).toArray();
    //   const startIndex = (page - 1) * limit;
    //   const endIndex = page * limit;
    //   const sortedUsers = collection.sort((a, b) =>
    //     a[sortBy] > b[sortBy] ? 1 : -1
    //   );
    //   return sortedUsers.slice(startIndex, endIndex);
    //   // return sort_users;
    // },
    // users: (parent, { page = 1, limit = 3, sortBy = "name" }) => {
    //   // Apply pagination and sorting
    //   const startIndex = (page - 1) * limit;
    //   const endIndex = page * limit;
    //   const sortedUsers = users.sort((a, b) =>
    //     a[sortBy] > b[sortBy] ? 1 : -1
    //   );
    //   return sortedUsers.slice(startIndex, endIndex);
    // },
  },
  Mutation: {
    register: async (_, { email, password }, { req, res }) => {
      const hashPassword = await bcrypt.hash(password, 10);
      let collection = await db.collection("users");
      const insert = await collection.insertOne({ email, password});
      if (insert.acknowledged)
        return { email, password,id: insert.insertedId };
      return null;
    },
    login: async (_, { email, password }, { req, res }) => {
      const hashPassword = await bcrypt.hash(password, 10);
      let collection = await db.collection("users");
      const insert = await collection.insertOne({ email, password});
      if (insert.acknowledged)
        return { email, password,id: insert.insertedId };
      return null;
    },
    // login: async (_, { email, password }, { req, res }) => {
    //   const id = new ObjectId(email);
    //   const hashPassword = await bcrypt.hash(password, 10);
    //   let collection = await db.collection("users");
    //   const user = await collection.findOne({ email: email});
    //   // if (!user) return res.status(400).send("Email is not found");
    //   // const validPass = await bcrypt.compare(password, user.password);
    //   // if (!validPass) return res.status(400).send("Invalid password");
    //   // const token = await jwt.sign(
    //   //       { _id: user._id },
    //   //       process.env.TOKEN_SECRET!
    //   //     );
    //   //     req.setHeader("auth-token", token);

    //   // if (insert.acknowledged)
    //   //   return { email, password,id: insert.insertedId };
    //   return null;
    // },
    async sortRecord(_, { page , limit = 5 }, context) {
      try {
        const collection = await db.collection("records");
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        // const sortField = sortBy === "name" ? "name" : sortBy === "age" ? "age" : "createdAt"; // Assuming "createdAt" field exists
    
        const sortedUsers = await collection.find({})
          .skip(startIndex)
          .limit(limit)
          .toArray();
          
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
      const update = await collection.updateOne(
        query,
        { $set: { ...args } }
      );
      
      if (update.acknowledged) 
        return await collection.findOne(query);
      
      return null;
    },
    // login: async (_, { email, password }, { req, res }) => {
    //   const user = await User.findOne({
    //     email: email,
    //   });

    //   if (!user) return res.status(400).send("Email is not found");
    //   const validPass = await bcrypt.compare(password, user.password);
    //   if (!validPass) return res.status(400).send("Invalid password");

    //   const token = await jwt.sign(
    //     { _id: user._id },
    //     process.env.TOKEN_SECRET!
    //   );
    //   req.setHeader("auth-token", token); //??nie ustawia sie
    // },
    async createRecord(_, { name, position,score, level }, context) {
      let collection = await db.collection("records");
      const insert = await collection.insertOne({ name, position,score, level });
      if (insert.acknowledged)
        return { name, position,score, level, id: insert.insertedId };
      return null;
    },
    
    // async sortRecord(_, { page = 1, limit = 3, sortBy = "name" },context ) {
    //   let collection = await db.collection("records");
    //   // const sort_users = await collection.find({}).toArray();
    //   const startIndex = (page - 1) * limit;
    //   const endIndex = page * limit;
    //   const sortedUsers = collection.sort((a, b) =>
    //     a[sortBy] > b[sortBy] ? 1 : -1
    //   );
    //   return sortedUsers.slice(startIndex, endIndex);
    //   // return sort_users;
    // },
    
    async deleteRecord(_, { id }, context) {
      let collection = await db.collection("records");
      const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
    },
  },
};

export default resolvers;
