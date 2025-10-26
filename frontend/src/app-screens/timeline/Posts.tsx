import PostList from "./PostList";
import type { PostItemProps } from "./PostItem";

const Posts = ({ tweets }: { tweets: PostItemProps[] }) => {
  return (
    <div className="p-4">
      <PostList posts={tweets} />
    </div>
  );
};

export default Posts;
