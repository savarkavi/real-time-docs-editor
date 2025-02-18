"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { getDocuments, getUsers } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";

interface User {
  id: string;
  name: string;
  avatar: string;
}

export function Room({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[] | []>([]);
  const params = useParams();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      if (!res) return;

      setUsers(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const headers = {
          "Content-Type": "application/json",
        };
        const room = params.documentId as string;

        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
          headers,
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) =>
          users.find((user) => user.id === userId),
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase()),
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documentsData = await getDocuments(roomIds as Id<"documents">[]);

        return documentsData.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <Loader className="size-8 animate-spin text-amber-500" />
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
