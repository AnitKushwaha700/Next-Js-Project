import connectDb from "@/lib/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    console.log("Request : ", { name, email, password });

    await connectDb();

    const existUser = await User.findOne({ email });
    console.log("Existing User:" , existUser);
    

    if (existUser) {
      return NextResponse.json(
        { message: "User already exist!" },
        { status: 400 },
      );
    }

    console.log();
    

    if (password.length < 6) {
      return NextResponse.json(
        { message: "password must be at least 6 characters!" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { meassage: `Register Error ${error}` },
      { status: 500 },
    );
  }
}
