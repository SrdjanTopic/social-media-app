package services

import dto.user.{CreateUserDTO, UpdateUserInfoDTO}
import models.User
import org.mockito.Mockito.when
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AsyncWordSpec
import org.scalatestplus.mockito.MockitoSugar.mock
import repositories.UserRepository

import scala.concurrent.Future

class UserServiceSpec extends AsyncWordSpec with Matchers {

  "createUser" must {

    "return created user when username is available" in {
      val createUserDto = CreateUserDTO("testUsername", "testFullname", "testPassword")
      val passServiceMock = mock[PasswordService]
      val userRepoMock = mock[UserRepository]

      // mock user repo exists call
      when(userRepoMock.existsByUsername(createUserDto.username))
        .thenReturn(Future.successful(false))

      // mock password hash call
      val hashedPassword = "hashedTestPassword"
      when(passServiceMock.hashPassword(createUserDto.password))
        .thenReturn(hashedPassword)

      // mock user repo create call
      val userToCreate = User(-1, createUserDto.username, createUserDto.fullName, hashedPassword)
      val createdUser = userToCreate.copy(id = 1)
      when(userRepoMock.createUser(userToCreate))
        .thenReturn(Future.successful(createdUser))

      // invoke and assert
      new UserService(userRepoMock, passServiceMock)
        .createUser(createUserDto)
        .map {
          case Right(createdUserDto) =>
            createdUserDto.id mustBe createdUser.id
            createdUserDto.username mustBe createdUser.username
            createdUserDto.fullName mustBe createdUser.fullName
          case Left(msg) =>
            fail(msg)
        }
    }

    "return error message when username is taken" in {
      val createUserDto = CreateUserDTO("takenUsername", "testFullname", "testPassword")
      val passServiceMock = mock[PasswordService]
      val userRepoMock = mock[UserRepository]

      // mock user repo exists call
      when(userRepoMock.existsByUsername(createUserDto.username))
        .thenReturn(Future.successful(true))

      // invoke and assert
      new UserService(userRepoMock, passServiceMock)
        .createUser(createUserDto)
        .map {
          case Right(createdUserDto) =>
            fail(createdUserDto.toString)
          case Left(msg) =>
            msg mustBe s"User with username: '${createUserDto.username}' already exists!"
        }
    }
  }

  "updateUserInfo" must {
    "return 1 that indicates that the user has been updated successfully" in {
      val updateUserDTO = UpdateUserInfoDTO("updateUsername", "updateFullname")
      val passServiceMock = mock[PasswordService]
      val userRepoMock = mock[UserRepository]
      val existingUserId = 5

      // mock user repo exists call
      when(userRepoMock.existsByUsername(updateUserDTO.username))
        .thenReturn(Future.successful(false))
      when(userRepoMock.existsById(existingUserId))
        .thenReturn(Future.successful(true))

      // mock user repo update call
      when(userRepoMock.updateUserInfo(existingUserId,updateUserDTO))
        .thenReturn(Future.successful(1))

      // invoke and assert
      new UserService(userRepoMock, passServiceMock)
        .updateUserInfo(existingUserId, updateUserDTO)
        .map {
          case Right(number) =>
            number mustBe UpdateUserInfoDTO("updateUsername", "updateFullname")
          case Left(msg) =>
            fail(msg)
        }
    }

    "return error message when username is taken" in {
      val updateUserDTO = UpdateUserInfoDTO("takenUsername", "updateFullname")
      val passServiceMock = mock[PasswordService]
      val userRepoMock = mock[UserRepository]
      val existingUserId = 5

      // mock user repo exists call
      when(userRepoMock.existsByUsername(updateUserDTO.username))
        .thenReturn(Future.successful(true))
      when(userRepoMock.existsById(existingUserId))
        .thenReturn(Future.successful(true))

      // invoke and assert
      new UserService(userRepoMock, passServiceMock)
        .updateUserInfo(existingUserId, updateUserDTO)
        .map {
          case Right(number) =>
            fail(number.toString)
          case Left(msg) =>
            msg mustBe s"User with username: '${updateUserDTO.username}' already exists!"
        }
    }

    "return error message when a none-existing userId is provided" in {
      val updateUserDTO = UpdateUserInfoDTO("updateUsername", "updateFullname")
      val passServiceMock = mock[PasswordService]
      val userRepoMock = mock[UserRepository]
      val nonExistingUserId = 1

      // mock user repo exists call
      when(userRepoMock.existsByUsername(updateUserDTO.username))
        .thenReturn(Future.successful(true))
      when(userRepoMock.existsById(nonExistingUserId))
        .thenReturn(Future.successful(false))

      // invoke and assert
      new UserService(userRepoMock, passServiceMock)
        .updateUserInfo(nonExistingUserId, updateUserDTO)
        .map {
          case Right(number) =>
            fail(number.toString)
          case Left(msg) =>
            msg mustBe s"User with ID:'$nonExistingUserId' does not exist!"
        }
    }
  }
}
