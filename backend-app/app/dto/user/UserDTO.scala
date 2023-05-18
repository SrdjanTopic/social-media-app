package dto.user

case class UserDTO(
                                  id: Long,
                                  username: String,
                                  fullName: String,
                                  isFriend: Option[Boolean] = None
                                )
