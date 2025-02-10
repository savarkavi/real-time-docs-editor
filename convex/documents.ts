import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    return await ctx.db.insert("documents", {
      title: args.title || "Untitled",
      ownerId: user.subject,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const deleteDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== user.subject) {
      throw new ConvexError("Only the owner can delete this document.");
    }

    await ctx.db.delete(args.id);
  },
});

export const updateDocument = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== user.subject) {
      throw new ConvexError("Only the owner can rename this document.");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});
