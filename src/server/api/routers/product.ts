import { TRPCError } from "@trpc/server";
import { productCreateInputSchema } from "~/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  // Admin procedures
  create: protectedProcedure
    .input(productCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      const isCategoryOwner = await ctx.prisma.category.findUnique({
        where: {
          id: input.categoryId,
          ownerId: ctx.session.user.id,
        },
      });

      if (!isCategoryOwner) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          image: input.image,
          price: input.price,
          categoryId: input.categoryId,
          ownerId: ctx.session.user.id,
        },
      });
    }),
});
