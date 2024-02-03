import { Expert } from "@/model/expert";
import { User } from "@/model/user";
import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export const cookieSetter = (res, token, set) => {
    res.setHeader(
      "Set-Cookie",
      serialize("token", set ? token : "", {
        path: "/",
        httpOnly: true,
        maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
      })
    );
  };
  
  export const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET);
  };
  
  export const checkAuth = async (req) => {
    const cookie = req.headers.cookie;
    if (!cookie) return null;
  
    const token = cookie.split("=")[1];
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    return await User.findById(decoded._id);
  };
  export const checkExprt =async(req)=>{
    const cookie = req.headers.cookie;
    if(!cookie) return null;
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    return await Expert.findById(decoded._id);
  }