import { PostItem } from "./PostItem";
import type { PostItemProps } from "./PostItem";

const PostList = ({ posts }: { posts: PostItemProps[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.createdAt} {...post} />
      ))}
    </div>
  );
};

export default PostList;
