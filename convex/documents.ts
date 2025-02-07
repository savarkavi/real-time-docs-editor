import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const documentId = await ctx.db.insert("documents", {
      title: args.title || "Untitled",
      ownerId: user.subject,
    });
  },
});
