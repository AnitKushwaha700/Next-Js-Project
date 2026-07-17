import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import bcrypt from "bcryptjs";
import User from "@/app/model/user.model";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let email = credentials?.email;
        let password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email or Password is not found");
        }
        await connectDb();

        let user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect Password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {},
  session: {},
  pages: {},
  secret: "Aniket",
};

export default authOptions;
