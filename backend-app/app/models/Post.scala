package models

import java.sql.Timestamp
case class Post(
               id: Long = -1,
               text: String,
               userId: Long,
               creationDate: Timestamp = new Timestamp(System.currentTimeMillis()),
               likeCount: Long = 0,
               dislikeCount: Long = 0
               )
