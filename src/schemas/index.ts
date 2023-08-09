import { z } from "zod";

export const restaurantCreateInputSchema = z.object({
  name: z.string(),
  slug: z.string(),
  address: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type TRestaurantCreateInputSchema = z.infer<
  typeof restaurantCreateInputSchema
>;

export const menuCreateInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  restaurantId: z.string(),
});

export type TMenuCreateInputSchema = z.infer<typeof menuCreateInputSchema>;

export const categoryCreateInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  menuId: z.string(),
});

export type TCategoryCreateInputSchema = z.infer<
  typeof categoryCreateInputSchema
>;

export const productCreateInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  menuId: z.string(),
});

export type TProductCreateInputSchema = z.infer<
  typeof productCreateInputSchema
>;
