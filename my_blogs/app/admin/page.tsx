import { getUserRole } from "@/lib/get-role";
import { redirect } from "next/navigation";

export default async function AdminRedirect() {
  const role = await getUserRole();
  if (role === "admin") {
    redirect(`/admin/dashboard`);
  } else {
    redirect("/");
  }
}