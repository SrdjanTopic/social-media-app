package dto.post

case class UpdatePostDTO(
                          id: Long,
                          text: String,
                          userId: Long,
                        )
