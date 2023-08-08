import { TRPCError } from "@trpc/server";
import { categoryCreateInputSchema } from "~/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  // Admin procedures
  create: protectedProcedure
    .input(categoryCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      const isMenuOwner = await ctx.prisma.menu.findUnique({
        where: {
          id: input.menuId,
          ownerId: ctx.session.user.id,
        },
      });
      console.log({ input, ownerId: ctx.session.user.id });

      if (!isMenuOwner) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.category.create({
        data: {
          name: input.name,
          description: input.description,
          menuId: input.menuId,
          ownerId: ctx.session.user.id,
        },
      });
    }),
});
