package dto.user

case class UserDTO(
                    id: Long,
                    username: String,
                    fullName: String,
                    amRequesting: Option[Boolean] = None,
                    amRequested: Option[Boolean] = None,
                    isFriend: Option[Boolean] = None,
                  )
