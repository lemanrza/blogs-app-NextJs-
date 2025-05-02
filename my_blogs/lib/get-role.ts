import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function getUserRole() {
  const { userId } = await auth();

  if (!userId) return null;
  const response = await clerkClient();
  const user = await response.users.getUser(userId);

  const role = user.publicMetadata.role;

  return role;
}