"use server"

import { auth } from "../auth"
import { headers } from "next/headers";

export const signUp = async (email:string, password:string, name:string) =>{
  try{
  const result = await auth.api.signUpEmail({
    body:{
      email: email.trim().toLowerCase(), password, name, callbackURL:"/dashboard" //redirect the user to dashboard when signed in successfully
    }, 
    headers: await headers()
  });
  return result;
}catch(error){
  console.error("Auth error:", error);
  throw error
}
};

export const signIn = async (email:string, password:string) =>{
  const result = await auth.api.signInEmail({
    body:{
      email, 
      password,
      callbackURL:"/dashboard"
    },
  });
  return result;
}

export const signOut = async () =>{
  const result = await auth.api.signOut({
    headers:await headers()
  });
  return result;
}