package dto.comment

import java.sql.Timestamp

case class CommentWithUserDTO(
                               id: Long,
                               text: String,
                               userId: Long,
                               creationDate: Timestamp,
                               postId:Long,
                               fullName:String,
                               username:String
                             )
