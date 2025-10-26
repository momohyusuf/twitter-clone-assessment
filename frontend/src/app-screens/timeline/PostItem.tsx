export interface PostItemProps {
  author: {
    username: string;
  };
  content: string;
  createdAt: string;
}
export const PostItem = ({ author, content, createdAt }: PostItemProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="font-mono font-semibold">{author.username}</h3>
        <time className="text-sm text-gray-400 mt-1" dateTime={createdAt}>
          {new Date(createdAt).toLocaleString()}
        </time>
      </div>

      <p className="mt-2 text-gray-500">{content}</p>
    </div>
  );
};
