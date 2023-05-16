package models

import javax.inject.Singleton

@Singleton
case class PostRating(
                     postId:Long = -1,
                     userId:Long,
                     isLiked:Boolean
                     )
