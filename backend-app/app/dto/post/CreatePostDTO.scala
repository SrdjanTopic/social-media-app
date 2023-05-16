package dto.post

import java.sql.Timestamp

case class CreatePostDTO(
                          text:String,
                          userId:Long,
                          creationDate: Timestamp = new Timestamp(System.currentTimeMillis()),
                          likeCount: Long = 0,
                          dislikeCount: Long = 0
                        )
