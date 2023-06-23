import { INFINTE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { db } from '@/lib/db'
import React from 'react'
import PostFeed from './PostFeed'
import { getAuthSession } from '@/lib/auth'

const CustomFeed = async () => {
    const session=await getAuthSession();
    // @ts-ignore
    const userId=session?.user.id;

    const followedCommunity=await db.subscription.findMany({
        where: {
            userId,
        },
        include:{
            subreddit: true
        }
    })

    const posts=await db.post.findMany({
        where: {
            subreddit: {
                name: {
                    in: followedCommunity.map(({subreddit})=> subreddit.id)
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes:true,
            author: true,
            comments: true,
            subreddit: true,
        },
        take: INFINTE_SCROLLING_PAGINATION_RESULTS
    })

  return (
    <PostFeed initialPosts={posts} />
  )
}

export default CustomFeed