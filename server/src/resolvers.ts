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
    // users: async (root, args) => {
    //   // if (!user) throw new Error("You are not authenticated!");
    //   let collection = await db.collection("users");
    //   return await collection.find();
    // },
    user: async (root, args, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      let collection = await db.collection("users");

      return await collection.findOne({ _id: user.id });
    },
    // user: async (_, args, { req, res }) => {
    //   console.log("qqqqqqq", req.headers);
    //   const token = req.header("Authorization"); //?? undefined
    //   const decoded = jwt.decode(token);
    //   console.log(token);
    //   console.log(decoded);

    //   if (!token) return res.status(401).send("Access Denieeed");
    //   const verified = jwt.verify(token, process.env.JWT_SECRET!);
    //   console.log("ok", verified);
    //   let collection = await db.collection("users");

    //   if (verified) {
    //     const user = await collection.findOne({ _id: decoded });
    //     console.log("user", user);
    //     return user;
    //   } else {
    //     res.status(400).send("Invalid Token");
    //   }
    // },
    // users: async (_, args, context) => {
    //   let collection = await db.collection("users");
    //   const users = await collection.find();
    //   return users;
    // },
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
    // async sort_users(_, { page = 1, limit = 3, sortBy = "name" }, context) {
    //   try {
    //     const collection = await db.collection("records");
    //     const startIndex = (page - 1) * limit;
    //     const endIndex = page * limit;

    //     const sortField =
    //       sortBy === "name" ? "name" : sortBy === "age" ? "age" : "createdAt"; // Assuming "createdAt" field exists

    //     const sortedUsers = await collection
    //       .find({})
    //       .sort({ [sortField]: 1 })
    //       .skip(startIndex)
    //       .limit(limit)
    //       .toArray();

    //     return sortedUsers;
    //   } catch (error) {
    //     console.error("Error sorting users:", error);
    //     throw new Error("Failed to sort users.");
    //   }
    // },
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

    // login: async (_, { name, email, password }, { req, res }) => {
    //   try {
    //   let collection = await db.collection("users");
    //   const user = await collection.findOne({ email: email});
    //   console.log("user",user);
    //   // if (!user) return res.status(400).send("Email is not found");
    //   // if (!user) return {"Not Fount User!"};
    //   // if (!user) {return null}
    //   if (!user) return res.status(400).send("Email is not found");

    //   else{
    //     const validPass = await bcrypt.compare(password, user.password);
    //     // if (!validPass) return res.status(400).send("Invalid password");
    //     console.log(validPass);
    //     // if(!validPass){ return null}
    //   if (!validPass) return res.status(400).send("Invalid password");

    //     const token = await jwt.sign(
    //           { _id: user._id },
    //       process.env.TOKEN_SECRET!
    //     );
    //     console.log("token", typeof token);
    //     // req.setHeader("auth-token", token);
    //     return { token}
    //   }
    // } catch (error) {
    //   console.error("Not Found User:", error);
    //   throw new Error("Not Found User.");
    // }
    // },
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
