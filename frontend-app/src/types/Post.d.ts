type Post = {
  id: number;
  text: string;
  creationDate: Date;
  likeCount: number;
  dislikeCount: number;
  userId: number;
  username: string;
  fullName: string;
  isLiked?: boolean;
};
