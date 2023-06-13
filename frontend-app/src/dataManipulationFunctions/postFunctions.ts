import postRatingService from "../services/postRatingService";

export async function postActions(
  post: Post,
  action: PostAction
): Promise<Post | null> {
  switch (action.action) {
    //
    //HANDLING LIKE ACTION
    //
    case "like":
      if (post.isLiked) {
        try {
          const res = await postRatingService.removeRating(post.id);
          if (res !== 0)
            return {
              ...post,
              isLiked: undefined,
              likeCount: post.likeCount - 1,
            };
          else return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      } else if (post.isLiked == undefined) {
        try {
          const res = await postRatingService.addRating(post.id, true);
          if (res !== 0)
            return {
              ...post,
              isLiked: true,
              likeCount: post.likeCount + 1,
            };
          else return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      } else {
        try {
          const res = await postRatingService.updateRating(post.id, true);
          if (res !== 0)
            return {
              ...post,
              isLiked: true,
              likeCount: post.likeCount + 1,
              dislikeCount: post.dislikeCount - 1,
            };
          else return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    //
    //HANDLING DISLIKE ACTION
    //
    case "dislike":
      if (post.isLiked == false) {
        try {
          const res = await postRatingService.removeRating(post.id);
          if (res !== 0)
            return {
              ...post,
              isLiked: undefined,
              dislikeCount: post.dislikeCount - 1,
            };
          else return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      } else if (post.isLiked == undefined) {
        try {
          const res = await postRatingService.addRating(post.id, false);
          if (res !== 0)
            return {
              ...post,
              isLiked: false,
              dislikeCount: post.dislikeCount + 1,
            };
          else return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      } else {
        try {
          const res = await postRatingService.updateRating(post.id, false);
          if (res !== 0)
            return {
              ...post,
              isLiked: false,
              dislikeCount: post.dislikeCount + 1,
              likeCount: post.likeCount - 1,
            };
          else return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    default:
      return null;
  }
}
