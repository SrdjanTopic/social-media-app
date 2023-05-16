package repositories.tables

import models.{CommentOnPost, FriendRequest, Friends, Post, PostRating, User}
import slick.jdbc.MySQLProfile
import slick.sql.SqlProfile.ColumnOption.NotNull

import java.sql.Timestamp

class SlickTablesGeneric(val profile: MySQLProfile) {
  import profile.api._
  class UserTable(tag: Tag) extends Table[User](tag, Some("mydb"), "users") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def username = column[String]("username", O.Unique, NotNull, O.Length(30))
    def fullName = column[String]("fullName", O.Unique, NotNull, O.Length(30))
    def password = column[String]("password", NotNull)
    override def * = (id, username, fullName, password) <> (User.tupled, User.unapply)
  }
  lazy val userTable = TableQuery[UserTable]

  class FriendRequestTable(tag: Tag) extends Table[FriendRequest](tag, Some("mydb"), "friendRequests") {
    def requesterId = column[Long]("requesterId")
    def addresseeId = column[Long]("addresseeId")
    def requester = foreignKey("FK_friendRequests_requesterId", requesterId, userTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    def addressee = foreignKey("FK_friendRequests_addresseeId", addresseeId, userTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    def pk_id = primaryKey("PK_friendRequests", (requesterId, addresseeId))
    override def * = (requesterId, addresseeId) <> (FriendRequest.tupled, FriendRequest.unapply)
  }
  lazy val friendRequestTable = TableQuery[FriendRequestTable]

  class FriendsTable(tag: Tag) extends Table[Friends](tag, Some("mydb"), "friends") {
    def user1Id = column[Long]("user1Id")
    def user2Id = column[Long]("user2Id")
    def user1 = foreignKey("FK_friends_user1Id", user1Id, userTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    def user2 = foreignKey("FK_friends_user2Id", user2Id, userTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    def pk_id = primaryKey("PK_friends", (user1Id, user2Id))
    override def * = (user1Id, user2Id) <> (Friends.tupled, Friends.unapply)
  }
  lazy val friendsTable = TableQuery[FriendsTable]

  class PostTable(tag: Tag) extends Table[Post](tag, Some("mydb"), "posts") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def text = column[String]("text", NotNull)
    def userId = column[Long]("userId")
    def creationDate = column[Timestamp]("creationDate")
    def likeCount = column[Long]("likeCount", O.Default(0))
    def dislikeCount = column[Long]("dislikeCount", O.Default(0))
    def user = foreignKey("FK_userId", userId, userTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    override def * = (id, text, userId, creationDate, likeCount, dislikeCount) <> (Post.tupled, Post.unapply)
  }
  lazy val postTable = TableQuery[PostTable]

  class PostRatingTable(tag: Tag) extends Table[PostRating](tag, Some("mydb"), "postRatings") {
    def postId = column[Long]("postId")
    def userId = column[Long]("userId")
    def isLiked = column[Boolean]("isLiked")
    def post = foreignKey("FK_postRatings_postId", postId, postTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    def user = foreignKey("FK_postRatings_userId", userId, userTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    def pk_id = primaryKey("PK_id", (postId, userId))
    override def * = (postId, userId, isLiked) <> (PostRating.tupled, PostRating.unapply)
  }
  lazy val postRatingTable = TableQuery[PostRatingTable]

  class CommentOnPostTable(tag: Tag) extends Table[CommentOnPost](tag, Some("mydb"), "comments") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def text = column[String]("text", NotNull)
    def userId = column[Long]("userId")
    def postId = column[Long]("postId")
    def creationDate = column[Timestamp]("creationDate")
    def post = foreignKey("FK_comments_postId", postId, postTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    def user = foreignKey("FK_comments_userId", userId, userTable)(_.id, onDelete = ForeignKeyAction.Cascade, onUpdate = ForeignKeyAction.Cascade)
    override def * = (id, text, userId, postId, creationDate) <> (CommentOnPost.tupled, CommentOnPost.unapply)
  }
  lazy val commentTable = TableQuery[CommentOnPostTable]


  val tables = Seq(userTable, friendRequestTable, friendsTable, postTable, postRatingTable, commentTable)
  val ddl: profile.DDL = tables.map(_.schema).reduce(_ ++ _)
}

object TableDefinitionGenerator {
  def main(args: Array[String]): Unit = {
    println(SlickTables.ddl.createIfNotExistsStatements.mkString(";\n"))
  }
}