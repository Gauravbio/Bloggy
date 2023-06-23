import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
// import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session=await getAuthSession();

        if(!session?.user) {
            return new Response('Unauthorized',{status: 401})
        }

        const body=await req.json();

        const {subredditId,title,content}=PostValidator.parse(body);

        const subscriptionExists=await db.subscription.findFirst({
            where:{
                subredditId,
                // @ts-expect-error
                userId: session.user.id,
            },
        })

        if(!subscriptionExists) {
            return new Response('Subscribe to post',{status:400})
        }

        // @ts-ignore
        const userId=session.user.id;

        await db.post.create({
            data:{
                title,
                content,
                authorId: userId,
                subredditId
            }
        })

        return new Response("ok")
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request passed', { status: 422 })
          }
      
          return new Response('Could not post at this time ,please try again', { status: 500 })
    }
}