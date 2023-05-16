package dto.post

import java.sql.Timestamp

case class PostDTO(
                    id: Long,
                    text: String,
                    userId: Long,
                    creationDate: Option[Timestamp],
                    likeCount: Long,
                    dislikeCount: Long
                  )