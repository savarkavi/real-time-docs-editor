"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getDocumentsByIds, { ids });
}

export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const orgId = sessionClaims?.org_id;

  if (!orgId) return;

  const res = await clerk.users.getUserList({
    organizationId: [orgId],
  });

  const users = res.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));

  return users;
}
