package dto.user

case class UpdateUserInfoDTO(
                              username: Option[String],
                              fullName: Option[String],
                            )
