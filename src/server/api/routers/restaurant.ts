import { z } from "zod";
import { restaurantCreateInputSchema } from "~/schemas";
// import { Prisma } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const restaurantRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  // User procedures
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.restaurant.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.restaurant.findUnique({ where: { id: input.id } });
    }),

  // Admin procedures
  getMine: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.restaurant.findMany({
      where: { ownerId: ctx.session.user.id },
      include: {
        menu: {
          include: {
            category: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(restaurantCreateInputSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.restaurant.create({
        data: {
          name: input.name,
          slug: input.slug,
          address: input.address,
          description: input.description,
          image: input.image,
          ownerId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.restaurant.delete({ where: { id: input.id } });
    }),
});
