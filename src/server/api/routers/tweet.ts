import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
    infiniteFeed: publicProcedure.input(
      z.object({
        limit: z.number().optional(),
        cursor: z //Cursor is for pagination
          .object({
            id: z.string(),
            createdAt: z.date(),
          })
          .optional(),
      })
    ).query(async ({ input: { limit = 10, cursor }, ctx}) => {
      //cursor-based pagination
      ctx.prisma.tweet.findMany({
        take: limit + 1, //take one more than the limit to see if there is a next page
        cursor: cursor ? { id: cursor } : undefined, 
        orderBy: [{ createdAt: "desc"}, { id: "desc"}]
      })

    }),
    create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx}) => {
      const tweet = await ctx.prisma.tweet.create({
        data: { content, userId: ctx.session.user.id }, 
      });

      return tweet;
    }),
});

