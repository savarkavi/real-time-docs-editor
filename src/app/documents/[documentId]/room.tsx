"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
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
