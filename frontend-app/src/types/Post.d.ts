type Post = {
  id: number;
  text: string;
  creationDate: Date;
  likeCount: number;
  dislikeCount: number;
  username: string;
  fullName: string;
  isLiked?: boolean;
};
