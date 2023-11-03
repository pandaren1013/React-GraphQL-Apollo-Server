import db from "./db/conn.js";
import { ObjectId } from "mongodb";
import { ResolverMap } from "./resolvers-types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import  UserInputError  from "@apollo/server";

export const resolvers:ResolverMap = {
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    user: async (_, args, { req, res }) => {
      console.log("qqqqqqq",req.headers);
      const token = req.getHeader("auth-token"); //?? undefined
      const decoded = jwt.decode(token);
      console.log(token);
      console.log(decoded);

      if (!token) return res.status(401).send("Access Denieeed");
      const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
      console.log("ok", verified);
      let collection = await db.collection("users");

      if (verified) {
        const user = await collection.findOne({ _id: decoded });
        console.log("user", user);
        return user;
      } else {
        res.status(400).send("Invalid Token");
      }
    },
    users: async (_, args, context) => {
      let collection = await db.collection("users");
      const users = await collection.find();
      return users;
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
  },
  Mutation: {
    register: async (_, { email, password }, { req, res }) => {
      const hashPassword = await bcrypt.hash(password, 10);
      let collection = await db.collection("users");
      const insert = await collection.insertOne({ email, password: hashPassword});
      if (insert.acknowledged)
        return { email, password,id: insert.insertedId };
      return null;
    },
  
    login: async (_, { email, password }, { req, res }) => {
      try {
      let collection = await db.collection("users");
      const user = await collection.findOne({ email: email});
      console.log("user",user);
      // if (!user) return res.status(400).send("Email is not found");
      // if (!user) return {"Not Fount User!"};
      // if (!user) {return null}
      if (!user) return res.status(400).send("Email is not found");

      else{
        const validPass = await bcrypt.compare(password, user.password);
        // if (!validPass) return res.status(400).send("Invalid password");
        console.log(validPass);
        // if(!validPass){ return null}
      if (!validPass) return res.status(400).send("Invalid password");

        const token = await jwt.sign(
              { _id: user._id },
          process.env.TOKEN_SECRET!
        );
        console.log("token",token);
        // req.setHeader("auth-token", token);
        return { token}
      }
    } catch (error) {
      console.error("Not Found User:", error);
      throw new Error("Not Found User.");
    }
    },
    async sortRecord(_, { page , limit = 5 }, context) {
      try {
        const collection = await db.collection("records");
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
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
    
    async createRecord(_, { name, position,score, level }, context) {
      let collection = await db.collection("records");
      const insert = await collection.insertOne({ name, position,score, level });
      if (insert.acknowledged)
        return { name, position,score, level, id: insert.insertedId };
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
