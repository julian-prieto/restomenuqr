import { TRPCError } from "@trpc/server";
import { menuCreateInputSchema } from "~/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  // Admin procedures
  create: protectedProcedure
    .input(menuCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      const isRestaurantOwner = await ctx.prisma.restaurant.findUnique({
        where: {
          id: input.restaurantId,
          ownerId: ctx.session.user.id,
        },
      });

      if (!isRestaurantOwner) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.menu.create({
        data: {
          name: input.name,
          description: input.description,
          restaurantId: input.restaurantId,
          ownerId: ctx.session.user.id,
        },
      });
    }),
});
