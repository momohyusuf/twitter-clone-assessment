import { Skeleton } from "../../components/ui/skeleton";

const PostItemSkeleton = () => {
  return (
    <div className="space-y-2 p-4 border-b border-gray-200">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default PostItemSkeleton;
