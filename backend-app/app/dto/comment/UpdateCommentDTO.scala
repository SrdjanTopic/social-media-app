package dto.comment

case class UpdateCommentDTO(
                             id: Long,
                             text: String,
                             userId: Long,
                             postId: Long
                           )
