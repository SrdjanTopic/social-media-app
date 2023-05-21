package dto.post

import java.sql.Timestamp

case class PostWithUserDTO(
                            id: Long,
                            text: String,
                            creationDate: Option[Timestamp],
                            likeCount: Long,
                            dislikeCount: Long,
                            username:String,
                            fullName:String ,
                            isLiked:Option[Boolean]
                          )
