import CreateTweet from "./CreateTweet";
import Posts from "./Posts";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import useSWRInfinite from "swr/infinite";
import { TweetService } from "../../services/tweetServices";
import PostItemSkeleton from "./PostItemSkeleton";
import type { PostItemProps } from "./PostItem";
import MyFeed from "./MyFeed";

const Timeline = () => {
  const limit = 5;

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && previousPageData.metaData?.hasMore === false) {
      return null;
    }

    return `/tweets?limit=${limit}&page=${pageIndex + 1}`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    TweetService.getTweets,
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
    return <div className="p-4 text-red-500">Error loading tweets</div>;

  return (
    <section className="max-w-lg mx-auto py-10">
      <CreateTweet mutate={mutate} />

      <Tabs defaultValue="timeline">
        <TabsList className="w-full">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="my-feed">My Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          {isLoading && tweets.length === 0 ? (
            <div className="space-y-4 mt-6">
              {[...Array(10)].map((_, index) => (
                <PostItemSkeleton key={index} />
              ))}
            </div>
          ) : isEmpty ? (
            <div className="p-8 text-center text-muted-foreground">
              No tweets yet. Be the first to post!
            </div>
          ) : (
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
          )}
        </TabsContent>
        <TabsContent value="my-feed">
          <MyFeed />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Timeline;
