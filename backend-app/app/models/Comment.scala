package models

import java.sql.Timestamp

case class CommentOnPost(
                  id:Long = -1,
                  text:String,
                  userId:Long,
                  postId:Long,
                  creationDate: Timestamp = new Timestamp(System.currentTimeMillis()),
                  )
