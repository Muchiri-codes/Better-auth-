//server part of the dashboard, always by default


import { headers } from "next/headers";
import AgriAdvisorDashboard from "./admin-dash";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers:await headers()
  });
  if(!session){
    redirect("/auth")
  }
 
  return <AgriAdvisorDashboard session={session} />;
}
