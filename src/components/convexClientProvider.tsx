"use client";

import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { Loader } from "lucide-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex h-screen w-full items-center justify-center">
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <div className="flex h-screen w-full items-center justify-center">
            <Loader className="size-8 animate-spin text-amber-500" />
          </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
