package dto.postRating

import java.sql.{Blob, Timestamp}
case class RatedPostForUserDTO (
                                 postId:Long,
                                 isLiked:Boolean,
                                 text:String,
                                 userId:Long,
                                 creationDate:Timestamp,
                                 likeCount: Long = 0,
                                 dislikeCount: Long = 0
                               )
