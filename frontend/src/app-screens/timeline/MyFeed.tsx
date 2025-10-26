import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";
import { TweetService } from "../../services/tweetServices";
import Posts from "./Posts";
import PostItemSkeleton from "./PostItemSkeleton";
import type { PostItemProps } from "./PostItem";

const MyFeed = () => {
  const limit = 5;

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && previousPageData.metaData?.hasMore === false) {
      return null;
    }

    return `/tweets/feed?limit=${limit}&page=${pageIndex + 1}`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    TweetService.getUserFeed,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
    }
  );

  const tweets = data ? data.flatMap((page) => page.data || []) : [];

  const hasMore =
    data && data.length > 0 ? data[data.length - 1]?.metaData?.hasMore : false;

  const isEmpty = data?.[0]?.data?.length === 0;

  const fetchMoreData = () => {
    setSize(size + 1);
  };

  if (error)
    return <div className="p-4 text-red-500">Error loading your feed</div>;

  if (isLoading && tweets.length === 0) {
    return (
      <div className="space-y-4 mt-6">
        {[...Array(10)].map((_, index) => (
          <PostItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No tweets in your feed yet.
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={tweets.length}
      next={fetchMoreData}
      hasMore={hasMore || false}
      loader={
        <div className="space-y-4 mt-4">
          {[...Array(3)].map((_, index) => (
            <PostItemSkeleton key={index} />
          ))}
        </div>
      }
      endMessage={
        <div className="p-4 text-center text-sm text-muted-foreground mt-4">
          You've reached the end! 🎉
        </div>
      }
      scrollThreshold={0.9}
      style={{ overflow: "visible" }}
    >
      <Posts tweets={tweets as PostItemProps[]} />
    </InfiniteScroll>
  );
};

export default MyFeed;
