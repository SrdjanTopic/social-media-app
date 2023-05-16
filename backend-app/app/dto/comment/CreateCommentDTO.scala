package dto.comment

import java.sql.Timestamp

case class CreateCommentDTO(
                             text: String,
                             userId: Long,
                             postId: Long,
                             creationDate: Timestamp = new Timestamp(System.currentTimeMillis())
                           )
