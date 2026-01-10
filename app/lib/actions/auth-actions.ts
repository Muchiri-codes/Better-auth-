"use server"
import { redirect } from "next/navigation";
import { auth } from "../auth"
import { headers } from "next/headers";


export const signUp = async (email:string, password:string, name:string) =>{
  try{
  const result = await auth.api.signUpEmail({
    body:{
      email: email.trim().toLowerCase(), password, name, callbackURL:"/dashboard" 
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
    headers:await headers(),
  });
  return result;
}


//allows oauth2
export const signInSocial = async(provider: "google"| "github") =>{
  const {url} = await auth.api.signInSocial({
    body:{
      provider,
      callbackURL:'/dashboard'
    },
    headers:await headers()
  });
  if (url) {
    redirect(url);
  }
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
};