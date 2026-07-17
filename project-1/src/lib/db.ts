import { connect } from "mongoose";

let monogodbUrl = process.env.MONGODB_URL;
if (!monogodbUrl) {
  throw new Error("MongoDB url is not found.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    console.log("cached db connected");

    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(monogodbUrl).then((c) => c.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Db connected");
  } catch (error) {
    throw error;
  }

  return cached.conn;
};

export default connectDb;
