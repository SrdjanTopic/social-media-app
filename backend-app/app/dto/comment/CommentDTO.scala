package dto.comment

import java.sql.Timestamp

case class CommentDTO(
                       id: Long,
                       text: String,
                       userId: Long,
                       creationDate: Option[Timestamp],
                       postId:Long
                     )
